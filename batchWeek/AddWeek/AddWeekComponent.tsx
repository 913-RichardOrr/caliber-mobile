import React from 'react';
import { View, Button } from 'react-native';
import QcWeek from '../QcWeek';
import { addWeek } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BatchWeekService from '../batchWeekService';
import { CaliberState } from '../../store/store';


function AddWeek(){
    const dispatch = useDispatch();
    const selectedWeek = useSelector((state: CaliberState) => state.selectedWeek);
    const weeks = useSelector((state: CaliberState) => state.weeks);

    function addWeekHandler(){
        let newWeek = new QcWeek();
        newWeek.batchid = selectedWeek.batchid;
        newWeek.overallstatus = 'Undefined';
        newWeek.weeknumber = weeks.length + 1;

        BatchWeekService.addWeek(newWeek).then(()=> {
            BatchWeekService.getWeeksByBatchId(newWeek.batchid).then((weeks)=> {
                dispatch(addWeek(weeks));
            })
        });
    }

    return (
        <View>
            <Button title='+' onPress={addWeekHandler}></Button>
        </View>
    )
}

export default AddWeek;