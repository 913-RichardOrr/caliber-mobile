//import 'jsdom-global/register';
/**
 * @jest-environment jsdom
 */

import React from 'react';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import { configure, shallow,../../weekCategories/WeekCategory
import Adapter from 'enzyme-adapter-react-16';
import {weekCategory} from '../../weekCategories/weekCategory';
import useDispatch from 'react-redux'
import weekCategoryService from '../../WeekCategories/WeekCategoryService';



configure({ adapter: new Adapter() })


describe('tests for weekCategory.component', () => {

    test('that category displays correctly', () => {

        const wrapper = shallow(
            <redux.Provider store={store}>
                <CategoryButton weekID={0} skill={'test'} catID={0}></CategoryButton>
            </redux.Provider>
        );

        expect(wrapper.debug().length).toBeGreaterThan(0);
    });

    test('that the button calls deleteCategory from categoryService and refreshes list', () => {
        const wrapper = shallow(
            <redux.Provider store={store}>
                <CategoryButton weekID={0} skill={'test'} catID={0}></CategoryButton>
            </redux.Provider>
        );
        weekCategoryService.deleteCategory = jest.fn();
        const button = wrapper.findWhere((node) => {
            console.log(node.getElements())
             return node.prop('testID') === 'button'}
            ).first();
        button.simulate('touch');
    });
});