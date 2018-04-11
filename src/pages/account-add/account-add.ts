import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { NewUser, Account } from '../../models/index';
import { Api } from '../../providers/api/api';

import {
  MainPage
} from '../pages';

@IonicPage()
@Component({
  selector: 'page-account-add',
  templateUrl: 'account-add.html',
})
export class AccountAddPage {
  newAccount: Account;

  form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public api: Api) {
      this.newAccount = new Account();


    this.form = this.formBuilder.group({
      accountName: [null]
      , address1:  [null]
      , address2:  [null]
      , city: [null]
      , state:  [null]
      , zip:  [null]
      , accountContactName: [null]
      , accountContactPhone: [null]
      , accountContactEmail: [null]
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountAddPage');
  }
  saveNewAccount(){
    
    

    this.newAccount.accountName = this.form.value.accountName;
    this.newAccount.address1 = this.form.value.address1;
    this.newAccount.address2 = this.form.value.address2 ? this.form.value.address2 : '';
    this.newAccount.city = this.form.value.city;
    this.newAccount.state = this.form.value.state;
    this.newAccount.zip = this.form.value.zip;
    this.newAccount.accountContact = this.form.value.accountContactName;
    this.newAccount.contactNumber = this.form.value.accountContactPhone;
    this.newAccount.contactEmail = this.form.value.accountContactEmail;

    this.api.upsertAccount(this.newAccount).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Account Save Success',
        duration: 1000,
        position: 'top'
      });
      toast.present();
    }, err => {
      let toast = this.toastCtrl.create({
        message: 'Error Saving Account' + err,
        duration: 1000,
        position: 'top'
      });
      toast.present();
    })

  }

}
