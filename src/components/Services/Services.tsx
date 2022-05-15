import React from 'react';
import {View} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';

const Services = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Title>Services</Title>

        <Button mode="text" uppercase={false}>
          See All
        </Button>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Card
          elevation={0}
          style={{
            flex: 1,
          }}>
          <Card.Cover
            source={{uri: 'https://picsum.photos/700'}}
            style={{
              borderRadius: 999,
            }}
          />
          <Card.Actions>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>

        <View
          style={{
            flex: 3,
          }}>
          {}
        </View>
      </View>
    </>
  );
};

export default Services;
