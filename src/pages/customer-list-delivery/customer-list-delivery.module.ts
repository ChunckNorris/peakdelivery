import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerListDeliveryPage } from './customer-list-delivery';

@NgModule({
  declarations: [
    CustomerListDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerListDeliveryPage),
  ],
})
export class CustomerListDeliveryPageModule {}
