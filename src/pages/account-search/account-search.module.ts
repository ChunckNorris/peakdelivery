import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountSearchPage } from './account-search';

@NgModule({
  declarations: [
    AccountSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountSearchPage),
  ],
})
export class AccountSearchPageModule {}
