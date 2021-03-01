import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image } from 'react-native';
import {style} from '../global_styles';
import { ReducerState } from '../store/store';
import {auth} from './config';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginChange } from '../store/actions';
import { Roles } from './user';

interface LoginProp {
    navigation: any;
}

export default function LoginComponent({navigation}: LoginProp) {
    const [loggedIn, setLoggedin] = useState(false);
    const inputUser = (state: ReducerState) => state.userReducer.userLogin;
    
    const newUser = useSelector(inputUser);
    const dispatch = useDispatch();

    const loginUser = async(newUser: any) => {
        if(newUser.email != '' && newUser.password != ''){
            try{
                let email = newUser.email;
                let password = newUser.password;
                auth.signInWithEmailAndPassword(email, password);
                //'Test' will be changed to 'Home'
                navigation.navigate('Home');
            } catch(error){
                console.log(error);
            }
        }else{
            alert('Missing email or password');
        }
    }
    useEffect(()=>{
        auth.onIdTokenChanged(function(user:any) {
            if(user){
                //Logged in
                setLoggedin(true);
                user.getIdTokenResult().then((token: any) => {
                    console.log(token);
                    const role = {
                        ROLE_QC: token.claims.ROLE_QC,
                        ROLE_VP: token.claims.ROLE_VP,
                        ROLE_TRAINER: token.claims.ROLE_TRAINER
                    };
                    const tokenTemp = token.token;
                    dispatch(getUser({email: user.email, token: tokenTemp, role: role}));
                }).catch((err: any) => console.log(err));
                
                console.log('Logged in', user);
        }else{
          //logged out
            setLoggedin(false);
            console.log('Logged out');
            }
        });
    },[]); 
    
    return (
        <View style={style.container}>
            <Text style={style.caliber}>Caliber</Text>

            <View style={style.login}>
                <View style={style.loginInput}>
                    <TextInput
                        placeholder={'Email'}
                        style={style.input}
                        onChangeText={(value) => dispatch(loginChange({...newUser, email: value}))}
                        value={newUser.email} 
                    />
                </View>

                <View>
                    <TextInput
                        placeholder={'Password'}
                        style={style.input}
                        onChangeText={(value) => dispatch(loginChange({...newUser, password: value}))}
                        secureTextEntry
                        value={newUser.password}
                    />
                </View>

            </View>

            <View>
                <TouchableHighlight
                    onPress={ () => loginUser(newUser) }
                    style={{backgroundColor: '#F26925', height:45, width:200, borderRadius:40, alignItems:'center', marginBottom: 40}}>
                    <Text style={{alignItems:'center', padding:8, color:'#fff', fontSize:18, fontWeight:'bold'}}>LOG IN {'>'}</Text>
                </TouchableHighlight>
                
                <TouchableHighlight
                    onPress={()=>{navigation.navigate('ForgotPassword')}}
                    style={{backgroundColor: '#fff', height:45, width:200, borderRadius:40, alignItems:'center'}}>
                    <Text style={{alignItems:'center', color:'#72A4C2', fontSize:18, fontWeight:'bold'}}>Forgot password?</Text>
                </TouchableHighlight>
            </View>

        </View>
    )
}