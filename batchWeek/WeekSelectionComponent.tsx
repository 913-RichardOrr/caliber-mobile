import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { RootState } from '../store/store';
import { getWeeks, changeSelectedWeek } from '../store/actions';
import batchWeekService from './batchWeekService';

/**
 * Provides a picker to select and set the current week we are looking at
 */
export default function WeekSelectionComponent() {

    const dispatch = useDispatch();
    const selectedBatch = {batchId: 'id1'};
    //const selectedBatch = useSelector((state: RootState) => state.batchReducer.batch);
    const weeks = useSelector((state: RootState) => state.weekReducer.weeks);
    const user = useSelector((state: RootState) => state.userReducer.user);

    useEffect(() => {
        // Check the databse for the week objects 
        batchWeekService.getWeeksByBatchId(user.token, selectedBatch.batchId).then((weeks) => {
            dispatch(getWeeks(weeks));
            console.log(weeks);
        });
    }, []);

    function onWeekSelect(weekValue: number) {
        // Update the redux store with the selected week
        let selectedWeek = weeks.find(week => week.weeknumber === weekValue);
        if(selectedWeek) {
            dispatch(changeSelectedWeek(selectedWeek));
        }
    }

    return (
        <Picker onValueChange={onWeekSelect} testID='weekPicker'>
            {weeks.map((qcWeek) => {
                return <Picker.Item
                    label={'Week '+qcWeek.weeknumber}
                    value={qcWeek.weeknumber}
                />
            })}
        </Picker>
    );
}