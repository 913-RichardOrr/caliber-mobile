import Batch from '../batches/Batch';
import { UserInfo, UserInput } from '../user/user';
import { CaliberState } from './store';

//add your initial states here and import it in your reducer
export const initialState: CaliberState = {
	user: new UserInfo(),
	userLogin: new UserInput(),
	batches: [],
	batch: new Batch()
};
