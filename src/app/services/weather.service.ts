import { Injectable } from '@angular/core';
import {data} from '../../assets/dat';
import {locData} from '../../assets/locations';
import {currentConditions} from '../../assets/currentConditions';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {IDailyForecast} from '../interfaces/dailyForecast';
import {ILocation} from '../interfaces/location';
import { ICurrentConditions } from '../interfaces/currentConditions';
import { WEATHER_SVC_BASE_URL,API_KEY,CELSIUS } from '../consts/consts';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private obs$:Observable<object> = of(data);
  private obsLoc$:Observable<object> = of(locData);
  private obsCurrCond$:Observable<object> = of(currentConditions);
  

  constructor(private http:HttpClient, private toastr: ToastrService) { }
  
  public Get(location: ILocation, metricVal: string): Observable<IDailyForecast[]> {
    const isMetric = (metricVal === CELSIUS) ? true : false;
    const url = `${WEATHER_SVC_BASE_URL}/forecasts/v1/daily/5day/${location.Key}?apikey=${API_KEY}&metric=${isMetric}`;
    return this.http.get<ILocation[]>(url).pipe(map(dat=>dat["DailyForecasts"]), catchError(this.handleError.bind(this)));
    //return this.obs$.pipe<IDailyForecast[]>(map(dat=>dat["DailyForecasts"]));
  }

  public GetLocations(prefix: string): Observable<ILocation[]> {
    const url = `${WEATHER_SVC_BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${prefix}`;
    return this.http.get<ILocation[]>(url).pipe(catchError(this.handleError.bind(this)));
    //return <Observable<ILocation[]>>this.obsLoc$;
  }

  public GetCurrentConditions(locationKey: number): Observable<ICurrentConditions> {
    const url = `${WEATHER_SVC_BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`;
    return this.http.get<ICurrentConditions>(url).pipe(map(dat => dat[0]), catchError(this.handleError.bind(this)));
    //return this.obsCurrCond$.pipe<ICurrentConditions>(map(dat => dat[0]));
  }
   
  public GetLocationByLatLong(lat: number, lon:number):Observable<ILocation> {
    const url = `${WEATHER_SVC_BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`;
    return this.http.get<ILocation>(url).pipe(catchError(this.handleError.bind(this)));
    //return of({Key: 215613, LocalizedName: 'Ashdod'});
  }

  private handleError(error) {
    this.toastr.error(`${error.message}`,'Error');
  }

}
