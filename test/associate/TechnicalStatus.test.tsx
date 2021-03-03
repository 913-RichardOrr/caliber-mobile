import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import 'enzyme-adapter-react-16';

import TechnicalStatus from '../../associate/TechnicalStatus';

test('That a 0 displays a blue question mark', () => {
    const wrapper = shallow(
        <TechnicalStatus status={0}/>
    );

    const icon = wrapper.findWhere((node) => {
        return node.prop('testID') === 'statusIcon';
    }).first();

    expect(icon).toExist();
    expect(icon.props()).toEqual({
        'name': 'question',
        'type':'font-awesome',
        'color': 'blue',
        'testID': 'statusIcon'
    });
});

test('That a 0.6 displays a blue question mark', () => {
    const wrapper = shallow(
        <TechnicalStatus status={0.6}/>
    );

    const icon = wrapper.findWhere((node) => {
        return node.prop('testID') === 'statusIcon';
    }).first();

    expect(icon).toExist();
    expect(icon.props()).toEqual({
        'name': 'question',
        'type':'font-awesome',
        'color': 'blue',
        'testID': 'statusIcon'
    });
});

test('That a 5 displays a blue question mark', () => {
    const wrapper = shallow(
        <TechnicalStatus status={5}/>
    );

    const icon = wrapper.findWhere((node) => {
        return node.prop('testID') === 'statusIcon';
    }).first();

    expect(icon).toExist();
    expect(icon.props()).toEqual({
        'name': 'question',
        'type':'font-awesome',
        'color': 'blue',
        'testID': 'statusIcon'
    });
});

test('That a 1 displays a red frown', () => {
    const wrapper = shallow(
        <TechnicalStatus status={1}/>
    );

    const icon = wrapper.findWhere((node) => {
        return node.prop('testID') === 'statusIcon';
    }).first();

    expect(icon).toExist();
    expect(icon.props()).toEqual({
        'name': 'frown',
        'type':'font-awesome',
        'color': 'red',
        'testID': 'statusIcon'
    });
});

test('That a 1.6 displays a red frown', () => {
    const wrapper = shallow(
        <TechnicalStatus status={1.6}/>
    );

    const icon = wrapper.findWhere((node) => {
        return node.prop('testID') === 'statusIcon';
    }).first();

    expect(icon).toExist();
    expect(icon.props()).toEqual({
        'name': 'frown',
        'type':'font-awesome',
        'color': 'red',
        'testID': 'statusIcon'
    });
});

test('That a 2 displays a yellow meh', () => {
    const wrapper = shallow(
        <TechnicalStatus status={2}/>
    );

    const icon = wrapper.findWhere((node) => {
        return node.prop('testID') === 'statusIcon';
    }).first();

    expect(icon).toExist();
    expect(icon.props()).toEqual({
        'name': 'meh',
        'type':'font-awesome',
        'color': 'yellow',
        'testID': 'statusIcon'
    });
});

test('That a 3 displays a green smile', () => {
    const wrapper = shallow(
        <TechnicalStatus status={3}/>
    );

    const icon = wrapper.findWhere((node) => {
        return node.prop('testID') === 'statusIcon';
    }).first();

    expect(icon).toExist();
    expect(icon.props()).toEqual({
        'name': 'smile',
        'type':'font-awesome',
        'color': 'green',
        'testID': 'statusIcon'
    });
});

test('That a 4 displays a blue star', () => {
    const wrapper = shallow(
        <TechnicalStatus status={4}/>
    );

    const icon = wrapper.findWhere((node) => {
        return node.prop('testID') === 'statusIcon';
    }).first();

    expect(icon).toExist();
    expect(icon.props()).toEqual({
        'name': 'star',
        'type':'font-awesome',
        'color': 'blue',
        'testID': 'statusIcon'
    });
});