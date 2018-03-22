import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile, Delivery } from '../../models/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { User, Ui } from '../../providers/providers';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

import {
  DriverAddDeliveryPage
} from '../pages';

@IonicPage()
@Component({
  selector: 'page-driver-list-delivery',
  templateUrl: 'driver-list-delivery.html',
})
export class DriverListDeliveryPage {

  deliveryList: Array<Delivery>;

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public barcodeScanner: BarcodeScanner,
    private iab: InAppBrowser,
    public ui: Ui) {
    this.deliveryList = new Array<Delivery>();

    let del1 = new Delivery();
    del1.driverName = 'Tim Rankel';
    del1.address1 = '123 easy Street';
    del1.city = 'Tempe';
    del1.state = 'AZ';
    del1.zip = ' 85234';

    let del2 = new Delivery();
    del2.driverName = 'Kevin Bieber';
    del2.address1 = '555 Elm Street';
    del2.city = 'Scottsdale';
    del2.state = 'AZ';
    del2.zip = ' 85034';
    

    this.deliveryList.push(del1);
    this.deliveryList.push(del2);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverListDeliveryPage');

   



  }

  mapDelivery(){
    let mapsurl = "https://google.com/maps";
    let target = "_blank";
    let inAppbrowser =   this.iab.create(mapsurl, target, this.options);
  
    inAppbrowser.show();
  }

  
  

  deliverPackage(_delivery: Delivery){
    this.navCtrl.push(DriverAddDeliveryPage, {delivery: _delivery});
    
  }

  scanCode() {
   

this.ui.showLoadingIndicator(true);

    this.barcodeScanner.scan().then((barcodeData) => {
      setTimeout(() => {
        this.ui.showLoadingIndicator(false);
        alert('No Delivery Found');
      },
      5000);
    }, (err) => {
      alert(err);
    });
  }
    

}   
