/**
 * @jest-environment jsdom
 */
import { shallow, ShallowWrapper, mount } from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import 'enzyme-adapter-react-16';

import AddNoteComponent from '../../batchWeek/AddNoteComponent';
import { Input } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from '../../store/store';
import BatchPageComponent from '../../batchPage/BatchPageComponent';

test('test adding an overall note', () => {
  const mockChange = jest.fn();
  
  const input = shallow(
    <Input onChangeText={mockChange} />
  );

  input.simulate('changeText', { target: { value: 'something' } });
  expect(mockChange).toHaveBeenCalled();

});