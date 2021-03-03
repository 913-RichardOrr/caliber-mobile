import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { logout } from '../test/auth/functions';
import { style } from '../global_styles';
import { useNavigation } from '@react-navigation/native';
import { loginChange } from '../store/actions';
import { useDispatch } from 'react-redux';
import { UserInput } from './user';

/**LogoutButton */

function LogoutComponent() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={style.container}>
      <TouchableHighlight
        onPress={() => {
          logout();
          dispatch(loginChange(new UserInput()));
          navigation.navigate('Login');
        }}
        style={style.logoutBackground}>
        <Text style={style.logoutText}>LOG OUT</Text>
      </TouchableHighlight>
    </View>
  );
}

export default LogoutComponent;
