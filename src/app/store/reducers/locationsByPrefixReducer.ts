import { ActionsUnion, ActionTypes} from '../actions';

export const initialState = {
  locationsByPrefix: []
};

export function LocationsByPrefixReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.GetLocationsByPrefixSuccess: {
      return {
        ...state,
        locationsByPrefix: action.payload
      }
    }
    default:
      return state; 
  }    
}