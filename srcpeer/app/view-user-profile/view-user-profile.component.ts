import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit {

  paramData: any;
  userData: any = [];
  data = {
    email : [{Name: '', Value: ''}],
    name: [{Name: '', Value: ''}],
    mobNo: [{Name: '', Value: ''}],
    address: [{Name: '', Value: ''}],
    imageUrl: [{Name: 'custom:imageurl', Value: 'noImage'}],
    
  };
  userList: any=[];
  particularUserDetail:any=[];
  constructor(
    private spinner: NgxSpinnerService,
    public activatedRoute: ActivatedRoute,
    public service: ServiceService
  ) {

  }

  ngOnInit() {
    this.getParamData();
  }

  getParamData() {
    this.activatedRoute.params.subscribe(params => {
      this.paramData = params;
      // this.getUserData();
      this.getUserList();
    });
  }



  getUserList() {
    this.spinner.show();
    this.service.getUserList('us-east-1_DdVuKjB9D').then((success: any) => {
      this.userList = success.Users;
      console.log('before===>>', this.userList);
      this.getParticularUser();
     this.spinner.hide();
    }).catch(error => {
      this.spinner.hide();
    });
  }

  
  // Get Particular User Detail
  getParticularUser(){

   var particularUserDetail = this.userList.filter(x=>(x.Username == this.paramData['data']));
   this.particularUserDetail = particularUserDetail[0].Attributes;
    console.log('Particular Data--->',this.particularUserDetail)
  }
  // getUserData() {
  //   this.spinner.show();
  //   this.service.getParticularUserData(this.paramData.data).then((success: any) => {
  //     if (success.Username !== '') {
  //       this.userData = success.UserAttributes;
  //       console.log('this.userData ==>>', success);
  //       this.data.imageUrl = this.userData.filter(item => {
  //         return item.Name === 'custom:imageurl';
  //       });
  //       this.data.email = this.userData.filter(item => {
  //         return item.Name === 'email';
  //       });
  //       this.data.name = this.userData.filter(item => {
  //         return item.Name === 'custom:name';
  //       });
  //       this.data.mobNo = this.userData.filter(item => {
  //         return item.Name === 'custom:fullNumber';
  //       });
  //       this.data.address = this.userData.filter(item => {
  //         return item.Name === 'custom:address';
  //       });
       
  //       this.spinner.hide();
  //     } else {
  //       this.service.error('User does not exist');
  //       this.spinner.hide();
  //     }
  //   }).catch(error => {
  //     this.spinner.hide();
  //     this.service.error('User does not exist');
  //   });
  // }

}
