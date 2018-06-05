import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerDeliveryDetailPage } from './customer-delivery-detail';

@NgModule({
  declarations: [
    CustomerDeliveryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerDeliveryDetailPage),
  ],
})
export class CustomerDeliveryDetailPageModule {}
