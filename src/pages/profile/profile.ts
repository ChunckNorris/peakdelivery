import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {

  form: FormGroup;


  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
        public navParams: NavParams) {

     

    this.form = this.formBuilder.group({
      firstName: [null]
      , midddleName: [null]
      , lastName: [null]
      , phone: [null]
      , email: [null]
      , password: [null]
      , newPassword: [null]
      , confirmPassword: [null]
      , avatarFile: [null]
    });

  }

  saveProfileData(profileData) {

  }



  getPicture(sourceType) {
 
  }

  submitTapped() {
  }

  ionViewLoaded() {
  }

  zipCodeChange(){
   
  }

  onSubmit() {

  }

  noSubmit(e) {
    e.preventDefault();
  }

  requesting(requesting: boolean) {

  }
}
