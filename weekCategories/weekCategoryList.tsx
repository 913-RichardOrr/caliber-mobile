import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { WeekCategory } from './weekCategory';
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import WeekCategoryService from './WeekCategoryService';
import { useDispatch, useSelector } from 'react-redux';
import WeekCategoryComponent from './WeekCategoryComponent';
import { addWeekCategory, getWeekCategories } from '../store/actions';
import categoryService from '../categoriesFeature/CategoryService';
import { ReducerState } from '../store/store';
import { Category } from '../categoriesFeature/Category';
import { getCategories } from '../store/categoriesFeature/CategoryActions';

//need to import category class/interface from ./categories

interface weekProp {
  weekId: number;
}

/**
 * Display a list of current categories for the week and a button to add categories to the week
 *
 * @param {weekProp} qcWeek - The weekId of the current week
 */

export default function weekCategoryList(qcWeek: weekProp) {
  const weekCatSelector = (state: ReducerState) =>
    state.WeekCategoryReducer.weekCategories;
  const weekCategories = useSelector(weekCatSelector);
  //categories is from another team so this will be error until the store is done
  const activeCatSelector = (state: ReducerState) =>
    state.categoryReducer.categories;
  const activeCategories = useSelector(activeCatSelector);
  const dispatch = useDispatch();

  //get list of all catgories from this week from db
  let weekCategoriesAsCategory: Category[] = [];
  WeekCategoryService.getCategory(qcWeek.weekId)
    .then((results) => {
      categoryService
        .getCategories()
        .then((allCats: Category[]) => {
          let thisWeekCats: Category[] = [];
          allCats.forEach((allCatElement) => {
            results.forEach((catid) => {
              if (allCatElement.categoryid == catid.categoryId) {
                thisWeekCats.push(allCatElement as Category);
              }
            });
            weekCategoriesAsCategory = thisWeekCats;
            dispatch(getWeekCategories(thisWeekCats));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  //create a list of active categories that are not in weekCategories
  categoryService
    .getCategories('true')
    .then((results: Category[]) => {
      let availableCats: Category[] = [];
      results.forEach((element) => {
        if (weekCategories.includes(element) == false) {
          availableCats.push(element);
        }
      });
      //from other team
      dispatch(getCategories(availableCats));
    })
    .catch((err) => {
      console.log(err);
    });

  /**
   * Add a category to the database and update the store
   *
   * @param {Category} newCat - The category to be added to the week
   * qcWeek is what was passed to weekCategoryList function
   */
  function addCategory(newCat: Category) {
    let weekCat: WeekCategory = new WeekCategory();
    weekCat.categoryId = newCat.categoryid;
    weekCat.qcWeekId = Number(qcWeek);
    WeekCategoryService.addCategory(weekCat).then(() => {
      weekCategories.push(newCat);
      dispatch(addWeekCategory(weekCat));
    });
  }

  return (
    <View style={styles.allContainer}>
      <Text>Categories: </Text>
      {/* This is the categories we already have */}
      <View style={styles.container}>
        <FlatList
          data={weekCategories}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <WeekCategoryComponent data={item}></WeekCategoryComponent>
          )}
        />
      </View>
      {/* This is our button that creates a pop-up menu of categories we can add */}
      <View style={styles.menuContainer}>
        <MenuProvider style={styles.menu}>
          {/* what happens when an item in menu is clicked (on top of the menu closing) */}
          <Menu
            onSelect={(value) => {
              addCategory(value);
            }}>
            {/* what must be clicked for menu to appear */}
            <MenuTrigger text='+' />
            {/* items in the menu */}
            <MenuOptions>
              <FlatList
                data={activeCategories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <MenuOption
                    value={Number(item.categoryid)}
                    text={String(item.skill)}
                  />
                )}
                style={{ height: 100 }}
              />
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  allContainer: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    width: '50%',
    height: '40%',
  },
  menu: {
    flexDirection: 'row',

    height: 100,
    marginLeft: 10,
  },
  menuContainer: {
    width: '30%',
    height: 100,
  },
});
