import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
  const [areActive, setActive] = useState(false);
  const [activeList, setActiveList] = useState<Category[]>([]);
  const [areCurrent, setCurrent] = useState(false);
  const [currentList, setCurrentList] = useState<Category[]>([]);
  const [reset, setReset] = useState(false);
  const weekCatSelector = (state: ReducerState) =>
    state.WeekCategoryReducer.weekCategories;
  const weekCategories = useSelector(weekCatSelector);
  const weekIDSelector = (state: ReducerState) => state.weekReducer.selectedWeek;
  const week = useSelector(weekIDSelector);
  // authorizer state
  const currentUser = useSelector((state: ReducerState) => state.userReducer.user);
  const token = currentUser.token;

  let weekCategoriesAsCategory: Category[] = [];
  let activeCategoriesList: Category[] = [];

  useEffect(() => {

    async function createLists() {
      await createCatList(week).then(async (weekCategoriesAsCategory) => {
        console.log('in use effec in stuff: ' + weekCategoriesAsCategory.length)
        activeCategoriesList = await createActiveList(weekCategoriesAsCategory);
        console.log('in use effect weekCatasCat: ' + weekCategoriesAsCategory.length)
        console.log('in use effect active: ' + activeCategoriesList.length)
        setCurrentList(weekCategoriesAsCategory);
        setActiveList(activeCategoriesList);
        setReset(false);
      });

    }

    createLists();

  }, [reset === true])

  /**
   * Create a list of categories that are already in this week
   *
   * @return an array of type Category[]
   */
  async function createCatList(week: QcWeek) {
    let thisWeekCats: Category[] = [];
    await weekCategoryService.getCategory(week.weeknumber, week.batchid, token).then((results) => {
      console.log('beginning createCatList ' + results.length)
      if (results.length == 0) {
        setCurrent(true);
        return [];
      } else {
        categoryService.getCategories(token).then((allCats: Category[]) => {
          console.log(allCats)
          allCats.forEach((allCatElement) => {
            results.forEach((catid) => {
              if (allCatElement.categoryid == catid.categoryid) {
                console.log('matched')
                thisWeekCats.push(allCatElement);
              }
            });
          });
          //dispatch(getWeekCategories(thisWeekCats));
          console.log('at end of create cat list ' + thisWeekCats.length)
          setCurrent(true);
          return thisWeekCats;
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));

    console.log('fdaklsdfj;lask')
    return thisWeekCats;
  }

  /**
   * Create a list of categories that are active and not already in the week
   *
   * @return an array of type Category[]
   */
  async function createActiveList(weekCat: Category[]) {
    let availableCats: Category[] = [];

    await categoryService.getCategories(token, true).then((results) => {
      let currentCats: number[] = [];
      console.log('in await ' + weekCat.length)
      weekCat.forEach((catId) => {
        console.log('in forEach ' + catId.categoryid)
        currentCats.push(catId.categoryid)
      })

      console.log('in create active list ' + results.length)
      if (results != availableCats) {

        console.log('begin createActive: ' + availableCats.length)
        results.forEach((element: Category) => {
          console.log(currentCats)
          console.log(element)

          if (currentCats.includes(element.categoryid) == false) {
            availableCats.push(element);
          }
        });
      }
      console.log('end of createActive: ' + availableCats.length)
      //dispatch(categoriesMenuOptions(availableCats));
      setActiveList(activeCategoriesList);
      setActive(true);
      return availableCats;
    });
    return availableCats;
  }

  /**
   * Add a category to the database and update the store
   *
   * @param {Category} newCat - The category to be added to the week
   * qcWeek is what was passed to weekCategoryList function
   */
  function addCategory(newCat: Category, week: QcWeek) {
    console.log(newCat)
    if (newCat.categoryid != -1) {
      let weekCat: WeekCategory = { categoryId: newCat.categoryid, qcWeekId: week.qcweekid };
      weekCategoryService.addCategory(weekCat, week.batchid, week.weeknumber, token).then(() => {
        setReset(true)

      });
    }
  }

  /**
  * Delete a  category from the database and update the store
  *
  * @param {Category} newCat - The category to be deleted
  * qcWeek is what was passed to weekCategoryList function
  */
  function deleteCategory(weekId:number, batchId: string, catId:number, token:string) {
    
    weekCategoryService.deleteCategory(weekId,batchId,catId,token).then(() => {
      setReset(true);
    })

  }





  if ((areActive && areCurrent)) {
    return (
      <View>
        <WeekCategoryList  deleteCategory = {deleteCategory} week={week} weekCategoriesAsCategory={currentList} addCategory={addCategory} activeCategories={activeList} token={token} />
      </View>
    );

  }
  return (
    <View>
      <Text> Loading ... </Text>
    </View>
  )


}
