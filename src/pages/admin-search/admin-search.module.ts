import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSearchPage } from './admin-search';

@NgModule({
  declarations: [
    AdminSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminSearchPage),
  ],
})
export class AdminSearchPageModule {}
