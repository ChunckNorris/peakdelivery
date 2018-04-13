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
    Delivery } from '../../models/index';
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
    static getUsers = new Endpoint('~/v1/getuser/');
    static getProfile = new Endpoint('~/v1/accounts/user/{userId}');
    static createUser = new Endpoint('~/v1/accounts/create');

    static upsertAccount = new Endpoint('~/v1/accounts/update');
    static getAccountList = new Endpoint('~/v1/accounts/get/-1');


    static upsertDelivery = new Endpoint('~/v1/delivery/update');
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

    // private userRequest<T>(method: string, relativeUrl: string, searchParams?: any, requestBody?: any, requestHeaders?: Headers, useBearerToken = true): Observable<T> {
    //     let options = new RequestOptions();
    //     options.headers = requestHeaders || new Headers();
    //     options.method = method.toUpperCase();

    //     options.body = options.body || requestBody;
    //     if (searchParams) options.search = options.search || this.convertToUrlSearchParams(searchParams);

    //     options.headers.append('Accept', 'application/json');
    //     options.headers.append('Accept', 'aapplication/x-www-form-urlencoded');
        

    //     return this.http.request(this.env.settings.apiUrl + relativeUrl, options)
    //         .map((res: Response) => { return res.json(); })
    //         .map((stream => { return stream; }))
    //         .share();
    // }



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
    public createNewUser(user: NewUser): Observable<CreatedUser> {
        let endpoint = Endpoints.createUser.getUrl();
        let newUser = this.request<CreatedUser>(HttpMethods.post, endpoint, null, user);
        return newUser;
      }



      public upsertAccount(account: Account): Observable<any> {
        let endpoint = Endpoints.upsertAccount.getUrl();
        let newUser = this.request<any>(HttpMethods.post, endpoint, null, account);
        return newUser;
      }
      public getAccountList(): Observable<Account[]> {
        let endpoint = Endpoints.getAccountList.getUrl();
        return this.request<Account[]>(HttpMethods.get, endpoint);
    
      }



      public saveDelivered(delivery: Delivery): Observable<any> {
        let endpoint = Endpoints.upsertDelivery.getUrl();
        let newUser = this.request<any>(HttpMethods.post, endpoint, null, delivery);
        return newUser;
      }
}
