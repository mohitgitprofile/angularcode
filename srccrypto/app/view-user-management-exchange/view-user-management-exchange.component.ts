import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-view-user-management-exchange',
  templateUrl: './view-user-management-exchange.component.html',
  styleUrls: ['./view-user-management-exchange.component.css']
})
export class ViewUserManagementExchangeComponent implements OnInit {
  currTab: any = 'advertisement';
  userId: any;
  basicUserDetails: any;
  loginDetailss: any = [];
  pageNumber: number = 1;
  loginDetailsLength: any;
  kycDetailss: any = [];
  kycDetailsLength: any;
  advertisementlist: any = [];
  advertisementlistlength: any;
  tradeList: any = [];
  tradeListlength: any;
  wallethistoryData: any = [];
  wallethistoryDatalength: any;
  feedbackLoopData: any = [];
  blockedbyData: any = [];
  BlockDeleteId: any;
  userStatusForSuspend: any;
  suspendForm: FormGroup;
  constructor(public router: Router, public service: ServiceService, public param: ActivatedRoute) {
    this.param.queryParams.subscribe((res: any) => {
      console.log("jdhsgfjsdhg", res)
      this.userId = res.id
    })
  }

  ngOnInit() {
    this.suspendForm = new FormGroup({
      reasonforsuspend : new FormControl('')
    })
    this.userBasicDetails();
    this.loginDetails();
    this.kycDetails();
    this.getAdvertisement();
    this.getTradeList();
    this.getWalletHistory();
    this.getFeedback();
    this.blockedby();
  }
  blockedby() {
    // account/admin/get-user-blockedby-list?blockedUserId=28&page=0&pageSize=10 
    this.service.get('account/admin/get-user-blockedby-list?blockedUserId=' + (this.userId) + '&page=0&pageSize=10').subscribe((res: any) => {
      console.log("juygdcf78asydfkajbhsf68yd", res)
      if (res.status == 200) {
      this.blockedbyData = res.data
      console.log(this.blockedbyData)
      }
    })
  }
  getFeedback() {
    // account/admin/get-user-feedback-list?feedbackUserId=76&page=0&pageSize=10
    this.service.get('account/admin/get-user-feedback-list?feedbackUserId=' + (this.userId) + '&page=0&pageSize=10').subscribe((res: any) => {
      console.log("juygdcf78asydfkajbhsf68yd", res);
      if (res.status == 200) {
        this.feedbackLoopData = res.data;
        console.log(this.feedbackLoopData)
      }

    })
  }
  getWalletHistory() {
    this.service.get(`wallet/admin/transaction-history/get-user-transaction-history?userId=${this.userId}`).subscribe((res: any) => {

      if (res.status == 200) {
        this.wallethistoryData = res.data;
        this.wallethistoryDatalength = res.data.length;
        console.log("jhgs98ysjhg", this.wallethistoryDatalength)
      }
    })
  }
  getTradeList() {
    this.service.showSpinner();
    this.service.get('p2p-exchange/search-and-filters-trade-list?page=0&pageSize=5').subscribe((res: any) => {

      if (res.status == 200) {
        this.tradeList = res.data.list
        this.tradeListlength = this.tradeList.length;
        console.log("jhugsd89sdjkhg", this.tradeList)
        this.service.hideSpinner();
      }
    })
  }
  getAdvertisement() {
    this.service.showSpinner();
    this.service.get('p2p-exchange/admin/search-and-filters-advertisement?page=0&pageSize=10').subscribe((res: any) => {
      console.log("jhygu87gjuj", res)
      if (res.status == 200) {
        this.advertisementlist = res.data.list;
        this.advertisementlistlength = this.advertisementlist.length;
        console.log("jugdkjugds8f97sdfgklid", this.advertisementlist, this.advertisementlistlength)
        this.service.hideSpinner();
      }
      else {
        this.service.hideSpinner();
      }
    }, (error) => {
      console.log("jhygf87hjgj", error);
      this.service.hideSpinner();
    })
  }
  kycDetails() {
    this.service.get('account/admin/kyc-management/get-kyc-details?userId=' + (this.userId)).subscribe((res: any) => {
      this.service.showSpinner();
      if (res.status == 200) {
        console.log("jhfgs876dhjgsvju", res)
        this.kycDetailss = res.data.document;
        this.kycDetailsLength = res.data.length;
        console.log("jdshfg89sdfghknjsdbfhgks89fgjbn", this.kycDetailss)
        this.service.hideSpinner();
      }
      else {
        this.service.hideSpinner();
      }
    }, (error) => {
      console.log("hgsfdu78s6djghs", error);
      this.service.hideSpinner();
    })
  }
  userBasicDetails() {
    this.service.showSpinner();
    this.service.get('account/admin/user-management/user-details?userId=' + (this.userId)).subscribe((res: any) => {
      console.log("hgyf87t587u", res)
      if (res.status == 200) {
        this.basicUserDetails = res.data;
        this.userStatusForSuspend = res.data.userStatus;
        this.service.hideSpinner();
      }
      else {
        this.service.hideSpinner();
      }
    }, (error) => {
      this.service.hideSpinner();
    })
  }

  loginDetails() {
    this.service.showSpinner();
    this.service.get('account/admin/logs/get-user-login-details?userIdForLoginDetails=' + (this.userId)).subscribe((res: any) => {
      console.log("jhgdsf87dsyfghjkbdj", res)
      if (res.status == 200) {
        this.loginDetailss = res.data;
        this.loginDetailsLength = res.data.length;
        console.log("jdshfg89sdfghknjsdbfhgks89fgjbn", this.loginDetailsLength)
      }
      else {
        this.service.hideSpinner();
      }
    }, (error) => {
      console.log("jdhsfgvsd897fgysdjbghfg", error);
      this.service.hideSpinner();
    })
  }
  feedback(data) {
    // this.route.navigate(['/view-fee'],{queryParams:{coin:coin}})
    this.router.navigate(['/view-user-management-exchange-of-feedback'], { queryParams: { data: data } })
  }

  /** to switch between tabs */
  selectTab(tab) {
    this.currTab = tab;
  }

  blockby(data) {
    this.BlockDeleteId = data;
    $('#deleteModal').modal('show')
  }
  deleteFunction() {
    this.service.post('account/admin/remove-user-from-block-list?blockedId=' + (this.BlockDeleteId), '').subscribe((res: any) => {
      console.log("jdghsf89ds7yfghjkvbsdif8g", res)
    })
  }

  suspenduser() {
    $('#suspendModal').modal('show')
  }
  unsuspenduser() {
    $('#unsuspendModal').modal('show')
  }
  finalSuspendUser() {
    $('#suspendModal').modal('hide');
    let data = {
      "reason": this.suspendForm.value.reasonforsuspend,
      "suspendUserId": Number(this.userId)
    }
    console.log("jhgd87fjhsgfgasfjk78djsghyfu76dsfghvsud7hjgj",data)
    this.service.postApi('account/admin/user-management/suspend-user', data).subscribe((res: any) => {
      console.log("jhgd87fjhsgfgasfjk78djsghyfu76dsfghvsud7hjgj",res)
    
    this.service.toasterSucc(res.message);
    this.userBasicDetails();
    this.loginDetails();
    this.kycDetails();
    this.getAdvertisement();
    this.getTradeList();
    this.getWalletHistory();
    this.getFeedback();
    this.blockedby();
    })
  }

  finalUnuspendUser() {
    $('#unsuspendModal').modal('hide');
    let data = {
      "reason": this.suspendForm.value.reasonforsuspend,
      "suspendUserId": Number(this.userId)
    }
    console.log("jhgd87fjhsgfgasfjk78djsghyfu76dsfghvsud7hjgj",data)
    this.service.postApi('account/admin/user-management/unsuspend-user', data).subscribe((res: any) => {
      console.log("jhgd87fjhsgfgasfjk78djsghyfu76dsfghvsud7hjgj",res)
    
    this.service.toasterSucc(res.message);
    this.userBasicDetails();
    this.loginDetails();
    this.kycDetails();
    this.getAdvertisement();
    this.getTradeList();
    this.getWalletHistory();
    this.getFeedback();
    this.blockedby();
    })
  }
  exportAsXLSX() {
    let dataArr = [];
    this.loginDetailss.forEach((element, ind) => {

      dataArr.push({
        "S no": ind + 1,
        "User ID": element.userId ? element.userId : '',
        "User Name": element.firstName + '' + element.lastName ? element.lastName : '',
        "Email": element.email ? element.email : 'N/A',
        "Phone": element.ipAddress ? element.ipAddress : 'N/A',
        "Status": element.userStatus == true ? 'Active' : 'Inactive',
        "Date": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Admin User list');
  }

  loginHistoryExportInExcel() {
    let dataArr = [];
    this.loginDetailss.forEach((element, ind) => {

      dataArr.push({
        "S no": ind + 1,
        "Date Time": element.createTime ? element.createTime : 'N/A',
        "Region IP": element.ipAddress ? element.ipAddress : 'N/A',
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Admin User list');
  }

  kycStatusExportInExcel() {
    let dataArr = [];
    this.kycDetailss.forEach((element, ind) => {

      dataArr.push({
        "S no": ind + 1,
        "Date Time": element.createTime ? element.createTime : 'N/A',
        "Region IP": element.ipAddress ? element.ipAddress : 'N/A',
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Admin User list');
  }

}
