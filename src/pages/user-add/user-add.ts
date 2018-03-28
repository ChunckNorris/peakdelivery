import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { NewUser } from '../../models/index';
import { Api } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-user-add',
  templateUrl: 'user-add.html',
})
export class UserAddPage {
  form: FormGroup;

  newUser: NewUser;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public api: Api) {
    this.newUser = new NewUser();





    this.form = this.formBuilder.group({
      email: [null, <any>Validators.required]
      , userName: [null, <any>Validators.required]
      , firstName: [null, <any>Validators.required]
      , lastName: [null, <any>Validators.required]
      , password: [null, <any>Validators.required]
      , confirmPassword: [null, <any>Validators.required]
      , roleName: [null, <any>Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAddPage');
  }
  saveNewUser() {

    this.newUser.Email = this.form.value.email;

    this.newUser.Username = this.form.value.userName;
    this.newUser.FirstName = this.form.value.firstName;
    this.newUser.LastName = this.form.value.lastName;
    this.newUser.Password = this.form.value.password;
    this.newUser.ConfirmPassword = this.form.value.confirmPassword;
    this.newUser.RoleName = this.form.value.roleName;

    this.api.createNewUser(this.newUser).subscribe(res => {
      if(res.id){
        let toast = this.toastCtrl.create({
          message: 'User Account Created',
          duration: 1000,
          position: 'top'
        });
        toast.present();


        this.form.controls['userName'].setValue(null);
        this.form.controls['email'].setValue(null);
        this.form.controls['firstName'].setValue(null);
        this.form.controls['lastName'].setValue(null);
        this.form.controls['password'].setValue(null);
        this.form.controls['confirmPassword'].setValue(null);
        this.form.controls['roleName'].setValue(null);



      }else{
        let toast = this.toastCtrl.create({
          message: 'Error Creating User Account',
          duration: 1000,
          position: 'top'
        });
        toast.present();
      }
    }, err => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 1000,
        position: 'top'
      });
      toast.present();
    })
    
  }
}
