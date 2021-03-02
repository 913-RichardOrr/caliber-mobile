import {STATUS} from '../batchWeekService';

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

  // display coorect icon for each status
  export function displayIconForStatus(status: STATUS){
    // return the correct icon
      switch(status){
        case 'Undefined':
          return 'Undefined'; // icon for Undefined 
        case 'Poor':
          return 'Poor'; // icon for Poor
        case 'Average':
          return 'Average';  // icon for Average
        case 'Good':
          return 'Good';  // icon for Good
        case 'Superstar':
          return 'Superstar';  // icon for Superstar
        default:
          return 'Undefined'  // icon for Undefined something is not right when it reaches the default case  
      }
    
  }