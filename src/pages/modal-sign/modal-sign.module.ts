import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSignPage } from './modal-sign';

@NgModule({
  declarations: [
    ModalSignPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalSignPage),
  ],
})
export class ModalSignPageModule {}
