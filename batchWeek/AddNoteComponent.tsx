import React from 'react';
import { View, TextInput } from 'react-native';
import { RootState, WeekState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addOverallNote } from '../store/actions';

function AddNoteComponent(){
    const dispatch = useDispatch();
    const week = useSelector((state: RootState) => state.weekReducer.selectedWeek);

    return (
        <View>
            <TextInput multiline onChangeText={(value) => 
                dispatch(addOverallNote({...week, note: value}))
            }
            value = {week.note}>
            </TextInput>
        </View>
    )
}

export default AddNoteComponent;