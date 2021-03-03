

const mockedNav = jest.fn();
jest.mock('@react-navigation/core', () => {
    return {
        useNavigation: () => ({ navigate: mockedNav })
    }
});

const mockedTabs = jest.fn();
jest.mock('@react-navigation/material-top-tabs', () => {
    return {
        useNavigation: () => ({ navigate: mockedTabs })
    }
});

const mockedSearch = jest.fn();
jest.mock('react-native-elements', () => {
    return {
        mockedSearch
    }
});

const mockedFilter = jest.fn();
jest.mock('react-native-search-filter', () => {
    return {
        createFilter: () => mockedFilter
    }
});

const mockedAlphabet = jest.fn();
jest.mock('react-native-section-alphabet-list', () => {
    return {
        mockedAlphabet
    }
});
