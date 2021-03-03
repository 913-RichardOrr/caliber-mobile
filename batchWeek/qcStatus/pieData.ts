//initialize hist (frequncey chart)  and pick the right color for each technical status//;
export function pieData (hist: {'Poor': number; 'Average': number; 'Good': number; 'Undefined': number; 'Superstar': number;} ){ 
     
    return [
        {
          name: 'Poor',
          percentage: hist['Poor'] ,
          color: 'red',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Average',
          percentage: hist['Average'],
          color: '#F26925',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Good',
          percentage: hist['Good'],
          color: 'green',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Superstar',
          percentage: hist['Superstar'],
          color: 'blue',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ];
  } 