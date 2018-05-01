import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';

import { Api, Ui } from '../../providers/providers';

import { UserClaim, SearchedUser } from '../../models/user'

@IonicPage()
@Component({
  selector: 'page-user-search',
  templateUrl: 'user-search.html',
})
export class UserSearchPage {

  userResults: Array<UserClaim>;
  isErrorSearch: boolean = false;
  foundUsers: Array<SearchedUser>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: Api,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public ui: Ui) {
    this.userResults = new Array<UserClaim>();
    this.foundUsers = new Array<SearchedUser>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSearchPage');
  }
  searchChanged(event) {
    let searchTerm = event.target.value;

    try {
      if (searchTerm && searchTerm.trim().length > 2) {
        this.userResults = new Array<UserClaim>();
        var loadReader = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: true
        });

        loadReader.present();

        //Call API to Search
        this.api.searchUsers(searchTerm).subscribe(foundUser => {
          this.foundUsers = foundUser;
          loadReader.dismiss();
        }, error => {
          this.foundUsers = new Array<SearchedUser>();
          loadReader.dismiss();
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
        this.userResults = [];
        this.isErrorSearch = true;
        this.ui.showLoadingIndicator(false);
        loadReader.dismiss();

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
  selectUser(item){
    this.viewCtrl.dismiss({isEdit: true, user: item})
  }

  closeTapped() {


    this.viewCtrl.dismiss({});
  }
  resetSearch(){
    this.foundUsers = new Array<SearchedUser>();
  }
}
