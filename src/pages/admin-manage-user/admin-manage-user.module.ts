import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminManageUserPage } from './admin-manage-user';

@NgModule({
  declarations: [
    AdminManageUserPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminManageUserPage),
  ],
})
export class AdminManageUserPageModule {}
