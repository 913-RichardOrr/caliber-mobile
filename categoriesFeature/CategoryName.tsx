import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Pressable, 
    TouchableOpacity, 
    Modal, 
    TextInput 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import catStyle from './categoriesStyles';
import { GetActive, GetStale } from '../store/categoriesFeature/CategoryActions';
import { Category } from './Category';
import CategoryService from './CategoryService';
import { useNavigation } from '@react-navigation/native';
import { ReducerState } from '../store/store';

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
 *  @returns: view with a pressable category name
 */
function CategoryName({ skill, categoryid, active }: CategoryNameProp) {
    // create or get state
    const [clicked, setClicked] = useState(false);
    const [value, onChangeText] = useState('');
    const [rend, setRend] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigation();
    


    // authorizer state
    const currentUser = useSelector((state: ReducerState) => state.userReducer.user);
    const token = currentUser.token;
    
    let category = new Category();
    category.skill = skill;
    category.active = active;
    category.categoryid = categoryid;

    useEffect(() => {
        setRend(true);
    }, [])

    return (
        <React.Fragment>
            <View style={catStyle.catName}>
                {/* When a category name is clicked, it is moved to appropriate table */}
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
     *  @param: newSkill - value is a string that is what the user inputs for a editing a category name
     *  @param: target - category whose skill will change
     */
    function EditCategory(newSkill: string, target: Category) {
        // update skill name
        target.skill = newSkill;
        
        changeData(target);
    }

    /**
     *  This function is called when a category is pressed and changes the status of the category
     *  @param: target - the specific category whose status is changing
     */
    function changeStatus(target: Category) {
        // change category status
        if (target.active == true) {
            target.active = false;
        } else {
            target.active = true;
        }

        changeData(target);
    }

    /**
     *  This function is takes in a target category and updates app state and database
     *  @param: target - the specific category whose is is changing
     */
    function changeData(target: Category) {
        CategoryService.updateCategory(token, target).then(() => {
            CategoryService.getCategories(token, true).then((activeResults) => {
                dispatch(GetActive(activeResults));
                CategoryService.getCategories(token, false).then((staleResults) => {
                    dispatch(GetStale(staleResults));
                }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
            alert('Update Failed');
        });
    }
}

export default CategoryName;