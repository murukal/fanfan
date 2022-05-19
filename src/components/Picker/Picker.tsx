import {useState, useRef, cloneElement} from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Props} from '.';
import React from 'react';
import {createRef} from 'react';

const options = [
  {
    key: 1,
    text: '测试1',
  },
  {
    key: 2,
    text: '测试2',
  },
  {
    key: 3,
    text: '测试3',
  },
  {
    key: 4,
    text: '测试4',
  },
  {
    key: 5,
    text: '测试5',
  },
  {
    key: 10,
    text: '测试10',
  },
  {
    key: 6,
    text: '测试6',
  },
  {
    key: 7,
    text: '测试7',
  },
  {
    key: 8,
    text: '测试8',
  },
  {
    key: 9,
    text: '测试9',
  },
];

const Picker = (props: Props) => {
  const [isPicking, setIsPicking] = useState(false);
  const picking = useRef(new Animated.Value(300)).current;

  const onPress = () => {
    setIsPicking(true);
    pick();
  };

  const pick = () => {
    Animated.timing(picking, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const picked = () => {
    Animated.timing(picking, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  /**
   * 关闭picker
   */
  const onClose = () => {
    setIsPicking(false);
    picked();
  };

  const ref = createRef<any>();
  const listRef = createRef<any>();

  return (
    <>
      <Pressable onPressIn={onPress}>
        {cloneElement(props.children, {
          ref: ref,
          onFocus: () => {
            const _onFocus = props.children.props.onFocus;
            _onFocus && _onFocus();
            onPress();
            ref.current.blur();
          },
        })}
      </Pressable>

      {isPicking && (
        <>
          <View style={[StyleSheet.absoluteFill]}>
            <TouchableWithoutFeedback
              accessibilityRole="button"
              disabled={true}
              importantForAccessibility="no">
              <Animated.View
                style={[{opacity: 0.5, backgroundColor: 'black', flex: 1}]}
              />
            </TouchableWithoutFeedback>
          </View>
        </>
      )}

      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 300,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          },
          {
            transform: [
              {
                translateY: picking,
              },
            ],
          },
        ]}>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'hsla(210,18%,87%,1)',
          }}>
          <Pressable style={[styles.pickerHandler]} onPress={onClose}>
            <Text>取消</Text>
          </Pressable>

          <Pressable
            style={[styles.pickerHandler]}
            onPress={() => {
              listRef.current.scrollToIndex({
                index: 9,
              });
            }}>
            <Text
              style={{
                color: '#0969da',
              }}>
              确认
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            alignItems: 'center',
            padding: 20,
          }}>
          <FlatList
            ref={listRef}
            data={options}
            renderItem={item => {
              return (
                <Text
                  style={{
                    marginVertical: 8,
                  }}>
                  {item.item.text}
                </Text>
              );
            }}
          />
        </View>
      </Animated.View>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  pickerHandler: {
    marginHorizontal: 16,
  },
});
