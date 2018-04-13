import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { Profile, Delivery, Account } from '../../models/index';
import { User, Ui } from '../../providers/providers';
import { Api } from '../../providers/api/api';


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
    public api: Api,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
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
        this.api.getAccountList().subscribe(res => {
          this.accounts = res;
          this.ui.showLoadingIndicator(false);
        }, err => {
          this.accounts = new Array<Account>();
          this.ui.showLoadingIndicator(false);
        })
        //if no results 
        // let toast = this.toastCtrl.create({
        //   message: 'No Accounts Found',
        //   duration: 1000,
        //   position: 'top'
        // });
        // toast.present();

        this.isErrorSearch = false;

       
      } else {
        this.accounts = [];
        this.isErrorSearch = true;
        //this.ui.showLoadingIndicator(false);

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

  accountSelected(account){
    this.viewCtrl.dismiss({account: account});
  }
  closeTapped() {


    this.viewCtrl.dismiss({});
  }
  resetSearch(){
    this.accounts = [];
  }

}
