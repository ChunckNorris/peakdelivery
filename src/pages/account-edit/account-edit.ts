import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Account, AccountBillingOptions, AccountRunOptions, AccountRunModel, DeliveryRunTypes } from '../../models/index';
import {
  MainPage,
AccountSearchPage
} from '../pages';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-account-edit',
  templateUrl: 'account-edit.html',
})
export class AccountEditPage {

  isValidAccountSelcted: boolean;
  form: FormGroup;
  account: Account;
  accountRunOptions: Array<AccountRunOptions>;
  accountBillingOptions: Array<AccountBillingOptions>;
  runOptionToAdd: string;
  runOptions: Array<DeliveryRunTypes>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public api: Api) {
    this.account = new Account();
    this.accountRunOptions = new  Array<AccountRunOptions>();
    this.accountBillingOptions = new Array<AccountBillingOptions>();
    this.isValidAccountSelcted = false;
    this.runOptions = new Array<DeliveryRunTypes>();

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
    console.log('ionViewDidLoad AccountEditPage');
    ///todo get all options assigned to an account for billing and runs. 
  }

  // addrunOption(option){
  //   //call api and on success add to the display array 
  //   this.accountRunOptions.push()
  // }
  searchAccounts(){
    
   
    let modal = this.modalCtrl.create(AccountSearchPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data && data.account) {
        this.account = data.account;
        this.isValidAccountSelcted = true;

        this.form.controls['accountName'].setValue(this.account.accountName);
        this.form.controls['address1'].setValue(this.account.address1);
        this.form.controls['address2'].setValue(this.account.address2);
        this.form.controls['city'].setValue(this.account.city);
        this.form.controls['state'].setValue(this.account.state);
        this.form.controls['zip'].setValue(this.account.zip);
        this.form.controls['accountContactName'].setValue(this.account.accountContact);
        this.form.controls['accountContactPhone'].setValue(this.account.contactNumber);
        this.form.controls['accountContactEmail'].setValue(this.account.contactEmail);


        this.loadRunOptions();
      }
    });

    //if account found 

  }
  addAccountRunOption(){
    let addedRunOption = new AccountRunModel();

    addedRunOption.runName = this.runOptionToAdd;
    addedRunOption.accountId = this.account.accountId;
    addedRunOption.isActive = true;

    this.api.saveRunOptions(addedRunOption).subscribe(res => {
      this.runOptionToAdd = '';
      this.loadRunOptions();

    }, (error) => {

    })
  }

  loadRunOptions(){
     this.api.getRunOptionsByAccount(this.account.accountId).subscribe(runRes => {
      this.runOptions = runRes;
    })
  }
  removeRunOption(option){
    this.api.removeRunOption(option, this.account.accountId).subscribe(runOptionRes => {
      this.loadRunOptions();
    })
  }
  saveEditAccount(){

    let editAccount = new Account();

    editAccount.accountName = this.form.value.accountName;
    editAccount.address1 = this.form.value.address1;
    editAccount.address2 = this.form.value.address2 ? this.form.value.address2 : '';
    editAccount.city = this.form.value.city;
    editAccount.state = this.form.value.state;
    editAccount.zip = this.form.value.zip;
    editAccount.accountContact = this.form.value.accountContactName;
    editAccount.contactNumber = this.form.value.accountContactPhone;
    editAccount.contactEmail = this.form.value.accountContactEmail;

    this.api.upsertAccount(editAccount).subscribe(res => {
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
