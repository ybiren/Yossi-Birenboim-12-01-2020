import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/location';
import { CELSIUS } from '../consts/consts';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private favorlist: ILocation[];
  
  constructor() { 
    this.favorlist = <ILocation[]>JSON.parse(localStorage.getItem('weather')) || [];
  }

  public GetAll() {
    return this.favorlist;
  }
  
  public GetByKey(locationKey: number) {
    return this.favorlist.find((item) => {
      return item.Key === locationKey;
    })
  }

  public Toggle(location: ILocation) {
    if(!this.Exist(location)) {
       this.Add(location);   
    } else {
       this.Remove(location);
    }
    localStorage.setItem('weather',JSON.stringify(this.favorlist));
  }

  public Exist(location: ILocation): boolean {
    return this.favorlist.findIndex((item) => {
      return item.Key === location.Key
    }) !== -1;
  }
  
  private Add(location: ILocation) {
    this.favorlist.push(location);
  }
  
  private Remove(location: ILocation) {
    this.favorlist = this.favorlist.filter((item) =>{
      return item.Key !== location.Key;
    })
  }

  public SetMetric(metric: string) {
    localStorage.setItem('weather-metric',metric);
  }
  
  public GetMetric(): string {
    return localStorage.getItem('weather-metric') || CELSIUS;
  }
}
