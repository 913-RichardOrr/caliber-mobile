/**
 * @jest-environment jsdom
 */
import Enzyme from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import ManageCategories from '../../categoriesFeature/ManageCategories';

const mockedNav = jest.fn();


jest.mock('@react-navigation/core', () => {
    return {
        useNavigation: () => ({ navigate: mockedNav })
    }
});

const mockedTabs = jest.fn();

jest.mock('@react-navigation/material-top-tabs', () => {
    return {
        useNavigation: () => ({ navigate: mockedTabs }),
        createMaterialTopTabNavigator: ()=> {
            return {
                Screen: () => () => Component => props => <Component {...props}></Component>,
                Navigator: () => () => Component => props => <Component {...props}></Component>
            }
        }
    }
});

const mockedSearch = jest.fn();

jest.mock('react-native-elements', () => {
    return {
        mockedSearch
    }
})

const mockedFilter = jest.fn();

jest.mock('react-native-search-filter', () => {
    return {
        mockedFilter
    }
})

const mockedAlphabet = jest.fn();

jest.mock('react-native-section-alphabet-list', () => {
    return {
        mockedAlphabet
    }
})

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

describe('ManageCategories component when clicked is false', () => {
    let wrapper: any;
    beforeAll(() => {
        wrapper = Enzyme.shallow(
            <ManageCategories></ManageCategories>
        )
    });

    test('that it has an Add Category button', () => {
        const addCatBtn = wrapper.findWhere((node: any) => node.prop('testID') === 'addCatBtn').first();
        expect(addCatBtn).toExist();
    });
});

describe('addCategory function', () => {
    let wrapper: any;
    const value = '';
    beforeAll(() => {
        React.useState = jest.fn().mockImplementationOnce(() => {
            return [true, jest.fn()]
        }).mockImplementationOnce(() => {
            return ['', jest.fn()]
        });
        wrapper = Enzyme.shallow(
            <ManageCategories></ManageCategories>
        )
    });

    test('that modal is showing', () => {
        const addCatModal = wrapper.findWhere((node: any) => node.prop('testID') === 'addCatModal').first();
        expect(addCatModal).toExist();
    })

    test('that clicking Add Category button calls AddCategory function', () => {
        const prop = 'value';
        const AddCategory = jest.fn();
        const button = wrapper.findWhere((node: any) => node.prop('testID') === 'addBtn').first();
        button.simulate('click');
        expect(AddCategory).toBeCalledTimes(1);
        expect(AddCategory).toBeCalledWith(prop);
    })
});