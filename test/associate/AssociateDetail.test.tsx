/**
 * @jest-environment jsdom
 */
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import 'enzyme-adapter-react-16';

import AssociateDetail from '../../associate/AssociateDetail';
import * as AssociateService from '../../associate/AssociateService';
import TechnicalStatus from '../../associate/TechnicalStatus';

const testFeedback = new AssociateService.QCFeedback();
testFeedback.associateid = 'testId';
testFeedback.batchid = 'testBatch';
testFeedback.weeknumber = 1;
testFeedback.technicalstatus = 2;
testFeedback.notecontent = 'testNote';

const testAssociate = new AssociateService.Associate();
testAssociate.associateId = testFeedback.associateid;
testAssociate.firstName = 'testFN';
testAssociate.lastName = 'testLN';

let wrapper: ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

beforeEach(() => {
    wrapper = shallow(
        <AssociateDetail associate={testAssociate} qcFeedback={testFeedback} />
    );
});

test('That the associate\'s name displays', () => {

    const firstName = wrapper.findWhere((node) => {
        return node.prop('testID') === 'firstName';
    });
    expect(firstName.first()).toExist();

    const lastName = wrapper.findWhere((node) => {
        return node.prop('testID') === 'lastName';
    });
    expect(lastName.first()).toExist();
});

test('That the associate\'s technical status displays', () => {

    const techStatus = wrapper.find(TechnicalStatus);
    expect(techStatus).toHaveLength(1);
    expect(techStatus.first()).toExist();

});

// The current plan is that clicking on the technical status cycles through possible values
test('That pressing on the associate\'s technical status increases it', () => {

    let techStatus = wrapper.findWhere((node) => {
        return node.prop('testID') === 'technicalStatus';
    }).first();
    expect(techStatus.children('TechnicalStatus').prop('status')).toBe(2);

    AssociateService.default.updateAssociate = jest.fn();

    //0=undefined, 1=red sad face, 2=yellow neutral, 3=green happy, 4=star
    //status goes 2 -> 3
    techStatus.props().onPress();
    wrapper.update();
    techStatus = wrapper.findWhere((node) => {
        return node.prop('testID') === 'technicalStatus';
    }).first();
    expect(AssociateService.default.updateAssociate).toHaveBeenCalledTimes(1);
    expect(AssociateService.default.updateAssociate).toHaveBeenLastCalledWith(testFeedback, { 'qcStatus': 3 });
    expect(techStatus.children('TechnicalStatus').prop('status')).toBe(3);

    //status goes 3 -> 4
    techStatus.props().onPress();
    wrapper.update();
    techStatus = wrapper.findWhere((node) => {
        return node.prop('testID') === 'technicalStatus';
    }).first();
    expect(AssociateService.default.updateAssociate).toHaveBeenCalledTimes(2);
    expect(AssociateService.default.updateAssociate).toHaveBeenLastCalledWith(testFeedback, { 'qcStatus': 4 });
    expect(techStatus.children('TechnicalStatus').prop('status')).toBe(4);

    //status goes 4 -> 0
    techStatus.props().onPress();
    wrapper.update();
    techStatus = wrapper.findWhere((node) => {
        return node.prop('testID') === 'technicalStatus';
    }).first();
    expect(AssociateService.default.updateAssociate).toHaveBeenCalledTimes(3);
    expect(AssociateService.default.updateAssociate).toHaveBeenLastCalledWith(testFeedback, { 'qcStatus': 0 });
    expect(techStatus.children('TechnicalStatus').prop('status')).toBe(0);

    //status goes 0 -> 1
    techStatus.props().onPress();
    wrapper.update();
    techStatus = wrapper.findWhere((node) => {
        return node.prop('testID') === 'technicalStatus';
    }).first();
    expect(AssociateService.default.updateAssociate).toHaveBeenCalledTimes(4);
    expect(AssociateService.default.updateAssociate).toHaveBeenLastCalledWith(testFeedback, { 'qcStatus': 1 });
    expect(techStatus.children('TechnicalStatus').prop('status')).toBe(1);

    //status goes 1 -> 2
    techStatus.props().onPress();
    wrapper.update();
    techStatus = wrapper.findWhere((node) => {
        return node.prop('testID') === 'technicalStatus';
    }).first();
    expect(AssociateService.default.updateAssociate).toHaveBeenCalledTimes(5);
    expect(AssociateService.default.updateAssociate).toHaveBeenLastCalledWith(testFeedback, { 'qcStatus': 2 });
    expect(techStatus.children('TechnicalStatus').prop('status')).toBe(2);
});

// Not 100% sure this is how our styling will end up, but this is the current concept
test('That there\'s a button that displays this associate\'s note for this week', () => {

    const button = wrapper.findWhere((node) => node.prop('testID') === 'displayNote').first();
    expect(button).toExist();

    let note = wrapper.findWhere((node) => {
        return node.prop('testID') === 'qcNote';
    });

    //Note should not be present to start with
    expect(note.first()).not.toExist();

    //After pressing this button, note should appear
    button.props().onPress();
    wrapper.update();
    note = wrapper.findWhere((node) => {
        return node.prop('testID') === 'qcNote';
    });
    expect(note.first()).toExist();
});

describe('Tests for qcNote text input', () => {

    let note: ShallowWrapper<any, any, React.Component<{}, {}, any>>;
    const testInput = 'Hello';

    /** Previous test showed that the note appears when we click displayNote button
     * Before each of these last 2 tests, simulate entering text
     * Separately test that entering text updates note, and that there's a save button that calls the service
     */
    beforeEach(() => {
        const displayButton = wrapper.findWhere((node) => node.prop('testID') === 'displayNote').first();
        displayButton.props().onPress();
        wrapper.update();

        note = wrapper.findWhere((node) => {
            return node.prop('testID') === 'qcNote';
        });
        note.simulate('changeText', testInput);
        wrapper.update();
    });

    test('That on text input, qcNote is changed', () => {
        note = wrapper.findWhere((node) => {
            return node.prop('testID') === 'qcNote';
        });
        expect(note.prop('defaultValue')).toBe(testInput);
    });

    test('That when the Save Note button is pressed, associate.service is called', () => {
        const button = wrapper.findWhere((node) => node.prop('testID') === 'saveNote').first();
        expect(button).toExist();

        AssociateService.default.updateAssociate = jest.fn();

        button.props().onPress();
        wrapper.update();
        expect(AssociateService.default.updateAssociate).toHaveBeenCalledTimes(1);
        expect(AssociateService.default.updateAssociate).toHaveBeenLastCalledWith(testFeedback, { 'qcNote': testInput });
    });
});