import React from 'react';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import {View, Text} from 'react-native';
import {
  PieChart
} from "react-native-chart-kit";


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
import {convertToStatus, convertToNumber} from './ReportService';

 

  //initialize hist (frequncey chart) ;
 let pieData = [
    {
      name: 'Poor',
      percentage: 3,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Average',
      percentage: 5,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Good',
      percentage: 5,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Superstar',
      percentage: 2,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  

  let hist: any ={
    GOOD: 0,
    AVERAGE: 0,
    POOR: 0,
    SUPERSTAR: 0,
    undefined: 0
  };
 // set initial qcStatus
  let qcStatus: string = 'Undefined';
  let totalsc =0;
  let totalcnt=0;
  let overallsc =0;

  // arr is an array of technical status;
  // convert props to array of status


  //calculate overall status plus frequncy chart for technical status to be used as a pie chart
export function calOverallQcStatus(){
 
  let arr: string[] = ['Good', 'Good', 'Average', 'Average', 'Average', 'Poor', 'Undefined' ];
  for(let item of arr){
    if(item === 'Undefined'){
      hist['Undefined']++;
    }
    else {
      hist[item]++;
      totalcnt++;
      totalsc += convertToNumber(item);
    }
  }

  if(totalcnt>=1){
    overallsc = totalsc/totalcnt;
  }

  qcStatus = convertToStatus(overallsc);

  return qcStatus;
}


// pie chart is hardcoded at the moment
export default function BatchWeekStatusChart () {
  return (
    <View>
    <Text>Technical Status Distribution Chart</Text>
    <PieChart
      data={pieData}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
      accessor="percentage"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />
  </View>
  )
}

