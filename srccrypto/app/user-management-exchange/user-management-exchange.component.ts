import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
declare var $:any;

@Component({
  selector: 'app-user-management-exchange',
  templateUrl: './user-management-exchange.component.html',
  styleUrls: ['./user-management-exchange.component.css']
})
export class UserManagementExchangeComponent implements OnInit {
  pageNumber: number = 1;
  userList: any = [];
  userForm: FormGroup;
  userID: any;
  action: any;
  constructor(public router: Router, public service : ServiceService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      searchText : new FormControl('')
    })
    this.getUserList();
  }
  viewStaff(data) {
    console.log("jdhfgs78dsgbv",data)
    this.router.navigate(['/view-user-management-exchange'],{queryParams:{id:data}})
  }

  searchby(){
    this.service.get('account/admin/user-management/filter-user-details?search='+(this.userForm.value.searchText)).subscribe((res:any)=>{
      console.log("djhgsfjhdgf",res)
      if(res.status == 200) {
        this.userList = res['data']['list'];
      }
      else {
        this.userList = res['data']['list'];
      }
      
    })
  }

  reset() {
    this.userForm.reset();
    this.getUserList();
  }

    // Get List of User
    getUserList() {
      var url = "account/admin/user-management/filter-user-details";
      // var url = "account/admin/user-management/filter-user-details?&page=1";
      this.service.showSpinner();
      this.service.get(url).subscribe(res => {
  
        this.service.hideSpinner();
        if (res['status'] == 200) {
          this.userList = res['data']['list'];
  
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

     //export User
  exportAsXLSX() {
    let dataArr = [];
    this.userList.forEach((element, ind) => {

      dataArr.push({
        "S no": ind + 1,
        "User ID": element.userId ? element.userId : '',
        "User Name": element.firstName + '' + element.lastName ? element.lastName : '',
        "Email": element.email ? element.email : 'N/A',
        "Phone": element.phoneNo ? element.phoneNo : 'N/A',
        "Status": element.userStatus == true ? 'Active' : 'Inactive',
        "Date": element.createTime ? element.createTime.slice(0, 10) : 'N/A',
      })
    })

    this.service.exportAsExcelFile(dataArr, 'Admin User list');
  }

    goAdmin() {
      this.router.navigate(['/admin-management']);
    }

      // Delete / Block Function
  openModal(action, userId) {
    this.userID = userId;
    this.action = action;
    if (action == 'DELETE') {
      $('#deleteModal').modal('show')

    } else if (action == 'BLOCK') {
      $('#block').modal('show')
    }
    else {
      $('#active').modal('show')
    }
  }

    // Delete User 
    deleteFunction() {
      // account/admin/user-management/delete-user-detail?ipAddress=1&location=1&userIdToDelete=1
      var url = 'account/admin/user-management/delete-user-detail?userIdToDelete=' + (this.userID) + '&ipAddress=' + (6754675467) + '&location=' + ('unknown');
      this.service.showSpinner();
      this.service.get(url).subscribe(res => {
  
        this.service.hideSpinner();
        if (res['status'] == 200) {
          $('#deleteModal').modal('hide')
          this.service.toasterSucc('User Deleted Successfully');
          this.getUserList();
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

    performAction() {
      var url = 'account/admin/user-management/user-status?ipAddress='+(11)+'&location='+('unknown')+ '&userIdForStatusUpdate='+(this.userID) + '&userStatus=' + (this.action);
      this.service.showSpinner();
      this.service.post(url, '').subscribe(res => {
  
        this.service.hideSpinner();
        if (res['status'] == 200) {
          if (this.action == 'BLOCK') {
            $('#block').modal('hide');
            this.service.toasterSucc('User Blocked Successfully');
          }
          else {
            $('#active').modal('hide');
            this.service.toasterSucc('User Activated Successfully');
          }
          this.getUserList();
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

}
