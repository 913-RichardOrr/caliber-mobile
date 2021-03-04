import React from 'react';
import { View } from 'react-native';
import { ReducerState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addOverallNote } from '../store/actions';
import { Input } from 'react-native-elements';
import batchWeekService from './batchWeekService';
import style from '../global_styles';

function AddNoteComponent() {
  const dispatch = useDispatch();
  const week = useSelector(
    (state: ReducerState) => state.weekReducer.selectedWeek
  );
  const user = useSelector((state: ReducerState) => state.userReducer.user);

  function sendPost() {
    try {
      if (user.token) {
        batchWeekService.updateFeedback(user.token, week);
      }
      console.log('update success');
    } catch {
      console.log('update failed');
    }
  }

  return (
    <View>
      <Input
        multiline
        placeholder='Put your overall batch note here'
        numberOfLines={3}
        label='Overall QC Feedback'
        onChangeText={(value: any) =>
          dispatch(addOverallNote({ ...week, note: value }))
        }
        onBlur={sendPost}
        value={week.note}
        style={style.overallText}
      />
    </View>
  );
}

export default AddNoteComponent;
