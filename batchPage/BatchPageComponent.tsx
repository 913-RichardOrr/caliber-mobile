import React, { useEffect } from 'react';
import { View } from 'react-native';
import AssociateTableComponent from '../associate/AssociateTableComponent';
import AddNoteComponent from '../batchWeek/AddNoteComponent';
import AddWeek from '../batchWeek/AddWeek/addWeek.component';
import WeekSelectionComponent from '../batchWeek/WeekSelectionComponent';
import WeekCategoryListContainer from '../weekCategories/WeekCategoryListContainer';

function BatchPageComponent() {
  useEffect(() => {}, []);

  return (
    <View>
      <WeekSelectionComponent></WeekSelectionComponent>
      <AddWeek></AddWeek>
      <AddNoteComponent></AddNoteComponent>
      {/* <WeekCategoryListContainer></WeekCategoryListContainer> */}
      <AssociateTableComponent></AssociateTableComponent>
    </View>
  );
}

export default BatchPageComponent;
