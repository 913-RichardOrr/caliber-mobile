import * as Actions from './actions';
import { CaliberState } from './store';
import { initialState } from './initialState';
import QcWeek from '../batchWeek/QcWeek';

const weekReducer = (
    state: CaliberState = initialState,
    action: Actions.AppAction
): CaliberState => {
    const newState = { ...state };

    switch (action.type) {
        case Actions.WeekActions.GetWeeks:
            newState.weeks = action.payload as QcWeek[];
            return newState;
        case Actions.WeekActions.ChangeSelectedWeek:
            newState.selectedWeek = action.payload as QcWeek;
            return newState;
        case Actions.WeekActions.AddWeek:
            newState.weeks.push(action.payload);
            return newState;
        /* case Actions.WeekActions.AddNote:
            newState.selectedWeek = action.payload as QcWeek;
            return newState; */
        default:
            return state;
    }
};

export default weekReducer;
