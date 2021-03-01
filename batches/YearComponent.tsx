import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function BatchesComponent() {
    const nav = useNavigation();
    const keyExtractor = (item: object, index: number) => {
        return index.toString();
    };

    // Placeholder valid year list
    const validYears: any = [2020, 2021];

    // Sets the year and navigates to the quarter selector
    function handleYearSelect(year: number) {
        nav.navigate('Quarter', {year: year});
    }

    // Displays a selectable year
    const yearCard = (params: any) => {
        return (
            <Pressable onPress={() => handleYearSelect(params.item)}>
                <Card>
                    <Text>{params.item}</Text>
                </Card>
            </Pressable>
        )
    }

    // Displays a list of years to filter by
    return (
        <View>
            {validYears.length > 0 && (
                <FlatList
                    data={validYears}
                    renderItem={yearCard}
                    keyExtractor={keyExtractor}
                />
            )}
        </View>
    );
}
