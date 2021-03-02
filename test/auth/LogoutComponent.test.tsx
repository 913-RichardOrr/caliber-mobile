import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import LogoutComponent from '../../user/Logout';
import {logout} from './functions';

jest.mock('./functions', () => {
    signOut: {
        logout: jest
        .fn()
        .mockImplementation( () => 
            Promise.resolve(true)
        )
    } 
})

test('onPress', () => {
        const wrapper = shallow(
        <LogoutComponent/>
    );

    wrapper.simulate('press');
    expect(logout);

})