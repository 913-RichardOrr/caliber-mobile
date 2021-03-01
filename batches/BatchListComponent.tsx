import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { ReducerState } from '../store/store';
import { getBatches, changeBatch } from '../store/actions';
import batchService from './BatchService';

interface VisibleBatch {
  index: number;
  info: string;
}
export default function BatchListComponent({ route }: any) {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const batches = useSelector(
    (state: ReducerState) => state.batchReducer.batches
  );
  const [visibleBatches, setVisible] = useState<VisibleBatch[]>([]);
  const [reset, setReset] = useState(false);
  const [query, setQuery] = useState('');
  const keyExtractor = (item: object, index: number) => {
    return index.toString();
  };

  const year = route.params.year;
  const quarter = quarterToNumber(route.params.quarter);

  // Changes the chosen quarter from a string to a number for use in the filter
  function quarterToNumber(strQuarter: string) {
    switch (strQuarter) {
      case 'Q1':
        return 1;
      case 'Q2':
        return 2;
      case 'Q3':
        return 3;
      case 'Q4':
        return 4;
    }
  }

  // Placeholder user
  const trainer = {
    role: 'ROLE_QC',
    email: 'mock1005.employee7c90a542-e70e-4db5-be8b-629e62f851c5@mock.com',
    firstName: 'Mock 1005',
    lastName: 'Employee 1005',
  };

  // Retrieves a batch list based on filters
  useEffect(() => {
    if (trainer.role === 'ROLE_TRAINER') {
      batchService
        .getBatchesByTrainerEmail(trainer.email)
        .then((batchesResp) => {
          dispatch(getBatches(batchesResp));
        });
    } else if (year && quarter) {
      batchService
        .getAllBatches(Number(year), Number(quarter))
        .then((batchesResp) => {
          dispatch(getBatches(batchesResp));
        });
    }
  }, [year, quarter]);

  useEffect(() => {
    const visible = batches.map((batch, index) => {
      return {
        index,
        info:
          trainer.role === 'ROLE_TRAINER'
            ? `${batch.skill}\n${batch.startDate}`
            : `${batch.trainer}\n${batch.skill}\n${batch.startDate}`,
      };
    });
    setVisible(visible);
    setReset(false);
  }, [batches, reset === true]);

  console.log(route.params);
  console.log(year + ' ' + quarter);

  // Upon selection, updates the state with a chosen batch
  // The navigator's destination is to be replaced in code after determining the next component in line
  function handleBatchSelect(index: string) {
    dispatch(changeBatch(batches[Number(index)]));
    nav.navigate('BatchDetail');
  }

  // Display a selectable batch
  const batchCard = (params: any) => {
    return (
      <Pressable onPress={() => handleBatchSelect(params.item.index)}>
        <Card>
          <Text>{params.item.info}</Text>
        </Card>
      </Pressable>
    );
  };

  //Filter based on query
  const handleSearch = (text: string) => {
    console.log('Visbile', visibleBatches);
    let visible: VisibleBatch[] = [];
    if (query.length > text.length) {
      visible = batches.map((batch, index) => {
        return {
          index,
          info:
            trainer.role === 'ROLE_TRAINER'
              ? `${batch.name} ${batch.skill} ${batch.startDate}`
              : `${batch.name} ${batch.skill} ${batch.startDate} - ${batch.trainer}`,
        };
      });

      visible = visible.filter((batch) =>
        batch.info.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      visible = visibleBatches.filter((batch) =>
        batch.info.toLowerCase().includes(text.toLowerCase())
      );
    }
    console.log('Visbile', visible);
    setQuery(text);
    setVisible(visible);
  };

  // Displays a list of batches based on filters
  return (
    <View>
      <TextInput
        placeholder='Search batches'
        value={query}
        onChangeText={(text) => {
          handleSearch(text);
        }}
      />
      <Button
        title='X'
        onPress={() => {
          setQuery('');
          setReset(true);
        }}
      />
      {year !== null && (
        <FlatList
          data={visibleBatches}
          renderItem={batchCard}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
}
