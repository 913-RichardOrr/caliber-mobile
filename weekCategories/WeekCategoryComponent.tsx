import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



export default function CategoryButton(props: any) {
  var [categoryContext, setCategoryContext] = useState(props.data.skill);
  return (
    <View style={[styles.screenContainer]}>
      <Text style={styles.myFontColor}>{categoryContext + "  "}
        <TouchableOpacity onPress={() => {
          alert("Place holder for dispatching {action:'delete',payload:'" + props.data.categoryid + "'}");
          setCategoryContext('deleted')
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
    margin:1,
    alignItems:'center',
    justifyContent:'center',
    height:30
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

