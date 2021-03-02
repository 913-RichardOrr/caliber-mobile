import { Category } from '../categoriesFeature/Category';
import * as Actions from './actions';
import { initialState } from './initialState';
import { CaliberState } from './store';

const WeekCategoryReducer = (
  action: Actions.AppAction,
  state: CaliberState = initialState
  
): CaliberState => {
  const newState = { ...state };
  switch (action.type) {
    case Actions.WeekCategoryActions.AddWeekCategory:
      newState.weekCategories = [...state.weekCategories, action.payload];
      return newState;
    case Actions.WeekCategoryActions.DeleteWeekCategory:
      newState.weekCategories = state.weekCategories.filter(
        (cat) => cat.categoryid !== action.payload.categoryID
      );
      return newState;
    case Actions.WeekCategoryActions.GetWeekCategories:
      newState.weekCategories = action.payload as Category[];
      return newState;
    case Actions.WeekCategoryActions.CategoriesMenuOptions:
      newState.categories = action.payload as Category[];
      return newState;
    default:
      return state;
  }
};

export default WeekCategoryReducer;