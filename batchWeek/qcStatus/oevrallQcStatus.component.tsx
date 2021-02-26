import React from 'react';
import { View, Button, Text } from 'react-native';
import { STATUS} from '../batchWeekService'
// import { QcNote } from '../batchWeekService';
// import calQcStatus from '../calQcStatus';


//from postgres type:  type STATUS as enum ('Undefined', 'Poor', 'Average', 'Good', 'Superstar');
 // convert props to array of status
 let arr: STATUS[]  = ['Good', 'Good', 'Average', 'Average', 'Average', 'Poor', 'Undefined' ];
 let items =['Good', 'POOR', 'AVERAGE', 'SUPERSTAR', 'undefined']; 
 let emojis = [ "emoji-1" , "emoji-2" , "emoji-3","emoji-4", "emoji-5"]  // or icons

  //initialize hist and convert to histogram ;
  let hist: any ={
    GOOD: 0,
    AVERAGE: 0,
    POOR: 0,
    SUPERSTAR: 0,
    undefined: 0
  };
 // set initial qcStatus
  let qcStatus = 'undefined';

function calOverallStatus(){
 
  for(let item of arr){
      hist[item] = hist[item]+ 1;
  }

  // calculate average (mode at this point) but can use different average (like arithmetic avg) 
  // qcStatus(?) is a plain text now but should display icon

  for(let item of arr){
    if(hist[item] > hist[qcStatus]){
      qcStatus = item;
    }
  }

  
  // console.log(hist);
  // console.log(hist['GOOD'])


  return qcStatus;
}


function OverallQcStatusComponent(){

    return (
        <View>
           <Text> {calOverallStatus()}</Text>
        </View>
    )
}

export default OverallQcStatusComponent;