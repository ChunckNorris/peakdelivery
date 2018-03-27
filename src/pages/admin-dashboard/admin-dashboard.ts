import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  MainPage,
  CustomerDashboardPage,
  DriverDashboardPage,
  AccountAddPage,
  AccountEditPage,
  AdminManageUserPage
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
    this.navCtrl.push(AdminManageUserPage);
  }
  gotoaccounts(action){
    if(action === 'Add'){
      this.navCtrl.push(AccountAddPage);
    }else if(action === 'Edit'){
      this.navCtrl.push(AccountEditPage);
    }
    //this.navCtrl.push(DriverDashboardPage);
  }
}
