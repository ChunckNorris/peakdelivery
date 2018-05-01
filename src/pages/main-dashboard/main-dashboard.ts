import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User, Ui } from '../../providers/providers';
import {
  MainPage,
  CustomerDashboardPage,
  AdminDashboardPage,
  DriverDashboardPage
} from '../pages';


@IonicPage()
@Component({
  selector: 'page-main-dashboard',
  templateUrl: 'main-dashboard.html',
})
export class MainDashboardPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public user: User) {

     
      switch (this.user.userRole) {
        case 'ADMIN':
          this.navCtrl.setRoot(AdminDashboardPage);
          break;
        case 'CUSTOMER':
          this.navCtrl.setRoot(CustomerDashboardPage);
          break;
        case 'DRIVER':
          this.navCtrl.setRoot(DriverDashboardPage);
          break;
        default:
          this.navCtrl.setRoot(DriverDashboardPage);
          break;

      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainDashboardPage');
  }

}
