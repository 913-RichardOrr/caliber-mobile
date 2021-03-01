import {shallow} from "enzyme";
import React from 'react';
import { Button } from "react-native";
import AddWeek from '../../batchWeek/AddWeek/AddWeekComponent';

describe('Add New Week', () => {

  let props: any;
  beforeEach(() => {
    props = {};
    wrapper = shallow(<AddWeek {...props} />);
  });

  it('button click should add new week', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('');
    const wrapper = shallow(<AddWeek onPress={ onPressEvent } />);
    wrapper.find(Button).first().props().onPress();
    expect(onPressEvent.mock.calls.length).toBe(1);
  });
});