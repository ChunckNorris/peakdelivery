import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Profile, Delivery, Account } from '../../models/index';
import { User, Ui } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-account-search',
  templateUrl: 'account-search.html',
})
export class AccountSearchPage {
  isErrorSearch: boolean;
  accounts: Array<Account>;

  @ViewChild('searchBar') searchBar: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ui: Ui,
    public toastCtrl: ToastController,) {
    this.accounts = new Array<Account>();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountSearchPage');
  }
  searchChanged(event) {
    let searchTerm = event.target.value;

    try {
      if (searchTerm && searchTerm.trim().length > 4) {
        this.accounts = [];
        this.ui.showLoadingIndicator(true);

        //Call API to Search

        //if no results 
        // let toast = this.toastCtrl.create({
        //   message: 'No Accounts Found',
        //   duration: 1000,
        //   position: 'top'
        // });
        // toast.present();

        this.isErrorSearch = false;

          this.ui.showLoadingIndicator(false);
    } else {
      this.accounts = [];
        this.isErrorSearch = true;
        this.ui.showLoadingIndicator(false);
   
      }

    }
    catch (Error) {
      this.isErrorSearch = true;
      let toast = this.toastCtrl.create({
        message: 'Error',
        duration: 1000,
        position: 'top'
      });
      toast.present();
     

    }

  }

}
