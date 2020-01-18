import { Component, OnInit, ElementRef } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import {StorageService} from '../../services/storage.service';
import { Observable } from 'rxjs';
import { debounce } from 'lodash';
import { IDailyForecast } from '../../interfaces/dailyForecast';
import { ILocation } from '../../interfaces/location';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_LOCATION, WKDS, CELSIUS, FAHRENHEIT, ADD_FAVOR_TXT, REMOVE_FAVOR_TXT } from '../../consts/consts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dailyForecast$: Observable<IDailyForecast[]>;
  public locations$: Observable<ILocation[]>;
  public selLocation: ILocation;
  public selectedMetric: string;
  public metricOptions: Array<string> = [CELSIUS, FAHRENHEIT];
  private lastLocationPrefix: string = null;

  private  locationsDebouncer = debounce((locationPrefix: string) => {
    if(locationPrefix && this.lastLocationPrefix !== locationPrefix) {
      this.locations$ = this.weatherSvc.GetLocations(locationPrefix);
      this.lastLocationPrefix = locationPrefix;
    }
  }, 300)
  
  constructor(private weatherSvc: WeatherService, private storageSvc: StorageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initSelectedLocation();
    this.selectedMetric = this.storageSvc.GetMetric()
    this.dailyForecast$ = this.weatherSvc.Get(this.selLocation, this.selectedMetric);
  }

  private initSelectedLocation() {
    this.selLocation = DEFAULT_LOCATION;
    if(this.route.snapshot.params.locationKey) {
      const location = this.storageSvc.GetByKey(this.route.snapshot.params.locationKey);
      if(location) {
        this.selLocation = location;
      }
    } else { 
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.weatherSvc.GetLocationByLatLong(position.coords.latitude, position.coords.longitude).subscribe((location: ILocation) =>{
            this.selLocation = location;
          }); 
        });
      }
    }
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
    this.dailyForecast$ = this.weatherSvc.Get(this.selLocation, this.selectedMetric);
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
  
  resetMetric() {
    this.storageSvc.SetMetric(this.selectedMetric);
    this.getWeatherForLocation();
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
