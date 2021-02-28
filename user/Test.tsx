import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '../store/store';
import LogoutComponent from './Logout';

export default function Test() {
    const inputUser = (state: ReducerState) => state.userReducer.userLogin;
    const newUser = useSelector(inputUser);
    const dispatch = useDispatch();

    
    return (
        <View>
            <Text>
                You should be seeing this if you logged in {newUser.email}
            </Text>
            <LogoutComponent/>
        </View>
    )
}
