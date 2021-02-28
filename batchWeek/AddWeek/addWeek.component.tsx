import React from 'react';
import { View, Button } from 'react-native';
import QcWeek from '../QcWeek';
import { addWeek } from '../../store/actions';
import { useDispatch } from 'react-redux';
import AddWeekService from './AddWeekService';


function AddWeek(){
    const dispatch = useDispatch();

    function addWeekHandler(){
        dispatch(addWeek(new QcWeek()));
        AddWeekService.addWeek(new QcWeek()).then(()=> '');
    }

    return (
        <View>
            <Button title='+' onPress={addWeekHandler}></Button>
        </View>
    )
}

export default AddWeek;