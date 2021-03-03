import React from 'react';
import { View } from 'react-native';
import AssociateTableComponent from '../associate/AssociateTableComponent';
import AddNoteComponent from '../batchWeek/AddNoteComponent';
import AddWeek from '../batchWeek/AddWeek/AddWeekComponent';
import WeekSelectionComponent from '../batchWeek/WeekSelectionComponent';
import weekCategoryList from '../weekCategories/weekCategoryList';
<<<<<<< HEAD
import BatchPageService from './BatchPageService';
import BatchWeekStatusChart, {DisplayOverallStatus} from '../batchWeek/qcStatus/OverallQcStatusChart.component';


function BatchPageComponent() {


    let batch = useSelector((state: RootState) => state.batchReducer.batch);

    /**
     * Queries the mock API to retrieve all the associates for a given batch.
     */
    function getAssociateFromMock() {
        let newAssociateArray:Associate[] = [];
        BatchPageService.getAssociates(batch).then((results:[]) => {
            console.log(results);
            results.forEach((asoc:any) => {
                let associate = new Associate();
                associate.firstName = asoc.firstName;
                associate.lastName = asoc.lastName;
                associate.associateId = asoc.email;
                newAssociateArray.push(associate);
            })
        }).catch((err) => {
            "There is no data";
        });
        return newAssociateArray;
    }

    useEffect(() => {
    }, []);

    return (
        <View>
            <WeekSelectionComponent></WeekSelectionComponent>
            <AddWeek></AddWeek>
            <AddNoteComponent></AddNoteComponent>
            {weekCategoryList({weekId:0})}
            <DisplayOverallStatus />
            <AssociateTableComponent assoc = {getAssociateFromMock()}></AssociateTableComponent>
        </View>

    );
=======

function BatchPageComponent() {
  return (
    <View>
      <WeekSelectionComponent></WeekSelectionComponent>
      <AddWeek></AddWeek>
      {weekCategoryList({ weekId: 0 })}
      <AddNoteComponent></AddNoteComponent>
      <AssociateTableComponent></AssociateTableComponent>
    </View>
  );
>>>>>>> 65959c3d0d2c842a005d2af6fb337c3f251b5d33
}

export default BatchPageComponent;
