// This is a placeholder to test functionality; previous component will instead link to a TBD component

import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { ReducerState } from '../store/store';

export default function BatchDetailComponent() {
  const batch = useSelector((state: ReducerState) => state.batchReducer.batch);

  return (
    <View>
      <Text>Batch Name:</Text>
      <Text> {batch.name}</Text>
      <Text>{'\n'}</Text>
      <Text>Trainer:</Text>
      <Text> {batch.trainer}</Text>
      <Text>{'\n'}</Text>
      <Text>Skill:</Text>
      <Text> {batch.skill}</Text>
      <Text>{'\n'}</Text>
      <Text>Type:</Text>
      <Text> {batch.type}</Text>
      <Text>{'\n'}</Text>
      <Text>Location:</Text>
      <Text> {batch.location}</Text>
      <Text>{'\n'}</Text>
      <Text>Start Date:</Text>
      <Text> {batch.startDate}</Text>
      <Text>{'\n'}</Text>
      <Text>End Date:</Text>
      <Text> {batch.endDate}</Text>
    </View>
  );
}
