/**
 * @jest-environment jsdom
 */

import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';
<<<<<<< HEAD
import { WeekCategoryList } from '../../weekCategories/weekCategoryList';
import { Category } from '../../categoriesFeature/Category';





describe('tests for weekCategoryList', () => {
    test('that the component renders', () => {
        let testWeekList: Category[] = [];
        let testActiveList: Category[] = [];
        let testFunction = jest.fn();
        let wrapper = shallow(
            <WeekCategoryList weekId={0} weekCategoriesAsCategory={testWeekList} addCategory={testFunction} activeCategories={testActiveList} />
        )
        expect(wrapper.length).toEqual(1);
    })
    test('that a certain text is displayed if there are no categories for the week', () => {
        let testWeekList: Category[] = [];
        let testActiveList: Category[] = [];
        let testFunction = jest.fn();
        let wrapper = shallow(
            <WeekCategoryList weekId={0} weekCategoriesAsCategory={testWeekList} addCategory={testFunction} activeCategories={testActiveList} />
        )
        const noCatsText = wrapper.findWhere((node) => {
            return node.prop('testID') === 'noCats'
        });
        expect(noCatsText).toExist();
        expect(noCatsText.dive().text()).toBe('No Categories For This Week');
    });
    test('that categories are displayed if there are categories for the week', () => {
        let testWeekList: Category[] = [{categoryid:1,skill:'Test1',active:true},{categoryid:2,skill:'Test2',active:true},{categoryid:3,skill:'Test3',active:true},{categoryid:4,skill:'Test4',active:true},{categoryid:5,skill:'Test5',active:true}];
        let testActiveList: Category[] = [];
        let testFunction = jest.fn();
        let wrapper = shallow(
            <WeekCategoryList weekId={0} weekCategoriesAsCategory={testWeekList} addCategory={testFunction} activeCategories={testActiveList} />
        )
        const list = wrapper.findWhere((node) => {
            return node.prop('testID') === 'listOfWeekCats'
        });
        expect(list).toExist();
        expect(list.props().data).toBe(testWeekList); 
    });

    test('that menu displays categories when there are categories', ()=>{
        let testWeekList: Category[] = [];
        let testActiveList: Category[] = [{categoryid:1,skill:'Test1',active:true},{categoryid:2,skill:'Test2',active:true},{categoryid:3,skill:'Test3',active:true},{categoryid:4,skill:'Test4',active:true},{categoryid:5,skill:'Test5',active:true}];
        let testFunction = jest.fn();
        let wrapper = shallow(
            <WeekCategoryList weekId={0} weekCategoriesAsCategory={testWeekList} addCategory={testFunction} activeCategories={testActiveList} />
        )
        const list = wrapper.findWhere((node) => {
            return node.prop('testID') === 'listOfActiveCats'
        });
        
        expect(list).toExist();
        expect(list.props().data).toBe(testActiveList); 
    })

    test('that menu displays message when there are no categories', ()=>{
        let testWeekList: Category[] = [];
        let testActiveList: Category[] = [];
        let testFunction = jest.fn();
        let wrapper = shallow(
            <WeekCategoryList weekId={0} weekCategoriesAsCategory={testWeekList} addCategory={testFunction} activeCategories={testActiveList} />
        )
        const testText = wrapper.findWhere((node) => {
            return node.prop('testID') === 'noActiveCats'
        });
        expect(testText).toExist();
        expect(testText.dive().text()).toBe('No Active Categories'); 
    })


=======
import { WeekCategory } from '../../weekCategories/weekCategory';
import { CategoryTable } from '../../categories/categoryTable';
import weekCategoryService from '../../WeekCategories/WeekCategoryService';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import WeekCategoryList from '../../weekCategories/WeekCategoryList';
import { Category } from '../../categories/Category';

describe('tests for weekCategoryList', () => {
  test('that nothing is displayed if there are no categories for the week', () => {
    let returnValues = 0;
    const wrapper = Enzyme.mount(
      <WeekCategoryList weekId={returnValues}></WeekCategoryList>
    );
    expect(weekCategoryService.getCategory).toBeCalled();
    expect(weekCategoryService.getCategory).toBeCalledWith(weekId);
    expect(categoryService.getCategories).toBeCalled();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      getWeekCategories(thisWeekCats)
    );
  });

  test('that we create a list of active categories that are not in weekCategories and update store', () => {
    store = mockStore({
      weekCategories: [],
      categories: [],
    });
    store.dispatch = jest.fn();
    weekCategoryService.getCategory = jest.fn().mockReturnValue([
      { categoryId: 1, qcWeekId: 0 },
      { categoryId: 2, qcWeekId: 0 },
    ]);
    categoryService.getCategories = jest.fn().mockReturnValue([
      { categoryid: 0, skill: 'React', active: true },
      { categoryid: 1, skill: 'TypeScript', active: true },
      { categoryid: 2, skill: 'Redux', active: true },
    ]);
    let weekId = 0;
    let availabeCats: Category[] = [
      { categoryid: 1, skill: 'TypeScript', active: true },
      { categoryid: 2, skill: 'Redux', active: true },
    ];
    const wrapper = Enzyme.mount(
      <WeekCategoryList weekId={0}></WeekCategoryList>
    );
    const skill = wrapper.findWhere((node) => {
      return node.prop('testID') === 'skill';
    });
    store.dispatch = jest.fn();
    weekCategoryService.getCategory = jest.fn().mockReturnValue([]);
    categoryService.getCategories = jest.fn().mockReturnValue([
      { categoryid: 0, skill: 'React', active: true },
      { categoryid: 1, skill: 'TypeScript', active: true },
      { categoryid: 2, skill: 'Redux', active: true },
    ]);
    let testList: any = [];
    let weekId = 0;
    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <WeekCategoryList weekId={weekId}></WeekCategoryList>
      </Provider>
    );
    const flatList = wrapper.find(FlatList).first();
    expect(flatList.props().data).toEqual(testList);
  });

  test('that the flatList gets its items from state', () => {
    //Set up
    const cat1 = new Category();
    const cat2 = new Category();
    const testList = [cat1, cat2];
>>>>>>> 1fd30df632465d3346165af475198d26e3d67592

    //Mount component for testing
    const wrapper = Enzyme.mount(
      <WeekCategoryList weekId={weekId}></WeekCategoryList>
    );
    const flatList = wrapper.find(FlatList).first();
    expect(flatList.props().data).toEqual(testList);
  });
});
