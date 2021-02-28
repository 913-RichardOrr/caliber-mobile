import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, TouchableHighlight, TextInput } from 'react-native';
import { Input } from "react-native-elements";
import { style } from "../global_styles";

import { sendPasswordResetEmail } from '../test/auth/functions';
import { ReducerState } from '../store/store'
import { getUser, loginChange } from '../store/actions';

import { useNavigation } from '@react-navigation/native';
import { UserInfo } from './user';
import { f } from './config';


function ForgotPassword(props: any) {
    const inputUser = (state: ReducerState) => state.userReducer.userLogin;
    console.log(inputUser);
    const newUser = useSelector(inputUser);
    const dispatch = useDispatch();
    const nav = useNavigation();

    function submitHandler(){
        try{
        sendPasswordResetEmail(newUser.email);
        alert('Email Sent!');}catch(err){alert('Email Not Sent!');} 
        dispatch(getUser(new UserInfo));
        nav.navigate('Login');
    }


    return (
            <View style={[style.login, style.container]}>
                <Text style={style.caliber}>Reset Password</Text>

                <View style={style.loginInput}>
                    <TextInput
                        placeholder="Email address"
                        style={style.input}
                        onChangeText={
                            (value) => dispatch(loginChange({...newUser, email:value}))}
                        value={newUser.email}
                    />
                </View>

                <View>
                    <TouchableHighlight
                        onPress={ () => submitHandler() }
                        style={{backgroundColor: '#F26925', height:45, width:200, borderRadius:40, alignItems:'center', marginBottom: 40}}>
                        <Text style={{alignItems:'center', padding:8, color:'#fff', fontSize:18, fontWeight:'bold'}}>SEND EMAIL</Text>
                    </TouchableHighlight>
                </View>
                
            </View>
        
    );
}


export default ForgotPassword;