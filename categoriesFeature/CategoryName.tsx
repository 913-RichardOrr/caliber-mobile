import React, { useState } from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Stylesheet from 'react-native';
import { getCategories } from '../store/categoriesFeature/CategoryActions';
import { Category } from './Category';
import categoryService from './CategoryService';
import {OpenModal} from './ManageCategories';

interface CategoryNameProp {
    skill: string;
    categoryid: number;
    active: boolean;
    categories: Category[];
}

/**
 *  This component displays a category name that can be pressed to toggle the category's status
 *  @param: category - the specific category we are displaying
 *  @param: categories - entire category state that will also need to update with new category
 *  @returns: view with a pressable category name
 */
export function CategoryName({ skill, categoryid, active, categories }: CategoryNameProp) {
    const [clicked, setClicked] = useState({action: '', isClicked: false});
    const category = new Category();
    category.skill = skill;
    category.categoryid = categoryid;
    category.active = active;

    return (
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* has a list of category names (depends on props) */}
            <Pressable onPress={()=> {changeStatus(category, categories)}}>
                <Text>{category.skill}</Text>
            </Pressable>
            <View>
                <Button title="Edit Category" onPress={()=> setClicked({action:'edit', isClicked: true})} accessibilityLabel='Edit Category' />
            </View>
            {clicked.isClicked == true && (<OpenModal action={'Edit Category'} category={category}/>)}
        </View>
    )
}

/**
 *  This function is called when a category is pressed and changes the status of the category
 *  @param: category - the specific category whose status is changing
 *  @param: categories - entire category state that will also need to update with new category
 */
export function changeStatus(category: Category, categories: Category[]) {
    const dispatch = useDispatch();
    
    // change category status
    if (category.active) {
        category.active = false;
    } else {
        category.active = true;
    }

    // find category in categories array and replace with new category
    categories.splice(categories.indexOf(category), 1, category);

    // calls categoryService.updateCategory with the category id
    categoryService.updateCategory(category).then(() => {
        dispatch(getCategories(categories));
    }); 
}