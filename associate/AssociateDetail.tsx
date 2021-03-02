//Shows associate name, technical status, note (editable)

import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import associateService, { Associate, QCFeedback } from './AssociateService';
import TechnicalStatus from './TechnicalStatus';
import style from '../global_styles'
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

interface AssociateProps {
    associate: Associate;
    qcFeedback: QCFeedback;
}

function AssociateDetail(props: AssociateProps) {
    /**
     * Using states to store the current qc note/technical status: we can view multiple associate's
     * notes at once, so we should DEFINITELY not be using the redux store
     * This should be initialized to the correct Associate's current feedback, if they have one
     */
    const [qcNote, setQcNote] = useState(props.qcFeedback.qcNote);
    const [qcTechnicalStatus, setQcTechnicalStatus] = useState(props.qcFeedback.qcTechnicalStatus);
    let user = useSelector((state: RootState) => state.userReducer.user);

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
        associateService.updateAssociate(props.qcFeedback, { 'qcStatus': newStatus });
    }

    return (
        <View style={style.notesCard}>
            <Text testID='firstName' style={style.noteName}>{props.associate.firstName} {props.associate.lastName}</Text>
            <Pressable
                style={style.techstatus}
                onPress={cycleTechnicalStatus}
                testID='technicalStatus'>
                <TechnicalStatus
                    status={qcTechnicalStatus} />
            </Pressable>
            <Button
                titleStyle={style.title}
                buttonStyle={style.button}
                type="outline"
                title={viewNote ? ('Hide Note') : ('Show Note')}
                onPress={() => setViewNote(viewNote ? false : true)}
                testID='displayNote' />
            {viewNote && user.role == 'ROLE_TRAINER' && <Input
                disabled
                placeholder = "Insert note here"
                defaultValue={qcNote}
                multiline
                numberOfLines={4}
                scrollEnabled
                spellCheck={true}
                onChangeText={text => setQcNote(text)}
                testID='qcNote' />}
            {viewNote && user.role != 'Trainer'  && <Input
                placeholder = "Insert note here"
                defaultValue={qcNote}
                multiline
                numberOfLines={4}
                scrollEnabled
                spellCheck={true}
                onChangeText={text => setQcNote(text)}
                testID='qcNote' />}
        </View>
    );
}

export default AssociateDetail;