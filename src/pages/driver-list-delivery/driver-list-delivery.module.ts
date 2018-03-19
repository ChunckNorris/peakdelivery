import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverListDeliveryPage } from './driver-list-delivery';

@NgModule({
  declarations: [
    DriverListDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverListDeliveryPage),
  ],
})
export class DriverListDeliveryPageModule {}
