import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Account, AccountBillingOptions, AccountRunOptions } from '../../models/index';
import {
  MainPage,
AccountSearchPage
} from '../pages';


@IonicPage()
@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.html',
})
export class AccountEditPage {

  isValidAccountSelcted: boolean;

  account: Account;
  accountRunOptions: Array<AccountRunOptions>;
  accountBillingOptions: Array<AccountBillingOptions>;



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.account = new Account();
    this.accountRunOptions = new  Array<AccountRunOptions>();
    this.accountBillingOptions = new Array<AccountBillingOptions>();
    this.isValidAccountSelcted = false;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountEditPage');
    ///todo get all options assigned to an account for billing and runs. 
  }

  addrunOption(option){
    //call api and on success add to the display array 
    this.accountRunOptions.push()
  }
  searchAccounts(){
    
   
    let modal = this.modalCtrl.create(AccountSearchPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.selected) {
        this.account = data.selected;
 
      }
    });

    //if account found 
    this.isValidAccountSelcted = true;
  }
}
