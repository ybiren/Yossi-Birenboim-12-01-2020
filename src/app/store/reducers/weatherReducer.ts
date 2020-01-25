import { ActionsUnion, ActionTypes} from '../actions';
    
    export const initialState = {
      weather: []
    };


    export function WeatherReducer(state = initialState, action: ActionsUnion) {
        switch (action.type) {
          case ActionTypes.GetWeatherSuccess:
             return {
              ...state,
             weather: [...action.payload]
          };
          default:
              return state; 
        }    
    }