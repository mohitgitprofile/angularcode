import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
// import { AmplifyService } from 'aws-amplify-angular';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';
// import { Router, NavigationEnd } from '@angular/router';
declare var $ :any;
@Component({
  selector: 'app-sidebar-demo',
  templateUrl: './sidebar-demo.component.html',
  styleUrls: ['./sidebar-demo.component.css']
})
export class SidebarDemoComponent implements OnInit {
  mainUrl: any = ''
  currentUrl: any;
  userInfo: any;
  permission: any = [];

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
    
    this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : [] ) : [];
    console.log('permission sidebar', this.permission);
  }

  ngOnInit() {


   
    console.log(this.mainUrl)
    $('.btn-toggle,.close_panel').click(() => {
      $('body').toggleClass('toggle-wrapper');
    });
  }

  logout() {
    this.spinner.show();
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
    $('#signout_modal').modal('hide');
    this.router.navigate(['/']);
    this.spinner.hide();
  }


}
