import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile, Delivery } from '../../models/index';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  deliverPackage(_delivery: Delivery){
    this.navCtrl.push(DriverAddDeliveryPage, {delivery: _delivery});
    
  }
}
