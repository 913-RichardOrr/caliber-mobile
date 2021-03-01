import { RouteProp } from '@react-navigation/native';
import ToastNotification from 'react-native-toast-notification';
import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CategoryTable } from './CategoryTable';
import categoryService from './CategoryService';
import { getCategories } from '../store/categoriesFeature/CategoryActions';
import { StackParam } from './router/Router';
import { CategoryState } from '../store/store';
import { Category } from './Category';

interface Props {
    route: RouteProp<StackParam, 'ManageCategories'>;
}

/**
 *  This component encloses the entire Manage Categories feature
 *  @returns: view that has tabs of active/stale categories 
 *  and a button that adds a category
 */
export default function ManageCategories() {
    const Tab = createMaterialTopTabNavigator();
    // set local state for currently viewed tab
    const [status, setStatus] = useState(true);
    const [clicked, setClicked] = useState({action: '', isClicked: false});

    // useEffect(() => {

    // }, [clicked]);

    return (
        <View>
            {/* Tabs that navigate between active and stale categories */}
            <View>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Active"
                        children={() => <CategoryTable status={true} />}
                    />
                    <Tab.Screen
                        name="Inactive"
                        children={() => <CategoryTable status={false}/>}
                    />
                </Tab.Navigator>
            </View>
            
            {/* Button for adding a new category */}
            <View>
                <Button title="Add Category" onPress={()=> setClicked({action:'add', isClicked: true})} accessibilityLabel='Add Category' />
            </View>
            {clicked.isClicked === true && (<OpenModal action={'Add Category'}/>)}
        </View>
    )
}

/**
 *  This component opens a modal when 'Add Category' or 'Edit Category' button is clicked
 *  @param: modalAction prop that states the action being taken
 *  @param: category prop that takes in an optional category - utilized for the editCategory function
 *  @returns: view that has a modal where user can add or edit a category
 */

interface modalProps {
    action: string,
    category?: Category
}
export function OpenModal({action}: modalProps, {category}: modalProps) {
    // create local state
    const [value, onChangeText] = React.useState('');
    const [modalVisible, setModalVisible] = useState(true);
    // get category state from store
    const categorySelector = (state: CategoryState) => state.categories;
    const categories = useSelector(categorySelector);
    const dispatch = useDispatch();
    
    // gets called from the modal to add the category
    function AddCategory(value: string) {

    // calls categoryService.addCategory
    categoryService.addCategory(value).then((result) => {
        // add new category to current categories
        categories.push(result);

        // dispatch new categories
        dispatch(getCategories(categories));

        // tiny toast for success
        return (
            <ToastNotification 
                text='Category added!'
                duration={3000}
            />
        )
    
        }).catch(error => {
            // tiny toast for failure
            return (
                <ToastNotification 
                    text='Failed to add category'
                    duration={3000}
                />
            )
        });
    }

    function EditCategory(value: string, category: Category){
    // update skill name
    category.skill = value;

    // calls categoryService.addCategory
    categoryService.updateCategory(category).then((result) => {
        // add new category to current categories
        categories.push(result);

        // dispatch new categories
        dispatch(getCategories(categories));

        // tiny toast for success
        return (
            <ToastNotification 
                text='Category added!'
                duration={3000}
            />
        )
    
        }).catch(error => {
            // tiny toast for failure
            return (
                <ToastNotification 
                    text='Failed to add category'
                    duration={3000}
                />
            )
        });
    }

    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                // this happens when a user presses the hardware back button
                onRequestClose={() => {
                    // tiny toast
                    <ToastNotification
                        text='Closed without saving.'
                        duration={3000}
                    />
                    setModalVisible(!modalVisible);
                }}
            >
                <View>
                    {/* Title for modal */}
                    <Text>{action}</Text>

                    {/* Allow user to enter a new category name */}
                    <TextInput
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        autoCapitalize='words'
                        autoFocus={true}
                    />
                    
                    {/* Button that adds a category */}
                    {category ? (
                        <Button title={action} onPress={(value) => EditCategory(value.toString(), category)}></Button>
                        )
                    : (
                        <Button title={action} onPress={(value) => AddCategory(value.toString())}></Button>
                    )}
                    
                    {/* Button that closes modal */}
                    <Button title='Close' onPress={() => {setModalVisible(!modalVisible)}}></Button>
                </View>
            </Modal>
        </View>
    )
}