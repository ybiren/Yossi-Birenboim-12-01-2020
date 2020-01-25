import { ActionsUnion, ActionTypes} from '../actions';

    export const initialState = {
      selectedLocation: null,
    };


    export function LocationReducer(state = initialState, action: ActionsUnion) {
        switch (action.type) {
          case ActionTypes.SetSelectedLocation: {
               return {
                ...state,
                selectedLocation: action.payload
              }
          }
          default:
              return state; 
        }    
    }