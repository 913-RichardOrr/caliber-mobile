import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { Input } from "react-native-elements";
import { style } from "../global_styles";

import { sendPasswordResetEmail } from '../test/auth/functions';
import { RootState } from '../store/store'
import { loginChange } from '../store/actions';

import { useNavigation } from '@react-navigation/native';
import { UserInput } from './user';


function ForgotPassword(props: any) {
    const inputUser = (state: RootState) => state.userReducer.userLogin;
    console.log(inputUser);
    const newUser = useSelector(inputUser);
    const dispatch = useDispatch();
    const nav = useNavigation();

    function submitHandler(){
        try{
        sendPasswordResetEmail(newUser.email);
        alert('Email Sent!');}catch(err){alert('Email Not Sent!');} 
        nav.navigate('Login');
    }

    return (
            <View style={style.login}>
                <View style={style.logininput}>
                    <Text>Email: </Text>
                    <Input
                        placeholder="Email address"
                        onChangeText={
                            (value) => dispatch(loginChange({...newUser, email:value}))}
                        value={newUser.email}
                   />
                <Button onPress={submitHandler} title="Send Email" />
                </View>
            </View>
    );
}


export default ForgotPassword;