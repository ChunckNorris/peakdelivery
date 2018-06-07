import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { Platform } from 'ionic-angular';

import { Environment } from '../environment/environment';
import { UserClaim, 
    NewUser, 
    CreatedUser, 
    Account,
    Delivery,
    DeliveryRunTypes,
    AccountBillingOptions,
    AccountRunOptions,
DeliveryActivities,
SearchedUser,
DeliveryItem,
AccountRunModel,
ChangePassword,
DeliveryBillings,
ResetPassword,
ForgotPassword,
DeliverySearchBindingModel } from '../../models/index';
declare var cordova: any;

export class Endpoint {
    constructor(relativeUrl: string) { this.relativeUrl = relativeUrl };
    relativeUrl: string;
    getUrl(paramDict = {}) {
        let result = this.relativeUrl;
        for (let key in paramDict) {
            result = result.replace('{' + key + '}', paramDict[key]);
        }
        return result.replace("~/", "");
    }
}

export class Endpoints {
    static token = new Endpoint('~/oauth/token');

    //User Data//
    static getUsers = new Endpoint('~/v1/getuser/');
    static getProfile = new Endpoint('~/v1/accounts/user/{userId}');
    static createUser = new Endpoint('~/v1/accounts/create');
    static getUsersToApprove = new Endpoint('~/v1/accounts/users/needapproval');
    static approveUser = new Endpoint('~/v1/accounts/user/approved/{id}');
    static searchUser = new Endpoint('~/v1/accounts/users/{search}');
    static changeUserPassword = new Endpoint('~/v1/accounts/changePassword');
    static forgotPassword = new Endpoint('~/v1/accounts/ForgotPassword');
    static resetPassword = new Endpoint('~/v1/accounts/resetPassword');

    //Acount//
    static upsertAccount = new Endpoint('~/v1/accounts/update');
    static getAccountList = new Endpoint('~/v1/accounts/search/{name}');
    static getAllActiveAccounts = new Endpoint('~/v1/accounts/getAccountList/active');
    static getAllNonActiveAccounts = new Endpoint('~/v1/accounts/getAccountList/inactive');
    static setAccountStatus = new Endpoint('~/v1/accounts/setAccount/{accountId}/status/{accountStatus)');
    static saveAcountforUser = new Endpoint('~/v1/accounts/user/addtoaccount/{userid}/{accountid}');
    static getAccountByAccountId = new Endpoint('~/v1/accounts/get/{accountid}');

    //Delivery Data
    static upsertDelivery = new Endpoint('~/v1/delivery/update');
    static getDeliveryByAccount = new Endpoint('~/v1/delivery/account/get/{accountId}');
    static getAllUndelivered = new Endpoint('~/v1/delivery/notdelivered');
    static getDeliveryByDriver = new Endpoint('~/v1/delivery/notdelivered/{driverid}');
    static searchDelivery = new Endpoint('~/v1/delivery/get');
    static getDeliverySignature = new Endpoint('~/v1/delivery/signature/get/{id}');

    
    //Option List Data//
    static getBillingOptions = new Endpoint('~/v1/options/getbillings');
    static getRunOptionsByAccount = new Endpoint('~/v1/options/getruns/{accountId}');
    static getRunOptionsDefault = new Endpoint('~/v1/options/getruns');
    static getActivityList = new Endpoint('~/v1/options/getactivites');
    static saveRunOption = new Endpoint('~/v1/options/run/update');
    static removeRunOption = new Endpoint('~/v1/options/{accountId}/deactivaterun/{runid}');




}
export class Authorization {
  access_token: string
  token_type: string
  expires_in: number
  isDeprecated: boolean
  message: string
}
export class Token {
  grant_type: string
  username: string
  password: string
  client_id: string
  client_secret: string
}
export class HttpMethods {
    static get = 'GET';
    static post = 'POST';
    static put = 'PUT';
    static delete = 'DELETE';
}

@Injectable()
export class Api {

    public dataUser: any[];
    examList: any = {};

    constructor(private env: Environment, private http: Http,  private platform: Platform) { }

    private convertToUrlSearchParams(obj: any) {
        let params = new URLSearchParams();
        for (let key in obj) {
            params.append(key, obj[key].toString());
        }

        return params;
    }

    // api class does NOT set, nor manage it's own bearer token, this application layer was only meant to send and recieve requests
    static bearerToken: string;

    private request<T>(method: string, relativeUrl: string, searchParams?: any, requestBody?: any, requestHeaders?: Headers, useBearerToken = true): Observable<T> {
        let options = new RequestOptions();
        options.headers = requestHeaders || new Headers();
        options.method = method.toUpperCase();

        options.body = options.body || requestBody;
        if (searchParams) options.search = options.search || this.convertToUrlSearchParams(searchParams);

        options.headers.append('Accept', 'application/json');
        if (Api.bearerToken && useBearerToken) {
            options.headers.append('Authorization', 'Bearer ' + Api.bearerToken);
        }

        return this.http.request(this.env.settings.apiUrl + relativeUrl, options)
            .map((res: Response) => { return res.json(); })
            .map((stream => { return stream; }))
            .share();;
    }





    public getBearerToken(username: string, password: string): Observable<Authorization> {
        let requestBody = new Token();
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        requestBody.username = username;
        requestBody.password = password;
        requestBody.client_id = this.env.settings.apiClientId;
        requestBody.client_secret = this.env.settings.apiClientSecret;
        requestBody.grant_type = this.env.settings.apiGrantType;

        
        return this.request<Authorization>(HttpMethods.post, Endpoints.token.getUrl(), null, this.convertToUrlSearchParams(requestBody).toString(), headers, false);
    }


    public getUserProfile(userId: string): Observable<UserClaim> {
        let endpoint = Endpoints.getProfile.getUrl({ 'userId': userId });
        return this.request<UserClaim>(HttpMethods.get, endpoint);
    
      }
      public getUsersToApprove(): Observable<SearchedUser[]> {
        let endpoint = Endpoints.getUsersToApprove.getUrl();
        return this.request<SearchedUser[]>(HttpMethods.get, endpoint);
    
      }
      public approveUser(id): Observable<any> {
        let endpoint = Endpoints.approveUser.getUrl({id: id});
        let newUser = this.request<any>(HttpMethods.post, endpoint, null);
        return newUser;
      }

      public searchUsers(search): Observable<SearchedUser[]> {
        let endpoint = Endpoints.searchUser.getUrl({search: search});
        let foundUser = this.request<SearchedUser[]>(HttpMethods.get, endpoint);
        return foundUser;
      }


    public createNewUser(user: NewUser): Observable<CreatedUser> {
        let endpoint = Endpoints.createUser.getUrl();
        let newUser = this.request<CreatedUser>(HttpMethods.post, endpoint, null, user);
        return newUser;
      }
      public changePassword(passwordChange: ChangePassword): Observable<any> {
        let endpoint = Endpoints.changeUserPassword.getUrl();
        let changePassword = this.request<any>(HttpMethods.post, endpoint, null, passwordChange);
        return changePassword;
      }
      public resetPassword(passwordChange: ResetPassword): Observable<any> {
        let endpoint = Endpoints.resetPassword.getUrl();
        let resetUserPassword = this.request<any>(HttpMethods.post, endpoint, null, passwordChange);
        return resetUserPassword;
      }
      public forgotPassword(passwordChange: ForgotPassword): Observable<any> {
        let endpoint = Endpoints.forgotPassword.getUrl();
        let forgotUserPassword = this.request<any>(HttpMethods.post, endpoint, null, passwordChange);
        return forgotUserPassword;
      }

      public upsertAccount(account: Account): Observable<any> {
        let endpoint = Endpoints.upsertAccount.getUrl();
        let newUser = this.request<any>(HttpMethods.post, endpoint, null, account);
        return newUser;
      }
      public getAccountList(search): Observable<Account[]> {
        let endpoint = Endpoints.getAccountList.getUrl({name: search});
        return this.request<Account[]>(HttpMethods.get, endpoint);
    
      }
      public getActiveAccountList(): Observable<Account[]> {
        let endpoint = Endpoints.getAllActiveAccounts.getUrl();
        return this.request<Account[]>(HttpMethods.get, endpoint);
    
      }
      public getNonActiveAccountList(): Observable<Account[]> {
        let endpoint = Endpoints.getAllNonActiveAccounts.getUrl();
        return this.request<Account[]>(HttpMethods.get, endpoint);
    
      }
      public saveAccountForUser(userid, accountid): Observable<any> {
        let endpoint = Endpoints.saveAcountforUser.getUrl({'userid': userid, 'accountid': accountid});
        let newUser = this.request<any>(HttpMethods.post, endpoint, null, null);
        return newUser;
      }
      public getAccountById(accountid): Observable<Account> {
        let endpoint = Endpoints.getAccountByAccountId.getUrl({'accountid': accountid});
        return this.request<Account>(HttpMethods.get, endpoint);
    
      }

     
      public searchDelivery(searchData: DeliverySearchBindingModel): Observable<DeliveryItem[]> {
        let endpoint = Endpoints.searchDelivery.getUrl();
        let deliveryResults = this.request<DeliveryItem[]>(HttpMethods.post, endpoint, null, searchData);
        return deliveryResults;
      }


      public saveDelivered(delivery: Delivery): Observable<any> {
        let endpoint = Endpoints.upsertDelivery.getUrl();
        let newUser = this.request<any>(HttpMethods.post, endpoint, null, delivery);
        return newUser;
      }

      //Account Related//
      public getDeiliveryByAccount(accountId: string): Observable<DeliveryItem[]> {
        let endpoint = Endpoints.getDeliveryByAccount.getUrl({'accountId': accountId});
        let foundUser = this.request<DeliveryItem[]>(HttpMethods.get, endpoint);
        return foundUser;
      }





      public getDeiliveryByDriver(driverid: string): Observable<DeliveryItem[]> {
        let endpoint = Endpoints.getDeliveryByDriver.getUrl({'driverid': driverid});
        let deliveryByDriver = this.request<DeliveryItem[]>(HttpMethods.get, endpoint);
        return deliveryByDriver;
      }







      public getAllUndelivered(): Observable<DeliveryItem[]> {
        let endpoint = Endpoints.getAllUndelivered.getUrl();
        let undelivered = this.request<DeliveryItem[]>(HttpMethods.get, endpoint);
        return undelivered;
      }


      //Options List Calls//
      public getBillingOptions(): Observable<DeliveryBillings[]> {
        let endpoint = Endpoints.getBillingOptions.getUrl();
        return this.request<DeliveryBillings[]>(HttpMethods.get, endpoint);
    
      }

      public getActivityOptions(): Observable<DeliveryActivities[]> {
        let endpoint = Endpoints.getActivityList.getUrl();
        return this.request<DeliveryActivities[]>(HttpMethods.get, endpoint);
    
      }

      public getRunOptionsByAccount(account: any): Observable<DeliveryRunTypes[]> {
        let endpoint = Endpoints.getRunOptionsByAccount.getUrl({ 'accountId': account });
        return this.request<DeliveryRunTypes[]>(HttpMethods.get, endpoint);
     
      }
      public getRunOptions(): Observable<DeliveryRunTypes[]> {
        let endpoint = Endpoints.getRunOptionsDefault.getUrl();
        return this.request<DeliveryRunTypes[]>(HttpMethods.get, endpoint);
    
      }
      public saveRunOptions(runOption: AccountRunModel): Observable<any> {
        let endpoint = Endpoints.saveRunOption.getUrl();
        let addedOption = this.request<any>(HttpMethods.post, endpoint, null, runOption);
        return addedOption;
      }
      public removeRunOption(option: DeliveryRunTypes, account: String): Observable<any> {
        let endpoint = Endpoints.removeRunOption.getUrl({'runid': option.key, 'accountId': account});
        let removedOptionResults = this.request<any>(HttpMethods.post, endpoint, null, option);
        return removedOptionResults;
      }
      public getDeliverySignature(id): Observable<string> {
        let endpoint = Endpoints.getDeliverySignature.getUrl({'id': id});
        return this.request<string>(HttpMethods.get, endpoint);
    
      }

}
