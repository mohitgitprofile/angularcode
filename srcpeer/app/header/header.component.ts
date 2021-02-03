import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDropDown: boolean = false;

  constructor(public router: Router, public service: ServiceService) { }

  ngOnInit() {
    this.check();
  }

  check() {
    $('.app-sidebar__toggle').click(function () {
      $('body').toggleClass('sidenav-toggled');
    });
  }

  logout() {
    var poolData = {
      UserPoolId: 'us-east-1_lM5ZrYKiT', // Your user pool id here
      ClientId: '7h1ev0k4nb2n59quve3o4jc591' // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);
    console.log('userPool==>', userPool);
    var userData = {
      Username: localStorage.getItem('email'),
      Pool: userPool
    };
    // console.log("user data===>",userData)
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut();
    // var rememberMeCredential = JSON.parse(localStorage.getItem('rememberMeCredential'));
    localStorage.clear();
    // localStorage.setItem('rememberMeCredential', JSON.stringify(rememberMeCredential))
    $('#logout_modal').modal('hide');
    this.router.navigate(['/']);
  }

  openDropDown(){
    this.showDropDown = !this.showDropDown
  }

}
