import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Profile, Delivery, DeliveryActivities, DeliveryBillings, DeliveryItem, DeliveryRunTypes, DeliverySearchBindingModel } from '../../models/index';
import { User, Ui } from '../../providers/providers';
import { DriverEditDeliveryPage } from '../../pages/pages'

@IonicPage()
@Component({
  selector: 'page-driver-search-delivery',
  templateUrl: 'driver-search-delivery.html',
})
export class DriverSearchDeliveryPage {
  activityOptions: Array<DeliveryActivities>;
  status: string;
  searchType: string;
  toDate: Date;
  fromDate: Date;
  deliveryResults: Array<DeliveryItem>;


  constructor(public navCtrl: NavController,
    public api: Api,
    public ui: Ui,
    public user: User,
    public navParams: NavParams) {
    this.ui.showLoadingIndicator(true);
    this.activityOptions = new Array<DeliveryActivities>();
    this.status = '';
    this.toDate = new Date();
    this.fromDate = new Date();
    this.deliveryResults = new Array<DeliveryItem>();
    this.searchType = this.navParams.data.lookupType;

  }

  ionViewDidLoad() {



    this.api.getActivityOptions().subscribe(acctivitiesRes => {
      this.activityOptions = acctivitiesRes;
      this.ui.showLoadingIndicator(false);
    }, err => {
      this.ui.showLoadingIndicator(false);
    })

  }
  searchDeliveryByDate() {
    this.ui.showLoadingIndicator(true);
    let _search = new DeliverySearchBindingModel();
    _search.driverId = this.user.userProfile.id;
    _search.startDate = this.fromDate.toString();
    _search.endDate = this.toDate.toString();
    _search.deliverySearchType = "Driver";

    this.api.searchDelivery(_search).subscribe(res => {
      this.deliveryResults = res;
      this.ui.showLoadingIndicator(false);
    }, error => {
      this.ui.showLoadingIndicator(false);
    });


  }
  itemTapped(item) {
    this.navCtrl.push(DriverEditDeliveryPage, { 'delivery': item });
  }

}
