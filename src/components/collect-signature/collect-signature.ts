import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'collect-signature',
  templateUrl: 'collect-signature.html'
})
export class CollectSignatureComponent {

  signature = '';
  isDrawing = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor(public navController: NavController, public storage: Storage) {


  }
  ionViewDidEnter() {
    this.signaturePad.clear()
    this.storage.get('savedSignature').then((data) => {
      this.signature = data;
    });
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.storage.set('savedSignature', this.signature);
    this.signaturePad.clear();

  }

  clearPad() {
    this.signaturePad.clear();
  }

}
