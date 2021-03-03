import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { useSelector } from 'react-redux';
import { ReducerState } from '../store/store';
import AssociateService, { Associate } from '../associate/AssociateService';
import style from '../global_styles';
import BatchPageService from '../batchPage/BatchPageService';
import batchWeekService from '../batchWeek/batchWeekService';
import TechnicalStatus from '../associate/TechnicalStatus';

export function ReportsTable() {
  let batch = useSelector((state: ReducerState) => state.batchReducer.batch);
  const curentUser = useSelector(
    (state: ReducerState) => state.userReducer.user
  );
  const token = curentUser.token;

  const [associateWeekFeedback, setAssociateWeekFeedback]: any = useState([]);
  const [weeksHeader, setWeeksHeader] = useState(['Associate']);

  useEffect(() => {
    if (associateWeekFeedback.length === 0) {
      asyncThis();
    }
    async function asyncThis() {
      let mockResult;
      mockResult = await getAssociateFromMock();
      getQCNotes(mockResult);
    }
  }, []);

  /**
   * Queries the mock API to retrieve all the associates for a given batch.
   */
  async function getAssociateFromMock() {
    let newAssociateArray: Associate[] = [];
    let serviceResult;
    serviceResult = await BatchPageService.getAssociates(batch.batchId, token);
    serviceResult.forEach((asoc: any) => {
      let associate = new Associate();
      associate.firstName = asoc.firstName;
      associate.lastName = asoc.lastName;
      associate.associateId = asoc.email;
      newAssociateArray.push(associate);
    });

    return newAssociateArray;
  }

  /**
   * Retrieves QC Notes from back end.
   * Return an array of technical statuses for each [associate][week]
   */
  async function getQCNotes(results: Associate[]) {
    // let weeks = await batchWeekService.getBatchWeekNotes(batch.batchId, 0);
    // let nweeks = weeks.length;
    let nweeks = 2;

    //make header array with the Week Numbers
    for (let i = 0; i < nweeks; i++) {
      let temp = weeksHeader;
      temp.push(`Week ${i + 1}`);
      setWeeksHeader([...temp]);
    }

    // Loops through all of the associates getting their technical status for each week.
    results.forEach(async (associate: Associate) => {
      let feedback = [];
      feedback.push(`${associate.firstName} ${associate.lastName}`);
      for (let i = 1; i <= nweeks; i++) {
        let qcFeedback = await AssociateService.getAssociate(
          associate,
          batch.batchId,
          String(i),
          token
        );
        feedback[i] = <TechnicalStatus status={qcFeedback.technicalstatus} />;
      }
      let temp = associateWeekFeedback;
      temp.push(feedback);

      setAssociateWeekFeedback([...temp]);
    });
  }

  return (
    <View style={style.associatesViewComponent}>
      <ScrollView horizontal={true}>
        <View>
          <Table>
            <Row data={weeksHeader} />
            <ScrollView>
              <Rows data={associateWeekFeedback} />
            </ScrollView>
          </Table>
        </View>
      </ScrollView>
    </View>
  );
}
