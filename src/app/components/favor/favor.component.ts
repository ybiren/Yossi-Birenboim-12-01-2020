import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { WeatherService } from '../../services/weather.service';
import { Observable, forkJoin } from 'rxjs';
import { ICurrentConditions } from '../../interfaces/currentConditions';
import { ILocation } from '../../interfaces/location';
import { IDailyForecast } from 'src/app/interfaces/dailyForecast';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favor',
  templateUrl: './favor.component.html',
  styleUrls: ['./favor.component.scss']
})
export class FavorComponent implements OnInit {

  public favorsArr: ILocation[]; 
  public currentConditions$: Observable<ICurrentConditions[]>

  constructor(private weatherSvc: WeatherService, private storageSvc: StorageService) { }
 
  ngOnInit() {
    
    const currentConditionsArr$ :Observable<ICurrentConditions>[] = [];
    this.favorsArr = this.storageSvc.GetAll();
    this.favorsArr.forEach(location => currentConditionsArr$.push(this.weatherSvc.GetCurrentConditions(location.Key)));
    this.currentConditions$ = forkJoin(currentConditionsArr$);
  }
 
}
