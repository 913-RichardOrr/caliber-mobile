import Enzyme from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import { ReportsTable } from '../../reports/ReportTable';

const mockedNav = jest.fn();

jest.mock('@react-navigation/core', () => {
    return {
        useNavigation: () => ({navigate: mockedNav})
    }
});

// mock a whole batch?

describe('ReportTable component', ()=> {
    let wrapper: any;
    let prop: boolean;

    beforeAll(() => {
        wrapper = Enzyme.mount(
            <ReportsTable status={prop}></ReportsTable>
        )
    });

    test('That an associate\'s name displays.', () => {

    });

    test('That the associate\'s technical status displays for the given week.', () => {

    });

    test('That the overall week score displays.', () => {

    });

})