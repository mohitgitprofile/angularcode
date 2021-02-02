import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
declare var $:any

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit {
  userID: any;
  action: any;
  staffList: any=[];
  pageNumber: number =1;
  staffForm: FormGroup;
  staffLength: any;
  ipAddress: any;
  beDisable: boolean=true;

  constructor(public router: Router, public service: ServiceService, public http : HttpClient) {
    this.staffForm = new FormGroup ({
      status : new FormControl(''),
      role : new FormControl(''),
      fromDate : new FormControl(''),
      toDate : new FormControl(''),
      search : new FormControl('')
    })
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      console.log('th data', data);
      this.ipAddress = data.ip
      console.log("djfhgdj",this.ipAddress)
    })
   }

  ngOnInit() {
    this.getStaffList();
  }
  addStaff() {
    this.router.navigate(['/add-new-staff'])
  }
  editStaff(id) {
    this.router.navigate(['/edit-staff'], {queryParams:{id}})
  }
    // Delete / Block Function
    openModal(action,userId){
      this.userID = userId;
      this.action = action ;
      if(action == 'DELETE'){
       $('#deleteModal').modal('show')
  
      }else if(action == 'BLOCK') {
        $('#block').modal('show')
      }
      else {
        $('#active').modal('show')
      }
    }

    deleteFunction() {
      $('#deleteModal').modal('hide')
      let data = {
        "ipAddress": this.ipAddress.ip,
        "primaryIdCommonPerRequest": this.userID
      }
      console.log("hjgvdksxjcfghkjshdg",data)
      this.service.post('account/admin/user-management/detele-staff', data).subscribe((res)=>{
        console.log("hjgvdksxjcfghkjshdg",res)
        this.getStaffList();
      })
    }


    // Get List of staff
  getStaffList(){
    let data = 
    {
    "page": "0",
    "pageSize": "10",
    }
   
    var url = "account/admin/user-management/search-and-filter-staff";
    // var url = "admin/user-management/search-and-filter-staff";
       this.service.showSpinner();
    this.service.postApi(url, data).subscribe(res=>{
      console.log("jhgsdfijkudgsfjk", res)
      this.service.hideSpinner();
      if(res['status'] == 569){
        this.staffList = res.data.list;
        this.staffLength = this.staffList.length
        console.log("jhgsdfijkudgsfjk", this.staffList)
        console.log("jhgsdfijkudgsfjk", this.staffLength)
     
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

  search() {
    
    if(this.staffForm.value.toDate)
    {
      this.service.showSpinner();
      let data = {
        "fromDate": Math.round(new Date(this.staffForm.value.fromDate).getTime()),
        "page": "0",
        "pageSize": "10",
        "toDate": Math.round(new Date(this.staffForm.value.toDate).getTime())
        }
        console.log("hgfdjkuysfklhjug",data)
        var url = "account/admin/user-management/search-and-filter-staff";
        this.service.post(url, data).subscribe((res)=>{
          if(res['status'] == 569) {
            console.log("hgfdjkuysfklhjug",res)
            this.staffList = res['data']['list'];
            this.staffLength = this.staffList.length;
            this.service.hideSpinner();
          }
          else {
            this.staffList = [];
            this.service.hideSpinner();
          }
          
        })
    }
    else if (this.staffForm.value.search) {
      this.service.showSpinner();
      let data = {
        "page": "0",
        "pageSize": "10",
        "search": this.staffForm.value.search,
        }
        console.log("hgfdjkuysfklhjug",data)
        var url = "account/admin/user-management/search-and-filter-staff";
        this.service.post(url, data).subscribe((res:any)=>{
          this.staffList = null;
          if(res.status == 569) {
            console.log("hgfdjkuysfklhjug",res)
          this.staffList = res['data']['list'];
          this.staffLength = this.staffList.length;
          this.service.hideSpinner();
          }
          else {
            this.staffList = [];
            this.service.hideSpinner();
          }
        })
    }
    else if (this.staffForm.value.role) {
      this.service.showSpinner();
      let data = {
        "page": "0",
        "pageSize": "10",
        "role": this.staffForm.value.role,
        }
        console.log("hgfdjkuysfklhjug",data)
        var url = "account/admin/user-management/search-and-filter-staff";
        this.service.post(url, data).subscribe((res:any)=>{
          this.staffList = null;
          if(res.status == 569) {
            console.log("hgfdjkuysfklhjug",res)
          this.staffList = res['data']['list'];
          this.staffLength = this.staffList.length;
          this.service.hideSpinner();
          }
          else {
            this.staffList = [];
            this.service.hideSpinner();
          }
        })
    }
    else if (this.staffForm.value.status) {
      this.service.showSpinner();
      let data = {
        "page": "0",
        "pageSize": "10",
        "status": this.staffForm.value.status,
        }
        console.log("hgfdjkuysfklhjug",data)
        var url = "account/admin/user-management/search-and-filter-staff";
        this.service.post(url, data).subscribe((res:any)=>{
          this.staffList = null;
          if(res.status == 569) {
            console.log("hgfdjkuysfklhjug",res)
          this.staffList = res['data']['list'];
          this.staffLength = this.staffList.length;
          this.service.hideSpinner();
          }
          else {
            this.staffList = [];
            this.service.hideSpinner();
          }
        })
    }
    else if(this.staffForm.invalid) {
      this.service.showSpinner();
      this.getStaffList();
      this.service.hideSpinner();
    }
  }

  viewStaff(id) {
    this.router.navigate(['/view-staff'], {queryParams:{id}} )
  }

  performAction() {
    $('#block').modal('hide')
    let data = {
      ipAddress : this.ipAddress,
      userIdForStatusUpdate : Number(this.userID),
      userStatus : "BLOCK"
    }
    var url = 'account/admin/user-management/user-status?ipAddress='+(this.ipAddress)+'&location='+('unknown')+ '&userIdForStatusUpdate='+(this.userID) + '&userStatus=' + ('BLOCK');
    this.service.post(url, '').subscribe((res)=>{
      this.service.toasterSucc(res['message'])
      console.log("djsfhgbdjkmsfghk", res);
      // this.service.toasterSucc(res)
      this.getStaffList();
    })
  }

  performActionActive() {
    $('#active').modal('hide')
    let data = {
      ipAddress : this.ipAddress,
      userIdForStatusUpdate : Number(this.userID),
      userStatus : "ACTIVE"
    }
    var url = 'account/admin/user-management/user-status?ipAddress='+(this.ipAddress)+'&location='+('unknown')+ '&userIdForStatusUpdate='+(this.userID) + '&userStatus=' + ('ACTIVE');
    this.service.post(url, '').subscribe((res)=>{
      console.log("djsfhgbdjkmsfghk", res);
      this.getStaffList();
    })
  }

  reset() {
    this.staffForm.reset();
    this.getStaffList();
  }

    /**************** Date managing***************/
public myDatePickerOptions: IMyDpOptions = {
  dateFormat: 'yyyy-mm-dd',
  editableDateField: false,
  openSelectorOnInputClick: false,
  disableSince: { year: 0, month: 0, day: 0 }
  };
  public toDate: IMyDpOptions = {
  dateFormat: 'yyyy-mm-dd',
  editableDateField: false,
  openSelectorOnInputClick: false,
  disableUntil: { year: 0, month: 0, day: 0 }
  };
  
  onDateChanged() {
  let d = new Date();
  let copy1 = this.getCopyOfOptions();
  copy1.disableSince = {
  year: d.getFullYear(),
  month: d.getMonth() + 1,
  day: d.getDate()
  };
  this.myDatePickerOptions = copy1;
  }
  //Returns copy of myDatePickerOptions
  getCopyOfOptions(): IMyDpOptions {
  return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }
  
  
  public onChange(event: IMyDateModel) {
  if (event.formatted) {
  this.beDisable = false
  let d: Date = new Date(event.jsdate.getTime());
  d.setDate(d.getDate() - 1);
  let copy: IMyDpOptions = this.getCopyOfToDateOpt();
  copy.disableUntil = {
  year: d.getFullYear(),
  month: d.getMonth() + 1,
  day: d.getDate()
  };
  this.toDate = copy;
 
  
  }
  
  }
  getCopyOfToDateOpt(): IMyDpOptions {
  return JSON.parse(JSON.stringify(this.toDate));
  }

    //export User
    exportAsXLSX(){
      let dataArr = [];
      this.staffList.forEach((element,ind) => {
     
      dataArr.push({
      "ID":ind+1,   
      "Name":element.firstName +'' +element.lastName?element.lastName:'',
      "Role":element.role?element.role:'N/A',
      "Created At":element.createdTime?element.createdTime.slice(0,10):'N/A',
      })
      })
     
      this.service.exportAsExcelFile(dataArr,'Staff_list');
      }

}
