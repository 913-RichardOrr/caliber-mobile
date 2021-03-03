import React from 'react'; 
import {View, Text} from 'react-native'; 



function CategoryAdd() {
     function myPress(){
        console.log("whatever");
        }
    return (
        <View><Text nativeID="sal" onPress={myPress} >Salman Saeed</Text></View>
        );
  }
  
  export default CategoryAdd;