import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Profile, Delivery, DeliveryActivities, DeliveryBillings, DeliveryItem, DeliveryRunTypes, DeliverySearchBindingModel } from '../../models/index';
import { User, Ui } from '../../providers/providers';
import {  CustomerDeliveryDetailPage } from '../../pages/pages'
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-customer-search-delivery',
  templateUrl: 'customer-search-delivery.html',
})
export class CustomerSearchDeliveryPage {
  activityOptions: Array<DeliveryActivities>;
  status: string;
  searchType: string;
  toDate: Date;
  fromDate: Date;
  deliveryResults: Array<DeliveryItem>;
  accountId: string;
  deliverySearchResults: Array<DeliveryItem>;
  isFiltered: boolean;
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
    this.deliveryResults =  new Array<DeliveryItem>();
    this.searchType = this.navParams.data.lookupType;
    this.accountId = this.user.userProfile.accountBelongsTo.accountId;
    this.deliverySearchResults = new Array<DeliveryItem>();
    this.isFiltered = false;

  }

  ionViewDidLoad() {


    if(this.searchType === 'Status'){
      let _getActivityOptions = this.api.getActivityOptions().map(acctivitiesRes => {
        this.activityOptions = acctivitiesRes;
  
      }, err => {
        
      });
  
      let _getDeiliveryByAccount =  this.api.getDeiliveryByAccount(this.accountId).map(res => {
        this.deliveryResults = res;
      }, error => {
  
      });
  
      Observable.forkJoin([_getActivityOptions,
        _getDeiliveryByAccount,
      ]).subscribe(results => {
        this.ui.showLoadingIndicator(false);
      }, (error) => {
        console.log(error);
        this.ui.showLoadingIndicator(false);
      });
  
    }else{
      let _getActivityOptions = this.api.getActivityOptions().map(acctivitiesRes => {
        this.activityOptions = acctivitiesRes;
  
      }, err => {
        
      });

      Observable.forkJoin([_getActivityOptions
      ]).subscribe(results => {
        this.ui.showLoadingIndicator(false);
      }, (error) => {
        console.log(error);
        this.ui.showLoadingIndicator(false);
      });

    }

  


  }

  searchDeliveryByDate(){
    this.ui.showLoadingIndicator(true);
    let _search = new DeliverySearchBindingModel();

    _search.startDate = this.fromDate.toString(); 
    _search.endDate = this.toDate.toString();
    _search.deliverySearchType = "All";

    this.api.searchDelivery(_search).subscribe(res => {
      this.deliveryResults = res;
      this.ui.showLoadingIndicator(false);
    }, error => {
      this.ui.showLoadingIndicator(false);
    });


  }
  itemTapped(item){
    this.navCtrl.push(CustomerDeliveryDetailPage, {'delivery': item});
  }
  clearFilter(){
   this.status = null;
    this.api.getActivityOptions().subscribe(acctivitiesRes => {
      this.activityOptions = acctivitiesRes;
      this.isFiltered = false;
      this.deliverySearchResults = new Array<DeliveryItem>();
    }, error => {
      this.isFiltered = false;
      this.deliverySearchResults = new Array<DeliveryItem>();
    });

   
  }
  filterDelivery(event){
    this.isFiltered = true;
    let filterBy = event;
    this.deliverySearchResults = this.deliveryResults;
    let filteredResults = this.deliverySearchResults.filter((del: DeliveryItem) => del.activity === filterBy);

    //if(filteredResults.length > 0 ){
      this.deliverySearchResults = filteredResults;
   // }
  }
}
