import React from 'react';
<<<<<<< HEAD
import { Text, TouchableHighlight, View } from 'react-native';
=======
import { Text, TouchableHighlight } from 'react-native';
>>>>>>> f1bc06ab895306a1100ac41a9cf60483853adec4
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
