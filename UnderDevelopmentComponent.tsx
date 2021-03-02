import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import style from './global_styles';

function UnderDevelopmentComponent() {
  return (
    <View>
      <Text style={style.underDevelopmentText}>
        This page is under development
      </Text>
      <Text style={style.underDevelopmentText}>Sorry!</Text>
      <Icon
        name={'wrench'}
        type='font-awesome'
        color={'#F26925'}
        testID='statusIcon'
      />
    </View>
  );
}

export default UnderDevelopmentComponent;
