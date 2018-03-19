import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import {AuthUser} from '../../models/index';

import { MainPage, 
  CustomerDashboardPage, 
  AdminDashboardPage, 
  DriverDashboardPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: AuthUser;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

      this.account = new AuthUser();

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {




    this.user.login(this.account).subscribe((resp) => {
     
      switch( this.user.profile.role){
        case 'Admin':
        this.navCtrl.setRoot(AdminDashboardPage);
        break;
        case 'Client':
        this.navCtrl.setRoot(CustomerDashboardPage);
        break;
        case 'Driver':
        this.navCtrl.setRoot(DriverDashboardPage);
        break;

      }
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Invalid user name or password',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
