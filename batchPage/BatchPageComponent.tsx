import React from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import AssociateTableComponent from '../associate/AssociateTableComponent';
import AddNoteComponent from '../batchWeek/AddNoteComponent';
import AddWeek from '../batchWeek/AddWeek/addWeek.component';
import WeekSelectionComponent from '../batchWeek/WeekSelectionComponent';
import { ReducerState } from '../store/store';
import style from '../global_styles';
import AssociateService, {
  AssociateWithFeedback,
} from '../associate/AssociateService';
import WeekCategoryListContainer from '../weekCategories/WeekCategoryListContainer';

function BatchPageComponent() {
  let associates = useSelector(
    (state: ReducerState) => state.batchReducer.associates
  );

  const curentUser = useSelector(
    (state: ReducerState) => state.userReducer.user
  );
  const token = curentUser.token;

  /**
   * Updates all of the associates with their new notes and
   * technical statuses. Is used on the save button that
   * is stickied to the bottom of the screen.
   */
  function handleAllUpdate() {
    associates.forEach(async (assoc: AssociateWithFeedback) => {
      if (assoc.qcFeedback.notecontent || assoc.qcFeedback.technicalstatus) {
        try {
          await AssociateService.updateAssociate(
            assoc.qcFeedback,
            {
              notecontent: assoc.qcFeedback.notecontent,
              technicalstatus: assoc.qcFeedback.technicalstatus,
            },
            token
          );
        } catch (err: any) {
          await AssociateService.putAssociate(
            assoc.qcFeedback,
            {
              notecontent: assoc.qcFeedback.notecontent,
              technicalstatus: assoc.qcFeedback.technicalstatus,
            },
            token
          );
        }
      }
    });
  }

  return (
    <View>
      <WeekSelectionComponent></WeekSelectionComponent>
      <AddWeek></AddWeek>
      {/* <WeekCategoryListContainer/> */}
      <AddNoteComponent></AddNoteComponent>
      <AssociateTableComponent></AssociateTableComponent>
      <Button
        raised
        titleStyle={style.title}
        buttonStyle={style.button}
        title='Save All'
        type='outline'
        icon={<Icon name='save' type='fontawesome' color='#F26925' />}
        onPress={handleAllUpdate}
        testID='saveNote'
      />
    </View>
  );
}

export default BatchPageComponent;
