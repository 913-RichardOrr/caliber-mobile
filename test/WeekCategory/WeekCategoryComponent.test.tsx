//import 'jsdom-global/register';
import React from 'react';
import { View, Text } from 'react-native';

import 'jest-enzyme';
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {weekCategory} from '../../weekCategories/WeekCategory';
import useDispatch from 'react-redux'
import weekCategoryService from '../../WeekCategories/WeekCategoryService';



configure({ adapter: new Adapter() })


describe('tests for weekCategory.component', () => {

    test('that category displays correctly', () => {

        const wrapper = shallow(<weekCategory />);
        expect(wrapper.debug().length).toBeGreaterThan(0);
        console.log(wrapper.debug());
    });

    test('that the button calls deleteCategory from categoryService and refreshes list', () => {
        const testCat = ' '
        const wrapper = Enzyme.mount(
            <weekCategory data={testCat}></weekCategory> 
        );
        weekCategoryService.deleteCategory() = jest.fn().mockReturnValue(true);
        useDispatch() = jest.fn();

    //     const button = wrapper.findWhere((node) => node.prop('testID') === 'button').first();
    //     button.simulate('click');


    //     expect(weekCategoryService.deleteCategory()).toBeCalledTimes(1);
    //     expect (useDispatch).toBeCalledTimes(1);



       
    // });
});