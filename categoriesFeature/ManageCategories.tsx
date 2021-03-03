import React, { useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Modal,
    TextInput,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoryTable from './CategoryTable';
import catStyle from '../categoriesFeature/categoriesStyles';
import AddBtn from './AddBtn.png';
import DisabledAddBtn from './DisabledAddBtn.png'
import CategoryService from './CategoryService';
import { GetActive, GetRender } from '../store/categoriesFeature/CategoryActions';
import { CategoryState, ReducerState } from '../store/store';

/**
 *  This component encloses the entire Manage Categories feature
 *  @returns: view that has tabs of active/stale categories
 *  and a button that adds a category
 */
export default function ManageCategories() {
    // create or get state
    const Tab = createMaterialTopTabNavigator();
    const [clicked, setClicked] = useState(false);
    const [textValue, onChangeText] = React.useState('');
    const dispatch = useDispatch();

    // authorizer state
    const currentUser = useSelector((state: ReducerState) => state.userReducer.user);
    const token = currentUser.token;

    const renderValue = useSelector((state: CategoryState) => state.render);
    let newRender;
    if (renderValue === true) {
        newRender = false;
    } else {
        newRender = true;
    }

    dispatch(GetRender(newRender));

    return (
        <React.Fragment>
            {/* Tabs that navigate between active and stale categories */}
            <React.Fragment>
                <Tab.Navigator
                    tabBarOptions={{
                        labelStyle: { fontSize: 14 },
                        activeTintColor: '#F26925',
                        inactiveTintColor: '#474C55',
                        style: { backgroundColor: '#FFFFFF' },
                        indicatorStyle: { backgroundColor: '#72A4C2', height: 5, borderRadius: 5 },

                    }}
                >
                    {/* Active Categories Table */}
                    <Tab.Screen
                        name="Active"
                        children={() => <CategoryTable status={true} />}
                    />
                    {/* Stale Categories Table */}
                    <Tab.Screen
                        name="Inactive"
                        children={() => <CategoryTable status={false} />}
                    />
                </Tab.Navigator>
                {/* Add button to be rendered at the bottom of the screen */}
                {currentUser.role.ROLE_VP && (
                    <TouchableOpacity
                        onPress={() => setClicked(true)}
                        accessibilityLabel='Add Category'>
                        <Image style={catStyle.addBtnPicture} source={AddBtn} />
                    </TouchableOpacity>
                )}
                {currentUser.role.ROLE_TRAINER && (
                    <Image style={catStyle.addBtnPicture} source={DisabledAddBtn}></Image>
                )}
            </React.Fragment>
            {/* If clicked is true, open the modal */}
            {clicked == true && (
                <Modal
                    animationType='slide'
                    // this happens when a user presses the hardware back TouchableOpacity
                    onRequestClose={() => {
                        setClicked(false);
                    }}
                    transparent
                >
                    <View testID='addCatModal' style={catStyle.modal}>
                        {/* Title for modal */}
                        <Text style={catStyle.modalTitle}>{'Add Category'}</Text>

                        {/* Allow user to enter a new category name */}
                        <TextInput
                            style={catStyle.modalTextInput}
                            onChangeText={text => onChangeText(text)}
                            value={textValue}
                            autoCapitalize='words'
                            autoFocus={true}
                            placeholder='Enter Category...'
                            placeholderTextColor='#474C55'
                        />

                        {/* Button that adds a category */}
                        <TouchableOpacity
                            testID='addBtn'
                            style={catStyle.modalActionBtn}
                            onPress={() => {
                                AddCategory(textValue);
                                setClicked(false);
                            }}
                        >
                            <Text style={catStyle.btnText}>Add Category</Text>
                        </TouchableOpacity>

                        {/* Button that closes modal */}
                        <TouchableOpacity
                            style={catStyle.closeBtn}
                            onPress={() => { setClicked(false) }}>
                            <Text style={catStyle.btnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </React.Fragment>
    )

    /**
     *  This component opens a modal when 'Add Category' TouchableOpacity is clicked
     *  @param: value is a string that is what the user inputs for a new category
     */
    function AddCategory(newCat: string) {
        // calls categoryService.addCategory then getCategory to update the page
        CategoryService.addCategory(token, newCat).then(() => {
            CategoryService.getCategories(token, true).then((results) => {
                dispatch(GetActive(results));
            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
            alert('Failed to Add Category');
        });
    }
}