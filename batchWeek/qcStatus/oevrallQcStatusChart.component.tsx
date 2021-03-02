import React from 'react';
const screenWidth = Dimensions.get("window").width;
import {View, Text, Dimensions} from 'react-native';
import {STATUS} from '../batchWeekService';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
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
import {convertToStatus, convertToNumber, displayIconForStatus} from './BatchWeekUtils';

 
// mocked data from table qcnotes;
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

  //initialize hist (frequncey chart)  and pick the right color for each technical status//;
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
  

  let hist: {'Poor': number; 'Average': number; 'Good': number; 'Undefined': number; 'Superstar': number;} ={
    'Undefined': 0,
    'Poor': 0,
    'Average': 0,
    'Superstar': 0,
     'Good': 0
  };
 // set initial qcStatus
  let qcStatus: STATUS = 'Undefined';
  let totalsc =0;
  let totalcnt=0;
  let overallsc =0;

  // arr is an array of technical status;
  // convert props to array of status


  //calculate overall status plus frequncy chart for technical status to be used as a pie chart
export function calOverallQcStatus(){
 
  // let arr: string[] = ['Good', 'Good', 'Average', 'Average', 'Average', 'Poor', 'Undefined' ];
  // for(let item of techItems){
  //   if(item === 'Undefined'){
  //     hist['Undefined']++;
  //   }
  //   else {
  //     hist[item]++;
  //     totalcnt++;
  //     totalsc += convertToNumber(item);
  //   }
  // }

  // update pieData for the chart
  for(let item of techItems){
   switch(item){
    case 'Undefined':
      hist['Undefined']++; break;
    case 'Poor':
      hist['Poor']++; pieData[0].percentage= hist['Poor'];
      totalcnt++; totalsc += convertToNumber(item); break;
    case 'Average':
      hist['Average']++; pieData[1].percentage = hist['Average'];
      totalcnt++; totalsc += convertToNumber(item); break;
    case 'Good':
      hist['Good']++; pieData[2].percentage = hist['Good'];
      totalcnt++; totalsc += convertToNumber(item); break;
    case 'Superstar':
      hist['Superstar']++; pieData[3].percentage = hist['Superstar'];
      totalcnt++; totalsc += convertToNumber(item); break;
    default:
      break;

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

