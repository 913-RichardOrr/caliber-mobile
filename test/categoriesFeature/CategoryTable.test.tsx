/**
 * @jest-environment jsdom
 */
import Enzyme, {mount, shallow} from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import CategoryTable from '../../categoriesFeature/CategoryTable';

const mockedNav = jest.fn();
jest.mock('@react-navigation/core', () => {
    return {
        useNavigation: ()=> ({navigate: mockedNav})
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
        createFilter: () => mockedFilter
    }
})
const mockedAlphabet = jest.fn();
jest.mock('react-native-section-alphabet-list', () => {
    return {
        mockedAlphabet
    }
})


describe('CategoryTable component when rend is false', () => {
    let wrapper: any;

    beforeAll(() => {
        wrapper = Enzyme.shallow(
            <CategoryTable status={true}></CategoryTable>
        )
    });

    test('that it has toggle instructions', () => {
        const toggle = wrapper.findWhere((node: any) => node.prop('testID') === 'Toggle');
        expect(toggle.length).toBe(1);
    });

    test('that the searchbar view exists', () => {
        const searchBar = wrapper.findWhere((node: any) => node.prop('testID') === 'SearchBarView');
        expect(searchBar).toExist();
    })

    test('that the loading screen is shown on initial render', () => {
        const logo = wrapper.findWhere((node: any) => node.prop('testID') === 'logo');
        expect(logo).toExist();
    })
})

describe('CategoryTable when rend is true', () => {
    let wrapper: any;

    beforeAll(() => {
        React.useState = jest.fn().mockImplementationOnce(() => {
            return ['', jest.fn()]
        }).mockImplementationOnce(() => {
            return [[], jest.fn()]
        }).mockImplementationOnce(() => {
            return [[], jest.fn()]
        }).mockImplementationOnce(() => {
            return [true, jest.fn()]
        });
        wrapper = Enzyme.shallow(
            <CategoryTable status={true}></CategoryTable>
        )
    })

    test('that the alphabet view exists', () => {
        const alphaView = wrapper.findWhere((node: any) => node.prop('testID') === 'AlphabetView');
        expect(alphaView).toExist();
    })
})