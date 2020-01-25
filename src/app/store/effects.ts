    import { Injectable } from '@angular/core';
    import { Actions, Effect, ofType } from '@ngrx/effects';
    import { EMPTY } from 'rxjs';
    import { catchError, map, mergeMap } from 'rxjs/operators';
    import { ActionTypes, ActionsUnion } from './actions';
    import { WeatherService } from './../services/weather.service';
    
    @Injectable()
    export class WeatherEffects {
      constructor(
        private actions$: Actions,
        private weatherService: WeatherService
      ) {}
      
      @Effect()
      loadFruits$ = this.actions$.pipe(
        ofType(ActionTypes.LoadWeather),
        mergeMap((action: ActionsUnion ) =>
          this.weatherService.Get(action.payload.location,action.payload.metric).pipe(
            map(dailyForcast => {
              return { type: ActionTypes.GetWeatherSuccess, payload: dailyForcast };
            }),
            catchError(() => EMPTY)
          )
        )
      );
    
      @Effect()
      loadLocation$ = this.actions$.pipe(
        ofType(ActionTypes.GetLocationsByPrefix),
        mergeMap((action: ActionsUnion ) =>
          this.weatherService.GetLocations(action.payload).pipe(
            map(locations => {
              return { type: ActionTypes.GetLocationsByPrefixSuccess, payload: locations };
            }),
            catchError(() => EMPTY)
          )
        )
      );
    
    
    }
