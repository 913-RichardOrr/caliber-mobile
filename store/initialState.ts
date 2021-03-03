import Batch from '../batches/batch';
import { UserInfo, UserInput } from '../user/user';
import { WeekCategory } from '../weekCategories/weekCategory';
import { CaliberState } from './store';
import QcWeek from '../batchWeek/QcWeek';
import QcNote from '../batchWeek/QcNote';

//add your initial states here and import it in your reducer
export const initialState: CaliberState = {
  associates: [],
  user: new UserInfo(),
  userLogin: new UserInput(),
  batches: [],
  weeks: [],
  notes: [],
  batch: new Batch(),
  selectedWeek: new QcWeek(),
  selectedNote: new QcNote(),
  weekCategory: new WeekCategory(),
  weekCategories: [],
  categories: [],
  activeCat: [],
  staleCat: []
};
