import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-setting',
  templateUrl: './banner-setting.component.html',
  styleUrls: ['./banner-setting.component.css']
})
export class BannerSettingComponent implements OnInit {
  editImage: string = 'https://res.cloudinary.com/dmabxaha1/image/upload/v1561717504/bxl4lgzl5inbe27hocsq.png';
  message: any = ''
  bannerId: any;
  coinList: any = [];
  constructor(public service: ServiceService, public router: Router) { }

  ngOnInit() {
    this.getAllCoins();
  }

  // Get All The Coin Functionality
  getAllCoins() {
    this.service.showSpinner();
    this.service.get('wallet/wallet/get-all-user-balance-and-coinlist').subscribe(res => {

      this.service.hideSpinner();
      if (res['status'] == 200) {
        var coinList = res['data'].coinList;
        for (var x = 0; x < coinList.length; x++) {
          coinList[x]['walletBalance'] = res['data'].userBalance[x].walletBalance;
          coinList[x]['blockedBalance'] = res['data'].userBalance[x].blockedBalance;
        }
        this.coinList = coinList;

      }
    }, err => {

      this.service.hideSpinner();
      if (err['status'] == '401') {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.service.toasterErr('Unauthorized');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // Get Banner Details 
  getBannerDetails() {
    this.service.showSpinner();
    this.service.get('static-content-service/admin/static-content/get-banner-list').subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {

        this.editImage = res['data'][0].imageUrl;
        this.message = res['data'][0].description;
        this.bannerId = res['data'][0].bannerId;

      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.toasterErr('Unauthorized Access');
        this.service.onLogout();
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // Image Functionality Start Here
  uploadImg($event): void {
    var img = $event.target.files[0];

    this.uploadImageFunc(img);
  }
  uploadImageFunc(img) {
    var fb = new FormData();
    fb.append('file', img)
    this.service.showSpinner();
    this.service.postApi('account/upload-file', fb).subscribe(res => {
      if (res['status'] == '200') {
        this.editImage = res['data'];

      } else {
        this.service.toasterErr(res['message']);
      }
      this.service.hideSpinner();
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }

  // Save Banner Functionality
  saveBannerFunct() {

    var apireq = {
      "description": this.message,
      "imageUrl": this.editImage,
      "bannerId": this.bannerId ? Number(this.bannerId) : 1
    }
    this.service.showSpinner();
    this.service.post('static-content-service/admin/static-content/update-banner', apireq).subscribe(res => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message']);
        this.getBannerDetails();
      } else {
        this.service.toasterErr(res['message']);
      }
    }, err => {
      this.service.hideSpinner();
      if (err['status'] == '401') {
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      } else {
        this.service.toasterErr('Something Went Wrong');
      }
    })
  }


  // Update Coin Withdraw Fee Functionality
  updateCoinWithdrawFee(withdrawalAmount,coinName){
   
    var url = 'wallet/admin/fee-management/set-minimum-withdrawal-amount?coinName='+coinName+'&withdrawalAmount='+withdrawalAmount;
    this.service.showSpinner();
    this.service.get(url).subscribe(res=>{
      this.service.hideSpinner();
      if(res['status']== 200){
        this.getAllCoins();  
        this.service.toasterSucc('Withdraw Fee Updated Succesfully')   
      }else {
        this.service.toasterErr(res['message'])
      }
    },err=>{
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.onLogout();
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
      }
    })


  }

}
