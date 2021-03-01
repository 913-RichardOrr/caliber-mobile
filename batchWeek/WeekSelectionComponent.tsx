import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalSelectList } from 'react-native-modal-select-list';
import { BatchState, WeekState } from '../store/store';
import { getWeeks, changeSelectedWeek } from '../store/actions';
import batchWeekService from './batchWeekService';
import QcWeek from './QcWeek';

/**
 * Provides a picker to select and set the current week we are looking at
 */
export default function WeekSelectionComponent() {

    const dispatch = useDispatch();
    const selectedBatch = {batchId: 'id1'};
    //const selectedBatch = useSelector((state: BatchState) => state.batch);
    const weeks = useSelector((state: WeekState) => state.weeks);

    useEffect(() => {
        // Check the databse for the week objects 
        batchWeekService.getWeeksByBatchId(selectedBatch.batchId).then((weeks) => {
            dispatch(getWeeks(weeks));
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
        <ModalSelectList
            options={weeks.map((week) => 'Week '+week.weeknumber)}
            onSelectedOption={onWeekSelect}
            diableTextSearch
        />
    );
}