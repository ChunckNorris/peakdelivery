import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {  DriverAddDeliveryPage, 
          DriverEditDeliveryPage, 
          DriverListDeliveryPage, 
          DriverSearchDeliveryPage } from '../../pages/pages'

import { Profile, Delivery } from '../../models/index';



@IonicPage()
@Component({
  selector: 'page-driver-dashboard',
  templateUrl: 'driver-dashboard.html',
})
export class DriverDashboardPage {

  myDeliveries: Array<Delivery>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.myDeliveries = new Array<Delivery>();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverDashboardPage');
  }

  getData = (data) =>
  {
    // if(this.myDeliveries.length > 0){

    // }
    
    if(data){
      this.myDeliveries = data;

      //this.myDeliveries.push(data.delivery);
    }

    return new Promise((resolve, reject) => {
    
      resolve();
    }).then(data => {
      
    });
  };

  addNewDelivery(){

 
    this.navCtrl.push(DriverAddDeliveryPage, 
      {
        data: this.myDeliveries,
        callback: this.getData
      });


    //this.navCtrl.push(DriverAddDeliveryPage);
  }
  viewDeliverys(){
    this.navCtrl.push(DriverListDeliveryPage);
  }
  deliverItem(){
    this.navCtrl.push(DriverListDeliveryPage);
  }
  deliverPackage(del){
    this.navCtrl.push(DriverEditDeliveryPage, { delivery: del });
  }
  navigateToDelivery(selectedDelivery: Delivery) {
    let url = 'http://maps.google.com/?q=' + selectedDelivery.address1 + '+' + selectedDelivery.city + '+' + selectedDelivery.state;
    window.open(url, "_blank");
  }
  checkDelivery(){
    this.navCtrl.push(DriverSearchDeliveryPage, {'lookupType': 'Status'});
  }

  searchDelivery(){
    this.navCtrl.push(DriverSearchDeliveryPage, {'lookupType': 'Search'});
  }
}
