import { Category } from "../../categoriesFeature/Category";
import { CaliberState } from "../store"
import { initialState } from "../initialState";
import * as Actions from './CategoryActions';

const categoryReducer = (state: CaliberState = initialState, action: Actions.AppAction): CaliberState => {
    const newState = {...state}; 

    switch (action.type) {    
        case Actions.CategoryActions.GetCategories:
            newState.categories = action.payload as Category[];
            return newState;
        default: 
            return state;
    }
}
export default categoryReducer;