import { Component, OnInit, FormGroup, FormBuilder, MainService, Validators, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;
declare var TCO: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userDetails: any = {};
  competitionId: any;
  organizerId: any;
  regStatus: any;
  profileDetail: any = {};
  teamList: any = [];
  registrationDetail: any = {};
  sportType: any;
  freeOrPaid: any;
  registrationForm: FormGroup;
  regForm: any = [];
  regFormCreated: boolean = false;
  register: any = {};
  payModeStatus: any;
  list: any = { cardList: [] }
  cardForm: FormGroup;
  currCard: any = ''
  registerData: any ={};
  constructor(private service: MainService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.register.team = ""
    this.register.payMode = ""
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.competitionId = params['compId']
      this.organizerId = params['orgId']
    })
    this.getRegisterFormOrNotApi();
    this.getRegistrationDetailApi();
    this.cardForm = this.fb.group({
      'expiryDate': ['', Validators.compose([Validators.required, Validators.pattern(/^[2][0][1-9][0-9][-]0[1-9]|1[012]$/)])],
      'card': ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
      'cvv': ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{3}$/)]) ]
    })
  }

  // ************ get Register Form Or Not Api **************************************************************************************** //
  getRegisterFormOrNotApi() {
    var getRegisterFormData = {
      'playerId': this.userDetails._id,
      'organizerId': this.organizerId,
      'competitionId': this.competitionId
    }
    this.service.postApi(`player/competition/getRegisterFormOrNot`, getRegisterFormData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.regStatus = response.result.registration;
      }
    })
    this.service.getApi(`users/getDetail?_id=${this.userDetails._id}`, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.profileDetail = response.result;
        this.list.cardList = this.profileDetail.cardDetails
      }
    })
    this.service.getApi('data/selectTeam?userId=' + this.organizerId + '&competitionId=' + this.competitionId, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.teamList = response.result;
      }
    })
  }
  //****************************************** End **********************************************************************************//

  // ************ get Registration Detail Api **************************************************************************************** //
  getRegistrationDetailApi() {
    var getRegistrationDetailData = {
      'userId': this.organizerId,
      'competitionId': this.competitionId
    }
    this.service.postApi(`organizer/competition/getRegistrationDetail`, getRegistrationDetailData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.registrationDetail = response.result;
        this.sportType = this.registrationDetail.competitionId.sportType;
        this.freeOrPaid = response.result.freeOrPaid;
        if (this.sportType != 'single' && this.freeOrPaid == 'paid') {
          this.registrationForm = this.fb.group({
            'team': ['', Validators.compose([Validators.required])],
            'payMode': ['', Validators.compose([Validators.required])],
          })
        } else if (this.sportType != 'single' && this.freeOrPaid == 'free') {
          this.registrationForm = this.fb.group({
            'team': ['', Validators.compose([Validators.required])],
            'payMode': ['', []],
          })
        } else if (this.sportType == 'single' && this.freeOrPaid == 'paid') {
          this.registrationForm = this.fb.group({
            'team': ['', []],
            'payMode': ['', Validators.compose([Validators.required])],
          })
        } else {
          this.registrationForm = this.fb.group({
            'team': ['', []],
            'payMode': ['', []],
          })
        }
        this.regForm = response.result.configPlayerField;
        this.regFormCreated = true
      } else if (response.responseCode == 404) {
        this.regFormCreated = false
      } else {
      }
    })
  }
  //****************************************** End **********************************************************************************//

  payModeFun(val) {
    this.payModeStatus = val
  }

  saveRegister() {
    var errCount = 0;
    if (this.regForm.length > 0) {
      for (let i = 0; i < this.regForm.length; i++) {
        if (this.regForm[i].importance == "mandatory" && (!this.regForm[i].itemValue || this.regForm[i].itemValue == '')) {
          errCount++;
          this.service.toastrErr(this.regForm[i].field + ' is mandatory!')
        }
        if (errCount == 1) {
          break;
        }
      }
    }
    if (errCount == 0) {
      this.playerRegister();
    }
  }

  playerRegister() {
    let dynObj = {};
    let dynArr = [];
    this.regForm.forEach((obj) => {
      dynObj = obj
      dynObj[obj.field] = obj.itemValue
      dynArr.push(dynObj);
    });

    //************** Player Registeration Api Integration *************/
    let regData = {
      "playerId": this.userDetails._id,
      "organizerId": this.organizerId,
      "competitionId": this.competitionId,
      "playerDynamicDetails": dynArr
    }

    /* if (this.sportType != 'single') {
      regData['team'] = this.register.team
    } */
    let newObj = this.teamList.filter(x => x._id == this.register.team)[0]
    if (this.sportType != 'single') {
      regData['team'] = newObj
    }

    if (this.freeOrPaid == 'paid') {
      regData['paymentMethod'] = this.payModeStatus
    }

    let registerData = {
      regData
    };

    console.log('freeOrPaid'+ this.freeOrPaid+ 'payModeStatus'+ this.payModeStatus)
    if (this.freeOrPaid == 'paid' && this.payModeStatus == 'online') {
      // Modal for payment
      // alert('Modal will open');
      this.registerData = registerData
      this.cardForm.reset()
      this.currCard = ''
      $('#playerRegPay').modal({ backdrop: 'static' })
    } else {
      this.service.postApi(`player/competition/confirmRegistration`, registerData, 1).subscribe(response => {
        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage)
          this.ngOnInit();
        }
      })
    }
    //************** End *************//
  }

  get cf() {
    return this.cardForm.controls;
  }
  pay(fo) {
    var self = this;
    TCO.loadPubKey('sandbox', function() {
      self.service.spinnerShow()
      // Execute when Public Key is available 
      console.log('initiate ')
      var tokenData = {
        sellerId: GlobalConstant.paymentCredential.sellerId,//901386003
        publishableKey: GlobalConstant.paymentCredential.publishableKey,//4769A4CA-5488-4585-B1DF-B8AB85753020
        ccNo: self.cardForm.value.card,//"4111111111111111"
        cvv: self.cardForm.value.cvv,
        expMonth: self.cardForm.value.expiryDate.split('-')[1],
        expYear: self.cardForm.value.expiryDate.split('-')[0]
      }
      console.log(tokenData)
      TCO.requestToken(succToken, errToken, tokenData)
      });​
      var succToken = function(data) {
        console.log('succ token=> '+ JSON.stringify(data))
        self.service.spinnerHide()
        self.registerData =  Object.assign(self.registerData, {data: data})
        self.service.postApi(`player/competition/confirmRegistration`, self.registerData, 1).subscribe(response => {
          if(response.responseCode == 200) {
            $('#playerRegPay').modal('hide')
            self.service.toastrSucc(response.responseMessage)
            self.ngOnInit();
            // self.service.setStorage( 'userDetailYala', JSON.stringify({token: self.loginRes.token, role: self.loginRes.result.role[0], userType: self.loginRes.result.organizerType, _id: self.loginRes.result._id}) )
            // self.router.navigate(['/organizer/dataTeams'])
          }
        })
      }
      var errToken = function(err) {
        console.log('err token => '+ JSON.stringify(err))
        self.service.spinnerHide()
      }
  }
  selectCard(cardDet) {
    setTimeout(() => {
      console.log('curr card selected => ' + this.currCard)
      console.log(cardDet)
      this.cardForm.patchValue({
        card: cardDet.cardNumber.toString(),
        expiryDate: cardDet.expiryDate
      })
    }, 300)
    
  }
  
}