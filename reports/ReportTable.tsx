import React from 'react';
import { View, ScrollView} from 'react-native';
import { Table, Row} from 'react-native-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {getAssociates} from '../store/actions';
import { AssociateState, BatchState, UserState, WeekState } from '../store/store';
import AssociateService, { Associate, AssociateWithFeedback, QCFeedback} from '../associate/AssociateService';
import {sortAssociateByLastName} from '../associate/sort';
import style from '../global_styles';

interface ReportProps {
    assoc: Associate[];
}

export function ReportsTable(props: ReportProps) {
    let dispatch = useDispatch();
    let associates = useSelector((state: AssociateState) => state.associates);
    let batch = useSelector((state: BatchState) => state.batch);
    let week = useSelector((state: WeekState) => state.selectedWeek);
    let user = useSelector((state: UserState) => state.user);



    let report = [];


    function getQCNotes() {
        let listofassociates: AssociateWithFeedback[] = [];
        props.assoc.forEach(async (asoc) => {
            let qcnotes: QCFeedback = await AssociateService.getAssociate(asoc, batch.batchId, week.qcWeekId.toString(),user.token);
            if (qcnotes) {
                let val = new AssociateWithFeedback();
                val.associate = asoc;
                val.qcFeedback = qcnotes;
                listofassociates.push(val);
            } else {
                let val = new AssociateWithFeedback();
                val.associate = asoc;
                listofassociates.push(val);
            }
        })
        dispatch(getAssociates(listofassociates));
    }

    function createTable() {
            let val = [...associates];
            sortAssociateByLastName(val);
            dispatch(getAssociates(val));

        for (let i = 1; i <= 8; i++) {
            let assocRow = [];

        }
    }
    return (
        <View style={style.associatesViewComponent}>
            <ScrollView horizontal={true}>
                <View>
                    <Table>
                        <Row data={[]}/>
                    </Table>
                    <ScrollView>
                        {
                            //map data from table
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}