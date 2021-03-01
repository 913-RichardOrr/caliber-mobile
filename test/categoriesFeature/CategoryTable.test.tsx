/**
 * @jest-environment jsdom
 */
import Enzyme from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import { CategoryTable } from '../../categoriesFeature/CategoryTable';

const mockedNav = jest.fn();


jest.mock('@react-navigation/core', () => {
    return {
        useNavigation: ()=> ({navigate: mockedNav})
    }
});

describe('CategoryTable component', () => {
    let wrapper: any;
    let prop: boolean;

    beforeAll(() => {
        wrapper = Enzyme.mount(
            <CategoryTable status={prop}></CategoryTable>
        )        
    });

    test('that it has toggle instructions', () => {
        const toggleInstructions = wrapper.findWhere((node: any) => node.prop('testID') === 'toggleInstructions');
        expect(toggleInstructions.length).toBe(1);
    });
})