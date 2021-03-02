import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { ReducerState } from '../store/store';
import { getWeeks, changeSelectedWeek } from '../store/actions';
import batchWeekService from './batchWeekService';
import styles from '../global_styles';

/**
 * Provides a picker to select and set the current week we are looking at
 */
export default function WeekSelectionComponent() {

    const dispatch = useDispatch();
    const selectedBatch = {batchId: 'id1'};
    //const selectedBatch = useSelector((state: RootState) => state.batchReducer.batch);
    const weeks = useSelector((state: ReducerState) => state.weekReducer.weeks);
    const user = useSelector((state: ReducerState) => state.weekReducer.user);

    useEffect(() => {
        // Check the databse for the week objects 
        batchWeekService.getWeeksByBatchId(user.token, selectedBatch.batchId).then((weeks) => {
            // Sort by week number
            const sorted = weeks.sort((a, b) => (a.weeknumber - b.weeknumber));
            dispatch(getWeeks(sorted));
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
        <Picker style={styles.weekSelect} onValueChange={onWeekSelect} testID='weekPicker'>
            {weeks.map((qcWeek) => {
                return <Picker.Item
                    label={'Week '+qcWeek.weeknumber}
                    value={qcWeek.weeknumber}
                />
            })}
        </Picker>
    );
}