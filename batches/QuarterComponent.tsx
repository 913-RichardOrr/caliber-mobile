import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store/store';
import { getBatches } from '../store/actions';
import batchService from './BatchService';
import { style } from '../global_styles';

export default function QuarterComponent({route}: any) {
    const nav = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userReducer.user);
	const batches = useSelector((state: RootState) => state.batchReducer.batches);
    const keyExtractor = (item: object, index: number) => {
        return index.toString();
    };

    const year: number = route.params.year;

    const quarters: any = ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'];
    
    useEffect(() => {
        if (user.role.ROLE_QC == true || user.role.ROLE_VP == true) {
            batchService
                .getAllBatches(year)
                .then((batchesResp) => {
                    dispatch(getBatches(batchesResp));;
                });
        }
    }, [year]);

    // Sets the quarter and navigates to the batch list
    function handleQuarterSelect(index: number) {
        const quarter = quarters[index];
        nav.navigate('Batches', {year: year, quarter: quarter});
    }

    // Displays a selectable quarter
    const quarterCard = (params: any) => {
        return (
            <Pressable onPress={() => handleQuarterSelect(params.index)}>
                <Card>
                    <Text>{params.item}</Text>
                </Card>
            </Pressable>
        )
    }
    
    // Displays a list of quarters to filter by
    return (
        <View>
            <Text>{year}</Text>
            {batches.length > 0 ?
                <FlatList
                    data={quarters}
                    renderItem={quarterCard}
                    keyExtractor={keyExtractor}
                />
            : <ActivityIndicator style={style.loading}/>}
        </View>
    )
}