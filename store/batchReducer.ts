import { CaliberState } from './store';
import * as Actions from './actions';
import Batch from '../batches/Batch';
import { initialState } from './initialState';
import { AssociateWithFeedback } from '../associate/AssociateService';

const batchReducer = (
  state: CaliberState = initialState,
  action: Actions.AppAction
): CaliberState => {
  const newState = { ...state };

  switch (action.type) {
    case Actions.BatchActions.GetBatches:
      newState.batches = action.payload as Batch[];
      return newState;
    case Actions.BatchActions.ChangeBatch:
      newState.batch = action.payload as Batch;
    case Actions.AssociateActions.GetAssociates:
      newState.associates = action.payload as AssociateWithFeedback[];
      return newState;
    default:
      return state;
  }
};

export default batchReducer;
