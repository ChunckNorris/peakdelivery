import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';

import { Profile, Delivery, DeliveryItem } from '../../models/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { User, Ui } from '../../providers/providers';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
// import * as Quagga from 'Quagga';
import { Api } from '../../providers/api/api';

import {
  DriverAddDeliveryPage,
  DriverEditDeliveryPage,
  AccountSearchPage
} from '../pages';



@IonicPage()
@Component({
  selector: 'page-driver-list-delivery',
  templateUrl: 'driver-list-delivery.html',
})
export class DriverListDeliveryPage {
  camoptions: CameraOptions;
  deliveryList: Array<DeliveryItem>;
  account: Account;

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
  isAdminSearchEnabled: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner,
    public camera: Camera,
    private iab: InAppBrowser,
    public ui: Ui,
    public api: Api,
    public platform: Platform,
    public modalCtrl: ModalController,
    public user: User) {
    this.camoptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    if (this.user.userRole === 'ADMIN') {
      this.isAdminSearchEnabled = true;

    } else {
      this.isAdminSearchEnabled = false;
    }
    platform.ready().then(() => {
      //scanner = window['cordova'];
      //debugger;
    })
    this.deliveryList = new Array<DeliveryItem>();

    // let del1 = new Delivery();
    // del1.driverName = 'Tim Rankel';
    // del1.address1 = '123 easy Street';
    // del1.city = 'Tempe';
    // del1.state = 'AZ';
    // del1.zip = ' 85234';
    // del1.dateDelivered = '03/22/2018';
    // del1.timeDelivered = '11:30 PM';
    // del1.bagToteId = '123456789';

    // let del2 = new Delivery();
    // del2.driverName = 'Kevin Bieber';
    // del2.address1 = '555 Elm Street';
    // del2.city = 'Scottsdale';
    // del2.state = 'AZ';
    // del2.zip = ' 85034';
    // del2.dateDelivered = '03/22/2018';
    // del2.timeDelivered = '11:30 PM';
    // del2.bagToteId = '555555558877';

    // this.ui.showLoadingIndicator(true);
    // setTimeout(() => {
    //   this.deliveryList.push(del1);
    //   this.deliveryList.push(del2);
    //   this.ui.showLoadingIndicator(false);
    // }, 1000);




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverListDeliveryPage');





  }

  mapDelivery(_delivery: Delivery) {
    let mapsurl = 'https://www.google.com/maps/search/?q=' + _delivery.address1 + ', ' + _delivery.city + ', ' + _delivery.state;
    let target = "_blank";
    let inAppbrowser = this.iab.create(mapsurl, target, this.options);

    inAppbrowser.show();
  }

  navigateToDelivery(selectedDelivery: Delivery) {
    let url = 'https://www.google.com/maps/search/?q=' + selectedDelivery.address1 + ', ' + selectedDelivery.city + ', ' + selectedDelivery.state;
    window.open(url, "_blank");
  }


  searchAccounts() {



    let modal = this.modalCtrl.create(AccountSearchPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.account) {
        this.account = data.account;
        this.ui.showLoadingIndicator(true);
        this.api.getDeiliveryByAccount(this.account.id).subscribe(dels => {
          this.deliveryList = dels;
          this.ui.showLoadingIndicator(false);
        }, error => {
          this.ui.showLoadingIndicator(false);
        })
      }
    });


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




  }


}   