/**
 * @jest-environment jsdom
 */
import Enzyme from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import { CategoryName } from '../../categoriesFeature/CategoryName';
import { Category } from '../../categoriesFeature/Category';

const mockedNav = jest.fn();

jest.mock('@react-navigation/core', () => {
    return {
        useNavigation: ()=> ({navigate: mockedNav})
    }
});

describe('CategoryName component', () => {
    let wrapper: any;
    let prop: Category = new Category;
    let props: Category[] = [];
    beforeAll(() => {
        wrapper = Enzyme.mount(
            <CategoryName category={prop} categories={props}></CategoryName>
        )
    });

    test('that it has a list of category names', () => {
        const categoryNameList = wrapper.findWhere((node: any) => node.prop('testID') === 'categoryNameList');
        expect(categoryNameList.length).toBe(1);
    });

    test('that text color is correct when status is active', () => {
        prop.active = true;
        prop.skill = 'React';
        let containerStyle = wrapper.get(0).style;
        expect(containerStyle).toHaveProperty('color', '#F26925');  
    });

    test('that text color is correct when status is inactive', () => {
        prop.active = false;
        prop.skill = 'React';
        let inactiveSkillColor = wrapper.get(0).style;
        expect(inactiveSkillColor).toHaveProperty('color', '#474C55');
    });
});

describe('changeStatus function', () => {
    test('that it calls categoryService.updateCategory with the category id', () => {
        const serviceUpdateCategory = jest.fn().mockImplementation((id) => {});
        const id = 1;
        expect(serviceUpdateCategory).toBeCalledTimes(1);
        expect(serviceUpdateCategory).toBeCalledWith(id);
    });

    test('that it re-renders to have the updated categories', () => {
        const isActive = true;
        expect(mockedNav).toBeCalledTimes(1);
        expect(mockedNav).toBeCalledWith('CategoryTable', isActive);
    });
});
