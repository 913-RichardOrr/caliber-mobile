/**
 * @jest-environment jsdom
 */
import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import * as reactModule from 'react';
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
        useNavigation: ()=> ({navigate: mockedNav})
    }
});

describe('CategoryName component', () => {
    let wrapper: any;
    let prop: Category = new Category();
    prop.skill = 'testSkill';
    prop.categoryid = 1;
    prop.active = true;
    let props: Category[] = [];

    beforeAll(() => {
        wrapper = Enzyme.mount(
            <Provider store={store}><CategoryName skill={prop.skill} categoryid={prop.categoryid} active={prop.active} categories={props}></CategoryName></Provider>
        )
    });

    test('that it has a category name', () => {
        const categoryNameList = wrapper.findWhere((node: any) => node.prop('testID') === 'categoryNameList');
        expect(categoryNameList.first()).toExist();
        expect(categoryNameList.first().text()).toBe('testSkill');
    });

    test('that modal opens when edit button is pressed', () => {
        const clickedValue = true;
        reactModule.useState = jest.fn(initialClickedValue => [
            clickedValue,
            () => {}
        ])
        //const modal = wrapper.findWhere((node: any) => node.prop('testID') === 'modal').first();
        const modalBtn = wrapper.findWhere((node: any) => node.prop('testID') === 'modalBtn').first();
        //modalBtn.first().simulate('click');
        //expect(modal.first()).toExist();
        expect(modalBtn.first()).toExist();
    });

    // test('that text color is correct when status is active', () => {
    //     prop.active = true;
    //     prop.skill = 'React';
    //     let containerStyle = wrapper.get(0).style;
    //     expect(containerStyle).toHaveProperty('color', '#F26925');  
    // });

    // test('that text color is correct when status is inactive', () => {
    //     prop.active = false;
    //     prop.skill = 'React';
    //     let inactiveSkillColor = wrapper.get(0).style;
    //     expect(inactiveSkillColor).toHaveProperty('color', '#474C55');
    // });
});

describe('EditCategory function', () => {
    let wrapper: any;
    let prop: Category = new Category();
    prop.skill = 'testSkill';
    prop.categoryid = 1;
    prop.active = true;
    let props: Category[] = [];

    beforeAll(() => {
        wrapper = Enzyme.mount(
            <Provider store={store}><CategoryName skill={prop.skill} categoryid={prop.categoryid} active={prop.active} categories={props}></CategoryName></Provider>
        )
    });
    
    test('that EditCategory is called when button is pushed', () => {
        const EditCategory = jest.fn();
        // const myComponent = mount(<Provider store={store}><CategoryName skill={prop.skill} categoryid={prop.categoryid} active={prop.active} categories={props} /></Provider>);
        // myComponent.setState(true);
        const editBtn = wrapper.findWhere((node: any) => node.prop('testID') === 'editBtn').first();
        editBtn.simulate('click');
        expect(EditCategory).toHaveBeenCalled();
    })
})

describe('changeStatus function', () => {
    let wrapper: any;
    let prop: Category = new Category();
    prop.skill = 'testSkill';
    prop.categoryid = 1;
    prop.active = true;
    let props: Category[] = [];
    beforeAll(() => {
        wrapper = Enzyme.mount(
            <Provider store={store}><CategoryName skill={prop.skill} categoryid={prop.categoryid} active={prop.active} categories={props}></CategoryName></Provider>
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
