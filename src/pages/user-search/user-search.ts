import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { Api, Ui } from '../../providers/providers';

import { UserClaim } from '../../models/user'

@IonicPage()
@Component({
  selector: 'page-user-search',
  templateUrl: 'user-search.html',
})
export class UserSearchPage {

  userResults: Array<UserClaim>;
  isErrorSearch: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: Api,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public ui: Ui) {
      this.userResults = new Array<UserClaim>();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSearchPage');
  }
  searchChanged(event) {
    let searchTerm = event.target.value;

    try {
      if (searchTerm && searchTerm.trim().length > 4) {
        this.userResults = new Array<UserClaim>();
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
        this.userResults = [];
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

  closeTapped() {
    
    
            this.viewCtrl.dismiss({});
        }
}
