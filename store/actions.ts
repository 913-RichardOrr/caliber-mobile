import { UserInfo, UserInput } from '../user/user';
import Batch from '../batches/batch';
import { AssociateWithFeedback } from '../associate/AssociateService';
import QcWeek from '../batchWeek/QcWeek';
import weekReducer from './WeekReducer';

export enum BatchActions {
	GetBatches = 'GET_BATCHES',
}
export enum WeekActions {
	GetWeeks = 'GET_WEEKS',
	ChangeSelectedWeek = 'CHANGE_SELECTED_WEEK',
	AddWeek = 'ADD_WEEK',
	AddNote = 'ADD_NOTE'
}
export enum UserActions {
	GetUser = 'GET_USER',
	LoginChange = 'CHANGE_LOGIN',
}


export enum AssociateActions {
	GetAssociates = 'GET_ASSOCIATES',

}

export enum BatchWeekActions {
	GetWeek = 'GET_WEEK',
	NoteChange = 'CHANGE_NOTE',
}

export interface AppAction {
	type: string;
	payload: any;
}

export interface UserAction<P> extends AppAction {
	type: UserActions;
	payload: P;
}

export interface BatchAction extends AppAction {
	type: BatchActions;
	payload: Batch[];
}

export interface AssociateAction extends AppAction {
	type: AssociateActions;
	payload: AssociateWithFeedback[];
}

/**
 * Set the associates in the state to whatever is currently displaying in the UI.
 * @param associates 
 */
export function getAssociates(associates: AssociateWithFeedback[]): AssociateAction {
	const action: AssociateAction = {
		type: AssociateActions.GetAssociates,
		payload: associates,
	};
	return action;
}
	export interface WeekAction extends AppAction {
		type: WeekActions;
		payload: QcWeek | QcWeek[];
	}

	//info of the user that is logged in
	export function getUser(user: UserInfo): UserAction<UserInfo> {
		const action: UserAction<UserInfo> = {
			type: UserActions.GetUser,
			payload: user,
		};
		return action;
	}

	//user input
	export function loginChange(user: UserInput): UserAction<UserInput> {
		const action: UserAction<UserInput> = {
			type: UserActions.LoginChange,
			payload: user,
		};
		return action;
	}

	export function getBatches(batches: Batch[]): BatchAction {
		const action: BatchAction = {
			type: BatchActions.GetBatches,
			payload: batches,
		};
		return action;
	}

	export function getWeeks(weeks: QcWeek[]): WeekAction {
		const action: WeekAction = {
			type: WeekActions.GetWeeks,
			payload: weeks
		};
		return action;
	}

	export function changeSelectedWeek(week: QcWeek): WeekAction {
		const action: WeekAction = {
			type: WeekActions.ChangeSelectedWeek,
			payload: week
		};
		return action;
	}

	export function addWeek(week: QcWeek): WeekAction {
		const action: WeekAction = {
			type: WeekActions.AddWeek,
			payload: week
		};
		return action;
	}

	export function addOverallNote(week: QcWeek): WeekAction {
		const action: WeekAction = {
			type: WeekActions.ChangeSelectedWeek,
			payload: week
		};
		return action;
	}