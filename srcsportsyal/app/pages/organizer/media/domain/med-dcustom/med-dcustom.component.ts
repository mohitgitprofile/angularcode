import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators, ActivatedRoute, Router } from '../../../../../index';
import { GlobalConstant } from '../../../../../global/global.constant';
import { FormControl } from '@angular/forms';
declare var $: any;
declare var TCO: any;

@Component({
  selector: 'app-med-dcustom',
  templateUrl: './med-dcustom.component.html',
  styleUrls: ['./med-dcustom.component.css']
})
export class MedDcustomComponent implements OnInit {
  currUrl: string = '';
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
  constructor(private service: MainService,private route: ActivatedRoute, private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    // this.currUrl = this.router.url.split('/').splice(1,2).join('/');
    console.log('login res dsata => '+ JSON.stringify(this.service.loginRes))
    this.loginRes = this.service.loginRes
    this.cardForm = this.fb.group({
      'expiryDate': ['', Validators.compose([Validators.required, Validators.pattern(/^[2][0][1-9][0-9][-]0[1-9]|1[012]$/)])],
      'card': ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
      'cvv': ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{3}$/)]) ]
    })
  }


  openViewModal() {
    $('#booking_calander').modal({ backdrop: 'static', keyboard: true })
  }

  paymentModal() {
    this.cardForm.reset();
    $('#paymentSubscription').modal({backdrop: 'static'})
  }
  // pay() {
  //   var self = this
  //   TCO.loadPubKey('sandbox', function() {
  //     self.service.spinnerShow()
  //     // Execute when Public Key is available
  //     // console.log('initiate ')
  //     var tokenData = {
  //       sellerId: GlobalConstant.paymentCredential.sellerId,//901386003
  //       publishableKey: GlobalConstant.paymentCredential.publishableKey,//4769A4CA-5488-4585-B1DF-B8AB85753020
  //       ccNo: self.cardForm.value.card,//"4111111111111111"
  //       cvv: self.cardForm.value.cvv,
  //       expMonth: self.cardForm.value.expiryDate.split('-')[1],
  //       expYear: self.cardForm.value.expiryDate.split('-')[0],       
  //              }
  //     TCO.requestToken(succToken, errToken, tokenData)
  //     });​
  //     var succToken = function(data) {
  //       self.service.spinnerHide()
  //       let newArr = self.addonArr.filter(x => x.checked).map(x => x.name)
  //       let tokenData = Object.assign({}, { optionalSubsPrices: newArr, subscriptionAccess:self.subscriptionAccess,subscription: self.loginRes.result.subscription, autoRenewPlan: self.autoRenewPlan , paymentAmount:self.totalPrice}, data)
  //       self.service.postApi(`users/paymentOrder`, tokenData, 2).subscribe(response => {
  //         if(response.responseCode == 200) {
  //           $('#paymentSubscription').modal('hide')
  //           self.service.toastrSucc(response.responseMessage)
  //           self.service.setStorage( 'userDetailYala', JSON.stringify({token: self.loginRes.token, role: self.loginRes.result.role[0], userType: self.loginRes.result.organizerType[0], _id: self.loginRes.result._id}) )
  //           localStorage.setItem("LoginWith",self.loginRes.result.organizerType[0]);
  //           localStorage.setItem("subscriptionAccess",JSON.stringify(tokenData.subscriptionAccess));
  //           if(self.loginRes.result.organizerType.includes('COMPETITION')) {
  //             self.router.navigate(['/organizer/domainCustomization'])
  //           } else if(self.loginRes.result.organizerType.includes('MEMBERSHIP')) {
  //             self.router.navigate(['/organizer/domainCustomization'])
  //           }
  //           else if(self.loginRes.result.organizerType.includes('VENUE')) {
  //             self.router.navigate(['/organizer/domainCustomization'])
  //           }
  //           // if(self.loginRes.result.organizerType[0] == 'COMPETITION') {
  //           // } else if(self.loginRes.result.organizerType[0] == 'MEMBERSHIP') {
  //           // }
  //         }
  //       })
  //     }
  //     var errToken = function(err) {
  //       self.service.spinnerHide()
  //       self.service.toastrErr(`Payment failed`)
  //     }
  // }
  
 
}
