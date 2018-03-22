import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Profile, Delivery } from '../../models/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ModalSignPage } from '../../pages/pages'


import {
  MainPage,
  CustomerDashboardPage,
  AdminDashboardPage,
  DriverDashboardPage,
  DriverListDeliveryPage
} from '../pages';



@IonicPage()
@Component({
  selector: 'page-driver-edit-delivery',
  templateUrl: 'driver-edit-delivery.html',
})
export class DriverEditDeliveryPage {

  delivery: Delivery;
  form: FormGroup;
  driver: Profile;
  myItems: Array<Delivery>;
  isNewDelivery: boolean;
  callback: any;
  signature: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner) {
    this.driver = new Profile();
    this.driver.firstName = 'Test';
    this.driver.lastName = 'Driver';


    if (this.navParams.data) {
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
        , multiLineText: [this.delivery.multiLineText]
      });

    } else {
      this.delivery = new Delivery();

    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverEditDeliveryPage');
  }
  completeDelivery() {

  }
  getSig(){
    let modal = this.modalCtrl.create(ModalSignPage);
    modal.present();

    modal.onDidDismiss(data => {
      if(data.length && data.length > 0){
        this.signature = data;
      }else{
        this.signature = null;
      }
      
        //alert(data);
      });
  }
}
