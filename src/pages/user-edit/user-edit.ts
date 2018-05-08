import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

import {
  UserAddPage,
  UserSearchPage
} from '../pages';
import { Api } from '../../providers/api/api';
import { User, Ui } from '../../providers/providers';
import { NewUser, SearchedUser, UserClaim, ChangePassword } from '../../models/index';
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
  changePassword: ChangePassword;
  verifyPasswordChange: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public api: Api,
    public toastCtrl: ToastController,
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
    this.changePassword = new ChangePassword();
    this.verifyPasswordChange = '';
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
        this.changePassword.userId = this.userFromSearch.id;
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
  changeUserPassword(){
    this.ui.showLoadingIndicator(true);
    if(this.changePassword.newPassword === this.verifyPasswordChange){
      this.api.changePassword(this.changePassword).subscribe(res => {
        this.ui.showLoadingIndicator(false);
        let toast = this.toastCtrl.create({
          message: 'Passwords Change Success',
          duration: 1000,
          position: 'top'
        });
        toast.present();
      }, (error) => {
        this.ui.showLoadingIndicator(false);
        let toast = this.toastCtrl.create({
          message: 'Error in Password Change',
          duration: 1000,
          position: 'top'
        });
        toast.present();
       
      })
    }else{
      this.ui.showLoadingIndicator(false);
      let toast = this.toastCtrl.create({
        message: 'Passwords do not match',
        duration: 1000,
        position: 'top'
      });
      toast.present();
    }
  }
  denyUser() {
    this.navCtrl.pop();

  }


}
