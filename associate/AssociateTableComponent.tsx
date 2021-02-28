import React, { useEffect, useState } from 'react';
import 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import style from '../global_styles';
import { getAssociates } from '../store/actions';
import { AssociateState, BatchState, WeekState } from '../store/store';
import AssociateDetail from './AssociateDetail';
import AssociateService, {
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
 * Get Associate needs to do some stuff here.
 */

let assoc1 = new AssociateWithFeedback();
assoc1.associate.firstName = 'TylerTest';
assoc1.associate.lastName = 'BetaTest';
let assoc2 = new AssociateWithFeedback();
assoc2.associate.firstName = 'KathrynTest';
assoc2.associate.lastName = 'AlphaTest';
let assoc3 = new AssociateWithFeedback();
assoc3.associate.firstName = 'SillyTest';
assoc3.associate.lastName = 'CharlieTest';
let assoc4 = new AssociateWithFeedback();
assoc4.associate.firstName = 'MaryTest';
assoc4.associate.lastName = 'DeltaTest';

/**
 * This component is to display the associate's first and last name
 * along with a TextInput for the QC note and technical status icon that
 * can cycle for the different statuses.
 * This component also contains the save button that floats at the bottom of the screen
 * The filters for first and last name and the button for randomizing associates also displays
 * on this component.
 */
function AssociateTableComponent() {
  let tempAssociates = [assoc1, assoc2, assoc3, assoc4];
  let dispatch = useDispatch();
  let associates = useSelector((state: AssociateState) => state.associates);
  let batch = useSelector((state: BatchState) => state.batch);
  let week = useSelector((state: WeekState) => state.selectedWeek);

  let iconName: string = 'angle-up';
  let iconColor: string = '#F26925';
  const [sortDirection, setSortDirection] = useState('FUp');

  useEffect(() => {
    dispatch(getAssociates(tempAssociates));
    // getQCNotes();
  }, []);

  /**
   * Retrieves QC Notes from back end.
   */
  function getQCNotes() {
    let listofassociates: AssociateWithFeedback[] = [];
    associates.forEach(async (associate) => {
      let qcnotes: QCFeedback = await AssociateService.getAssociate(
        associate.associate,
        batch.batchId,
        week.qcWeekId.toString()
      );
      if (qcnotes) {
        let value = new AssociateWithFeedback();
        value.associate = associate.associate;
        value.qcFeedback = qcnotes;
        listofassociates.push(value);
      } else {
        let val = new AssociateWithFeedback();
        val.associate = associate.associate;
        listofassociates.push(val);
      }
    });
    dispatch(getAssociates(listofassociates));
  }

  /**
   * Switches sorting direction for first name (Button Handler)
   */
  function switchSortingF() {
    if (sortDirection == 'FUp') {
      setSortDirection('FDown');
      let val = [...associates];
      sortAssociateByFirstName(val);
      getAssociates(val);
    } else {
      setSortDirection('FUp');
      let val = [...associates];
      sortAssociateByFirstNameReversed(val);
      getAssociates(val);
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
      getAssociates(val);
    } else {
      setSortDirection('LUp');
      let val = [...associates];
      sortAssociateByLastNameReversed(val);
      getAssociates(val);
    }
  }

  function handleAllUpdate() {
    associates.forEach(async (assoc) => {
      try {
        await AssociateService.updateAssociate(assoc.qcFeedback, {
          notecontent: assoc.qcFeedback.qcNote,
        });
      } catch (err: any) {
        await AssociateService.replaceAssociate(assoc.qcFeedback, {
          notecontent: assoc.qcFeedback.qcNote,
          technicalstatus: assoc.qcFeedback.qcTechnicalStatus,
        });
      }
      try {
        await AssociateService.updateAssociate(assoc.qcFeedback, {
          technicalstatus: assoc.qcFeedback.qcNote,
        });
      } catch (err: any) {
        await AssociateService.replaceAssociate(assoc.qcFeedback, {
          technicalstatus: assoc.qcFeedback.qcTechnicalStatus,
          notecontent: assoc.qcFeedback.qcNote,
        });
      }
    });
  }
  return (
    <View style={style.associatesViewComponent}>
      <Button
        onPress={() => {
          alert(JSON.stringify(associates));
        }}></Button>
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
            qcFeedback={item.qcFeedback}></AssociateDetail>
        )}
        keyExtractor={(item) => item.associate.firstName}
      />
      <Button
        raised
        titleStyle={style.title}
        buttonStyle={style.button}
        title='Save All'
        type='outline'
        icon={<Icon name='save' type='fontawesome' color='#F26925' />}
        onPress={handleAllUpdate}
        testID='saveNote'
      />
    </View>
  );
}

export default AssociateTableComponent;
