import { STATUS } from '../../batchWeek/batchWeekService';

export function convertToNumber(str: string): number {
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
  export function DisplayIconForStatus(status: STATUS){
    // return the correct icon
      switch(status){
        
      }
    
  }