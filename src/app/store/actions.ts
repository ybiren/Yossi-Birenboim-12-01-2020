import { Action } from '@ngrx/store';
import { IDailyForecast } from '../interfaces/dailyForecast';
import { ILocation } from '../interfaces/location';

export enum ActionTypes {
  LoadWeather='1',
  GetWeatherSuccess='2',
  SetSelectedLocation='3',
  GetLocationsByPrefix='4',
  GetLocationsByPrefixSuccess='5'
}

export class GetWeather implements Action {
  readonly type = ActionTypes.LoadWeather.toString();
  constructor(public payload: any) {}

}
export class SetSelLocation implements Action {
    readonly type = ActionTypes.SetSelectedLocation.toString();
    constructor(public payload: ILocation) {}
}

export class GetLocationByPrefix implements Action {
  readonly type = ActionTypes.GetLocationsByPrefix.toString();
  constructor(public payload: string) {}
}





export type ActionsUnion = GetWeather | GetLocationByPrefix; 