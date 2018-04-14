import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';

import { Profile, Delivery } from '../../models/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { User, Ui } from '../../providers/providers';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import * as Quagga from 'Quagga';


import {
  DriverAddDeliveryPage,
  DriverEditDeliveryPage,
} from '../pages';



@IonicPage()
@Component({
  selector: 'page-driver-list-delivery',
  templateUrl: 'driver-list-delivery.html',
})
export class DriverListDeliveryPage {
  camoptions: CameraOptions;
  deliveryList: Array<Delivery>;
  ocrData: string;
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
    public camera: Camera,
    private iab: InAppBrowser,
    public ui: Ui,
    public platform: Platform,
    public modalCtrl: ModalController) {
      this.camoptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

    platform.ready().then(() => {
      //scanner = window['cordova'];
      //debugger;
    })
    this.deliveryList = new Array<Delivery>();

    let del1 = new Delivery();
    del1.driverName = 'Tim Rankel';
    del1.address1 = '123 easy Street';
    del1.city = 'Tempe';
    del1.state = 'AZ';
    del1.zip = ' 85234';
    del1.dateDelivered = '03/22/2018';
    del1.timeDelivered = '11:30 PM';
    del1.bagToteId = '123456789';

    let del2 = new Delivery();
    del2.driverName = 'Kevin Bieber';
    del2.address1 = '555 Elm Street';
    del2.city = 'Scottsdale';
    del2.state = 'AZ';
    del2.zip = ' 85034';
    del2.dateDelivered = '03/22/2018';
    del2.timeDelivered = '11:30 PM';
    del2.bagToteId = '555555558877';

    this.ui.showLoadingIndicator(true);
    setTimeout(() => {
      this.deliveryList.push(del1);
      this.deliveryList.push(del2);
      this.ui.showLoadingIndicator(false);
    }, 1000);




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverListDeliveryPage');





  }

  mapDelivery() {
    let mapsurl = "https://google.com/maps";
    let target = "_blank";
    let inAppbrowser = this.iab.create(mapsurl, target, this.options);

    inAppbrowser.show();
  }




  deliverPackage(_delivery: Delivery) {
    this.navCtrl.push(DriverEditDeliveryPage, { delivery: _delivery });

  }

  scanCode() {
    //this.navCtrl.push(ModalLabelScannerPage);

    // this.ui.showLoadingIndicator(true);
  
    this.barcodeScanner.scan().then((barcodeData) => {
      setTimeout(() => {
        this.ui.showLoadingIndicator(false);
        alert('No Delivery Found');
      },
        5000);
    }, (err) => {
      alert(err);
      this.ui.showLoadingIndicator(false);
    });

    // let modal = this.modalCtrl.create(ModalLabelScannerPage);
    // modal.present();

    // modal.onDidDismiss(data => {
 
    //     if(data.ocrdata){
    //       this.ocrData = data.ocrdata;
    //       alert(data);
    //     }else{
    //       alert('No scanned data found');
    //     }
      
    //   });

    // let modal = this.modalCtrl.create(ModalLabelScannerPage);
    // modal.present();

    // modal.onDidDismiss(data => {
 
    //     if(data.ocrdata){
    //       this.ocrData = data.ocrdata;
    //       alert(data);
    //     }else{
    //       alert('No scanned data found');
    //     }
      
    //   });

    // let modal = this.modalCtrl.create(ModalLabelScannerPage);
    // modal.present();

    // modal.onDidDismiss(data => {
 
    //     if(data.ocrdata){
    //       this.ocrData = data.ocrdata;
    //       alert(data);
    //     }else{
    //       alert('No scanned data found');
    //     }
      
    //   });


    // this.camera.getPicture(this.camoptions).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //  }, (err) => {
    //   // Handle error
    //  });

  }


}   
// ,
// {
//     preferFrontCamera : true, // iOS and Android
//     showFlipCameraButton : true, // iOS and Android
//     showTorchButton : true, // iOS and Android
//     torchOn: true, // Android, launch with the torch switched on (if available)
//     saveHistory: true, // Android, save scan history (default false)
//     prompt : "Place a barcode inside the scan area", // Android
//     resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
//     formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
//     orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
//     disableAnimations : true, // iOS
//     disableSuccessBeep: false // iOS and Android
// }