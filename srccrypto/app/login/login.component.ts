import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData : any;
  Obj: any;
 

  constructor( 
    private router : Router,
  
    private fb: FormBuilder,
    private http : HttpClient,
    private service : ServiceService
    ) { }

  ngOnInit() {
       this.checkInput();
}


checkInput(){
  let remData=JSON.parse(localStorage.getItem('rememberMe'))?JSON.parse(localStorage.getItem('rememberMe')):'';
  let pass=''
  if(remData!=''){
    pass=window.atob(remData.password)
    }

  this.loginForm = this.fb.group({
    email: new FormControl(remData.email,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/i)),
    password : [pass,[Validators.required]],
    rememberMe : new FormControl(false)
    
  })
}

onLogin(){
  this.service.showSpinner();
  this.service.post("auth", {
    email : this.loginForm.value.email,
    password : this.loginForm.value.password
  }).subscribe(
    (res : any)=>{
     
       this.service.hideSpinner();
       if(res['status'] == '200'){
       localStorage.setItem('Auth',res['data']['token']);

       if(this.loginForm.value.rememberMe==true){
        let remData={
          "email":this.loginForm.value.email,
          "password":window.btoa(this.loginForm.value.password)
        }
        localStorage.setItem('rememberMe',JSON.stringify(remData))
  
    }

       this.service.changeLoginSub('login');
    
       this.router.navigate(['dashboard']);
       }
    },
    (err : any)=>{
    
      this.service.hideSpinner();
      if(err['status']=='401'){
        this.service.toasterErr('Unauthorized Access');
      }else{
      this.service.toasterErr('Something Went Wrong');
   }
    }
  )
this.Obj={
 'email' : this.loginForm.value.email,

}

  localStorage.setItem('data',JSON.stringify(this.Obj));
  
}

}
