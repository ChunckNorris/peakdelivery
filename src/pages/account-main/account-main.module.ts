import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountMainPage } from './account-main';

@NgModule({
  declarations: [
    AccountMainPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountMainPage),
  ],
})
export class AccountMainPageModule {}
