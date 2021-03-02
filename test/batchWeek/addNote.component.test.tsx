/**
 * @jest-environment jsdom
 */
import React from 'react';
import Enzyme from 'enzyme';
import AddNoteComponent from '../../batchWeek/AddNoteComponent';
import { Button, TextInput } from 'react-native';

test('test adding an overall note', () => {
    const wrapper = Enzyme.mount(<AddNoteComponent />);
    const mockFn = jest.fn();
    const mockChange = jest.fn();

    const input = Enzyme.shallow(
        <TextInput onChange={mockChange} />
    );
    input.simulate('change', { target: { value: 'something' } });
    expect(mockChange).toHaveBeenCalled();

    /* const tree = Enzyme.shallow(
        <Button title='button test' onPress={mockFn} />
    );
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled(); */

});