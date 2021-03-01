import { combineReducers, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import batchReducer from './batchReducer';
import weekReducer from './WeekReducer';
import userReducer from './userReducer';
import Batch from '../batches/Batch';
import { AssociateWithFeedback } from '../associate/AssociateService';
import QcWeek from '../batchWeek/QcWeek';
import WeekCategoryReducer from './WeekCategoryReducer'
import { weekCategory } from '../weekCategories/weekCategory';
import { Category } from '../categoriesFeature/Category';
import categoryReducer from './categoriesFeature/CategoryReducer';
import { AppAction } from './actions';
import { UserInput, UserInfo } from '../user/user';

export interface BatchState {
	batch: Batch;
	batches: Batch[];
}

export interface WeekState {
	weeks: QcWeek[];
	selectedWeek: QcWeek;
}

export interface UserState {
	user: UserInfo;
	userLogin: UserInput;
}
export interface AssociateState {
	associates: AssociateWithFeedback[];
}
export interface CaliberState extends UserState, BatchState,AssociateState {}

export interface WeekCategoryState{
	weekCategories: Category[];
	weekCategory: weekCategory;
}

export interface CaliberState extends UserState, BatchState, WeekCategoryState {}


export interface CategoryState {
    categories: Category[];
}
export interface CaliberState extends UserState, CategoryState, BatchState, WeekCategoryState {}
// <> is generics: Generic arguments allow us to define the type of a thing at runtime instead of when we write it,
// creating a reusable object.

export interface CaliberState extends UserState, BatchState, WeekState {}

//add your reducer to the object
const rootReducer = combineReducers({
	userReducer,
	batchReducer,
	weekReducer,
	WeekCategoryReducer,
	categoryReducer
});

//user userSelector(state: RootState => state.yourReducer.yourPayload)
export type RootState = ReturnType<typeof rootReducer>;

const store: Store<RootState, AppAction> = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
