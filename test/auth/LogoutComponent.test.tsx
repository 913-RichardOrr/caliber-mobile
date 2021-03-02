import React from 'react';
import { shallow } from 'enzyme';
import LogoutComponent from '../../user/Logout';
import { logout } from './functions';

jest.mock('./functions', () => {
  signOut: {
    logout: jest.fn().mockImplementation(() => Promise.resolve(true));
  }
});

test('onPress', () => {
  const wrapper = shallow(<LogoutComponent />);

  wrapper.simulate('press');
  expect(logout);
});
