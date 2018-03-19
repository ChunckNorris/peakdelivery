import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Api } from '../api/api';
import { Profile, AuthUser } from '../../models/index';


/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  profile: Profile;

  constructor(public api: Api) { 

    this.profile = new Profile();

  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: AuthUser) {


    //Authenticate and get role and permisions

    //Mock for demo replace with authenticated api user and jwt ir something later. 
    let requests = new Observable<boolean>(observer => {
    switch (accountInfo.email.toUpperCase()) {
      case 'TESTADMIN@PEAKDELIEVERY.COM':
        let adminUser = new Profile;
        adminUser.firstName = 'Admin';
        adminUser.lastName = 'User';
        adminUser.role = 'Admin';
        adminUser.accountId = '0';
        this._loggedIn(adminUser);
        this.profile = adminUser;
        observer.next(true); 
        break;
      case 'TESTCLIENT@PEAKDELIEVERY.COM':
        let clientUser = new Profile;
        clientUser.firstName = 'Client';
        clientUser.lastName = 'User';
        clientUser.role = 'Client';
        clientUser.accountId = '1';
        this._loggedIn(clientUser);
        this.profile = clientUser;
        observer.next(true);
        break;
      case 'TESTDRIVER@PEAKDELIEVERY.COM':
        let deliverytUser = new Profile;
        deliverytUser.firstName = 'Driver';
        deliverytUser.lastName = 'User';
        deliverytUser.role = 'Driver';
        deliverytUser.accountId = '2';
        this._loggedIn(deliverytUser);
        this.profile = deliverytUser;
        observer.next(true);
        break;
      default:
        this._user = null;
        observer.next(true);
        break;

    }
  });



    // let seq = this.api.post('login', accountInfo).share();

    // seq.subscribe((res: any) => {
    //   // If the API returned a successful response, mark the user as logged in
    //   if (res.status == 'success') {
    //     this._loggedIn(res);
    //   } else {
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    return requests;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.profile = null;

  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  
  }
}
