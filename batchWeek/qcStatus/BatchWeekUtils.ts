import {STATUS} from '../batchWeekService';
import React from 'react';

// convert technicalstatus to integer 0,1,2,3,4 default case should not happen
export function convertToNumber(str: STATUS): number {
    switch(str){
      case 'Undefined':
        return 0;
      case 'Poor':
        return 1; 
      case 'Average':
        return 2; 
      case 'Good':
        return 3;
      case 'Superstar':
        return 4;
      default:   
        return 0;
    }
  }


// convert number to technicalstatus or overalltechnicalstatus  default case happens when num is a text not a number
export function convertToStatus(num: number): STATUS {
    // make sure to num is not a text but a number Number(num);
  
    switch(true){
      case (num < 0.5 ):
        return 'Undefined';
      case (num < 2):
        return 'Poor';
      case (num < 2.5):
        return 'Average';
      case (num< 4):
        return 'Good';
      case (num === 4):
        return 'Superstar';
      default: 
        return 'Undefined';
  
    }
  }

  // credit to associates group for choosing icons and colors
  export function IconForStatus(status: STATUS): {iconName: string; iconColor: string}{
    // return the correct icon
      switch(status){
        case 'Undefined':
          return {iconName:  'question-circle', iconColor: '#F26925'}; // icon for Undefined 
        case 'Poor':
          return  {iconName:  'frown-o', iconColor: 'red'};  // icon for Poor
        case 'Average':
          return  {iconName:  'meh-o', iconColor: '#F26925'};   // icon for Average
        case 'Good':
          return  {iconName:  'smile-o', iconColor: 'green'};   // icon for Good
        case 'Superstar':
          return {iconName:  'star', iconColor: 'blue'};  // icon for Superstar
        default:
          return  {iconName:  'question-circle', iconColor: '#F26925'}; 'Undefined'  // icon for Undefined something is not right when it reaches the default case  
      }
    
  }

