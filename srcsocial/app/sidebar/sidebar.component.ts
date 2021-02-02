import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
// import { AmplifyService } from 'aws-amplify-angular';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { Router, NavigationEnd } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mainUrl: any = ''
  currentUrl: any;
  userInfo: any;
  permission: any = [];
  showDropDown: boolean = false;  data: any = [];
  profileImage: string;
  adminName: string;
  successResult: any=[];
  adminId: string;
  anotherResult: any;
  userType: string;
  constructor(
    private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = '/' + e.url.split('/')[1];
        console.log(this.currentUrl)
      }
    });
    
    // this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : [] ) : [];
    // console.log('permission sidebar', this.permission);
  }

  ngOnInit() {
    $('.btn-toggle,.close_panel').click(() => {
      $('body').toggleClass('toggle-wrapper');
    });
    this.profileImage = localStorage.getItem('profile');
    this.adminName = localStorage.getItem('name');
    this.adminId = localStorage.getItem('_id');
    this.userType = localStorage.getItem('userType');
    this.getProfile();
  }
  getProfile() {
    let data = {
      token : localStorage.getItem('token'),
      subAdminId : localStorage.getItem('_id')
    }
    this.service.postApii('admin/listOfSubAdmin', data, 1).subscribe(success=>{
      console.log("hgfjhfj7hgu7",success);
      this.anotherResult = success.result.length;
      this.successResult = success.result[0].permission;
      
      console.log("hgfjhfj7h987ghjgu7",this.successResult);
    })
  }

  goToCategory(){
    this.router.navigate(['/category-management'])
  }
  subadminManagement() {


    console.log("subadminManagement")
  }


  logout() {
    localStorage.clear();
    this.service.success('Successfully Logged out.');
    this.router.navigate(['/login']);
    $('#signout_modal').modal('hide')
  }

  // logout() {
  //   this.spinner.show();
  //   var poolData = {
  //     UserPoolId: 'us-east-1_fiLGu5JtO', // Your user pool id here
  //     ClientId: '7j5jrsiv5prvi3ep29mg72m5ri' // Your client id here
  //   };
  //   var userPool = new CognitoUserPool(poolData);

  //   var userData = {
  //     Username: localStorage.getItem('phNumber'),
  //     Pool: userPool
  //   };
  //   var cognitoUser = new CognitoUser(userData);
  //   cognitoUser.signOut();
  //   localStorage.clear();
  //   $('#signout_modal').modal('hide');
  //   this.router.navigate(['/']);
  //   this.spinner.hide();
  // }
//   openDropDown(event) {
//    this.data.push(event);
// console.log("event",event)
// console.log("this.data.length",this.data.length)
//     if (this.data.length % 2 != 0) {
//       this.showDropDown = true;
     
//     } else {
//       this.showDropDown = false;

//     }
//   }

goToLogout(){
    $('#signout_modal').modal('show')
  }

  goToAdmin(){
    this.router.navigate(['/view-adminprofile'])
  }
 

}
