import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function QuarterComponent({route}: any) {
    const nav = useNavigation();
    const keyExtractor = (item: object, index: number) => {
        return index.toString();
    };

    const year: number = route.params.year;

    const quarters: any = ['All Quarters', 'Q1', 'Q2', 'Q3', 'Q4'];

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
            {year !== null && (
                <FlatList
                    data={quarters}
                    renderItem={quarterCard}
                    keyExtractor={keyExtractor}
                />
            )}
        </View>
    )
}