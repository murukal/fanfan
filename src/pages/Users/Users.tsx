import {useQuery} from '@apollo/client';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {USERS} from '../../apis/user';
import React, {useEffect} from 'react';
import {
  Avatar,
  Caption,
  Colors,
  Divider,
  FAB,
  IconButton,
  Subheading,
} from 'react-native-paper';
import {User} from '../../typings/auth';
import {useNavigation, useRoute} from '../../utils/navigation';
import {UsersProp} from '../../typings/navigation';
import {create} from '../../apis/share';
import {errorsNotify} from '../../utils';

const AvatarSize = 48;

const Users = () => {
  const {data: users} = useQuery(USERS);
  const [checkedIds, setCheckedIds] = React.useState<number[]>([]);
  const {
    params: {fromId, fromType, checkedIds: checkedIdsFromProps},
  } = useRoute<UsersProp>();
  const navigation = useNavigation();

  useEffect(() => {
    setCheckedIds(checkedIdsFromProps);
  }, [checkedIdsFromProps]);

  /**
   * 选择用户
   */
  const onCheck = (id: number, isChecked: boolean) => () => {
    setCheckedIds(existedCheckedIds => {
      if (isChecked) {
        return existedCheckedIds.filter(checkedId => checkedId !== id);
      } else {
        return [...existedCheckedIds, id];
      }
    });
  };

  const renderUser = ({item, index}: ListRenderItemInfo<User>) => {
    const isChecked = checkedIds.includes(item.id);

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 16,
            alignItems: 'center',
          }}>
          {/* 头像 */}
          {item?.avatar ? (
            <Avatar.Image
              style={styles.avatar}
              size={AvatarSize}
              source={{
                uri: item.avatar,
              }}
            />
          ) : (
            <Avatar.Icon
              style={styles.avatar}
              size={AvatarSize}
              icon="account"
            />
          )}

          {/* 名称邮箱 */}
          <View>
            <Subheading>{item.username}</Subheading>
            <Caption>{item.emailAddress}</Caption>
          </View>

          {/* 功能区 */}
          <IconButton
            icon={isChecked ? 'star' : 'star-outline'}
            style={{
              marginLeft: 'auto',
            }}
            onPress={onCheck(item.id, isChecked)}
            color={isChecked ? Colors.orange500 : Colors.grey500}
          />
        </View>

        {index + 1 !== users?.users.items?.length && (
          <Divider
            style={{
              marginBottom: 16,
            }}
          />
        )}
      </>
    );
  };

  /**
   * 提交选择
   */
  const onSubmit = async () => {
    const result = await create({
      targetId: fromId,
      targetType: fromType,
      sharedByIds: checkedIds,
    });

    if (!result.data) {
      errorsNotify(result.errors);
      return;
    }

    // 分享成功后跳转到账本页面ƒ
    navigation.navigate(fromType, {
      id: fromId,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 16,
      }}>
      <FlatList
        data={users?.users.items}
        renderItem={renderUser}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        style={{
          position: 'absolute',
          right: 16,
          bottom: 20,
        }}
        icon="check"
        onPress={onSubmit}
      />
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  avatar: {
    marginRight: 16,
  },
});
