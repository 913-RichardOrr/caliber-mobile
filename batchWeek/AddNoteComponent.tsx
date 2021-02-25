import React from 'react';
import { View } from 'react-native';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addOverallNote } from '../store/actions';
import { Input } from 'react-native-elements';
import batchWeekService from './batchWeekService';


function AddNoteComponent(){
    const dispatch = useDispatch();
    const week = useSelector((state: RootState) => state.weekReducer.selectedWeek);
    console.log(week);

    function sendPatch(){
        try{
            console.log(week);
            batchWeekService.addNewQcNote(week);
        } catch {
            console.log('update failed');
        }
    }

    return (
        <View>
            <Input multiline numberOfLines={3} label='Overall QC Feedback'
            onChangeText={(value) => 
                dispatch(addOverallNote({...week, note: value}))
            }
            onBlur={sendPatch}
            value = {week.note}>
            </Input>
        </View>
    )
}

export default AddNoteComponent;