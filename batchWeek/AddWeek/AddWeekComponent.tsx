import React from 'react';
import { View} from 'react-native';
import {Button} from 'react-native-elements';
import QcWeek from '../QcWeek';
import { addWeek, changeSelectedWeek } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BatchWeekService from '../batchWeekService';
import { ReducerState } from '../../store/store';
import style from '../../global_styles';


function AddWeek(){
    const dispatch = useDispatch();
    const weeks = useSelector((state: ReducerState) => state.weekReducer.weeks);
    const batch = useSelector((state: ReducerState) => state.batchReducer.batch);
    const user = useSelector((state: ReducerState) => state.weekReducer.user);

    function addWeekHandler(){
        let newWeek = new QcWeek();
        newWeek.batchid = batch.batchId;
        newWeek.overallstatus = 'Undefined';
        newWeek.weeknumber = weeks.length + 1;

        BatchWeekService.addWeek(user.token, newWeek).then(()=> {
            BatchWeekService.getWeeksByBatchId(user.token, newWeek.batchid).then((retrievedWeeks)=> {
                dispatch(addWeek(retrievedWeeks));
                let week = retrievedWeeks.find(week => week.weeknumber === newWeek.weeknumber);
                week ? dispatch(changeSelectedWeek(week)) : '';
            })
        });
    }

    return (
        <View>
            <Button title='+' onPress={addWeekHandler} buttonStyle={style.addWeekButton}></Button>
        </View>
    )
}

export default AddWeek;