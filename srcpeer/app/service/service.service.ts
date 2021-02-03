import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Auth, Storage } from 'aws-amplify';
// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var AWS = require('aws-sdk');
import * as S3 from 'aws-sdk/clients/s3';
const poolData = {
  UserPoolId: 'us-east-1_lM5ZrYKiT', // Your user pool id here
  ClientId: '7h1ev0k4nb2n59quve3o4jc591' // Your client id here
};

const userPool = new CognitoUserPool(poolData);
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  FOLDER = 'jsa-s3/';
  // baseUrl: any = 'https://tqgb5ax63f.execute-api.us-east-1.amazonaws.com/';
  cognitoUser: any;
  bucket = new S3(
    {
      accessKeyId: 'AKIA4WJ5ARST7IAWVOJR',
      secretAccessKey: '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',
      region: 'us-east-1'
    }
  );

  constructor(private toastr: ToastrService, public http: HttpClient, public router: Router) { }

  postApi(url, data): Observable<any> {
    return this.http.post((url), data);
  }

  getApi(url): Observable<any> {
    return this.http.get(url);
  }

  signIn(email, password) {
    const authenticationData = {      
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

  confirmAuthCode(code, email) {
    const user = {
      Username : email,
      Pool : userPool
    };
    return Observable.create(observer => {
      this.cognitoUser = new CognitoUser(user);
      this.cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }

  isLoggedIn() {
    console.log(userPool.getCurrentUser() != null)
    return userPool.getCurrentUser() != null;
  }

  success(msg) {
    this.toastr.success(msg);
  }

  error(msg) {
    this.toastr.error(msg);
  }

  signUp(data) {
    return new Promise<any>((resolve, reject) => {
        Auth.signUp(data)
        .then(succ => {
        console.log('succ ===>>>', succ);
        resolve(succ);
        }).catch(err => {
        console.log('err ===>>>', err);
        reject(err);
        });
    });
  }

  getUserList(userPoolId) {
    var params = {
      UserPoolId: userPoolId,
      // AttributesToGet: [
      //   'email',
      //   'custom:type',
      //   'custom:fullNumber',
      //   'custom:name',
      //   'custom:bannerManagement',
      //   'custom:listingManagement',
      //   'custom:address',
      //   'custom:masterSetupScreen',
      //   'custom:dashboard',
      //   'custom:bookingManagement',
      //   'custom:userManagement',
      //   'custom:subadminManagement',
      //   'custom:reportManagement',
      //   'custom:siteSetting',
      //   'custom:staticContent',
      //   'custom:feeManagement',
      //   'custom:referalManagement',
      //   'custom:imageurl'
      // ],
    };

    return new Promise((resolve, reject) => {
        AWS.config.update({ region: 'us-east-1', 'accessKeyId': 'AKIA4WJ5ARSTXZJ67YPS', 'secretAccessKey': '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' });
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        cognitoidentityserviceprovider.listUsers(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  }

  getParticularUserData(userId) {
    var params = {
      UserPoolId: 'us-east-1_lM5ZrYKiT',
      Username: userId,
    };

    return new Promise((resolve, reject) => {
        AWS.config.update({ region: 'us-east-1', 'accessKeyId': 'AKIA4WJ5ARSTXZJ67YPS', 'secretAccessKey': '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' });
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        cognitoidentityserviceprovider.adminGetUser(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  }

  updateParticularUserData(userId, userAttributes) {
    var params = {
      UserPoolId: 'us-east-1_lM5ZrYKiT',
      Username: userId,
      UserAttributes : userAttributes
    };
    console.log(params);
    return new Promise((resolve, reject) => {
        AWS.config.update({ region: 'us-east-1', 'accessKeyId': 'AKIA4WJ5ARSTXZJ67YPS', 'secretAccessKey': '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' });
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        cognitoidentityserviceprovider.adminUpdateUserAttributes(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  }
}
