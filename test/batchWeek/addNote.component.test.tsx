/**
 * @jest-environment jsdom
 */
import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import 'enzyme-adapter-react-16';


import { Input } from 'react-native-elements';

test('test adding an overall note', () => {
  const mockChange = jest.fn();
  
  const input = shallow(
    <Input onChangeText={mockChange} />
  );

  input.simulate('changeText', { target: { value: 'something' } });
  expect(mockChange).toHaveBeenCalled();

});