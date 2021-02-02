import { Component, OnInit } from '@angular/core';
import { Router,Event, NavigationEnd } from '@angular/router';
import { ServiceService } from '../service.service';
declare var $:any;

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  currUrl: string;
  isLoggedIn: boolean;
  userDetail: any={};
  userID: any;
  previlage: any=[];
  getperm: any;
  getrole: any;
  getpermission: any;
  dashboardflag : boolean= false;
  staticflag: boolean=false;
  staticusermgmt: boolean=false;
  staticfeemgmt: boolean=false;
  staticwalletmgmt: boolean=false;
  statickycmgmt:boolean=false;
  statichotcoldmgmt: boolean=false;
  usermanagementflag: boolean = false;
  permissionList: any;
  logsmgmt: boolean= false;
  ticketmgmt: boolean= false;
  trademgmt: boolean= false;
  disputemgmt: boolean= false;
  bankmgmt: boolean= false;
  feemgmt: boolean= false;
  role: string;
  flag: boolean=false;
  adminmgmt: boolean=false;
  settingmgmt: boolean=false;
  advertisementmgmt: boolean=false;
  reset: boolean;

  constructor(
    private routes : Router , public service: ServiceService
  ) { 
   
    routes.events.subscribe( (event: Event) => {
      if(event instanceof NavigationEnd) {
      this.currUrl = event.url.split('/')[1];
      
      if(localStorage.data) {
      this.service.changeLoginSub('login')
      if((this.currUrl == `login`|| this.currUrl ==`forgot-password`|| this.currUrl ==`reset-password`|| this.currUrl ==``)) {
      this.routes.navigate([`/dashboard`])
      }
      } else {
      if(!(this.currUrl == `login`|| this.currUrl ==`forgot-password` || this.currUrl.includes(`reset-password`)|| this.currUrl ==``)) {
      this.routes.navigate([`/login`])
      }
      this.service.changeLoginSub('logout');
      }
      }
      })
  }
    // flag=false;
    // role
  ngOnInit() {
  
  this.service.loginObs.subscribe(response => { 
    console.log("hjsdfg89sdfrghkjsdfbf",response);
    
  if(response == 'login') {
    this.myProfile();
  this.isLoggedIn = true; 
  }
  else {
  this.isLoggedIn = false; 
  } 
  
  })
  if(localStorage.getItem('Auth'))
{
  this.reset=true
}else{
  this.reset=false
}
  //this.checkprivilage(value)
  

  }
// My Profile Functionality
myProfile(){
  var url = 'account/my-account';
  this.service.showSpinner();
  this.service.get(url).subscribe(res=>{
  
    this.service.hideSpinner();
    if(res['status'] == 200){      
     this.userDetail = res['data'];
     this.userID=res['data'].userId;
     this.previlage=res['data']['previlage'];
     this.role=res['data'].role;
     console.log("permission:", this.previlage.length)
     localStorage.setItem('userId',this.userID);
     localStorage.setItem('permission',this.previlage);
     localStorage.setItem('usertype',this.role);
     //this.getperm=JSON.parse(localStorage.getItem('permission'))
     this.getrole=(localStorage.getItem('usertype'))
     this.getpermission=(localStorage.getItem('permission'))
     //console.log("role:", this.getrole)
    //console.log("permission:", this.getpermission)
     this.permissionList = this.getpermission.split(",");
     //console.log("res:", this.permissionList)

     if(this.role=="SUBADMIN"){
      this.flag=true;
     console.log("role===>",this.flag)
    }
        for (let i = 0; i < this.previlage.length; i++) {
      if(this.previlage[i]=="DASHBOARD"){
        this.dashboardflag=true   
      }
      if(this.previlage[i]=="STAFF_MANAGEMENT"){
        this.staticusermgmt=true
      }
      if(this.previlage[i]=="USER_MANAGEMENT"){
        this.usermanagementflag=true
      }

      if(this.previlage[i]=="WALLET_MANAGEMENT"){
        this.staticwalletmgmt=true
      }
  
  
      if(this.previlage[i]=="KYC_MANAGEMENT"){
        this.statickycmgmt=true
      }
  
  
      if(this.previlage[i]==="HOT_COLD_LIMIT_MANAGEMENT"){
        this.statichotcoldmgmt=true
      }

      if(this.previlage[i]==="STATIC_CONTENT"){
        this.staticflag=true
      }

      if(this.previlage[i]==="LOGS_MANAGEMENT"){
        this.logsmgmt=true
      }

      if(this.previlage[i]==="TICKET_MANAGEMENT"){
        this.ticketmgmt=true
      }

      if(this.previlage[i]==="TRADE_MANAGEMENT"){
        this.trademgmt=true
      }

      if(this.previlage[i]==="DISPUTE_MANAGEMENT"){
        this.disputemgmt=true
      }

      if(this.previlage[i]==="BANK_MANAGEMENT"){
        this.bankmgmt=true
      }

      if(this.previlage[i]==="FEE_MANAGEMENT"){
        this.feemgmt=true
      }

      if(this.previlage[i]==="ADMIN_MANAGEMENT"){
        this.adminmgmt=true
      }
      if(this.previlage[i]==="SETTINGS"){
        this.settingmgmt=true
      }
      if(this.previlage[i]==="ADVERTISEMENTS"){
        this.advertisementmgmt=true
      }

    }
   
    
    }else {
      this.service.toasterErr(res['message']);
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



// myProfile(){
//   var url = 'account/my-account';
//   this.service.showSpinner();
//   this.service.get(url).subscribe(res=>{
//     console.log("jhfdvs87sdyfgjbhsd",res)
//     this.service.hideSpinner();
//     if(res['status'] == 200){      
//      this.userDetail = res['data'];
//      this.userID=res['data'].userId;
//      this.previlage=res['data'].previlage;
//      this.role=res['data'].role;
//      //console.log("role:", this.role)
//      localStorage.setItem('userId',this.userID);
//      localStorage.setItem('permission',this.previlage);
//      localStorage.setItem('usertype',this.role);
//      //this.getperm=JSON.parse(localStorage.getItem('permission'))
//      this.getrole=(localStorage.getItem('usertype'))
//      this.getpermission=(localStorage.getItem('permission'))
//      //console.log("role:", this.getrole)
//     //console.log("permission:", this.getpermission)
//      this.permissionList = this.getpermission.split(",");
//      //console.log("res:", this.permissionList)

//      if(this.role=="SUBADMIN"){
//       this.flag=true;
     
//     }
//     for (let i = 0; i < this.previlage.length; i++) {
//       if(this.previlage[i]=="DASHBOARD"){
//         this.dashboardflag=true   
//       }
//       if(this.previlage[i]=="STAFF_MANAGEMENT"){
//         this.staticusermgmt=true
//       }
//       if(this.previlage[i]=="USER_MANAGEMENT"){
//         this.usermanagementflag=true
//       }

//       if(this.previlage[i]=="WALLET_MANAGEMENT"){
//         this.staticwalletmgmt=true
//       }
  
  
//       if(this.previlage[i]=="KYC_MANAGEMENT"){
//         this.statickycmgmt=true
//       }
  
  
//       if(this.previlage[i]==="HOT_COLD_LIMIT_MANAGEMENT"){
//         this.statichotcoldmgmt=true
//       }

//       if(this.previlage[i]==="STATIC_CONTENT"){
//         this.staticflag=true
//       }

//       if(this.previlage[i]==="LOGS_MANAGEMENT"){
//         this.logsmgmt=true
//       }

//       if(this.previlage[i]==="TICKET_MANAGEMENT"){
//         this.ticketmgmt=true
//       }

//       if(this.previlage[i]==="TRADE_MANAGEMENT"){
//         this.trademgmt=true
//       }

//       if(this.previlage[i]==="DISPUTE_MANAGEMENT"){
//         this.disputemgmt=true
//       }

//       if(this.previlage[i]==="BANK_MANAGEMENT"){
//         this.bankmgmt=true
//       }

//       if(this.previlage[i]==="FEE_MANAGEMENT"){
//         this.feemgmt=true
//       }

//     }
    
//     // console.log("Kyc management: ", this.statickycmgmt)
    
//     // console.log("wallet management: ", this.staticwalletmgmt)
    
//     // console.log("static content: ", this.staticflag)


    
//     // console.log("user Management: ", this.staticusermgmt)


   
//     // console.log("fee management:", this.staticfeemgmt)



//     // console.log("Hot/cold management: ", this.statichotcoldmgmt)
   
    
//     }else {
//       // this.service.toasterErr(res['message']);
//     }
//   },err=>{
  
//     this.service.hideSpinner();
//     if(err['status']=='401'){
//       this.service.onLogout();
//       // this.service.toasterErr('Unauthorized Access');
//     }else{
//     // this.service.toasterErr('Something Went Wrong');
//  }
//   })
// }

onLogout(){
  localStorage.removeItem('data');
  localStorage.removeItem('Auth');
  localStorage.removeItem('permission');
  localStorage.removeItem('usertype');
  $('#signout_modal').modal('hide');
   window.location.reload();
  this.routes.navigate(['/login']);
  
}


}
