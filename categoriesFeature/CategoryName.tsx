import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Pressable, 
    TouchableOpacity, 
    Modal, 
    TextInput 
} from 'react-native';
import { useDispatch } from 'react-redux';
//import ToastNotification from 'react-native-toast-notification';
import catStyle from './categoriesStyles';
import { GetActive, GetStale } from '../store/categoriesFeature/CategoryActions';
import { Category } from './Category';
import CategoryService from './CategoryService';
import { useNavigation } from '@react-navigation/native';

interface CategoryNameProp {
    skill: string;
    categoryid: number;
    active: boolean;
}

/**
 *  This component displays a category name that can be pressed to toggle the category's status
 *  @param: skill - the specific category skill we are displaying
 *  @param: categoryid - the categoryid of the specified category
 *  @param: active - the active status of the specified category
 *  @param: categories - entire category state that will also need to update with new category
 *  @returns: view with a pressable category name
 */
function CategoryName({ skill, categoryid, active }: CategoryNameProp) {
    // create or get state
    const [clicked, setClicked] = useState(false);
    const [value, onChangeText] = useState('');
    const [rend, setRend] = useState(false);
    //const [toastStatus, setToastStatus] = useState('');
    const dispatch = useDispatch();
    const nav = useNavigation();

    let category = new Category();
    category.skill = skill;
    category.active = active;
    category.categoryid = categoryid;

    useEffect(() => {
        setRend(true);
    }, [])

    return (
        <React.Fragment>
            {/* Conditional rendering for toast notifications for edit categories */}
            {/* <React.Fragment>
                {toastStatus === 'success' ? <ToastNotification
                    text='Category updated!'
                    duration={3000}
                />
                    : <></>}
                {toastStatus === 'failure' ? <ToastNotification
                    text='Failed to update category'
                    duration={3000}
                />
                    : <></>}
            </React.Fragment> */}
            <View style={catStyle.catName}>
                {/* has a list of category names (depends on props) */}
                <Pressable testID='statusBtn' onPress={() => {
                    changeStatus(category);
                    if (active == true) {
                        nav.navigate('Active');
                    } else {
                        nav.navigate('Inactive');
                    }
                }}>
                    <Text testID='categoryNameList' style={catStyle.skillText}>{category.skill}</Text>
                </Pressable>
                <View>
                    {/* Edit button to open modal for editing */}
                    <TouchableOpacity testID='modalBtn' style={catStyle.editBtn} onPress={() => setClicked(true)} accessibilityLabel='Edit Category'>
                        <Text style={catStyle.btnText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {clicked == true && (
                <View testID= 'modal'>
                    <Modal
                        animationType='slide'
                        // this happens when a user presses the hardware back button
                        onRequestClose={() => {
                            // tiny toast
                            // <ToastNotification
                            //     text='Closed without saving.'
                            //     duration={3000}
                            // />
                            setClicked(false);
                        }}
                        transparent
                    >
                        <View style={catStyle.modal}>
                            {/* Title for modal */}
                            <Text style={catStyle.modalTitle}>Edit Category</Text>

                            {/* Allow user to enter a new category name */}
                            <TextInput
                                style={catStyle.modalTextInput}
                                onChangeText={text => onChangeText(text)}
                                value={value}
                                autoCapitalize='words'
                                autoFocus={true}
                                placeholder={category.skill}
                                placeholderTextColor='#474C55'
                            />

                            <View style={{ justifyContent: 'space-between' }}>
                                {/* Button that edits a category */}
                                <TouchableOpacity
                                    testID='editBtn'
                                    style={catStyle.modalActionBtn}
                                    onPress={() => {
                                        EditCategory(value.toString(), category);
                                        if (active == true) {
                                            nav.navigate('Active');
                                        } else {
                                            nav.navigate('Inactive');
                                        }
                                        setClicked(false);
                                    }}
                                >
                                    <Text style={catStyle.btnText}>Edit</Text>
                                </TouchableOpacity>

                                {/* Button that closes modal */}
                                <TouchableOpacity
                                    style={catStyle.closeBtn}
                                    onPress={() => {
                                        setClicked(false);
                                    }}>
                                    <Text style={catStyle.btnText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </React.Fragment >
    )

    /**
     *  This component opens a modal when 'Edit' TouchableOpacity is clicked
     *  @param: value is a string that is what the user inputs for a editing a category name
     */
    function EditCategory(value: string, category: Category) {
        // update skill name
        category.skill = value;

        // calls categoryService.updateCategory with the category id
        CategoryService.updateCategory(category).then(() => {
            CategoryService.getCategories(true).then((results) => {
                dispatch(GetActive(results));
                CategoryService.getCategories(false).then((results) => {
                    dispatch(GetStale(results));
                })
            })
        });
    }

    /**
     *  This function is called when a category is pressed and changes the status of the category
     *  @param: category - the specific category whose status is changing
     *  @param: categories - entire category state that will also need to update with new category
     */
    function changeStatus(category: Category) {

        // find category in categories array and replace with new category
        //categories.splice(categories.indexOf(category), 1);
        // change category status
        if (category.active == true) {
            category.active = false;
        } else {
            category.active = true;
        }

        // calls categoryService.updateCategory with the category id
        CategoryService.updateCategory(category).then(() => {
            CategoryService.getCategories(true).then((results) => {
                dispatch(GetActive(results));
                CategoryService.getCategories(false).then((results) => {
                    dispatch(GetStale(results));
                })
            })
        });
    }
}

export default CategoryName;