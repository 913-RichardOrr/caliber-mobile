import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AssociateTableComponent from '../associate/AssociateTableComponent';
import AddNoteComponent from '../batchWeek/AddNoteComponent';
import AddWeek from '../batchWeek/AddWeek/addWeek.component';
import WeekSelectionComponent from '../batchWeek/WeekSelectionComponent';
import weekCategoryList from '../weekCategories/weekCategoryList';

function BatchPageComponent() {
  return (
    <View>
      <ScrollView>
        <WeekSelectionComponent></WeekSelectionComponent>
        <AddWeek></AddWeek>
        {weekCategoryList({ weekId: 0 })}
        <AddNoteComponent></AddNoteComponent>
        <AssociateTableComponent></AssociateTableComponent>
      </ScrollView>
    </View>
  );
}

export default BatchPageComponent;
