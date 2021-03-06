import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Profile, Delivery, DeliveryActivities, DeliveryBillings, DeliveryRunTypes } from '../../models/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ModalSignPage } from '../../pages/pages'
import { Api } from '../../providers/api/api';
import { User, Ui } from '../../providers/providers';
import {
  MainPage,
  CustomerDashboardPage,
  AdminDashboardPage,
  DriverDashboardPage,
  DriverListDeliveryPage,
  UserSearchPage
} from '../pages';


import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-driver-edit-delivery',
  templateUrl: 'driver-edit-delivery.html',
})
export class DriverEditDeliveryPage {
  isAdderChanged: boolean;
  activityOptions: Array<DeliveryActivities>;
  billingOptions: Array<DeliveryBillings>;
  runOptions: Array<DeliveryRunTypes>;
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
    private barcodeScanner: BarcodeScanner,
    public api: Api,
    public ui: Ui,
    public user: User) {
    this.driver = new Profile();
    this.ui.showLoadingIndicator(true);

    this.activityOptions = new Array<DeliveryActivities>();
    this.billingOptions = new Array<DeliveryBillings>();
    this.runOptions = new Array<DeliveryRunTypes>()
    this.isAdderChanged = false;

  
    this.driver.firstName = 'Test';
    this.driver.lastName = 'Driver';

 
    if (this.navParams.data) {
      this.delivery = this.navParams.data.delivery;

      this.loadOptions();

      this.form = this.formBuilder.group({
        driverName: [this.delivery.driverName]
        , run: [this.delivery.run]
        , driverId: [this.delivery.driverId]
        , deliveryId: [this.delivery.deliveryId]
        , bagToteId: [this.delivery.bagToteId]
        , slipToteId: [this.delivery.slipToteId]
        , activity: [this.delivery.activity]
        , billing: [this.delivery.billing]
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
        , scannedImage: [this.delivery.scannedImage]
      });
      

    } else {
      this.delivery = new Delivery();
      this.loadOptions();
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverEditDeliveryPage');
  }
  completeDelivery() {

    this.delivery.activity = this.form.value.activity;
    this.delivery.driverName = this.form.value.driverName;
    this.delivery.deliveryId = this.form.value.deliveryId;
    this.delivery.driverId = this.form.value.driverId;
    this.delivery.run = this.form.value.run;
    this.delivery.bagToteId = this.form.value.bagToteId;
    this.delivery.slipToteId = this.form.value.slipToteId;
    this.delivery.billing = this.form.value.billing;
    this.delivery.dateDelivered = this.form.value.dateDelivered;
    this.delivery.text = this.form.value.text;
    this.delivery.address1 = this.form.value.address1;
    this.delivery.address2 = this.form.value.address2 ? this.form.value.address2 : '';
    this.delivery.city = this.form.value.city;
    this.delivery.state = this.form.value.state;
    this.delivery.zip = this.form.value.zip;
    this.delivery.altAddress1 = this.form.value.altAddress1 ? this.form.value.altAddress1 : '';
    this.delivery.altAddress2 = this.form.value.altAddress2 ? this.form.value.altAddress2 : '';
    this.delivery.altCity = this.form.value.altCity ? this.form.value.altCity : '';
    this.delivery.altState = this.form.value.altState ? this.form.value.altState : '';
    this.delivery.altZip = this.form.value.altZip ? this.form.value.altZip : '';
    this.delivery.isAltAddress = this.isAdderChanged;
    this.delivery.multiLineText = this.form.value.multiLineText ? this.form.value.multiLineText : '';
    this.delivery.signature = this.signature ? this.signature : '';
    this.delivery.scannedImage = this.form.value.scannedImage ? this.form.value.scannedImage : '';

    this.api.saveDelivered(this.delivery).subscribe(res => {
      alert('Delivery Updated');
      this.navCtrl.pop();
    })

  }
  getSig() {
    let modal = this.modalCtrl.create(ModalSignPage);
    modal.present();

    modal.onDidDismiss(data => {
      if (data.length && data.length > 0) {
        this.signature = data;
      } else {
        this.signature = null;
      }

      //alert(data);
    });
  }
  changeAddress() {

  }
  assignToSelf() {

    if (this.user.userRole === 'ADMIN') {
      this.searchUser();
    } else {
      this.form.controls['driverName'].setValue(this.user.userProfile.fullName);
      this.form.controls['driverId'].setValue(this.user.userProfile.id);

    }

  }
  searchUser() {
    let modal = this.modalCtrl.create(UserSearchPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data.user) {
        let selectedUser = data.user;
        this.form.controls['driverName'].setValue(selectedUser.firstName + ' ' + selectedUser.lastName);
        this.form.controls['driverId'].setValue(selectedUser.id);
      } else {
        alert('No Driver Selected');
      }
    });
  }
  loadOptions() {

    let _getActivites = this.api.getActivityOptions().map(acctivitiesRes => {
      this.activityOptions = acctivitiesRes;
    })
    let _getBillingOptions = this.api.getBillingOptions().map(billingRes => {
      this.billingOptions = billingRes;

    })
    let _getRunOptions;
    if(this.delivery.accountId){
       _getRunOptions = this.api.getRunOptionsByAccount(this.delivery.accountId).map(runRes => {
        this.runOptions = runRes;
      })
    }else{
       _getRunOptions = this.api.getRunOptions().map(runRes => {
        this.runOptions = runRes;
      })
    }
   



    Observable.forkJoin([_getActivites,
      _getBillingOptions,
      _getRunOptions,
    ]).subscribe(results => {
      this.ui.showLoadingIndicator(false);
    }, (error) => {
      console.log(error);
      this.ui.showLoadingIndicator(false);
    });

  }

}
