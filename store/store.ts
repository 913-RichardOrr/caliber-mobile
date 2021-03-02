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

export interface WeekCategoryState{
	weekCategories: Category[];
	weekCategory: weekCategory;
}

export interface CategoryState {
    categories: Category[];
}
export interface CaliberState extends UserState, CategoryState, BatchState, WeekState, WeekCategoryState, AssociateState {}

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
