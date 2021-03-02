/**
 * @jest-environment jsdom
 */
import Enzyme from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import ManageCategories from '../../categoriesFeature/ManageCategories';


describe('ManageCategories component', () => {
    const mockedNav = jest.fn();
    jest.mock('@react-navigation/core', () => {
        return {
            useNavigation: () => ({ navigate: mockedNav })
        }
    });
    let wrapper: any;
    beforeAll(() => {
        wrapper = Enzyme.mount(
            <ManageCategories></ManageCategories>
        )
    });

    test('that it has an Add Assessment Category button that calls openModal()', () => {
        const openModal = jest.fn();
        const button = wrapper.findWhere((node: any) => node.prop('testID') === 'openModalButton');
        button.simulate('click');
        expect(openModal).toBeCalled();;
    });

    test('that it tabs for active table and it takes in active status prop', () => {
        const activeTab = wrapper.findWhere((node: any) => node.prop('testID') === 'activeTab');
        const isActive = 'active';
        activeTab.simulate('click');
        expect(mockedNav).toHaveBeenCalledTimes(1);
        expect(mockedNav).toHaveBeenCalledWith('CategoryTable', isActive);
    });

    test('that it tabs for inactive table and it takes in inactive status prop', () => {
        const inactiveTab = wrapper.findWhere((node: any) => node.prop('testID') === 'inactiveTab');
        const isActive = 'inactive';
        inactiveTab.simulate('click');
        expect(mockedNav).toHaveBeenCalledTimes(1);
        expect(mockedNav).toHaveBeenCalledWith('CategoryTable', isActive);
    });
});

// describe('openModal function', () => {
//     beforeAll(() => {
//         wrapper = Enzyme.mount(
//             <ManageCategories></ManageCategories>
//         )
//     });

//     test('has a textInput for category name', () => {
//         const textInput = wrapper.findWhere((node: any) => node.prop('testID') === 'categoryNameTextInput');
//         textInput.simulate('change', {target: {value: 'Category'}});
//         expect(textInput).toBe('Category');     
//     });


//     test('has a button that calls addCategory()', () => {
//         const button = wrapper.findWhere((node: any) => node.prop('testID') === 'addCategoryButton');
//         const addCategory = jest.fn();
//         button.simulate('click');
//         expect(addCategory).toBeCalled();
//     });

//     test('creates an alert for sucessfully creating a category', () => {
//         const alertText = wrapper.findWhere((node: any) => node.prop('testID') === 'alertText');
//         expect(alertText.length).toBe(1);
//     });


//     test('has a button that closes the modal', () => {
//         const button = wrapper.findWhere((node: any) => node.prop('testID') === 'closeModalButton');
//         button.simulate('click');
//         expect(button).toBeCalled();
//     });
// });

// describe('addCategory function', () => {
//     test('calls categoryService.addCategory', () => {
//         const serviceAddCategory = jest.fn().mockImplementation( (skill, isActive) => {});
//         const skill = 'test';
//         const isActive = true;
//         expect(serviceAddCategory).toBeCalledTimes(1);
//         expect(serviceAddCategory).toBeCalledWith(skill, isActive);
//     });

//     test('adds category to corresponding table', () => {
//         const isActive = true;
//         expect(mockedNav).toBeCalledTimes(1);
//         expect(mockedNav).toBeCalledWith('CategoryTable', isActive);
//     });
// });
