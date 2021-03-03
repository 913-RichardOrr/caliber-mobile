import configureMockStore from 'redux-mock-store'





const mockStore = configureMockStore();
const initialState = {
    WeekCategoryReducer: {
        weekCategories: [],
        weekCategory: [],
    },
    categoryReducer: {
        categories: []
    }
}
let store: any;


describe('Tests for WeekCategoryListContianer.tsx', () => {
    beforeEach(() => {
        store = mockStore(initialState);
    })

    
})
