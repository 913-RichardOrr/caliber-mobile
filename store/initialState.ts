import Batch from '../batches/batch';
import { UserInfo, UserInput } from '../user/user';
import { WeekCategory } from '../weekCategories/weekCategory';
import { CaliberState } from './store';
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
  activeCat: [],
  staleCat: [],
  render: true
};
