import { Component, OnInit, MainService, FormGroup, Validators, FormBuilder } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant'
declare var $: any;
declare var TCO: any;
@Component({
  selector: 'app-menu-comp-conf-plan',
  templateUrl: './menu-comp-conf-plan.component.html',
  styleUrls: ['./menu-comp-conf-plan.component.css']
})
export class MenuCompConfPlanComponent implements OnInit {
  userDetails: any = {};
  profileDet: any = {};
  addonArr: any = [];
  totalPrice: any = 0;
  autoRenewPlan: any = false;
  subscriptionArr: any = GlobalConstant.subscriptionArr;
  newPlan: any = ''
  list: any = { cardList: [] };
  cardForm: FormGroup;
  currCard: any = ''
  loginTypeArr: any=[];
  subscriptionAccessMembership: any=[];
  subscriptionAccessVenue: any=[];
  Media: boolean;
  Product: boolean;
  UserManagment: boolean;
  subscriptionAccessCompetition: any=[];
  DataBase: any=[];
  subscriptionAccess:any={};
  constructor(private service: MainService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');
    this.getSubscriptionAccess();
     console.log("Login Type--->>> ",this.loginTypeArr);
    this.cardForm = this.fb.group({
      'expiryDate': ['', Validators.compose([Validators.required, Validators.pattern(/^[2][0][1-9][0-9][-]0[1-9]|1[012]$/)])],
      'card': ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
      'cvv': ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{3}$/)]) ]
    })
    this.getDetailApi()
  }  
  getDetailApi() {
    this.service.getApi(`users/getDetail?_id=${this.userDetails._id}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.profileDet = response.result
        // this.totalPrice = Number(this.profileDet.subscriptionPrice)
        if(this.profileDet.subscription == 'oneEvent') {
          this.newPlan = 'monthly'
          this.totalPrice = 200;
        } else  {
          this.newPlan = 'yearly'
          this.totalPrice = 1000;
        }
        this.addonArr = []
        // this.autoRenewPlan = this.profileDet.autoRenewPlan
        for(let key in this.profileDet.optionalSubsPrices) {
          // this.profileDet.subscriptionAccess.filter(x => x== )
          // let checked = this.profileDet.subscriptionAccess.filter(x => x == key ).length ? true : false 
          // console.log(checked)
          this.addonArr.push({ name: key, price: Number(this.profileDet.optionalSubsPrices[key]), checked: false })
          // this.addonArr.push({ name: key, price: Number(this.profileDet.optionalSubsPrices[key]), checked: false })
        }
        this.list.cardList = this.profileDet.cardDetails
      }
    })
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
  
  get cf() {
    return this.cardForm.controls;
  }
  selectAddOn(item) {
    // console.log(item)
    this.totalPrice = item.checked ?  (this.totalPrice - item.price) : (this.totalPrice + item.price)   
    // item.checked = !item.checked
  }
  showNameFun(val) {
    return val.split('&').map(i => i.charAt(0).toUpperCase()+i.substr(1)).join(' & ')
  }

  paymentModal() {
    // console.log(this.addonArr)
    this.cardForm.reset();
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
    this.currCard = ''
    $('#paymentPlanChange').modal({backdrop: 'static'})
  }
  selectCard(cardDet) {
    setTimeout(() => {
      // console.log('curr card selected => ' + this.currCard)
      // console.log(cardDet)
      this.cardForm.patchValue({
        card: cardDet.cardNumber.toString(),
        expiryDate: cardDet.expiryDate
      })
    }, 300)
    
  }
  pay() {
    var self = this;
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
        expYear: self.cardForm.value.expiryDate.split('-')[0]
      }
      // console.log(tokenData)
      TCO.requestToken(succToken, errToken, tokenData)
      });​
      var succToken = function(data) {
        let newArr = self.addonArr.filter(x => x.checked).map(x => x.name)
        // console.log('succ token=> '+ JSON.stringify(data))
        self.service.spinnerHide()
        let tokenData = Object.assign({}, { optionalSubsPrices: newArr,subscriptionAccess:self.subscriptionAccess,paymentAmount:self.totalPrice,subscription: self.newPlan, autoRenewPlan: self.autoRenewPlan }, data)
        self.service.postApi(`users/paymentOrder`, tokenData, 1).subscribe(response => {
          if(response.responseCode == 200) {
            self.addonArr.map(x => {
              return Object.assign(x, {checked: false})
            })
            self.getDetailApi()
            $('#paymentPlanChange').modal('hide')
            self.service.toastrSucc(response.responseMessage)
            
            // self.service.setStorage( 'userDetailYala', JSON.stringify({token: self.loginRes.token, role: self.loginRes.result.role[0], userType: self.loginRes.result.organizerType, _id: self.loginRes.result._id}) )
            // self.router.navigate(['/organizer/dataTeams'])
          }
        })
      }
      var errToken = function(err) {
        // console.log('err token => '+ JSON.stringify(err))
        self.service.spinnerHide()
        self.service.toastrErr(`Payment failed`)
      }
  }
  changePlan() {
    setTimeout(() => {
      console.log(this.newPlan)
      this.autoRenewPlan = false
      this.addonArr.map(x => {
        return Object.assign(x, {checked: false})
      })
      if(this.newPlan == 'monthly')
        this.totalPrice = 200
      else 
        this.totalPrice = 1000
    }, 300)
    
  }

}
