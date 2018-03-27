import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import {
  MainPage
} from '../pages';

@IonicPage()
@Component({
  selector: 'page-account-add',
  templateUrl: 'account-add.html',
})
export class AccountAddPage {

  form: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

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
    
  }

}
