import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Profile, Delivery } from '../../models/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';


import {
  MainPage,
  CustomerDashboardPage,
  AdminDashboardPage,
  DriverDashboardPage,
  DriverListDeliveryPage
} from '../pages';

@IonicPage()
@Component({
  selector: 'page-driver-add-delivery',
  templateUrl: 'driver-add-delivery.html',
})
export class DriverAddDeliveryPage {

  form: FormGroup;
  driver: Profile;
  delivery: Delivery;
  myItems: Array<Delivery>;
  isNewDelivery: boolean;
  callback: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public camera: Camera,
    private barcodeScanner: BarcodeScanner) {


    this.callback = this.navParams.get('callback');



    if (this.navParams.data.data.length > 0) {

      this.myItems = this.navParams.data.data;


    } else {
      this.myItems = new Array<Delivery>();

    }

    this.driver = new Profile();

    if (this.navParams.data.delivery) {
      this.isNewDelivery = false;

      this.delivery = this.navParams.data.delivery;

      this.form = this.formBuilder.group({
        driverName: [this.delivery.driverName]
        , run: [this.delivery.run]
        , bagToteId: [this.delivery.bagToteId]
        , slipToteId: [this.delivery.slipToteId]
        , activity: [this.delivery.activity]
        , billing: [this.delivery.billing]
        , timeDelivered: [this.delivery.timeDelivered]
        , dateDelivered: [this.delivery.dateDelivered]
        , text: [this.delivery.text]
        , address1: [this.delivery.address1]
        , address2: [this.delivery.address2]
        , city: [this.delivery.city]
        , state: [this.delivery.state]
        , zip: [this.delivery.zip]
        , altAddress1: [this.delivery.altAddress1]
        , altAddress2: [this.delivery.altAddress2]
        , altCity: [this.delivery.altCity]
        , altState: [this.delivery.altState]
        , altZip: [this.delivery.altZip]
        , isAltAddress: [this.delivery.isAltAddress]
        , multiLineText: [this.delivery.multiLineText]
      });

      this.camera.cleanup().then(val => alert(val));
      // this.form = this.formBuilder.group({
      //   driverName: [this.delivery.driverName]
      //   , run: [null]
      //   , bagToteId: [null]
      //   , slipToteId: [null]
      //   , activity: [null]
      //   , billing: [null]
      //   , timeDelivered: [null]
      //   , dateDelivered: [null]
      //   , text: [null]
      //   , multiLineText: [null]
      // });


    } else {
      this.isNewDelivery = true;
      this.delivery = new Delivery();

      this.driver.firstName = 'Test';
      this.driver.lastName = 'Driver';




      this.form = this.formBuilder.group({
        driverName: [null]
        , run: [null]
        , bagToteId: [null]
        , slipToteId: [null]
        , activity: [null]
        , billing: [null]
        , timeDelivered: [null]
        , dateDelivered: [null]
        , text: [null]
        , address1: [null]
        , address2: [null]
        , city: [null]
        , state: [null]
        , zip: [null]
        , altAddress1: [null]
        , altAddress2: [null]
        , altCity: [null]
        , altState: [null]
        , altZip: [null]
        , isAltAddress: [null]
        , multiLineText: [null]
      });

    }




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverAddDeliveryPage');
  }

  assignToSelf() {
    this.form.controls['driverName'].setValue(this.driver.firstName + ' ' + this.driver.lastName);



  }

  scanCode(type) {
    switch (type) {
      case 'tote':
        this.barcodeScanner.scan().then((barcodeData) => {
          this.form.controls['bagToteId'].setValue(barcodeData.text);
        }, (err) => {
          alert(err);
        });
        break;
      case 'slip':
        this.barcodeScanner.scan().then((barcodeData) => {
          this.form.controls['slipToteId'].setValue(barcodeData.text);
        }, (err) => {
          alert(err);
        });
        break;
      case 'multiLine':
        this.barcodeScanner.scan().then((barcodeData) => {
          this.form.controls['multiLineText'].setValue(barcodeData.text);
        }, (err) => {
          alert(err);
        });
        break;
      default:
        break;

    }


    // if (type === 'tote') {
    //   this.barcodeScanner.scan().then((barcodeData) => {
    //     this.form.controls['bagToteId'].setValue(barcodeData.text);
    //   }, (err) => {
    //     alert(err);
    //   });
    // } else if (type === 'slip') {
    //   this.barcodeScanner.scan().then((barcodeData) => {
    //     this.form.controls['slipToteId'].setValue(barcodeData.text);
    //   }, (err) => {
    //     alert(err);
    //   });
    // }


  }

  saveDelivery() {
    if (this.isNewDelivery) {
      this.delivery.run = this.form.value.run;
      this.delivery.activity = this.form.value.activity;
      this.delivery.driverName = this.form.value.driverName;
      this.delivery.bagToteId = this.form.value.bagToteId;
      this.delivery.slipToteId = this.form.value.slipToteId;
      this.delivery.billing = this.form.value.billing;
      this.delivery.timeDelivered = this.form.value.timeDelivered;
      this.delivery.dateDelivered = this.form.value.dateDelivered;
      this.delivery.text = this.form.value.text;
      this.delivery.address1 = this.form.value.address1;
      this.delivery.address2 = this.form.value.address2;
      this.delivery.city = this.form.value.city;
      this.delivery.state = this.form.value.state;
      this.delivery.zip = this.form.value.zip;
      this.delivery.multiLineText = this.form.value.multiLineText;

      this.myItems.push(this.delivery);

      let data = {
        delivery: this.delivery,
        myitems: this.myItems
      }


      this.callback(this.myItems).then(() => {
        this.navCtrl.pop();
      });
    } else {
      this.navCtrl.pop();
    }



    //this.navCtrl.popTo(DriverListDeliveryPage,)

  }


  completeDelivery() {

  }

}
