import { Injectable, ViewChild } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Auth from '@aws-amplify/auth';
const AWS = require('aws-sdk');
import * as S3 from 'aws-sdk/clients/s3';
import { AmplifyService } from 'aws-amplify-angular';
import { ConsoleLogger } from '@aws-amplify/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
const poolData = {
  UserPoolId: 'us-east-1_fiLGu5JtO', // Your user pool id here
  ClientId: '7j5jrsiv5prvi3ep29mg72m5ri' // Your client id here
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  @ViewChild('ngOtpInput', { static: true }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: true,
  };
  
  // baseUrl = 'http://172.16.1.119:1600/api/v1/';
  // baseUrl = 'http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1535/api/v1/';
  // baseUrl = 'http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1535/api/v1/';
    baseUrl = 'https://api.socialex.co/api/v1/';
  // baseUrl = 'https://cors-anywhere.herokuapp.com/https://vtobdau6i6.execute-api.us-east-1.amazonaws.com/Stage1';
  getHttpOptions: any;
  httpOptions: any;
  cognitoUser: any;
  currentUrl: any;
  url: any;
  data: any;

  permissionsArr: any = [
    { permissionName: 'addSubadmin', index: 1 },
    { permissionName: 'changeSubadmin', index: 2 },
    { permissionName: 'deleteSubadmin', index: 3 },
    { permissionName: 'changeSubadminStatus', index: 4 },
    { permissionName: 'addUser', index: 5 },
    { permissionName: 'changeUser', index: 6 },
    { permissionName: 'deleteUser', index: 7 },
    { permissionName: 'changeUserStatus', index: 8 },
    { permissionName: 'addGateway', index: 9 },
    { permissionName: 'changeGateway', index: 10 },
    { permissionName: 'deleteGateway', index: 11 },
    { permissionName: 'changeGatewayStatus', index: 12 },
    { permissionName: 'addLight', index: 13 },
    { permissionName: 'changeLight', index: 14 },
    { permissionName: 'deleteLight', index: 15 },
    { permissionName: 'changeLightStatus', index: 16 },
    { permissionName: 'addZone', index: 17 },
    { permissionName: 'changeZone', index: 18 },
    { permissionName: 'deleteZone', index: 19 },
    { permissionName: 'changeZoneStatus', index: 20 },
    { permissionName: 'addRoom', index: 21 },
    { permissionName: 'changeRoom', index: 22 },
    { permissionName: 'deleteRoom', index: 23 },
    { permissionName: 'changeRoomStatus', index: 24 },
    { permissionName: 'addRole', index: 25 },
    { permissionName: 'deleteRole', index: 26 },
    { permissionName: 'editStaticContent', index: 27 }






    // { permissionName: 'addAbout',               index: 1},
    // { permissionName: 'changeAbout',            index: 2},
    // { permissionName: 'deleteAbout',            index: 3},
    // { permissionName: 'addContact',             index: 4},
    // { permissionName: 'changeContact',          index: 5},
    // { permissionName: 'deleteContact',          index: 6},
    // { permissionName: 'addMyUser',              index: 7},
    // { permissionName: 'addUser',                index: 8},
    // { permissionName: 'changeMyUser',           index: 9},
    // { permissionName: 'deleteMyUser',           index: 10},
    // { permissionName: 'addPermission',          index: 11},
    // { permissionName: 'changePermission',       index: 12},
    // { permissionName: 'deletePermission',       index: 13},
    // { permissionName: 'addPost',                index: 14},
    // { permissionName: 'changePost',             index: 15},
    // { permissionName: 'deletePost',             index: 16},
    // { permissionName: 'addRoles',               index: 17},
    // { permissionName: 'changeRoles',            index: 18},
    // { permissionName: 'deleteRoles',            index: 19},
    // { permissionName: 'addRoom',                index: 20},
    // { permissionName: 'changeRoom',             index: 21},
    // { permissionName: 'deleteRoom',             index: 22},
    // { permissionName: 'addRoomDetail',          index: 23},
    // { permissionName: 'changeRoomDetail',       index: 24},
    // { permissionName: 'deleteRoomDetail',       index: 25},
    // { permissionName: 'addRoomLight',           index: 26},
    // { permissionName: 'changeRoomLight',        index: 27},
    // { permissionName: 'deleteRoomLightDetail',  index: 28},
    // { permissionName: 'addScene',               index: 29},
    // { permissionName: 'changeScene',            index: 30},
    // { permissionName: 'deleteScene',            index: 31},
    // { permissionName: 'addUserRoom',            index: 32},
    // { permissionName: 'changeUserRoom',         index: 33},
    // { permissionName: 'deleteUserRoom',         index: 34},
    // { permissionName: 'addZoneAndLevel',        index: 35},
    // { permissionName: 'changeZoneAndLevel',     index: 36},
    // { permissionName: 'deleteZoneAndLevel',     index: 37},
    // { permissionName: 'addZoneDetail',          index: 38},
    // { permissionName: 'changeZoneDetail',       index: 39},
    // { permissionName: 'deleteZoneDetail',       index: 40},
  ];

  bucket = new S3(
    {
      accessKeyId: 'AKIA4WJ5ARST7IAWVOJR',
      secretAccessKey: '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',
      region: 'us-east-1'
    }
  );

  constructor(public http: HttpClient, private amplifyService: AmplifyService, private toastr: ToastrService) {
  }

  postApi(url, data): Observable<any> {
    return this.http.post((this.baseUrl+url), data);
  }

  postApii(url, data, isHeader): Observable<any> {
    let httpOptions = {};
    if (isHeader == 0) {
      return this.http.post((this.baseUrl + url), data);
    } else if (isHeader == 1) {
        httpOptions = {
            headers: new HttpHeaders({
              'token': localStorage.getItem('token'),
            })
        };
        return this.http.post((this.baseUrl + url), data, httpOptions);
    } 
}

  getApi(url): Observable<any> {
    return this.http.get(this.baseUrl+url);
  }

  // getApii(url, data): Observable<any> {
  //   return this.http.get((this.baseUrl+url), data);
  // }

  getApii(url, isHeader): Observable<any> {
    let httpOptions = {};
    if (isHeader == 0) {
      return this.http.get((this.baseUrl + url));
    } else if (isHeader == 1) {
        httpOptions = {
            headers: new HttpHeaders({
                'token': localStorage.getItem('token'),
              })
        };
        return this.http.get((this.baseUrl + url), httpOptions);
    }
}

// Delete Api 
deleteApi(url, bodyData, isHeader) {
  var httpOptions;
  httpOptions = {
    headers: new HttpHeaders({
      "token": localStorage.getItem('token')
    }), observe: 'response',  body: bodyData
  }
  return this.http.delete(this.baseUrl + url, httpOptions);
}

  getLoginUserData() {
    this.amplifyService.authStateChange$.subscribe(authState => {
      return authState;
    });
  }
  success(msg) {
    this.toastr.success(msg);
  }

  error(msg) {
    this.toastr.error(msg);
  }

  signIn(number, password) {
    const authenticationData = {
      Username: number,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: number,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          observer.next(result);
          observer.complete();
        },
        onFailure: (err) => {
          observer.error(err);
        },
      });
    });
  }

  getUserList() {
    var params = {
      UserPoolId: 'us-east-1_fiLGu5JtO'
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

  signUp(data) {
    return new Promise<any>((resolve, reject) => {
      Auth.signUp(data)
        .then(succ => {
          resolve(succ);
        }).catch(err => {
          reject(err);
        });
    });
  }

  confirmAuthCode(code, email) {
    const user = {
      Username: email,
      Pool: userPool
    };
    return Observable.create(observer => {
      this.cognitoUser = new CognitoUser(user);
      this.cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          observer.error(err);
        }
        observer.next(result);
        observer.complete();
      });
    });
  }

  getParticularUserData(userId) {
    var params = {
      UserPoolId: 'us-east-1_fiLGu5JtO',
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

  // getApi(url, isHeader): Observable<any> {
  //   var httpOptions;
  //   if (isHeader === 0) {
  //     this.httpOptions = {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //       observe: 'response'
  //     };
  //   } else {
  //     this.httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
  //       })
  //     };
  //   }
  //   return this.http.get(this.baseUrl + url, this.httpOptions);
  // }

  // postApi(url, apireq, isHeader) {
  //   var httpOptions;
  //   if (isHeader === 0) {
  //     this.httpOptions = {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //       observe: 'response'
  //     };
  //   } else {
  //     this.httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
  //       })
  //     };
  //   }
  //   return this.http.post(this.baseUrl + url, apireq, this.httpOptions);
  // }

  updateParticularUserData(userId, userAttributes) {
    var params = {
      UserPoolId: 'us-east-1_fiLGu5JtO',
      Username: userId,
      UserAttributes: userAttributes
    };
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

 /** to check characters start */
 toCheckSpaceChar(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if((charCode == 32) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
  evt.preventDefault()
  }else {
  return true;
  }
  }
  /** to check characters end  */


  /** to prevent first space */
  preventSpace(event){
    if((event.charCode == 32 || event.charCode == 64) && !event.target.value){
      event.preventDefault();
    }
  }
}



/*********************************** INTERCEPTOR *****************************************/

@Injectable()

export class HttpModifierInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap((response: any) => {
      if (response.status === 401) {
        var poolData = {
          UserPoolId: 'us-east-1_fiLGu5JtO', // Your user pool id here
          ClientId: '7j5jrsiv5prvi3ep29mg72m5ri' // Your client id here
        };
        var userPool = new CognitoUserPool(poolData);
        var userData = {
          Username: localStorage.getItem('phNumber'),
          Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.signOut();
        localStorage.clear();
        this.router.navigate(['/']);
      }
    }, err => {
      if (err.status === 401) {
        var poolData = {
          UserPoolId: 'us-east-1_fiLGu5JtO', // Your user pool id here
          ClientId: '7j5jrsiv5prvi3ep29mg72m5ri' // Your client id here
        };
        var userPool = new CognitoUserPool(poolData);
        var userData = {
          Username: localStorage.getItem('phNumber'),
          Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.signOut();
        localStorage.clear();
        this.router.navigate(['/']);
      }
    }));

  }

 

}



/****************************************  Admin Crediential and Staging Url Start ***************************************/

// http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1525/dashboard
// +919999525900
// Mobiloitte@123

// Credentials for the employer:
// username: +917017533723
// password: Mobiloitte@2

// Code_branch: dev_anshul
// Staging_branch: anshul_staging

/****************************************  Admin Crediential End ***************************************/
