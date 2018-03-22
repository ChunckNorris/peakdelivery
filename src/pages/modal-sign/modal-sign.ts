import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-modal-sign',
  templateUrl: 'modal-sign.html',
})
export class ModalSignPage {

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSignPage');
  }
  closeTapped() {


    this.viewCtrl.dismiss({});
  }
  saveSig(selected) {


    let data = { selected };


    this.viewCtrl.dismiss(data);

  }
  ionViewDidEnter() {
    this.signaturePad.clear()
    // this.storage.get('savedSignature').then((data) => {
    //   this.signature = data;
    // });
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
   
    //this.storage.set('savedSignature', this.signature);

    this.signaturePad.clear();

    this.viewCtrl.dismiss(this.signature);

  }

  clearPad() {
    this.signaturePad.clear();
  }
}
