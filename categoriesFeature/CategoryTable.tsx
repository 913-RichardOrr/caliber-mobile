import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import store from '../store/store';
import { Category } from './Category';
import CategoryName from './CategoryName';
import { SearchBar } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import { AlphabetList } from 'react-native-section-alphabet-list';
import catStyle from './categoriesStyles';
import CategoryService from './CategoryService';
import RevLogo from './RevLogo.svg';
import AddBtn from './AddBtn.png';

interface CategoryTableProp {
    status: boolean;
}

/**
 *  This component
 *  @param: status - local state that allows table to show categories conditionally
 *  @returns: view that has a table of either active or stale categories
 */
export default function CategoryTable({ status }: CategoryTableProp) {
    let [search, searchSet] = React.useState('');
    const array: Category[] = [];
    const [activeCat, setActive] = React.useState(array);
    const [staleCat, setStale] = React.useState(array);
    const [rend, setRend] = React.useState(false);
    const result = new Array();

    // after every render, check if there is a change in categories
    useEffect(() => store.subscribe(async () => {
        const active = await CategoryService.getCategories(true);
        const stale = await CategoryService.getCategories(false);
        setActive(active);
        setStale(stale);
        setRend(true);
    }), [store, store.getState().categoryReducer]);

    if (status) {
        // filters the data
        const KEYS_TO_FILTERS = ['skill'];
        const filteredData = activeCat.filter(createFilter(search, KEYS_TO_FILTERS));

        // destructures array into [value: 'skill, key: categoryid, active: boolean] for AlphabetList

        for (let element in filteredData) {
            let [value, key, active] = [filteredData[element].skill, filteredData[element].categoryid, filteredData[element].active]
            result.push({ value, key, active })
        }
    } else {
        // filters the data
        const KEYS_TO_FILTERS = ['skill'];
        const filteredData = staleCat.filter(createFilter(search, KEYS_TO_FILTERS));

        // destructures array into [value: 'skill, key: categoryid, active: boolean] for AlphabetList

        for (let element in filteredData) {
            let [value, key, active] = [filteredData[element].skill, filteredData[element].categoryid, filteredData[element].active]
            result.push({ value, key, active })
        }
    }

return (
    <View>
        <View testID='SearchBarView' style={catStyle.instructView}>
            {/* Search Bar for categories */}
            <SearchBar
                placeholder="Enter Skill..."
                onChangeText={(value: any) => {
                    searchSet(value);
                }}
                value={search}
                inputStyle={catStyle.inputBar}
                inputContainerStyle={catStyle.inputContainer}
                containerStyle={catStyle.searchContainer}
                searchIcon={{ color: 'white' }}
            />
            {/* Toggle instructions */}
            <Text testID='Toggle' style={catStyle.instructText}>Click to toggle Active/Stale Categories</Text>
        </View>
        {rend == true && (
            <ScrollView testID={'AlphabetView'} style={{ height: '84.5%' }}>
                {/* Alphabetized list of skills */}
                <AlphabetList
                    data={result}
                    indexLetterColor={'rgba(0,0,0,0)'}
                    renderCustomItem={(item: any) => (
                        <CategoryName
                            skill={item.value}
                            categoryid={item.key}
                            active={item.active}
                        />
                    )}
                    renderCustomSectionHeader={(section: any) => (
                        <View style={catStyle.sectionHeaderContainer}>
                            <Text style={catStyle.sectionHeaderLabel}>{section.title}</Text>
                        </View>
                    )}
                />
            </ScrollView>
        )}
        {rend == false && (
            <View>
                <View testID='logo' style={catStyle.logoView}> 
                    <Image style={catStyle.logo} source={RevLogo} />
                </View>
            </View>
        )}
    </View>
)
}

// export default CategoryTable;
