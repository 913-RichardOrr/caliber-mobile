import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { enableScreens } from 'react-native-screens';
import Home from '../user/Home';
import ForgotPassword from '../user/ForgotPassword';
import UnderDevelopmentComponent from '../UnderDevelopmentComponent';
import ManageCategories from '../categoriesFeature/ManageCategories';
import LogoutComponent from '../user/Logout';
import { useDispatch, useSelector } from 'react-redux';
import CategoryService from '../categoriesFeature/CategoryService';
import {
    GetActive,
    GetStale,
} from '../store/categoriesFeature/CategoryActions';
import { ReducerState } from '../store/store';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native-elements';
import LoginComponent from '../user/Login';
import {useEffect, useState} from 'react';

enableScreens();

const Stack = createStackNavigator();

export interface MenuProp {
    navigation: any;
}
/**
 * Shows only the Revature logo for the header
 */
export const loginHeaderOptions = {
    headerTitle: () => (
        <Image
            style={{ width: 165, height: 50, margin: 30 }}
            source={require('./rev-logo.png')}
        />
    ),
};

/**
 * Shows the Revature logo and the DrawerNavigator button
 * in the header
 * @param navigation - navigation prop to open the drawer
 */
export function generalHeaderOptions(navigation: any) {
    return {
        headerTitle: () => (
            <Image
                style={{ width: 165, height: 50, margin: 30 }}
                source={require('./rev-logo.png')}
            />
        ),
        headerLeft: () => (
            <Icon.Button
                name='ios-menu'
                size={25}
                color='#72A4C2'
                backgroundColor='#fff'
                onPress={() => navigation.openDrawer()}
            ></Icon.Button>
        ),
    };
}

/**
 * Login Stack Screens:
 * Login - just a login screen with the login header
 * Home - has a temporary home component which is just the
 *        under development. TODO: add a better home screen.
 * Forgot Password - allows the user to reset their password.
 */
const LoginStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={loginHeaderOptions}
            />

            <Stack.Screen
                name="'ForgotPassword'"
                component={ForgotPassword}
                options={loginHeaderOptions}
            />
        </Stack.Navigator>
    );
};

const HomeStack = ({ navigation }: MenuProp) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
                options={generalHeaderOptions(navigation)}
            />
        </Stack.Navigator>
    );
};

/**
 * TODO: get the report stack added
 * @param navigation - navigation prop to open the drawer
 */
const ReportStack = ({ navigation }: MenuProp) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Reports'
                component={UnderDevelopmentComponent}
                options={generalHeaderOptions(navigation)}
            />
        </Stack.Navigator>
    );
};

/**
 * ManagementStack displays the management tools for the VP users.
 * They can see the active and inactive categories, add categories, change
 * status of a category.
 * @param navigation - navigation prop to open the drawer
 */
const ManagementStack = ({ navigation }: MenuProp) => {
    const dispatch = useDispatch();
    // authorizer state
    const currentUser = useSelector(
        (state: ReducerState) => state.userReducer.user
    );
    const token = currentUser.token;
    const [rend, setRend] = useState(false);
    // get manage category table data
    useEffect(() => {
        async function getCategoryFunc() {
            const active = await CategoryService.getCategories(token, true);
            const stale = await CategoryService.getCategories(token, false);
            dispatch(GetActive(active));
            dispatch(GetStale(stale));
        }
        setRend(true);
        getCategoryFunc();
    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Management'
                component={ManageCategories}
                options={generalHeaderOptions(navigation)}
            />
        </Stack.Navigator>
    );
};

/**
 * LogoutStack shows the logout screen with a button that
 * allows them to logout
 * @param navigation - navigation prop to open the drawer
 */
const LogoutStack = ({ navigation }: MenuProp) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Logout'
                component={LogoutComponent}
                options={generalHeaderOptions(navigation)}
            />
        </Stack.Navigator>
    );
};

export {
    LoginStackNavigator,
    HomeStack,
    ReportStack,
    ManagementStack,
    LogoutStack,
};
