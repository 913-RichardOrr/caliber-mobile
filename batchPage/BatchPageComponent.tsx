import React from 'react';
import { View } from 'react-native';
import AssociateTableComponent from '../associate/AssociateTableComponent';
import AddNoteComponent from '../batchWeek/AddNoteComponent';
import AddWeek from '../batchWeek/AddWeek/AddWeekComponent';
import WeekSelectionComponent from '../batchWeek/WeekSelectionComponent';
import weekCategoryList from '../weekCategories/weekCategoryList';

function BatchPageComponent() {
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
