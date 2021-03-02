import React from 'react';
import DrawerNavigatorComponent from './DrawerNavigation';
import { enableScreens } from 'react-native-screens';

enableScreens();

/**
 * General router component.
 */
function RouterComponent() {
  return <DrawerNavigatorComponent />;
}

export default RouterComponent;
