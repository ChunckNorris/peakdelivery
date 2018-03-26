import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  MainPage,
  CustomerDashboardPage,
  DriverDashboardPage
} from '../pages';

@IonicPage()
@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDashboardPage');
  }

  gotodriver(){
    this.navCtrl.push(DriverDashboardPage);
  }
  gottousers(){
    //this.navCtrl.push(DriverDashboardPage);
  }
  gotoaccounts(){
    //this.navCtrl.push(DriverDashboardPage);
  }
}
