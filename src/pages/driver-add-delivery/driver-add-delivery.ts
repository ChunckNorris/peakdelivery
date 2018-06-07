import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Profile, Delivery } from '../../models/index';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Account, AccountBillingOptions, AccountRunOptions, DeliveryActivities, DeliveryBillings, DeliveryRunTypes } from '../../models/index';
import { Api } from '../../providers/api/api';
import { User, Ui } from '../../providers/providers';

import {
  MainPage,
  CustomerDashboardPage,
  AdminDashboardPage,
  DriverDashboardPage,
  DriverListDeliveryPage,
  AccountSearchPage,
  ModalLabelScannerPage,
  UserSearchPage
} from '../pages';

import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-driver-add-delivery',
  templateUrl: 'driver-add-delivery.html',
})
export class DriverAddDeliveryPage {
  account: Account;
  form: FormGroup;
  driver: Profile;
  delivery: Delivery;
  myItems: Array<Delivery>;
  isNewDelivery: boolean;
  callback: any;
  ocrData: any;
  scanedImage: string;
  activityOptions: Array<DeliveryActivities>;
  billingOptions: Array<DeliveryBillings>;
  runOptions: Array<DeliveryRunTypes>;
  driverId: string;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public modalCtrl: ModalController,
    public api: Api,
    public user: User,
    private barcodeScanner: BarcodeScanner,
  public ui:Ui) {
    this.ui.showLoadingIndicator(true);
    this.activityOptions = new Array<DeliveryActivities>();
    this.billingOptions = new Array<DeliveryBillings>();
    this.runOptions = new Array<DeliveryRunTypes>()
    this.callback = this.navParams.get('callback');
    this.ocrData = '';

this.loadOptions();
    
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
        , accountName: [this.delivery.accountName]
        , accountId: [this.delivery.accountId]
        , contactNumber: [this.delivery.contactPhone]
        // , timeDelivered: [this.delivery.timeDelivered]
        // , dateDelivered: [this.delivery.dateDelivered]
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
        , accountName: [null]
        , accountId: [null]
        // , timeDelivered: [null]
        // , dateDelivered: [null]
        , text: [null]
        , address1: [null]
        , address2: [null]
        , city: [null]
        , state: [null]
        , zip: [null]
        , contactNumber: [null]
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

  loadOptions() {

    let _getActivites = this.api.getActivityOptions().map(acctivitiesRes => {
      this.activityOptions = acctivitiesRes;
    })
    let _getBillingOptions = this.api.getBillingOptions().map(billingRes => {
      this.billingOptions = billingRes;

    })
    let _getRunOptions = this.api.getRunOptions().map(runRes => {
      this.runOptions = runRes;
    })



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

  assignToSelf() {

    if (this.user.userRole === 'ADMIN') {
      this.searchUser();
    } else {
      this.form.controls['driverName'].setValue(this.user.userProfile.fullName);
      this.driverId = this.user.userProfile.id;
    }






  }
  searchUser() {
    let modal = this.modalCtrl.create(UserSearchPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data.user) {
        let selectedUser = data.user;
        this.form.controls['driverName'].setValue(selectedUser.firstName + ' ' + selectedUser.lastName);
        this.driverId = selectedUser.id;
      } else {
        alert('No Driver Selected');
      }
    });
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
      this.delivery.accountId = this.form.value.accountId;
      this.delivery.driverId = this.driverId;
      this.delivery.driverName = this.form.value.driverName;
      this.delivery.bagToteId = this.form.value.bagToteId;
      this.delivery.slipToteId = this.form.value.slipToteId;
      this.delivery.billing = this.form.value.billing;
      this.delivery.accountId = this.form.value.accountId;
      //this.delivery.accountName = this.form.value.accountName;
      this.delivery.contactPhone = this.form.value.contactNumber;
      // this.delivery.timeDelivered = this.form.value.timeDelivered;
      // this.delivery.dateDelivered = this.form.value.dateDelivered;
      this.delivery.text = this.form.value.text;
      this.delivery.address1 = this.form.value.address1;
      this.delivery.address2 = this.form.value.address2;
      this.delivery.city = this.form.value.city;
      this.delivery.state = this.form.value.state;
      this.delivery.zip = this.form.value.zip;
      this.delivery.multiLineText = this.ocrData;
      this.delivery.scannedImage = this.scanedImage;
      this.delivery.signature = '';


      this.api.saveDelivered(this.delivery).subscribe(res => {
        this.callback(this.myItems).then(() => {
          this.navCtrl.pop();
        });
      })
      this.myItems.push(this.delivery);

      let data = {
        delivery: this.delivery,
        myitems: this.myItems
      }



    } else {
      this.navCtrl.pop();
    }



    //this.navCtrl.popTo(DriverListDeliveryPage,)

  }

  findAccount() {
    let modal = this.modalCtrl.create(AccountSearchPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.account) {
        this.ui.showLoadingIndicator(true);
        this.account = data.account;

        this.form.controls['accountName'].setValue(this.account.accountName);
        this.form.controls['accountId'].setValue(this.account.accountId);

         this.api.getRunOptionsByAccount(this.account.accountId).subscribe(runRes => {
          this.runOptions = runRes;
          this.ui.showLoadingIndicator(false);
        }, (error) =>{
          this.ui.showLoadingIndicator(false);
        })


      }
    });
  }
  completeDelivery() {

  }
  scanDelivery() {
    let modal = this.modalCtrl.create(ModalLabelScannerPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.ocrData = data.ocrdata;
        this.scanedImage = data.scanedData;
        console.log(data.scanedData);
        let parse = this.ocrData.split('\n');
        let adderArray = [];
        var searchAdder = /,/gi;
        let searchphone = /-/gi;
        parse.forEach(element => {
          if (element.length > 0) {
            var re = /delivery/gi;

            if (element.search(re) == -1) {
              adderArray.push(element);

              // if(this.isLetter(element.substr(0,1))){
              //   adderArray.push(element);
              // }else{
              //   adderArray.push(element.substr(1));
              // }

            }

          }
        });


        if (adderArray[0] && adderArray[0].length > 0) {
          this.form.controls['text'].setValue(adderArray[0]);
        }
        if (adderArray[1] && adderArray[1].length > 0) {
          this.form.controls['address1'].setValue(adderArray[1]);
        }
        if (adderArray[2] && adderArray[2].length > 0 && adderArray[2].search(searchAdder) === -1) {
          this.form.controls['address2'].setValue(adderArray[2]);
        }
        if (adderArray[2] && adderArray[2].length > 0 && adderArray[2].search(searchAdder) != -1) {
          let locationSplit = adderArray[2].split(',')
          this.form.controls['city'].setValue(locationSplit[0]);
          this.form.controls['state'].setValue(locationSplit[1].substr(0, 3));
          this.form.controls['zip'].setValue(locationSplit[1].substr(3));
        }
        if (adderArray[3] && adderArray[3].length > 0 && adderArray[3].search(searchAdder) != -1) {
          let locationSplit = adderArray[3].split(',')
          this.form.controls['city'].setValue(locationSplit[0]);
          this.form.controls['state'].setValue(locationSplit[1].substr(0, 3));
          this.form.controls['zip'].setValue(locationSplit[1].substr(3));
        }
        if (adderArray[3] && adderArray[3].length > 0 && adderArray[3].search(searchphone) != -1) {

          this.form.controls['contactNumber'].setValue(adderArray[3]);

        }
        if (adderArray[4] && adderArray[4].length > 0 && adderArray[4].search(searchphone) != -1) {

          this.form.controls['contactNumber'].setValue(adderArray[4]);

        }
        //alert(adderArray[2].search(searchAdder));

        //this.form.controls['text'].setValue(adderArray[0]);
        //this.form.controls['address1'].setValue(adderArray[1]);

        //this.form.controls['address1'].setValue(adderArray[1]);

      }
    });
  }
  isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }



  parseAddressFields(ocrContent: Array<any>, field: string) {

  }
}
