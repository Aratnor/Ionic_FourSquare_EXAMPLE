import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { GoogleMaps }  from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';

import { HTTP} from '@ionic-native/http';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FsquareDataProvider } from '../providers/fsquare-data/fsquare-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    HTTP,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FsquareDataProvider
  ]
})
export class AppModule {}
