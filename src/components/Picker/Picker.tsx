import { useState } from 'react'
import { useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { Props } from '.'

const Picker = (props: Props) => {
  const [isPicking, setIsPicking] = useState(false)
  const picking = useRef(new Animated.Value(300)).current

  const onPress = () => {
    pick()
    setIsPicking(true)
  }

  const pick = () => {
    Animated.timing(picking, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const picked = () => {
    Animated.timing(picking, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  return (
    <>
      <Pressable onPress={onPress}>{props.children}</Pressable>

      {isPicking && (
        <>
          <View
            style={{
              backgroundColor: 'red',
              height: '100vh',
              width: '100vw',
              position: 'absolute',
              zIndex: 998,
              overflow: 'hidden'
            }}
          />

          <Animated.View
            style={{
              position: 'absolute',
              width: '100vw',
              height: 300,
              bottom: 0,
              zIndex: 999,
              backgroundColor: 'green',
              transform: [
                {
                  translateY: picking
                }
              ]
            }}
          >
            <Text>12312</Text>
          </Animated.View>
        </>
      )}
    </>
  )
}

export default Picker
