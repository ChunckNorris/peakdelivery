import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {  DriverAddDeliveryPage, 
          DriverEditDeliveryPage, 
          DriverListDeliveryPage, 
          DriverSearchDeliveryPage } from '../../pages/pages'

@IonicPage()
@Component({
  selector: 'page-driver-dashboard',
  templateUrl: 'driver-dashboard.html',
})
export class DriverDashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverDashboardPage');
  }

  addNewDelivery(){
    this.navCtrl.push(DriverAddDeliveryPage);
  }
  viewDeliverys(){
    this.navCtrl.push(DriverListDeliveryPage);
  }
  deliverItem(){
    this.navCtrl.push(DriverListDeliveryPage);
  }

}
