import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  LatLng,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';

import { HTTP } from '@ionic-native/http';
import { FsquareDataProvider } from '../../providers/fsquare-data/fsquare-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FsquareDataProvider],
})
export class HomePage {

  latitude: any;
  longitude: any;

  categoryId: string;
  radius: number;

  subscribe: any;

  mapOptions: any;

  rootPage: any;

  type: string;

  venue_number: number;

  constructor(public navCtrl: NavController,public platform: Platform,
    private geolocation: Geolocation,private http: HTTP,private fSquare: FsquareDataProvider) {
    this.initializeApp();
  }
  initializeApp() {
   this.platform.ready().then(() => {
     this.rootPage = HomePage;

     this.fSquare.map.clear();

   // Get the location of you
   this.fSquare.map.getMyLocation()
     .then((location: MyLocation) => {
       console.log(JSON.stringify(location, null ,2));
       this.latitude = location.latLng.lat;
       this.longitude = location.latLng.lng;
       // Move the map camera to the location with animation
       this.fSquare.map.animateCamera({
         target: location.latLng,
         zoom: 14,
         tilt: 30
       })
       .then(() => {
         // add a marker
         let marker: Marker = this.fSquare.map.addMarkerSync({
           title: 'Your Position',
           snippet: 'Suan Buradasınız.',
           position: location.latLng,
           animation: GoogleMapsAnimation.BOUNCE
         });

         // show the infoWindow
         marker.showInfoWindow();

         // If clicked it, display the alert
         marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
           console.log("Clicked");
         });

       });
     });
   });
 }
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    console.log("Map loading..");
     this.mapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 14,
         tilt: 30
       }
    };
    this.fSquare.map = GoogleMaps.create('map_canvas', this.mapOptions);
  }

  search(){
    this.fSquare.map.clear();
        // Move the map camera to the location with animation
        this.fSquare.map.animateCamera({
          target: {
            lat: this.latitude,
            lng: this.longitude
          },
          zoom: 14,
          tilt: 30
        })
        .then(() => {
          // add a marker
          let marker: Marker = this.fSquare.map.addMarkerSync({
            title: 'Your Position',
            snippet: 'Suan buaradasınız.',
            position: {
            lat: this.latitude,
            lng: this.longitude
          },
            animation: GoogleMapsAnimation.BOUNCE
          });

          // show the infoWindow
          marker.showInfoWindow();

          // If clicked it, display the alert
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            console.log("Clicked");
          });

        });


    console.log("Yari cap: "+this.radius+ "\nCategoryId : "+ this.categoryId);
    //this.fSquare.firstCall(this.latitude,this.longitude,this.radius,this.categoryId);
    //this.fSquare.exploreVenue(this.latitude,this.longitude,this.radius,this.venue_number,this.categoryId);
    this.fSquare.exploreVenue(this.latitude,this.longitude,this.radius,this.venue_number,this.categoryId);
  }


  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp)=> {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log("latitude :" +this.latitude + "\n longitude :"+this.longitude);
    }).catch((err)=> {
      console.log("Error getting location",err);
    });
  }

  watchPosition() {
    this.subscribe =this.geolocation.watchPosition().subscribe(pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    });
  }
  stopWatchingPosition() {
    this.subscribe.unsubscribe();
  }


}
