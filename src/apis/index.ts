// third
import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  createHttpLink,
  FetchResult,
  InMemoryCache,
  MutationOptions,
  NetworkStatus,
  OperationVariables,
  QueryOptions,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
// project
import {store} from '../redux';
import {GraphQLError} from 'graphql';
import {AppID, AppLocation} from '../assets';

const httpLink = createHttpLink({
  // 动态获取url
  uri: operation => {
    // 根据请求客户端appId标识不同，获取不同的请求地址
    // 后端对不同的api进行了服务隔离
    const context = operation.getContext();
    const appId = context.appId;

    // 根据appId获取环境变量中对应的后端api地址
    const apiUrl = AppLocation[(appId as AppID) || AppID.Boomoney];

    // 返回指定的URL
    return `${apiUrl}/graphql`;
  },
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = store.getState().userProfile.token;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  };
});

/**
 * 生成一个graphql请求客户端对象
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

export const fetcher = {
  /** 查询 */
  query: <T = any, V = OperationVariables>(options: QueryOptions<V, T>) =>
    client.query<T, V>(options).catch(
      (error: ApolloError): ApolloQueryResult<null> => ({
        data: null,
        error,
        loading: false,
        networkStatus: NetworkStatus.error,
      }),
    ),

  /** 变更 */
  mutate: <T = any, V = OperationVariables>(options: MutationOptions<T, V>) =>
    client.mutate<T, V>(options).catch(
      (error: GraphQLError): FetchResult<T> => ({
        data: null,
        errors: [error],
      }),
    ),
};
