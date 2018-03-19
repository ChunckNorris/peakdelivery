import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerSearchDeliveryPage } from './customer-search-delivery';

@NgModule({
  declarations: [
    CustomerSearchDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerSearchDeliveryPage),
  ],
})
export class CustomerSearchDeliveryPageModule {}
