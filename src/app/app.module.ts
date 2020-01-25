import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavorComponent } from './components/favor/favor.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/effects';
import { WeatherReducer } from './store/reducers/weatherReducer';
import { LocationReducer } from './store/reducers/locationReducer';
import { LocationsByPrefixReducer } from './store/reducers/locationsByPrefixReducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MatButtonToggleModule,
    EffectsModule.forRoot([WeatherEffects]),
    ToastrModule.forRoot({
      "closeButton": false,
      "positionClass": "toast-bottom-full-width",
      "timeOut": 5000,
    }),
    StoreModule.forRoot({ weather: WeatherReducer, selectedLocation: LocationReducer, locationsByPrefix: LocationsByPrefixReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
