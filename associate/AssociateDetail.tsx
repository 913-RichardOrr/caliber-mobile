//Shows associate name, technical status, note (editable)

import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import AssociateService, { Associate, QCFeedback } from './AssociateService';
import TechnicalStatus from './TechnicalStatus';
import style from '../global_styles';
import { ReducerState } from '../store/store';
import { useSelector } from 'react-redux';

interface AssociateProps {
  associate: Associate;
  qcFeedback: QCFeedback;
}

function AssociateDetail(this: any, props: AssociateProps) {
  /**
   * Using states to store the current qc note/technical status: we can view multiple associate's
   * notes at once, so we should DEFINITELY not be using the redux store
   * This should be initialized to the correct Associate's current feedback, if they have one
   */
  const [localText, setLocalText] = useState("");
  const [qcNote, setQcNote] = useState(props.qcFeedback.notecontent);
  const [qcTechnicalStatus, setQcTechnicalStatus] = useState(
    props.qcFeedback.technicalstatus
  );
  let user = useSelector((state: ReducerState) => state.userReducer.user);
  const token = user.token;

  //Should we be able to view their note?
  const [viewNote, setViewNote] = useState(false);

  /**
   * When the Technical Status component is pressed, should cycle through 0-4
   *  Update both the state and the database.
   */
  function cycleTechnicalStatus() {
    let newStatus = qcTechnicalStatus + 1;
    if (newStatus > 4) {
      newStatus = 0;
    }
    /**
     * Every time this button is pressed the database will update with the correct feedback.
     */
    setQcTechnicalStatus(newStatus);
    AssociateService.updateAssociate(props.qcFeedback, { technicalstatus: newStatus }, token);
  }

  /**
   * Handles the update of the note on blur;
   */
  async function handleNoteUpdate(text: string) {
    try {
      console.log("Attempting to patch new note");
      await AssociateService.updateAssociate(props.qcFeedback, {
        notecontent: text,
      }, token);
    } catch (err: any) {
      console.log("putting new note");
      await AssociateService.putAssociate(props.qcFeedback, {
        notecontent: text,
        technicalstatus: props.qcFeedback.technicalstatus,
      }, token);
    }
  }

  return (
    <View style={style.notesCard}>
      <Text testID='firstName' style={style.noteName}>
        {props.associate.firstName} {props.associate.lastName}
      </Text>
      <Pressable
        style={style.techStatus}
        onPress={cycleTechnicalStatus}
        testID='technicalStatus'>
        <TechnicalStatus status={qcTechnicalStatus} />
      </Pressable>
      <Button
        titleStyle={style.title}
        buttonStyle={style.button}
        type='outline'
        title={viewNote ? 'Hide Note' : 'Show Note'}
        onPress={() => setViewNote(viewNote ? false : true)}
        testID='displayNote'
      />
      {viewNote && user.role.ROLE_TRAINER && (
        <Input
          disabled
          onBlur={() => {
            handleNoteUpdate(localText)
            console.log(localText);
          }}
          placeholder='Insert note here'
          defaultValue={qcNote}
          multiline
          numberOfLines={4}
          scrollEnabled
          spellCheck={true}
          onChangeText={(text: string) => {
            setQcNote(text)
            setLocalText(text);
            props.qcFeedback.notecontent = text
          }
          }
          testID='qcNote'
        />
      )}
      {viewNote && !user.role.ROLE_TRAINER && (
        <Input
          onBlur={() => {
            handleNoteUpdate(localText)
            console.log(localText);
          }}
          placeholder='Insert note here'
          defaultValue={qcNote}
          multiline
          numberOfLines={4}
          scrollEnabled
          spellCheck={true}
          onChangeText={(text: string) => {
            setQcNote(text)
            setLocalText(text);
            props.qcFeedback.notecontent = text
          }
          }
          testID='qcNote'
        />
      )}
    </View>
  );
}

export default AssociateDetail;
