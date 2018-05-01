import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainDashboardPage } from './main-dashboard';

@NgModule({
  declarations: [
    MainDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(MainDashboardPage),
  ],
})
export class MainDashboardPageModule {}
