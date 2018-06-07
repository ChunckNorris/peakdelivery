import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Profile, Delivery, DeliveryActivities, DeliveryBillings, DeliveryItem, DeliveryRunTypes, DeliverySearchBindingModel } from '../../models/index';
import { User, Ui } from '../../providers/providers';
// import {  CustomerDeliveryDetailPage } from '../../pages/pages'
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-customer-delivery-detail',
  templateUrl: 'customer-delivery-detail.html',
})
export class CustomerDeliveryDetailPage {
delivery: DeliveryItem;
deliverySignature: string;
showAltAddress: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public api: Api,
    public toastCtrl: ToastController,
    public ui: Ui) {
    this.delivery = navParams.data.delivery;
    if(navParams.data.delivery.isAltAddress === 'True'){
      this.showAltAddress = true;
    }else{
      this.showAltAddress = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDeliveryDetailPage');
  }
  getSig(){
    this.ui.showLoadingIndicator(true);
    this.api.getDeliverySignature(this.delivery.deliveryId).subscribe(sigRes => {
      if(sigRes){
        this.deliverySignature = sigRes;
        this.ui.showLoadingIndicator(false);
      }else{
        this.ui.showLoadingIndicator(false);
        let toast = this.toastCtrl.create({
          message: 'No Signature found',
          duration: 1000,
          position: 'top'
        });
        toast.present();
      }
  
    }, error => {
      this.ui.showLoadingIndicator(false);
      let toast = this.toastCtrl.create({
        message: 'Error Retrieving Signature',
        duration: 1000,
        position: 'top'
      });
      toast.present();
    })
    //call to api to get signature. 
  }

}
