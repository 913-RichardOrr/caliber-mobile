//Shows associate name, technical status, note (editable)
import React, { useEffect, useState } from 'react';
import 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import BatchPageService from '../batchPage/BatchPageService';
import style from '../global_styles';
import { getAssociates } from '../store/actions';
import { RootState } from '../store/store';
import AssociateDetail from './AssociateDetail';
import AssociateService, { Associate, AssociateWithFeedback, QCFeedback } from './AssociateService';
import { shuffle, sortAssociateByFirstName, sortAssociateByFirstNameReversed, sortAssociateByLastName, sortAssociateByLastNameReversed } from './sort';


/**
 * Get Associate needs to do some stuff here.
 */
//let qcFeedback = AssociateService.getAssociate(assoc);
let assoc1 = new AssociateWithFeedback();
assoc1.associate.firstName = "TylerTest"
assoc1.associate.lastName = "BetaTest"
let assoc2 = new AssociateWithFeedback();
assoc2.associate.firstName = "KathrynTest"
assoc2.associate.lastName = "AlphaTest"
let assoc3 = new AssociateWithFeedback();
assoc3.associate.firstName = "SillyTest"
assoc3.associate.lastName = "CharlieTest"
let assoc4 = new AssociateWithFeedback();
assoc4.associate.firstName = "MaryTest"
assoc4.associate.lastName = "DeltaTest"





function AssociateTableComponent() {
    let tempAssociates = [assoc1, assoc2, assoc3, assoc4];
    let dispatch = useDispatch();
    let associates = useSelector((state: RootState) => state.batchReducer.associates);
    let batch = useSelector((state: RootState) => state.batchReducer.batch);
    let week = useSelector((state: RootState) => state.weekReducer.selectedWeek);
    let iconName: string = 'angle-up';
    let iconColor: string = '#F26925';
    const [sortDirection, setSortDirection] = useState("FUp");


    useEffect(() => {
        // dispatch(getAssociates(tempAssociates));
        let mockResult;
        async function asyncThis() {
            mockResult = await getAssociateFromMock();
            console.log(mockResult);
            getQCNotes(mockResult);
        }
        asyncThis();
    }, []);

    /**
     * Queries the mock API to retrieve all the associates for a given batch.
     */
    async function getAssociateFromMock() {
        let newAssociateArray: Associate[] = [];
        let serviceResult;
        serviceResult = await BatchPageService.getAssociates(batch);
        serviceResult.forEach((asoc: any) => {
            let associate = new Associate();
            associate.firstName = asoc.firstName;
            associate.lastName = asoc.lastName;
            associate.associateId = asoc.email;
            newAssociateArray.push(associate);
        })
        return newAssociateArray;
    }

    /**
     * Retrievs QC Notes from back end.
     */
    function getQCNotes(results: any) {
        let listOfAssociates: AssociateWithFeedback[] = [];
        results.forEach((asoc: any) => {
            // let qcnotes: QCFeedback = await AssociateService.getAssociate(asoc, batch.batchId, week.qcWeekId.toString());
            let qcnotes: QCFeedback = new QCFeedback();
            if (qcnotes) {
                let val = new AssociateWithFeedback();
                val.associate = asoc;
                val.qcFeedback = qcnotes;
                listOfAssociates.push(val);
            } else {
                let val = new AssociateWithFeedback();
                val.associate = asoc;
                listOfAssociates.push(val);
            }
        })
        dispatch(getAssociates(listOfAssociates));
    }

    /**
     * Switches sorting direction for first name (Button Handler)
     */
    function switchSortingF() {
        if (sortDirection == "FUp") {
            setSortDirection("FDown");
            let val = [...associates];
            sortAssociateByFirstName(val);
            dispatch(getAssociates(val));
        } else {
            setSortDirection("FUp");
            let val = [...associates];
            sortAssociateByFirstNameReversed(val);
            dispatch(getAssociates(val));
        }
    }


    /**
     * Switches sorting direction for last name (Button Handler)
     */
    function switchSortingL() {
        if (sortDirection == "LUp") {
            setSortDirection("LDown");
            let val = [...associates];
            sortAssociateByLastName(val);
            dispatch(getAssociates(val));

        } else {
            setSortDirection("LUp");
            let val = [...associates];
            sortAssociateByLastNameReversed(val);
            dispatch(getAssociates(val));
        }
    }

    function handleAllUpdate() {
        associates.forEach((assoc) => {
            try {
                AssociateService.updateAssociate(assoc.qcFeedback, { 'notecontent': assoc.qcFeedback.qcNote })
            } catch (err: any) {
                AssociateService.replaceAssociate(assoc.qcFeedback, { 'notecontent': assoc.qcFeedback.qcNote, 'technicalstatus': assoc.qcFeedback.qcTechnicalStatus })
            }
            try {
                AssociateService.updateAssociate(assoc.qcFeedback, { 'technicalstatus': assoc.qcFeedback.qcNote })
            } catch (err: any) {
                AssociateService.replaceAssociate(assoc.qcFeedback, { 'technicalstatus': assoc.qcFeedback.qcTechnicalStatus, 'notecontent': assoc.qcFeedback.qcNote })
            }
        });

    }
    return (
        <View style={style.associatesViewComponent}>
            <Button onPress={async () => {
                let x = [...associates]
                await shuffle(x);
                setTimeout(() => {
                    dispatch(getAssociates(x));
                }, 500);
            }
            } title='Randomize List' buttonStyle={style.button}></Button>
            <TouchableOpacity style={style.tOSF} activeOpacity={.7}>
                <Text style={style.fNameSortH} onPress={switchSortingF}>Sort By First Name</Text>
                {sortDirection == "FUp" ? <Icon
                    style={style.iconsf}
                    name={iconName}
                    type='font-awesome'
                    color={iconColor}
                    testID='statusIcon' /> : sortDirection == "FDown" ?
                        <Icon
                            style={style.iconsf}
                            name={'angle-down'}
                            type='font-awesome'
                            color={iconColor}
                            testID='statusIcon' /> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity style={style.tOSL} activeOpacity={.7}>
                <Text style={style.lNameSortH} onPress={switchSortingL}>Sort By Last Name</Text>
                {sortDirection == "LUp" ? <Icon
                    style={style.iconsl}
                    name={iconName}
                    type='font-awesome'
                    color={iconColor}
                    testID='statusIcon' /> : sortDirection == "LDown" ?
                        <Icon
                            style={style.iconsl}
                            name={'angle-down'}
                            type='font-awesome'
                            color={iconColor}
                            testID='statusIcon' /> : <Text></Text>}
            </TouchableOpacity>
            <FlatList
                style={style.flatListAssociates}
                data={associates}
                renderItem={({ item }) => (<AssociateDetail associate={item.associate} qcFeedback={item.qcFeedback}></AssociateDetail>)}
                keyExtractor={(item) => item.associate.firstName}
            />
            <Button
                raised
                titleStyle={style.title}
                buttonStyle={style.savebutton}
                title='Save All'
                type="outline"
                icon={
                    <Icon
                        name='save'
                        type='fontawesome'
                        color='#F26925'
                    />
                }
                onPress={handleAllUpdate}
                testID='saveNote'
            />
        </View>

    );
}

export default AssociateTableComponent;