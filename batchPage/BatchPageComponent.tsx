import React, { useEffect } from 'react'

import { View,Text } from "react-native";
import { useSelector } from 'react-redux';
import { Associate } from '../associate/AssociateService';
import AssociateTableComponent from "../associate/AssociateTableComponent";
import BatchService from '../batches/BatchService';
import AddNoteComponent from "../batchWeek/AddNoteComponent";
import AddWeek from "../batchWeek/AddWeek/addWeek.component";
import WeekSelectionComponent from "../batchWeek/WeekSelectionComponent";
import { RootState } from '../store/store';
import weekCategoryList from '../weekCategories/weekCategoryList';
import BatchPageService from './BatchPageService';

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
            <AssociateTableComponent assoc = {getAssociateFromMock()}></AssociateTableComponent>
        </View>
 
    );
}

export default BatchPageComponent