import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $ :any;


@Component({
  selector: 'app-menu-comp-conf-user',
  templateUrl: './menu-comp-conf-user.component.html',
  styleUrls: ['./menu-comp-conf-user.component.css']
})
export class MenuCompConfUserComponent implements OnInit {
searchUser : any =''
  userDetails: any;
  createUserForm: FormGroup;
  employeeList: any=[];
  roleType: any;
  userId: any;
  constructor(public service:MainService,public routes: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'));
    this.formValidation();
    this.getUserList('','');
  }

  // Form Validation 
  formValidation(){
   this.createUserForm = new FormGroup({
     role : new FormControl('',Validators.required),
     firstName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_]*$')]),
     lastName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_]*$')]),
     email: new FormControl('',[Validators.required,Validators.pattern(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)])      
   })
  }

  // Apply Filter 
  userType(event){
   console.log("Role Filter====>>>> ",event.target.value);
   this.roleType = event.target.value;
   this.getUserList(this.roleType,this.searchUser)
  }

  // Get List of Sub User 
  getUserList(usertype,search){
    console.log("UserType--->> ",usertype,"  Search---->>> ",search);
    var apiDoc = {
      "employeeRole": usertype?usertype:'',
      "search":search?search:''
    }
    this.service.postApi("users/getListOfEmployee?userId="+this.userDetails._id,apiDoc,1).subscribe(responseList => {
      let Response = responseList;
      // console.log("Response--> ",JSON.stringify(Response));
      if(Response.responseCode == '200'){
        this.employeeList = Response.result.docs;
        console.log("Employeee--> ",this.employeeList);
        console.log("EmployeeeId--> ",this.employeeList[0].employeerId);
      }
      else {
        this.employeeList = [];
      }
      
      })
  }
// Role Matrix Navigation Functionality
roleMatrix(id){
  var empId = id;
  console.log("EmpID:  ",empId);
  this.routes.navigate(['/organizer/menuCompConfRoleMatrix/',empId]);
}
  // Add Sub-User
  addSubUserFunctionality(formValue){
    console.log("Form Value of Sub-->> ",JSON.stringify(formValue));
    var apiDoc = {
      "employeeRole":formValue.role,
      "firstName":formValue.firstName,
      "lastName":formValue.lastName,
      "email":formValue.email
    }
    console.log("Form Value of Sub-->> ",JSON.stringify(apiDoc));
    this.service.postApi("users/addEmployee?userId="+this.userDetails._id,apiDoc,1).subscribe(responseList => {
      let Response = responseList;
      console.log("Response--> ",JSON.stringify(Response));
      $('#createSubUser').modal('hide');
      this.getUserList('','');
      // if (Response['responseCode'] == 200) {
       
      // }
      })
  }

  // Delete Sub-User Functionality
  deleteModal(id){
    this.userId = id;
    console.log("Delete Id--->>> ",this.userId);
    console.log("User Id--->>> ",this.userDetails._id);
    $('#delete').modal('show');
  }
  delete(){
    var url = `users/deleteEmployee?userId=`+this.userDetails._id+`&employeeId=`+this.userId;   
     console.log("Url--> ",url);
    this.service.getApi(url,1).subscribe(responseList => {
      let Response = responseList;
      // console.log("Response--> ",JSON.stringify(Response));
      if (Response['responseCode'] == 200) {       
          this.getUserList('','');
          $('#delete').modal('hide');           
      }
      else{
        this.getUserList('','');
        $('#delete').modal('hide');   
      }
    })
  }
}
