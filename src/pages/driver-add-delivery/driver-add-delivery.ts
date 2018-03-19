import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Profile } from '../../models/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-driver-add-delivery',
  templateUrl: 'driver-add-delivery.html',
})
export class DriverAddDeliveryPage {

  form: FormGroup;
  driver: Profile

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private barcodeScanner: BarcodeScanner) {
    this.driver = new Profile();

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
      , multiLineText: [null]
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverAddDeliveryPage');
  }

  assignToSelf() {
    this.form.controls['driverName'].setValue(this.driver.firstName + ' ' + this.driver.lastName);



  }

  scanCode(type) {
    switch(type){
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

}
