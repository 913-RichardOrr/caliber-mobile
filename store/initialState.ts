import Batch from '../batches/Batch';
import WeekSelectionComponent from '../batchWeek/WeekSelectionComponent';
import { Category } from '../categoriesFeature/Category';
import { UserInfo, UserInput } from '../user/user';
import { WeekCategory } from '../weekCategories/weekCategory';
import { CaliberState } from './store';
import {
  Associate,
  AssociateWithFeedback,
} from '../associate/AssociateService';
import QcWeek from '../batchWeek/QcWeek';

//add your initial states here and import it in your reducer
export const initialState: CaliberState = {
  associates: [],
  user: new UserInfo(),
  userLogin: new UserInput(),
  batches: [],
  weeks: [],
  batch: new Batch(),
  selectedWeek: new QcWeek(),
  weekCategory: new WeekCategory(),
  weekCategories: [],
  categories: [],
};
