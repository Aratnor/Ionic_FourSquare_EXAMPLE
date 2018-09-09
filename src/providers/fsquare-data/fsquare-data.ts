import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import {JsonObject, JsonProperty} from "json2typescript";
import { Marker, GoogleMapsEvent, GoogleMap } from '@ionic-native/google-maps';
/*
  Generated class for the FsquareDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface VenueDetail {
    likes: string,
    price: string,
    tier: string
}

@Injectable()
export class FsquareDataProvider {
  private client_id = '54G0IGDUWXHZF4E50HG03VY0UVOLAKADU3CULNQ130RY0P4C';

  private client_secret = 'CRHOAGCQVRVPCYOSC0O3SZCAJM104Z5KKZNURD2HLFJMCSPL';

  map: GoogleMap;

  venueIds: string[] = new Array(10);

  constructor(public http: HttpClient) {
    console.log('Hello FsquareDataProvider Provider');
  }
  firstCall(latitude: number,longitude: number,radius: number,categoryId: string){
    this.http.get('https://api.foursquare.com/v2/venues/search?'+
    'client_id='+this.client_id +
    '&client_secret='+ this.client_secret +
    '&v=20180509&limit=10'+
    '&ll='+ latitude + ','+ longitude +
    '&categoryId='+categoryId +
    '&radius='+radius).subscribe(data => {

      for(let i=0;i<10;i++){

      let marker: Marker = this.map.addMarkerSync({
        title: data['response']['venues'][i]['name'] ,
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: data['response']['venues'][i]['location']['lat'],
          lng: data['response']['venues'][i]['location']['lng']
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          //this.getVDetail(data['response']['venues'][i]['id']);
      });
    }
    });
  }

  exploreVenueWithOutDetail(latitude: number,longitude: number,radius: number,venue_number: number,categoryId: string) {
      this.http.get('https://api.foursquare.com/v2/venues/explore?'+
      'client_id='+this.client_id +
      '&client_secret='+ this.client_secret +
      '&v=20180509'+
      '&limit='+venue_number+
      '&ll='+ latitude + ','+ longitude +
      '&categoryId=' + categoryId +
      '&radius'+radius +
      '&sortByDistance=1'
    ).subscribe(data => {
      for(let i=0;i<venue_number;i++){

              let marker: Marker = this.map.addMarkerSync({
                title: data['response']['groups'][0]['items'][i]['venue']['name'] ,
                icon: 'blue',
                animation: 'DROP',
                position: {
                  lat: data['response']['groups'][0]['items'][i]['venue']['location']['lat'],
                  lng: data['response']['groups'][0]['items'][i]['venue']['location']['lng']
                }
              });
              marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                  //this.getVDetail(data['response']['venues'][i]['id']);
              });
      }
    });

  }

  exploreVenue(latitude: number,longitude: number,radius: number,venue_number: number,categoryId: string) {
    this.http.get('https://api.foursquare.com/v2/venues/explore?'+
    'client_id='+this.client_id +
    '&client_secret='+ this.client_secret +
    '&v=20180509'+
    '&limit='+ venue_number +
    '&ll='+ latitude + ','+ longitude +
    '&categoryId=' + categoryId+
    '&radius'+radius
  ).subscribe(data => {
      console.log(data['response']);
      for(let i= 0;i<venue_number;i++){
      console.log(data['response']['groups'][0]['items'][i]['venue']['name']);
      this.getVDetail(data['response']['groups'][0]['items'][i]['venue']['id']);
    }
  });
  }
  getVDetail(venueId: string){
    this.http.get('https://api.foursquare.com/v2/venues/' +
     venueId+"?"+
    '&client_id='+this.client_id +
    '&client_secret='+ this.client_secret +
    '&v=20180509'
  )
    .subscribe(data => {
      console.log("venue :");
      console.log(data['response']['venue']);

      console.log("likes :");
      console.log(data['response']['venue']['likes']['count']);

      console.log("price :");
      console.log(data['response']['venue']['price'] );
      console.log("Message :" + data['response']['venue']['price']['message']);

      console.log("rating :");
      console.log(data['response']['venue']['rating']);

      console.log("like: " +data['response']['venue']['likes']['count']);
      let marker: Marker = this.map.addMarkerSync({
        title: data['response']['venue']['name'] ,
        snippet: 'derece :' + data['response']['venue']['rating'],
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: data['response']['venue']['location']['lat'],
          lng: data['response']['venue']['location']['lng']
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      });
    });
  }
}
