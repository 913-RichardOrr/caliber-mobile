
export function mockNav() {
    const mockedNav = jest.fn();
    jest.mock('@react-navigation/core', () => {
        return {
            useNavigation: () => ({ navigate: mockedNav })
        }
    });
}

export function mockTabs() {
    const mockedTabs = jest.fn();
    jest.mock('@react-navigation/material-top-tabs', () => {
        return {
            useNavigation: () => ({ navigate: mockedTabs })
        }
    });
}

export function mockSearch() {
    const mockedSearch = jest.fn();
    jest.mock('react-native-elements', () => {
        return {
            mockedSearch
        }
    })
}

export function mockFilter() {
    const mockedFilter = jest.fn();
    jest.mock('react-native-search-filter', () => {
        return {
            createFilter: () => mockedFilter
        }
    })
}

export function mockAlphabet() {
    const mockedAlphabet = jest.fn();
    jest.mock('react-native-section-alphabet-list', () => {
        return {
            mockedAlphabet
        }
    })
}
