import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import React from 'react';
import Category from '../weekCategory/category';
import { CategoryTable } from '../categories/categoryTable';

//changeItem is a function in weekCategoryList that changes the state of the class
import changeItem from '../weekCatetgory/weekCategoryList';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';


describe('tests for weekCategoryList', () => {
    test('that nothing is displayed if there are no categories for the week', () => {

    });

    test('that categories display correctly if there are categories for the week', () => {

    });

    test('that the flatList gets its items from props', () => {
        //Set up
        const cat1 = new Category(1, 'React', true);
        const cat2 = new Category(2, 'TypeScript', true);
        const testList = [cat1, cat2];

        //Mount component for testing
        const wrapper = Enzyme.mount(
            <WeekCategoryList data = {testList}></WeekCategoryList>
        );

        //flatList gets data from props
        const flatList = wrapper.find(FlatList)
        expect (flatList.props().data).toEqual(testList);

    });


});