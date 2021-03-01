import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import { BatchState } from '../store/store';
import { getBatches } from '../store/actions';
import batchService from './BatchService';
import Batch from './Batch';

export default function BatchesComponent() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const batches = useSelector((state: BatchState) => state.batches);
    const [filter, setFilter] = useState('');
    const [list, setList] = useState<Batch[]>([]);
    const keyExtractor = (item: object, index: number) => { return index.toString(); }

    const trainerEmail = 'mock1027.employee74df14df-5842-4811-a57c-be9836537a40@mock.com';

    const batchPreview = (params: any) => {
        return (
            <View>
                <Text>{params.item.name}</Text>
                <Text>{params.item.skill}</Text>
                <Text>{params.item.type}</Text>
                <Text>{params.item.location}</Text>
                <Text>{params.item.startDate}</Text>
                <Text>{params.item.endDate}</Text>
            </View>
        )
    }

    function handleFilter(newBatchId: any) {
        setFilter(newBatchId);
        if(newBatchId){
            setList(batches.filter(batch=>batch.batchId == newBatchId));
        } else {
            setList(batches);
        }
    }

    useEffect(() => {
        batchService.getBatchesByTrainerEmail(trainerEmail).then((batchesResp) => {
            dispatch(getBatches(batchesResp));
        });
    }, []);

    return (
        <View>
            {/* {(() => {
                if (batches[0]) {
                    return (
                        <View>
                            <Picker
                                selectedValue={filter}
                                onValueChange={handleFilter}>
                                <Picker.Item
                                    label='None'
                                    value=''/>
                                {batches.length > 0 && batches.map((batch) => {
                                    return <Picker.Item
                                        key={batch.batchId}
                                        label={batch.name}
                                        value={batch.batchId}/>
                                })}
                            </Picker>
                            <FlatList data={filter == '' ? null : list} renderItem={batchPreview} keyExtractor={keyExtractor}/>
                        </View>
                    )
                } else {
                    return (
                        <ActivityIndicator/>
                    )
                }
            })()} */}
        </View>
    )
}