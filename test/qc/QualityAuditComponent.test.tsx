/**
 * @jest-environment jsdom
 */
import React from 'react';
import Enzyme from 'enzyme';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';

import QualityAuditComponent from '../../qc/QualityAuditComponent';

describe('Quality Audit Component tests', ()=> {
    let wrapper: any;
    beforeAll(()=> {
        wrapper = Enzyme.mount(<QualityAuditComponent/>);
    })

    test('if the component renders batch dropdowns & week tabs', () => {
        const batchSelection = wrapper.findWhere((node: any) => node.prop('testID') === 'batchWeekSelection').first();
        expect(batchSelection).toExist();
    });

    test('if the component renders categories', () => {
        const categories = wrapper.findWhere((node: any) => node.prop('testID') === 'categories').first();
        expect(categories).toExist();
    });

    test('if the component renders associate table', () => {
        const associateTable = wrapper.findWhere((node: any) => node.prop('testID') === 'associateTable').first();
        expect(associateTable).toExist();
    });

    test('if the component renders overall qc status and notes', () => {
        const overallStatus = wrapper.findWhere((node: any) => node.prop('testID') === 'overallStatus').first();
        expect(overallStatus).toExist();
        const overallNotes = wrapper.findWhere((node: any) => node.prop('testID') === 'overallNotes').first();
        expect(overallNotes).toExist();
    });
});