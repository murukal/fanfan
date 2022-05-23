import React from 'react';
import {View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../redux';
import {NotificationWithId, notified} from '../../redux/app';

export const Snackbars = () => {
  const dispatch = useDispatch();
  const notifications = useSelector<State, NotificationWithId[]>(
    state => state.app.notifications,
  );

  const onDismiss = (id: string) => () => {
    dispatch(notified(id));
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        {
          flexDirection: 'column-reverse',
          overflow: 'hidden',
        },
      ]}>
      {notifications.map(notification => {
        return (
          <Snackbar
            visible={true}
            key={notification.id}
            wrapperStyle={{
              position: 'relative',
            }}
            onDismiss={onDismiss(notification.id)}>
            {notification.message}
          </Snackbar>
        );
      })}
    </View>
  );
};

export default Snackbars;
