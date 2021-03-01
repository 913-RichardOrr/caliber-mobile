import React from 'react';
import DrawerNavigatorComponent from './DrawerNavigation';
import { enableScreens } from 'react-native-screens';

enableScreens();

function RouterComponent(props: any) {
    return (
        <DrawerNavigatorComponent />
    );
}

export default RouterComponent;
