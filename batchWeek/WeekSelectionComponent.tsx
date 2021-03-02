import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { WeekState } from '../store/store';
import { changeSelectedWeek } from '../store/actions';
import QcWeek from './QcWeek';

/**
 * Provides a picker to select and set the current week we are looking at
 */
export default function WeekSelectionComponent() {

    // Get the selected batch in the redux store
    // Get the weeks in the redux store
    //const weeks = useSelector((state: WeekState) => state.weeks);
    const weeks = [{weekNumber: 1}, {weekNumber: 2}, {weekNumber: 3}, {weekNumber: 4}];

    useEffect(() => {
        // TODO: Call service function to get week data
    }, []);

    function onWeekSelect(weekValue: number) {
        // Update the redux store with the selected week
        let selectedWeek = weeks.find(week => week.weekNumber === weekValue);
        if(selectedWeek) {
            //useDispatch()(changeSelectedWeek(selectedWeek));
        }
    }

    return (
        <Picker onValueChange={onWeekSelect} testID='weekPicker'>
            {weeks.map((qcWeek) => {
                return <Picker.Item
                    label={'Week '+qcWeek.weekNumber}
                    value={qcWeek.weekNumber}
                />
            })}
        </Picker>
    );
}