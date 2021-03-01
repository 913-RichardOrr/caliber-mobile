import React from 'react';
import { View} from 'react-native';
import {Button} from 'react-native-elements';
import QcWeek from '../QcWeek';
import { addWeek } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import BatchWeekService from '../batchWeekService';
import { CaliberState } from '../../store/store';
import style, {REVATUREORANGE} from '../../global_styles';


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
            <Button title='+' onPress={addWeekHandler} buttonStyle={style.addWeekButton}></Button>
        </View>
    )
}

export default AddWeek;