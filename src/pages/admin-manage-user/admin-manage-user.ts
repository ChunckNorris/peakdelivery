import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  UserAddPage,
  UserEditPage
} from '../pages';

@IonicPage()
@Component({
  selector: 'page-admin-manage-user',
  templateUrl: 'admin-manage-user.html',
})
export class AdminManageUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminManageUserPage');
  }
 addnewUser(){
   this.navCtrl.push(UserAddPage);

 }
 editUserAccount(){
   this.navCtrl.push(UserEditPage);
 }
}
