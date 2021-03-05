import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { WeekCategory } from './weekCategory';


interface CatProp {
  weekID: number,
  skill: string,
  catID: number, 
  batchId: string,
  token:string,
  deleteCategory:Function
}

/**
 * Display the name of a category and a button that deletes category from list when clicked
 * 
 * @param {props} any - The category to be displayed
 */
export default function CategoryButton(props: CatProp) {
  const dispatch = useDispatch();
  const weekCat: WeekCategory = { qcWeekId: props.weekID, categoryId: props.catID }
  return (
    <View style={[styles.screenContainer]}>
      <Text style={styles.myFontColor}>{props.skill + "  "}
        <TouchableOpacity testID='button' onPress={() => {
          props.deleteCategory(props.weekID, props.batchId, props.catID, props.token)
        }}>
          <Text style={styles.innerContainer}> x </Text></TouchableOpacity></Text>
    </View>
  );
}

var styles = StyleSheet.create({

screenContainer: {
    backgroundColor: 'grey',
    opacity: .5,
    borderRadius: 8,
    paddingLeft: 5,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30
  },
  innerContainer: {
    backgroundColor: 'lightgrey',
    opacity: 1,
    paddingBottom: 1,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'center',
    },
containerwidth: {
    width: '100%',
    },
myFontColor: {
    color: 'blue',
  }

});