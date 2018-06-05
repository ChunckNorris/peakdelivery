import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-customer-delivery-detail',
  templateUrl: 'customer-delivery-detail.html',
})
export class CustomerDeliveryDetailPage {
delivery: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.delivery = navParams.data.delivery;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDeliveryDetailPage');
  }
  getSig(){
    //call to api to get signature. 
  }

}
