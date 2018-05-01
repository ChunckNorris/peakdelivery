import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchedUser } from '../../models/index';
import { Api } from '../../providers/api/api';
import { User, Ui } from '../../providers/providers';


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

  usersToApprove: Array<SearchedUser>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ui: Ui,
    public api: Api) {
      
      this.usersToApprove = new Array<SearchedUser>();
      // this.ui.showLoadingIndicator(true);
      // this.api.getUsersToApprove().subscribe(users => {
      //   this.usersToApprove = users;
      //   this.ui.showLoadingIndicator(false);
      // }, error => {
      //   this.ui.showLoadingIndicator(false);
      // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminManageUserPage');
  }
  ionViewDidEnter(){
    this.ui.showLoadingIndicator(true);
    this.api.getUsersToApprove().subscribe(users => {
      this.usersToApprove = users;
      this.ui.showLoadingIndicator(false);
    }, error => {
      this.ui.showLoadingIndicator(false);
    })
  }

 addnewUser(){
   this.navCtrl.push(UserAddPage);

 }
 editUserAccount(){
   this.navCtrl.push(UserEditPage);
 }
 searchTapped(item){
  this.navCtrl.push(UserEditPage, {userToApprove: item});
 }

}
