import React, { useEffect } from 'react';

import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AssociateTableComponent from '../associate/AssociateTableComponent';
import AddNoteComponent from '../batchWeek/AddNoteComponent';
import AddWeek from '../batchWeek/AddWeek/addWeek.component';
import WeekSelectionComponent from '../batchWeek/WeekSelectionComponent';
import { getAssociates } from '../store/actions';
import { ReducerState } from '../store/store';
import weekCategoryList from '../weekCategories/weekCategoryList';
import BatchPageService from './BatchPageService';

function BatchPageComponent() {
  let batch = useSelector((state: ReducerState) => state.batchReducer.batch);
  let dispatch = useDispatch();
  function addAssociatesToComponent(batchId: string) {
    BatchPageService.getAssociates(batchId).then((associates) => {
      dispatch(getAssociates(associates));
    });
  }
  useEffect(() => {
    addAssociatesToComponent(batch.batchId);
  }, []);

  return (
    <View>
      <WeekSelectionComponent></WeekSelectionComponent>
      <AddWeek></AddWeek>
      {weekCategoryList({ weekId: 0 })}
      <AddNoteComponent></AddNoteComponent>
      <AssociateTableComponent></AssociateTableComponent>
    </View>
  );
}

export default BatchPageComponent;
