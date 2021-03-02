import React from 'react';
import { View } from 'react-native';
import UnderDevelopmentComponent from '../UnderDevelopmentComponent';
import LogoutComponent from './Logout';

export default function Home() {
  return (
    <View>
      <UnderDevelopmentComponent />
      <LogoutComponent />
    </View>
  );
}
