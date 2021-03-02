
import { Category } from "../../categoriesFeature/Category";
import { CaliberState } from "../store"
import { initialState } from "../initialState";
import * as Action from '../actions';
import * as Actions from './CategoryActions'

const categoryReducer = (state: CaliberState = initialState, action: Action.AppAction): CaliberState => {
    const newState = {...state};

    switch (action.type) {    
        case Actions.CategoryActions.GetActive:
            newState.activeCat = action.payload as Category[];
            return newState;
        case Actions.CategoryActions.GetStale:
            newState.staleCat = action.payload as Category[];
            return newState;
        default: 
            return state;
    }
}
export default categoryReducer;