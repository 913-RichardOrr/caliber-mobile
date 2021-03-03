import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import WeekCategoryComponent from './WeekCategoryComponent';
import { Category } from '../categoriesFeature/Category';
import QcWeek from '../batchWeek/QcWeek';
import style from '../global_styles';


interface WeekProp {
  week: QcWeek,
  weekCategoriesAsCategory: Category[],
  addCategory:Function,
  activeCategories:Category[],
  token:string

}
/**
 * Display a list of current categories for the week and a button to add categories to the week
 * 
 * @param {weekProp} qcWeek - The weekId of the current week
 */
export function WeekCategoryList(props: WeekProp) {
  console.log('in component '+ props)
  return (
    <View style={styles.allContainer}>
      <Text style = {styles.heading}>Categories: </Text>

      <View style={styles.container}>
        {props.weekCategoriesAsCategory.length == 0 && (
          <Text  testID='noCats'>No Categories For This Week</Text>

        )}
        <FlatList
          testID='listOfWeekCats'
          data={props.weekCategoriesAsCategory}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (<WeekCategoryComponent weekID={props.week.qcweekid} skill={item.skill} catID = {item.categoryid} batchId={props.week.batchid} token ={props.token}></WeekCategoryComponent>)} />
      </View>

      <View style={styles.menuContainer}>

        <MenuProvider  style={styles.menu}>

          <Menu onSelect={value => { props.addCategory(value, props.week); } }>

            <MenuTrigger text='+' customStyles={triggerStyles}/>

            <MenuOptions>
              {props.activeCategories.length != 0 ? (
                <FlatList
                testID= 'listOfActiveCats'
                data={props.activeCategories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <MenuOption  value={Number(item.categoryid)} text={String(item.skill)} />
                )}
                style={{ height: 100 }} />
              ):  <MenuOption style={{flexWrap:'wrap', flex:1}} value = {-1} text={'No Categories Available'} />}
              
              
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </View>
    </View>

  );
}




const styles = StyleSheet.create({
  allContainer:{
    width:'100%',
    flexDirection: 'row',
    margin:10

  },
  container: {
    flexDirection: 'row',
    maxWidth:'50%',
    height:'30%',
    textAlignVertical:'center',
    
  },
  menu: {
    flexDirection: 'row',
    height:100,
    marginLeft:10,
  },
  menuContainer:{
    width:'27%',
    height:100,
    alignContent:'flex-start',
    
    
  },
  heading:{
    color: '#474C55',
    fontSize: 20,
    fontWeight: 'bold',
  },
 

})
const triggerStyles = {
  triggerText: {
    fontSize:15
  },

};
