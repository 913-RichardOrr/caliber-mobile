import App from './testComp';
import React from 'react'; 

// setup file
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

test('testing function by salman', () => {
const wrapper = shallow(<App />);
console.log(wrapper.debug()); 
expect(wrapper).toBeTruthy(); 
});


