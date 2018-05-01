import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import {
  UserAddPage,
  UserSearchPage
} from '../pages';
import { Api } from '../../providers/api/api';
import { User, Ui } from '../../providers/providers';
import { NewUser, SearchedUser, UserClaim } from '../../models/index';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {
  selectedUser: NewUser;
  userFromSearch: SearchedUser;
  isUserApproval: boolean;
  userForEdit: boolean;
  editUser: UserClaim;
  form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public api: Api,
    public ui: Ui) {
    this.isUserApproval = false;
    this.userForEdit = false;

    this.form = this.formBuilder.group({
      email: [null]
      , userName: [null]
      , firstName: [null]
      , lastName: [null]
      , password: [null]
      , confirmPassword: [null]
      , roleName: [null]
    });


    if (this.navParams.data.userToApprove) {
      this.userFromSearch = this.navParams.data.userToApprove;
      this.isUserApproval = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEditPage');
  }
  searchUser() {
    let modal = this.modalCtrl.create(UserSearchPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.isEdit) {
        this.userFromSearch = data.user;
        this.ui.showLoadingIndicator(true);
        this.api.getUserProfile(this.userFromSearch.id).subscribe(editUser => {
          this.editUser = editUser;
          this.userForEdit = true;
          this.ui.showLoadingIndicator(false);
        }, error => {
          this.ui.showLoadingIndicator(false);
        })

      }
    });
  }

  approveUser() {
    this.api.approveUser(this.userFromSearch.id).subscribe(res => {
      this.navCtrl.pop();
    })
  }
  denyUser() {
    this.navCtrl.pop();

  }

}
