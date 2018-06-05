import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CustomerSearchDeliveryPage } from '../../pages/pages'
import { LoginPage } from '../../pages/login/login';
@IonicPage()
@Component({
  selector: 'page-customer-dashboard',
  templateUrl: 'customer-dashboard.html',
})
export class CustomerDashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDashboardPage');
  }

  checkDelivery(){
    this.navCtrl.push(CustomerSearchDeliveryPage, {'lookupType': 'Status'});
  }

  searchDelivery(){
    this.navCtrl.push(CustomerSearchDeliveryPage, {'lookupType': 'Search'});
  }
  closeTapped(){
    this.navCtrl.setRoot(LoginPage);
  }

}
