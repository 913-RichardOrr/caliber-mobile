import React from 'react';
import { Text,TouchableHighlight} from 'react-native';
import {logout} from '../test/auth/functions';
import {style} from '../global_styles';
import { useNavigation } from '@react-navigation/native';
import {getUser} from '../store/actions';
import {useDispatch} from 'react-redux';
import {UserInfo} from './user';

/**LogoutButton */

function LogoutComponent(){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <TouchableHighlight
            onPress={ () => {
            logout();
            dispatch(getUser(new UserInfo));
            navigation.navigate('Login');
        }}
        style={{backgroundColor: '#F26925', height:40, width:133, borderRadius:40, alignItems:'center', marginBottom: 40}}>
        <Text style={{alignItems:'center', padding:8, color:'#fff', fontSize:18, fontWeight:'bold'}}>LOG OUT</Text>
        </TouchableHighlight>

        );
}

export default LogoutComponent;