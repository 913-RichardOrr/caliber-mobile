import React, {useState, useEffect}  from 'react';
const screenWidth = Dimensions.get("window").width;
import {View, Text, Dimensions} from 'react-native';
import {STATUS} from  '../batchWeekService';
import { ReducerState } from '../../store/store';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import {pieData } from './pieData';



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
import {convertToStatus, convertToNumber, displayIconForStatus} from './BatchWeekUtils';
import { useSelector } from 'react-redux';

 
// mocked data from table qcnotes;
// let actualItems = 


let testItems: { weeknumber: number; batchid: string; associateid: number; technicalstatus: STATUS; 
    notecontent: string}[] = [
  {"weeknumber": 1, "batchid": "batch a", "associateid": 1, "technicalstatus": "Undefined", "notecontent": "not a"},
  {"weeknumber": 1, "batchid": "batch a", "associateid": 2, "technicalstatus": "Good", "notecontent": "not a"},
  {"weeknumber": 1, "batchid": "batch a", "associateid": 3, "technicalstatus": "Average", "notecontent": "not a"},
  {"weeknumber": 1, "batchid": "batch a", "associateid": 4, "technicalstatus": "Superstar", "notecontent": "not a"},
  {"weeknumber": 2, "batchid": "batch a", "associateid": 1, "technicalstatus": "Poor", "notecontent": "not a"},
  {"weeknumber": 2, "batchid": "batch a", "associateid": 2, "technicalstatus": "Good", "notecontent": "not a"},
  {"weeknumber": 2, "batchid": "batch a", "associateid": 3, "technicalstatus": "Good", "notecontent": "not a"},
];

// actualItems are array obtained from api endpoint qc/batches/batch_a/weeks
let actualItems =  testItems;
// items needed to calculate overalltechnicalstatus for specific week
let weekSpecified = { weeknumber: 1 };

// techItems are array of technical status for the given week for the given batch. 
// will be nice technicalstatus is set to be 'Undefined' by default before QA select status
let techItems: STATUS[] = testItems
  .filter(testItem => testItem["weeknumber"] === weekSpecified.weeknumber)
  .map(item => { return item["technicalstatus"]});
// console.log(techItems);


  //histogram function to be used for  pie chart
export function calHistogram(){

//initialize histogram. 
  let histogram: {'Poor': number; 'Average': number; 'Good': number; 'Undefined': number; 'Superstar': number;} ={
    'Undefined': 0,
    'Poor': 0,
    'Average': 0,
    'Superstar': 0,
     'Good': 0
  };

  for(let item of techItems){
      histogram[item]++;
   }
  return histogram;
}

export function DisplayOverallStatus(){
  const selectedBatch = useSelector((state: ReducerState) => state.batchReducer.batch);


  const hist = calHistogram();
  const p0 = pieData(hist)[0].percentage; // number of 'Poor' 
  const a0 = pieData(hist)[1].percentage;  // number of 'Average'
  const g0 = pieData(hist)[2].percentage;  // number of 'Good'
  const s0 = pieData(hist)[3].percentage;  // number of 'Superstar'
  const o0 = (p0 + a0 + g0 + s0) ? (p0*1 + a0*2 + g0*3 + s0*4)/(p0+a0+g0+s0): 0;
  const  overallstatus = convertToStatus(o0);

 
  return <Text> To be updated with Icon:  {displayIconForStatus(overallstatus)} </Text>

}

// pie chart is hardcoded at the moment
export default function BatchWeekStatusChart () {
  const hist = calHistogram();
  const p0 = pieData(hist)[0].percentage;
  const a0 = pieData(hist)[1].percentage;
  const g0 = pieData(hist)[2].percentage;
  const s0 = pieData(hist)[3].percentage;
  const o0 = (p0 + a0 + g0 + s0) ? (p0*1 + a0*2 + g0*3 + s0*4)/(p0+a0+g0+s0): 0;
  const overallstatus = convertToStatus(o0);
  const displayOverallStatus = displayIconForStatus(overallstatus);

  return (
    <View>
    <Text>Technical Status Distribution Chart</Text>
    <PieChart
      data={pieData(hist)}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
      accessor="percentage"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />
    <Text> Poor:  {}</Text>
    <Text> Average:  {pieData(hist)[1].percentage}</Text>
    <Text> Good:  {pieData(hist)[2].percentage}</Text>
    <Text> Superstar:  {pieData(hist)[3].percentage}</Text>
    <Text> OverallStatus icon { displayOverallStatus }  </Text>

  </View>
  )
}

