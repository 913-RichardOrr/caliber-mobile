import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import LoginComponent from '../../user/Login';

describe('Test case for testing login',() =>{
    
    test('check email', () => {
        const wrapper = Enzyme.mount(<LoginComponent />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: 'testuser@revature.net'}});
        expect(wrapper.state('username')).toEqual('testuser@revature.net');
    });
    it('check password', () => {
        wrapper = shallow(<LoginComponent />);    
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'pass'}});
        expect(wrapper.state('password')).toEqual('pass');
    });
    it('login check with right data',()=>{
        const wrapper: any = shallow(<LoginComponent />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: 'testuser@revature.net'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'pass'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('loggedin')).toBe(true);
    });
    it('login check with wrong data',()=>{
        const wrapper: any = shallow(<LoginComponent />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'testuser@revature.net'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'wrongpass'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('loggedin')).toBe(false);
    });
    it('button click logs user in and redirects', () => {
        const button = wrapper.find('button')
        button.props().onPress(); 
        wrapper.update();
        expect(button).toHaveBeenCalled();
    })
})