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
    ToastrModule.forRoot({
      "closeButton": false,
      "positionClass": "toast-bottom-full-width",
      "timeOut": 5000,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
