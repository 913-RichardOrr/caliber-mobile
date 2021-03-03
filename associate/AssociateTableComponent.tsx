import React, { useEffect, useState } from 'react';
import 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import BatchPageService from '../batchPage/BatchPageService';
import style from '../global_styles';
import { getAssociates } from '../store/actions';
import { ReducerState } from '../store/store';
import AssociateDetail from './AssociateDetail';
import AssociateService, {
  Associate,
  AssociateWithFeedback,
  QCFeedback,
} from './AssociateService';
import {
  shuffle,
  sortAssociateByFirstName,
  sortAssociateByFirstNameReversed,
  sortAssociateByLastName,
  sortAssociateByLastNameReversed,
} from './sort';

/**
 * This component is to display the associate's first and last name
 * along with a TextInput for the QC note and technical status icon that
 * can cycle for the different statuses.
 * This component also contains the save button that floats at the bottom of the screen
 * The filters for first and last name and the button for randomizing associates also displays
 * on this component.
 */
function AssociateTableComponent() {
  let dispatch = useDispatch();
  let associates = useSelector(
    (state: ReducerState) => state.batchReducer.associates
  );
  let batch = useSelector((state: ReducerState) => state.batchReducer.batch);
  let week = useSelector(
    (state: ReducerState) => state.weekReducer.selectedWeek
  );

  const curentUser = useSelector(
    (state: ReducerState) => state.userReducer.user
  );
  const token = curentUser.token;

  let iconName: string = 'angle-up';
  let iconColor: string = '#F26925';
  const [sortDirection, setSortDirection] = useState('FUp');

  useEffect(() => {
    let mockResult;
    async function asyncThis() {
      mockResult = await getAssociateFromMock();
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
   */
  function getQCNotes(results: Associate[]) {
    let listofassociates: AssociateWithFeedback[] = [];
    results.forEach(async (associate: Associate) => {
      let qcFeedback = new QCFeedback();
      qcFeedback = await AssociateService.getAssociate(
        associate,
        batch.batchId,
        String(week.weekNumber),
        token
      );
      let value = new AssociateWithFeedback();
      value.associate = associate;
      if (qcFeedback) {
        value.qcFeedback = qcFeedback;
      }
      listofassociates.push(value);
      dispatch(getAssociates(listofassociates));
    });
  }

  /**
   * Switches sorting direction for first name (Button Handler)
   */
  function switchSortingF() {
    if (sortDirection == 'FUp') {
      setSortDirection('FDown');
      let val = [...associates];
      sortAssociateByFirstName(val);
      dispatch(getAssociates(val));
    } else {
      setSortDirection('FUp');
      let val = [...associates];
      sortAssociateByFirstNameReversed(val);
      dispatch(getAssociates(val));
    }
  }

  /**
   * Switches sorting direction for last name (Button Handler)
   */
  function switchSortingL() {
    if (sortDirection == 'LUp') {
      setSortDirection('LDown');
      let val = [...associates];
      sortAssociateByLastName(val);
      dispatch(getAssociates(val));
    } else {
      setSortDirection('LUp');
      let val = [...associates];
      sortAssociateByLastNameReversed(val);
      dispatch(getAssociates(val));
    }
  }
  return (
    <View style={style.associatesViewComponent}>
      <Button
        onPress={async () => {
          let x = [...associates];
          shuffle(x);
          dispatch(getAssociates(x));
        }}
        title='Randomize List'
        buttonStyle={style.button}></Button>
      <TouchableOpacity style={style.tOSF} activeOpacity={0.7}>
        <Text style={style.sortHeader} onPress={switchSortingF}>
          Sort By First Name
        </Text>
        {sortDirection == 'FUp' ? (
          <Icon
            style={style.iconSort}
            name={iconName}
            type='font-awesome'
            color={iconColor}
            testID='statusIcon'
          />
        ) : sortDirection == 'FDown' ? (
          <Icon
            style={style.iconSort}
            name={'angle-down'}
            type='font-awesome'
            color={iconColor}
            testID='statusIcon'
          />
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={style.tOSL} activeOpacity={0.7}>
        <Text style={style.sortHeader} onPress={switchSortingL}>
          Sort By Last Name
        </Text>
        {sortDirection === 'LUp' && (
          <Icon
            style={style.iconSort}
            name={iconName}
            type='font-awesome'
            color={iconColor}
            testID='statusIcon'
          />
        )}
        {sortDirection === 'LDown' && (
          <Icon
            style={style.iconSort}
            name={'angle-down'}
            type='font-awesome'
            color={iconColor}
            testID='statusIcon'
          />
        )}
      </TouchableOpacity>
      <FlatList
        style={style.flatListAssociates}
        data={associates}
        renderItem={({ item }) => (
          <AssociateDetail
            associate={item.associate}
            qcFeedback={item.qcFeedback}
          />
        )}
        keyExtractor={(item) => item.associate.firstName}
      />
    </View>
  );
}
export default AssociateTableComponent;
