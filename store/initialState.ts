import Batch from '../batches/Batch';
import { UserInfo, UserInput } from '../user/user';
import { WeekCategory } from '../weekCategories/weekCategory';
import { CaliberState } from './store';
import QcWeek from '../batchWeek/QcWeek';

//add your initial states here and import it in your reducer
export const initialState: CaliberState = {
	user: new UserInfo(),
	userLogin: new UserInput(),
	batches: [],
	batch: new Batch()
};
