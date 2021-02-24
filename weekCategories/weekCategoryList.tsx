import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { weekCategory } from '../weekCategories/weekCategory';
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import WeekCategoryService from '../weekCategories/WeekCategoryService';
import { useDispatch, useSelector } from 'react-redux';
import WeekCategoryComponent from '../weekCategories/WeekCategoryComponent';
import { addWeekCategory, getWeekCategories } from '../store/actions';
import categoryService from '../categoriesFeature/CategoryService';
import store, { CaliberState, CategoryState, RootState, WeekCategoryState } from '../store/store';
import { Category } from '../categoriesFeature/Category';






interface weekProp {
  weekId: number
}

export default function weekCategoryList(qcWeek: weekProp) {
  console.log()
  const weekCatSelector = (state: RootState) => state.WeekCategoryReducer.weekCategories;
  const weekCategories = useSelector(weekCatSelector);
  //categories is from another team so this will be error until the store is done
  const activeCatSelector = (state:RootState) => state.categoryReducer.categories;
  const activeCategories = useSelector(activeCatSelector);
  console.log(weekCategories);
  console.log(activeCategories);
  
  const dispatch = useDispatch();


  //get list of all catgories from this week from db
  let weekCategoriesAsCategory: Category[] = [{ categoryid: 3, skill: 'JS', active: true },{ categoryid: 4, skill: 'Redux', active: true }]
  /* WeekCategoryService.getCategory(qcWeek.weekId).then((results) => {
    categoryService.getCategories().then((allCats:Category[]) => {
      let thisWeekCats: Category[] = []
      allCats.forEach((allCatElement) => {
        
        results.forEach((catid) => {
          if (allCatElement.categoryid == catid.categoryId) {
            thisWeekCats.push(allCatElement as Category);
          };
        });
        weekCategoriesAsCategory = thisWeekCats;
        dispatch(getWeekCategories(thisWeekCats));
      });
    });
  }) */

  //create a list of active categories that are not in weekCategories
/*   categoryService.getCategories('true').then((results: Category[]) => {
    let availableCats: Category[] = []
    results.forEach(element => {
      if (weekCategoriesAsCategory.includes(element) == false) {
        availableCats.push(element);
      };
    });
    //from other team
    dispatch(getCategories(availableCats)); 
  }); */

  function addCategory(newCat: Category) {
    let weekCat: weekCategory = new weekCategory;
    weekCat.categoryId = newCat.categoryid;
    weekCat.qcWeekId = Number(qcWeek);
    WeekCategoryService.addCategory(weekCat).then(() => {
      weekCategories.push(newCat);
      dispatch(addWeekCategory(weekCat))
    });
  };

  
  //This is our pop-up menu



  return (
    <View style={styles.allContainer}>
      <Text>Categories: </Text>
      {/* This is the categories we already have */}
      <View style ={styles.container}>
      <FlatList
        data={weekCategories}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => (<WeekCategoryComponent data={item}></WeekCategoryComponent>)}
      />
      </View>
      {/* This is our button that creates a pop-up menu of categories we can add */}
      <View style={styles.menuContainer}>
        
      <MenuProvider style={styles.menu}>
          {/* what happens when an item in menu is clicked (on top of the menu closing) */}
          <Menu onSelect={value => { addCategory(value) }}>
            {/* what must be clicked for menu to appear */}
            <MenuTrigger text='+' />
            {/* items in the menu */}
            <MenuOptions>
              <FlatList
                data={activeCategories}
                keyExtractor={(item, index) => index.toString()} 
                renderItem={({ item }) => (
                  <MenuOption value={Number(item.categoryid)} text={String(item.skill)} />
                )}
                style={{ height:100}}
              />
            </MenuOptions>
          </Menu>
        </MenuProvider>
        </View>
    </View>

  )

}





const styles = StyleSheet.create({
  allContainer:{
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    width:'50%',
    height:'40%'
  },
  menu: {
    flexDirection: 'row',
   
    height:100,
    marginLeft:10,

  },
  menuContainer:{
    width:'30%',
    height:100
  }

})