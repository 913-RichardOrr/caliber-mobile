/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import Enzyme, { shallow } from 'enzyme';
import LoginComponent from '../../user/Login';

const mockedPixelPerfect = jest.fn();

describe('Test case for testing login', () => {
  beforeAll(() => {
    jest.mock('react-native-pixel-perfect', () => ({}));
  });

  test('check email', () => {
    let LoginProp: any;

    const wrapper = Enzyme.mount(<LoginComponent navigation={LoginProp} />);
    wrapper
      .find('input[type="text"]')
      .simulate('change', {
        target: { name: 'email', value: 'testuser@revature.net' },
      });
    expect(wrapper.state('username')).toEqual('testuser@revature.net');
  });
  it('check password', () => {
    let LoginProp: any;
    const wrapper = shallow(<LoginComponent navigation={LoginProp} />);
    wrapper
      .find('input[type="password"]')
      .simulate('change', { target: { name: 'password', value: 'pass' } });
    expect(wrapper.state('password')).toEqual('pass');
  });
  it('login check with right data', () => {
    let LoginProp: any;
    const wrapper: any = shallow(<LoginComponent navigation={LoginProp} />);
    wrapper
      .find('input[type="text"]')
      .simulate('change', {
        target: { name: 'email', value: 'testuser@revature.net' },
      });
    wrapper
      .find('input[type="password"]')
      .simulate('change', { target: { name: 'password', value: 'pass' } });
    wrapper.find('button').simulate('click');
    expect(wrapper.state('loggedin')).toBe(true);
  });
  it('login check with wrong data', () => {
    let LoginProp: any;
    const wrapper: any = shallow(<LoginComponent navigation={LoginProp} />);
    wrapper
      .find('input[type="text"]')
      .simulate('change', {
        target: { name: 'username', value: 'testuser@revature.net' },
      });
    wrapper
      .find('input[type="password"]')
      .simulate('change', { target: { name: 'password', value: 'wrongpass' } });
    wrapper.find('button').simulate('click');
    expect(wrapper.state('loggedin')).toBe(false);
  });
  it('button click logs user in and redirects', () => {
    let LoginProp: any;
    const wrapper: any = shallow(<LoginComponent navigation={LoginProp} />);
    const button = wrapper.find('button');
    button.props().onPress();
    wrapper.update();
    expect(button).toHaveBeenCalled();
  });
});
