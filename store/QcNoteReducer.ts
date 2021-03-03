import * as Actions from './actions';
import { CaliberState } from './store';
import { initialState } from './initialState';
import QcNote from '../batchWeek/QcNote';

const qcNoteReducer = (
    state: CaliberState = initialState,
    action: Actions.AppAction
): CaliberState => {
    const newState = { ...state };

    switch (action.type) {
        case Actions.QcNoteActions.GetNotes:
            newState.notes = action.payload as QcNote[];
            return newState;
        case Actions.QcNoteActions.ChangeSelectedNote:
            newState.selectedNote = action.payload as QcNote;
            return newState;
      
        default:
            return state;
    }
};

export default qcNoteReducer;