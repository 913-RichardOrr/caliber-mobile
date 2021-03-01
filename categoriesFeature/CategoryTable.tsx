import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/categoriesFeature/CategoryActions';
import { CategoryState } from '../store/store';
import { Category } from './Category';
import { CategoryName } from './CategoryName';
import categoryService from './CategoryService';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import SearchInput, {createFilter} from 'react-native-search-filter';
import { AlphabetList } from "react-native-section-alphabet-list";

interface CategoryTableProp {
    status: boolean;
}

/**
 *  This component
 *  @param: status - local state that allows table to show categories conditionally
 *  @returns: view that has a table of either active or stale categories
 */
export function CategoryTable({ status }: CategoryTableProp) {
    // get category state from store
    const categorySelector = (state: CategoryState) => state.categories;
    const categories = useSelector(categorySelector);
    const newCategories = { ...categories };
    const dispatch = useDispatch();
    let [search, searchSet] = useState('');

    // temporary mock data
    const mockCategories = [
        {
            categoryid: 1,
            skill: 'SQL',
            active: true
        },
        {
            categoryid: 2,
            skill: 'ReactNative',
            active: false
        },
        {
            categoryid: 3,
            skill: 'Redux',
            active: true
        },
        {
            categoryid: 4,
            skill: 'Microservices',
            active: false
        },
        {
            categoryid: 5,
            skill: 'DynamoDB',
            active: true
        },
        {
            categoryid: 6,
            skill: 'AWS Fargate',
            active: true
        },
        {
            categoryid: 7,
            skill: 'Amazon Web Services',
            active: false
        },
        {
            categoryid: 8,
            skill: 'Enzyme',
            active: true
        },
        {
            categoryid: 9,
            skill: 'Docker',
            active: false
        },
        {
            categoryid: 10,
            skill: 'TypeScript',
            active: true
        },
        {
            categoryid: 11,
            skill: 'Jest',
            active: false
        },
        {
            categoryid: 12,
            skill: 'Containers',
            active: true
        },
        {
            categoryid: 13,
            skill: 'Bootstrap',
            active: false
        },
        {
            categoryid: 14,
            skill: 'ECR',
            active: true
        },
    ];

    // after every render, check if there is a change in categories
    useEffect(() => {
        categoryService.getCategories(status.toString()).then((results) => {
            dispatch(getCategories(results));
        })
    }, [dispatch])
    
    // filters the data
    const KEYS_TO_FILTERS = ['skill'];
    const filteredData = mockCategories.filter(createFilter(search, KEYS_TO_FILTERS));

    // destructures array into [value: 'skill, key: categoryid, active: boolean] for AlphabetList
    const result = new Array();
    for(let element in filteredData) {
        let [value, key, active] = [filteredData[element].skill, filteredData[element].categoryid, filteredData[element].active]
        result.push({value, key, active})
    }
    console.log(result);

    return (
        <>
            {status == true ?
                // if status is true, return a table of active categories
                <View>
                    {/* Table header */}
                    <Text style={styles.textColor}>Active Categories</Text>

                    {/* Toggle instructions */}
                    <Text style={styles.textColor}>Click to toggle Active/Stale Categories</Text>

                    {/* Table items */}
                    <SearchBar
                        placeholder="Enter Skill..."
                        onChangeText={(value) => {
                            searchSet(value);
                        }}
                        value={search}
                    />

                    <AlphabetList
                        data={result}
                        indexLetterColor={'red'}
                        renderCustomItem={(item: any) => (
                            <CategoryName
                                skill={item.value}
                                categoryid={item.key}
                                active={item.active}
                                categories={newCategories}
                            ></CategoryName>
                        )}
                    />
                </View>
                :
                // if status is false, return a table of stale categories
                <View>
                    {/* Table header */}
                    <Text style={styles.textColor}>Stale Categories</Text>

                    {/* Toggle instructions */}
                    <Text style={styles.textColor}>Click to toggle Active/Stale Categories</Text>
                    
                    {/* Table items */}
                    <SearchBar
                        placeholder="Enter Skill..."
                        onChangeText={(value) => {
                            searchSet(value);
                        }}
                        value={search}
                    />
                    <AlphabetList
                        data={result}
                        indexLetterColor={'red'}
                        renderCustomItem={(item: any) => (
                            <CategoryName
                                skill={item.value}
                                categoryid={item.key}
                                active={item.active}
                                categories={newCategories}
                            ></CategoryName>
                        )}
                    />
                </View>
            }
        </>
    )
}



const styles = StyleSheet.create({
    textColor: {
        color: 'black',
    }
})
