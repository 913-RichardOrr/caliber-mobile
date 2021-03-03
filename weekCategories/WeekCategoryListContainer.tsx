import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Category } from '../categoriesFeature/Category';
import {
  addWeekCategory,
  categoriesMenuOptions,
  getWeekCategories,
} from '../store/actions';
import { WeekCategory } from './WeekCategory';
import { WeekCategoryList } from '../weekCategories/weekCategoryList';
import weekCategoryService from '../weekCategories/WeekCategoryService';
import { ReducerState } from '../store/store';
import categoryService from '../categoriesFeature/CategoryService';
import QcWeek from '../batchWeek/QcWeek';
import style from '../global_styles';

/**
 * Get all information that weekCategoryList will display then call weekCategoryList
 *
 *
 */
export default function WeekCategoryListContainer() {
  const weekCatSelector = (state: ReducerState) =>
    state.WeekCategoryReducer.weekCategories;
  const weekCategories = useSelector(weekCatSelector);
  const weekIDSelector = (state: ReducerState) => state.weekReducer.selectedWeek;
  const week = useSelector(weekIDSelector);
  // authorizer state
  const currentUser = useSelector((state: ReducerState) => state.userReducer.user);
  const token = currentUser.token;
  const dispatch = useDispatch();
  console.log('batchid: ' + week.batchid)
  console.log('weekid: ' + week.qcweekid)

  /**
   * Create a list of categories that are already in this week
   *
   * @return an array of type Category[]
   */
  function createCatList(week: QcWeek) {
    console.log('in createCatList')
    weekCategoryService.getCategory(week.weeknumber, week.batchid, token).then((results) => {
      console.log('test: ' + results)
      if (results.length == 0) {
        return [];
      } else {
        categoryService.getCategories(token).then((allCats: Category[]) => {
          let thisWeekCats: Category[] = []
          allCats.forEach((allCatElement) => {
            results.forEach((catid) => {
              if (allCatElement.categoryid == catid.categoryId) {
                thisWeekCats.push(allCatElement);
              }
            });

          });
          
          dispatch(getWeekCategories(thisWeekCats));
          console.log('at end of create cat list')
          return thisWeekCats;
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
    return [];
  }

  /**
   * Create a list of categories that are active and not already in the week
   *
   * @return an array of type Category[]
   */
  function createActiveList(weekCat: Category[]) {
    categoryService.getCategories(token, true).then((results) => {
      let availableCats: Category[] = [];
      console.log('in create active list ' + results.length)
      if (results != availableCats) {
        results.forEach((element: Category) => {
          if (weekCat.includes(element) == false) {
            availableCats.push(element);
          }
        });
      }
      console.log('end of createActive: ' + availableCats.length)
      dispatch(categoriesMenuOptions(availableCats));
      return availableCats;
    });
    return [];
  }

  /**
   * Add a category to the database and update the store
   *
   * @param {Category} newCat - The category to be added to the week
   * qcWeek is what was passed to weekCategoryList function
   */
  function addCategory(newCat: Category, week: QcWeek) {
    if (newCat.categoryid != -1) {
      let weekCat: WeekCategory = { categoryId: newCat.categoryid, qcWeekId: week.qcweekid };
      weekCategoryService.addCategory(weekCat, week.batchid, week.qcweekid, token).then(() => {
        dispatch(addWeekCategory(weekCat));
      });
    }
  }

  let weekCategoriesAsCategory: Category[] = createCatList(week);
  let activeCategoriesList: Category[] = createActiveList(weekCategoriesAsCategory);

  return (
    <View>
      <WeekCategoryList week={week} weekCategoriesAsCategory={weekCategoriesAsCategory} addCategory={addCategory} activeCategories={activeCategoriesList} token={token} />
    </View>
  );
}
