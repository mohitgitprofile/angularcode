
import { Component, OnInit, MainService, Router, FormBuilder, FormGroup, Validators } from '../../../index';
import { GlobalConstant } from '../../../global/global.constant';
declare var TCO: any;
declare var $: any;
@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.css']
})
export class ChoosePlanComponent implements OnInit {
  loginRes: any = {};
  // objectKeys = Object.keys;
  totalPrice: number;
  addonArr: any = [];
  cardForm: FormGroup;
  autoRenewPlan: any = false;
  loginTypeArr: any=[];
  DataBase: any=[];
  subscriptionAccess:any={};
  subscriptionAccessCompetition: any=[];
  subscriptionAccessMembership: any=[];
  subscriptionAccessVenue: any=[];
  Media: boolean;
  Product: boolean;
  UserManagment: boolean;
  constructor(private service: MainService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    console.log('login res dsata => '+ JSON.stringify(this.service.loginRes))
    this.loginRes = this.service.loginRes
    this.cardForm = this.fb.group({
      'expiryDate': ['', Validators.compose([Validators.required, Validators.pattern(/^[2][0][1-9][0-9][-]0[1-9]|1[012]$/)])],
      'card': ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
      'cvv': ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{3}$/)]) ]
    })
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');
     console.log("Login Type--->>> ",this.loginTypeArr);
    this.getSubscriptionAccess();
    // $('#paymentSubscription').modal({backdrop: 'static'})  
    if(Object.keys(this.service.loginRes).length != 0) {
     this.totalPrice = Number(this.loginRes.result.subscriptionPrice)
      for(let key in this.loginRes.result.optionalSubsPrices) {
        this.addonArr.push({ name: key, price: Number(this.loginRes.result.optionalSubsPrices[key]), checked: false })
      }
      // console.log('array => '+ JSON.stringify(this.addonArr))
    } else {
      this.router.navigate(['/landing/login'])
    }
   
  }
// Get Subscription Access 
  getSubscriptionAccess(){
    this.service.getApi('admin/detailSubscription', 0).subscribe(response => {
      let Response = response;
      if (Response['responseCode'] == 200) {
        this.service.toastrSucc(response.responseMessage)
      //  console.log("Response  of Subscription --->>> ",JSON.stringify(Response));
       var subscriptionAccess = Response.result[0].subscriptionAccess;
       console.log("subscriptionAccess Membership===>>>> ",JSON.stringify(subscriptionAccess.membership.membership))
       if(!this.loginTypeArr.includes("COMPETITION")){
        if(!this.loginTypeArr.includes("MEMBERSHIP")){
          if(this.loginTypeArr.includes("VENUE")){
            subscriptionAccess.venue.database.map(x => {
              if (!this.DataBase.includes(x)) this.DataBase.push(x)
            }) 
          }
          else {
          this.DataBase = [];
          }
        } 
        else {
          subscriptionAccess.membership.database.map(x => {
            if (!this.DataBase.includes(x)) this.DataBase.push(x)
          }) 
        }       
      }
      else {
        subscriptionAccess.competition.database.map(x => {
          if (!this.DataBase.includes(x)) this.DataBase.push(x)
        }) 
      }
      if(this.loginTypeArr.includes("COMPETITION")){
        subscriptionAccess.competition.competition.map(x => {
           this.subscriptionAccessCompetition.push(x)
          }) 
       
      }       
      if(this.loginTypeArr.includes("MEMBERSHIP")){
        subscriptionAccess.membership.membership.map(x => {
          this.subscriptionAccessMembership.push(x)
        }) 
       }       
      if(this.loginTypeArr.includes("VENUE")){
        subscriptionAccess.venue.venue.map(x => {
        this.subscriptionAccessVenue.push(x)
        }) 
      }
      this.Media = (subscriptionAccess.Media == true)?true:false;
      this.Product = (subscriptionAccess.Product == true)?true:false;
      this.UserManagment = (subscriptionAccess.userManagement == true)?true:false;
   
      console.log("DataBase===>>> ",this.DataBase);
      console.log("subscriptionAccessCompetition===>>> ",this.subscriptionAccessCompetition);
      console.log("subscriptionAccessMembership===>>> ",this.subscriptionAccessMembership);
      console.log("subscriptionAccessVenue===>>> ",this.subscriptionAccessVenue);
      }   
     else {
        this.service.toastrErr(response.responseMessage)
      }
    })
  }
  selectAddOn(item) {
    // console.log(item.price)
    this.totalPrice = item.checked ?  (this.totalPrice - item.price) : (this.totalPrice + item.price)   
    item.checked = !item.checked
    // console.log("TotalPrice--->> ",this.totalPrice);
  }

  paymentModal() {
    this.subscriptionAccess = {
      "competition":{
      "database":this.DataBase,
      "competition":this.subscriptionAccessCompetition,
      "oneEvent":20,
      "monthly":50,
      "yearly":100,
      },
      "membership":{
      "database": this.DataBase,
      "membership": this.subscriptionAccessMembership,
      "oneEvent":20,
      "monthly":50,
      "yearly":100 ,
      } ,
      "venue":{
      "database":this.DataBase,
      "venue":this.subscriptionAccessVenue,
      "oneEvent":20,
      "monthly":50,
      "yearly":100, 
      },
      "Media":(this.Media)?true:false,
      "userManagment" :(this.UserManagment)?true:false,
      "Product" :(this.Product)?true:false,
      "addOn":{
      "web&hosting":20,
      "event&membershipManagement":60
      }
      }
    $('#paymentSubscription').modal({backdrop: 'static'})
  }
  pay() {
    // console.log('pay ')
    //production
    var self = this
    TCO.requestToken();    
    TCO.loadPubKey('sandbox', function() {
      self.service.spinnerShow()
      // Execute when Public Key is available 
      // console.log('initiate ')
      var tokenData = {
        sellerId: GlobalConstant.paymentCredential.sellerId,//901386003
        publishableKey: GlobalConstant.paymentCredential.publishableKey,//4769A4CA-5488-4585-B1DF-B8AB85753020
        ccNo: self.cardForm.value.card,//"4111111111111111"
        cvv: self.cardForm.value.cvv,
        expMonth: self.cardForm.value.expiryDate.split('-')[1],
        expYear: self.cardForm.value.expiryDate.split('-')[0],       
               }
               console.log("dfuihg897dfgkj",tokenData);
      TCO.requestToken(succToken, errToken, tokenData)
      });​
      var succToken = function(data) {
        self.service.spinnerHide()
        let newArr = self.addonArr.filter(x => x.checked).map(x => x.name)
        // console.log('succ token=> '+ JSON.stringify(data))
        let tokenData = Object.assign({}, { optionalSubsPrices: newArr, subscriptionAccess:self.subscriptionAccess,subscription: self.loginRes.result.subscription, autoRenewPlan: self.autoRenewPlan , paymentAmount:self.totalPrice}, data)
       console.log("Token Data--->>> ",JSON.stringify(tokenData))
        self.service.postApi(`users/paymentOrder`, tokenData, 2).subscribe(response => {
          if(response.responseCode == 200) {
            $('#paymentSubscription').modal('hide')
            self.service.toastrSucc(response.responseMessage)
            self.service.setStorage( 'userDetailYala', JSON.stringify({token: self.loginRes.token, role: self.loginRes.result.role[0], userType: self.loginRes.result.organizerType[0], _id: self.loginRes.result._id}) )
            localStorage.setItem("LoginWith",self.loginRes.result.organizerType[0]);
            localStorage.setItem("subscriptionAccess",JSON.stringify(tokenData.subscriptionAccess));
            console.log('LoginWith----> ',self.loginRes.result.organizerType[0]);
            if(self.loginRes.result.organizerType.includes('COMPETITION')) {
              console.log('COMPETITION')
              self.router.navigate(['/organizer/dataTeams'])
            } else if(self.loginRes.result.organizerType.includes('MEMBERSHIP')) {
              console.log('MEMBERSHIP')
              self.router.navigate(['/organizer/dataPlayers'])
            }
            else if(self.loginRes.result.organizerType.includes('VENUE')) {
              console.log('VENUE')
              self.router.navigate(['/organizer/dataPlayers'])
            }
            // if(self.loginRes.result.organizerType[0] == 'COMPETITION') {
            // } else if(self.loginRes.result.organizerType[0] == 'MEMBERSHIP') {
            // }
          }
        })
      }
      var errToken = function(err) {
        self.service.spinnerHide()
        self.service.toastrErr(`Payment failed`)
        // console.log('err token => '+ JSON.stringify(err)) 
      }
  }
  // Select Subscription Functionality 
  selectSubscription(){
    var apiDoc = { 
    }
    console.log("ApiDoc---->>>> >",JSON.stringify(apiDoc))
   
  }
  get cf() {
    return this.cardForm.controls;
  }
  getPlan(value) {
    if(value) {
      return GlobalConstant.subscriptionArr.filter(x => x.value == value)[0].name
    } else 
      return '';
  }
  showNameFun(val) {
    return val.split('&').map(i => i.charAt(0).toUpperCase()+i.substr(1)).join(' & ')
  }
}
