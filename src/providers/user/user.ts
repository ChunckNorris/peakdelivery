import 'rxjs/add/operator/toPromise';
import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Api } from '../api/api';
import { Profile, AuthUser, TokenData, UserClaim } from '../../models/index';


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
  authToken: TokenData;
  userProfile: UserClaim = new UserClaim();
  userRole: string;

  private jwtHelper = new JwtHelper();


  constructor(public api: Api) {

    this.profile = new Profile();
    this.authToken = new TokenData();
    this.userRole = '';

  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: AuthUser) {


    //Authenticate and get role and permisions

    //Mock for demo replace with authenticated api user and jwt ir something later. 
    let requests = new Observable<boolean>(observer => {

      this.api.getBearerToken(accountInfo.email, accountInfo.password).subscribe(res => {
        Api.bearerToken = res.access_token;
        if (res.access_token) {
          let jwt = this.jwtHelper.decodeToken(res.access_token);

          if (jwt.nameid) {

            this.api.getUserProfile(jwt.nameid).subscribe(results => {
              this.userProfile = results;
              let roles = this.userProfile.roles;

              if (roles.length > 0) {
                for (let i = 0; i < roles.length; i++) {
                  if (roles[i] === 'ADMIN') {
                    this.userRole = 'ADMIN'
                    break;
                  } if (roles[i] === 'DRIVER') {
                    this.userRole = 'DRIVER'
                    break;
                  } if (roles[i] === 'CUSTOMER') {
                    this.userRole = 'CUSTOMER'
                    break;
                  }
                }
              }


              switch (this.userRole.toUpperCase()) {
                case 'ADMIN':
                  this._loggedIn(this.userProfile);
                  observer.next(true);
                  break;
                case 'DRIVER':
                  this._loggedIn(this.userProfile);
                  observer.next(true);
                  break;
                case 'CUSTOMER':
                  this._loggedIn(this.userProfile);
                  observer.next(true);
                  break;
                default:
                  this.userProfile = null;
                  observer.error('Unauthorized');
                  break;

              }


            }, err => {
              observer.error('Invalid User Login');
              //alert('Invalid User Login');

            })
          }

        }
      }, err => {
        observer.error('Unauthorized');
        //alert('Invalid User Login');

      })

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
    // let seq = this.api.post('signup', accountInfo).share();

    // seq.subscribe((res: any) => {
    //   // If the API returned a successful response, mark the user as logged in
    //   if (res.status == 'success') {
    //     this._loggedIn(res);
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    // return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {

    this.profile = null;
    this.userProfile = null;

  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {

    this.userProfile = resp;


  }
}
