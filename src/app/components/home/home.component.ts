import { Component, OnInit, ElementRef } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import {StorageService} from '../../services/storage.service';
import { Observable, of } from 'rxjs';
import { debounce } from 'lodash';
import { IDailyForecast } from '../../interfaces/dailyForecast';
import { ILocation } from '../../interfaces/location';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_LOCATION, WKDS, CELSIUS, FAHRENHEIT, ADD_FAVOR_TXT, REMOVE_FAVOR_TXT } from '../../consts/consts';
import { select, Store } from '@ngrx/store';
import { GetWeather, SetSelLocation, GetLocationByPrefix } from './../../store/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dailyForecast$: Observable<IDailyForecast[]> = of([]);
  public locations$: Observable<ILocation[]>;
  public selLocation: ILocation;
  public selectedMetric: string;
  public metricOptions: Array<string> = [CELSIUS, FAHRENHEIT];
  private lastLocationPrefix: string = null;

  private  locationsDebouncer = debounce((locationPrefix: string) => {
    if(locationPrefix && this.lastLocationPrefix !== locationPrefix) {
      this.store.dispatch(new GetLocationByPrefix(locationPrefix));
      //this.locations$ = this.weatherSvc.GetLocations(locationPrefix);
      this.lastLocationPrefix = locationPrefix;
    }
  }, 300)
  
  constructor(private weatherSvc: WeatherService, private storageSvc: StorageService, private route: ActivatedRoute,
    private store: Store<{  weather: IDailyForecast[], selectedLocation: ILocation, locationsByPrefix: ILocation[]  }>) { 
      //store.pipe(select('weather') ).subscribe(data => alert("BB"+JSON.stringify(data)));
          
    }

  ngOnInit() {
    
    this.dailyForecast$ = this.store.pipe(select('weather'), map(data=>data["weather"])); //.subscribe(data => alert(JSON.stringify(data)));
    
    this.locations$ = this.store.pipe(select('locationsByPrefix'), map(data=>data["locationsByPrefix"])); //.subscribe((data) => {
      //alert(JSON.stringify(data));
    //});

    
    this.store.pipe(select('selectedLocation'), map(data=>data["selectedLocation"]) ).subscribe((data) => {
      this.selLocation = data;
      if(this.selLocation) {
        this.store.dispatch(new GetWeather({location: this.selLocation, metric: this.selectedMetric}));
      }
    });
    
    this.initSelectedLocation();
    this.selectedMetric = this.storageSvc.GetMetric()
    

  }

  private initSelectedLocation() {
    let selLocation = DEFAULT_LOCATION;
    if(this.route.snapshot.params.locationKey) {
      const location = this.storageSvc.GetByKey(this.route.snapshot.params.locationKey);
      if(location) {
        selLocation = location;
      }
    } else { 
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.weatherSvc.GetLocationByLatLong(position.coords.latitude, position.coords.longitude).subscribe((location: ILocation) =>{
            selLocation = location;
            this.store.dispatch(new SetSelLocation(selLocation));
  
          }); 
        });
      }
    }
    this.store.dispatch(new SetSelLocation(selLocation));
  }
  
  getDayStr(dt: number):String {
    return WKDS[new Date(dt * 1000).getDay()];
  }

  getLocations(locationPrefix: string) {
    this.locationsDebouncer(locationPrefix);
  }

  displayFn(location: ILocation) {
    return location ? location.LocalizedName : undefined;
  } 
  
  getWeatherForLocation(location?: ILocation) {
    if(location) {
      this.selLocation = location;
    }
    this.store.dispatch(new SetSelLocation(this.selLocation));
    //this.store.dispatch(new GetWeather({location: this.selLocation, metric: this.selectedMetric}));
    //this.dailyForecast$ = this.weatherSvc.Get(this.selLocation, this.selectedMetric);
  }

  isLocatonBookMarked() {
    return this.storageSvc.Exist(this.selLocation);
  }
  
  favorTxt() {
    const txt = this.selLocation && !this.isLocatonBookMarked() ? ADD_FAVOR_TXT : REMOVE_FAVOR_TXT;
    return txt;
  }

  toggleFavor() {
    this.storageSvc.Toggle(this.selLocation);
  }
  
  resetMetric(dailyForecastArr: IDailyForecast[]) {
    this.storageSvc.SetMetric(this.selectedMetric);
    dailyForecastArr.forEach((item) => {
       item.Temperature.Maximum.Value = 2*<number>item.Temperature.Maximum.Value;
    })
    //this.getWeatherForLocation();
  }
 
  getSelectedMetric() {
    return  {
      "deg-cel": this.selectedMetric !== FAHRENHEIT,
      "deg-fah": this.selectedMetric === FAHRENHEIT
    };
  }

  validateLocationInput(event): boolean {    
    let patt = /^[a-zA-Z]+$/;
    let result = patt.test(event.key);
    return result;
  }
}
