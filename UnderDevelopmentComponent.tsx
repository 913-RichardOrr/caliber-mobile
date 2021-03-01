import React from 'react';
import 'react-native';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

function AssociateTableComponent() {

    return (
        <View>
            <Text>This page is under development</Text>
            <Icon
                        name={'wrench'}
                        type='font-awesome'
                        color={'#F26925'}
                        testID='statusIcon' />        
        </View>
    );
}

export default AssociateTableComponent;