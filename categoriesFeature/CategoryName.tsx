import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ToastNotification from 'react-native-toast-notification';
import catStyle from './categoriesStyles';
import { getCategories } from '../store/categoriesFeature/CategoryActions';
import { Category } from './Category';
import categoryService from './CategoryService';

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
export function CategoryName({
  skill,
  categoryid,
  active,
  categories,
}: CategoryNameProp) {
  const [clicked, setClicked] = useState(false);
  const [value, onChangeText] = React.useState('');
  const category = new Category();
  category.skill = skill;
  category.categoryid = categoryid;
  category.active = active;
  const dispatch = useDispatch();
  // get category state from store

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {/* has a list of category names (depends on props) */}
      <Pressable
        onPress={() => {
          changeStatus(category, categories);
        }}>
        <Text style={catStyle.text}>{category.skill}</Text>
      </Pressable>
      <View>
        <TouchableOpacity
          style={catStyle.editBtn}
          onPress={() => setClicked(true)}
          accessibilityLabel='Edit Category'>
          <Text style={catStyle.btnText}>Edit</Text>
        </TouchableOpacity>
      </View>
      {clicked == true && (
        <Modal
          animationType='slide'
          // this happens when a user presses the hardware back TouchableOpacity
          onRequestClose={() => {
            // tiny toast
            <ToastNotification text='Closed without saving.' duration={3000} />;
            setClicked(false);
          }}
          transparent>
          <View style={catStyle.modal}>
            {/* Title for modal */}
            <Text style={catStyle.title}>Edit Category</Text>

            {/* Allow user to enter a new category name */}
            <TextInput
              style={catStyle.modalTextInput}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              autoCapitalize='words'
              autoFocus={true}
              placeholder={skill}
              placeholderTextColor='#474C55'
            />
            <View style={{ justifyContent: 'space-between' }}>
              {/* Button that edits a category */}
              <TouchableOpacity
                style={catStyle.modalActionBtn}
                onPress={(value) => {
                  EditCategory(value.toString(), category);
                  setClicked(false);
                }}>
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
      )}
    </View>
  );

  /**
   *  This component opens a modal when 'Edit' TouchableOpacity is clicked
   *  @param: value is a string that is what the user inputs for a editing a category name
   */
  function EditCategory(value: string, category: Category) {
    // update skill name
    category.skill = value;

    // calls categoryService.addCategory
    categoryService
      .updateCategory(category)
      .then((result) => {
        // add new category to current categories
        categories.push(result);

        // dispatch new categories
        dispatch(getCategories(categories));

        // tiny toast for success
        toastCall('success');
      })
      .catch((error) => {
        // tiny toast for failure
        toastCall('failure');
      });
  }
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

/**
 *  This component makes a toast
 *  @param: result is either a success or failure string. Depending on string, appropriate toast shows up.
 */
function toastCall(result: string) {
  if (result == 'success') {
    return <ToastNotification text='Category updated!' duration={3000} />;
  } else {
    return (
      <React.Fragment>
        <ToastNotification text='Failed to update category' duration={3000} />
      </React.Fragment>
    );
  }
}
