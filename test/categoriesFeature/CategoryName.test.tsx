/**
 * @jest-environment jsdom
 */
import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import CategoryName from '../../categoriesFeature/CategoryName';
import { Category } from '../../categoriesFeature/Category';
import { Provider } from 'react-redux';
import store from '../../store/store';
import CategoryService from '../../categoriesFeature/CategoryService';

const mockedNav = jest.fn();


jest.mock('@react-navigation/core', () => {
    return {
        useNavigation: () => ({ navigate: mockedNav })
    }
});




describe('CategoryName component when render is false', () => {
    let wrapper: any;
    let prop: Category = new Category();
    prop.skill = 'testSkill';
    prop.categoryid = 1;
    prop.active = true;

    beforeAll(() => {
        wrapper = Enzyme.mount(
            <Provider store={store}><CategoryName skill={prop.skill} categoryid={prop.categoryid} active={prop.active}></CategoryName></Provider>
        )
    });

    test('that it has a category name', () => {
        const categoryNameList = wrapper.findWhere((node: any) => node.prop('testID') === 'categoryNameList');
        expect(categoryNameList.first()).toExist();
        expect(categoryNameList.first().text()).toBe('testSkill');
    });
});

describe('changeStatus function', () => {
    let wrapper: any;
    let prop: Category = new Category();
    prop.skill = 'testSkill';
    prop.categoryid = 1;
    prop.active = true;
    beforeAll(() => {
        wrapper = Enzyme.mount(
            <Provider store={store}><CategoryName skill={prop.skill} categoryid={prop.categoryid} active={prop.active}></CategoryName></Provider>
        )
    });
    test('that it calls categoryService.updateCategory with the category', async () => {
        prop.active = false;
        CategoryService.updateCategory = jest.fn().mockResolvedValue(prop);
        const statusBtn = wrapper.findWhere((node: any) => node.prop('testID') === 'statusBtn').first();
        statusBtn.simulate('click');
        expect(CategoryService.updateCategory).toBeCalledTimes(1);
        expect(CategoryService.updateCategory).toBeCalledWith(prop);
    });

    test('that it re-renders to have the updated categories', () => {
        const mockDispatch = jest.fn();
        jest.mock('react-redux', () => ({
            useSelector: jest.fn(),
            useDispatch: () => mockDispatch
        }));
        CategoryService.updateCategory = jest.fn().mockResolvedValue(prop);
        const statusBtn = wrapper.findWhere((node: any) => node.prop('testID') === 'statusBtn').first();
        statusBtn.simulate('click');
        const isActive = true;
        CategoryService.updateCategory(prop).then(() => {
            expect(mockDispatch).toBeCalledTimes(1);
        })
    });
});

describe('EditCategory function', () => {
    let wrapper: any;
    let prop: Category = new Category();
    prop.skill = 'testSkill';
    prop.categoryid = 1;
    prop.active = true;

    beforeAll(() => {
        React.useState = jest.fn().mockImplementationOnce(() => {
            return [true, jest.fn()]
        }).mockImplementationOnce(() => {
            return ['', jest.fn()]
        }).mockImplementationOnce(() => {
            return [true, jest.fn()]
        });

        wrapper = Enzyme.shallow(
            <CategoryName skill={prop.skill} active={prop.active} categoryid={prop.categoryid}></CategoryName>
        )
    });

    test('that modal is open when clicked is true', () => {
        const mockDispatch = jest.fn();
        jest.mock('react-redux', () => ({
            useSelector: jest.fn(),
            useDispatch: () => mockDispatch
        }));
        const modal = wrapper.findWhere((node: any) => node.prop('testID') === 'modal').first();
        expect(modal.first()).toExist();
    })

    // test('that modal is open when render is true', () => {
    //     const modal = wrapper.findWhere((node: any) => node.prop('testID') === 'modal').first();
    //     //modalBtn.first().simulate('click');
    //     //wrapper.instance().clicked.toBe(true);
    //     expect(modal.first()).toExist();
    // });

    // test('that EditCategory is called when button is pushed', () => {
    //     const EditCategory = jest.fn();
    //     prop.skill = 'newSkill'
    //     CategoryService.updateCategory = jest.fn().mockResolvedValue(prop);
    //     const editBtn = wrapper.findWhere((node: any) => node.prop('testID') === 'editBtn').first();
    //     editBtn.simulate('click');
    //     expect(EditCategory).toHaveBeenCalled();
    // })
})
