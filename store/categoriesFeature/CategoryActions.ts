import {Category} from '../../categoriesFeature/Category';
import { AppAction } from '../actions';
import { CategoryState } from '../store';

export enum CategoryActions {
    GetActive = 'GET_ACTIVE',
    GetStale = 'GET_STALE',
    GetRender = 'GET_RENDER'
}


export interface CategoryAction<P> extends AppAction {
    type: CategoryActions;
    payload: P | P[] | boolean;
}

export function GetActive(categories: Category[]): CategoryAction<Category[]> {
    const action: CategoryAction<Category[]> = {
        type: CategoryActions.GetActive,
        payload: categories
    };
    return action;
}

export function GetStale(categories: Category[]): CategoryAction<Category[]> {
    const action: CategoryAction<Category[]> = {
        type: CategoryActions.GetStale,
        payload: categories
    };
    return action;
}

export function GetRender(bool: boolean): CategoryAction<boolean> {
    const action: CategoryAction<boolean> = {
        type: CategoryActions.GetRender,
        payload: bool
    };
    return action;
}