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

function ReportAssociateComponent(props: AssociateProps) {
    
    return (
        <View style={style.notesCard}>
        </View>
    );
}

export default ReportAssociateComponent;