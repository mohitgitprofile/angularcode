import { Component, OnInit, MainService, ActivatedRoute, FormGroup, Validators, FormBuilder } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
declare var $: any
declare var TCO: any

@Component({
  selector: 'app-venue-booking-form',
  templateUrl: './venue-booking-form.component.html',
  styleUrls: ['./venue-booking-form.component.css']
})
export class VenueBookingFormComponent implements OnInit {
  partialBookingId: any;
  totalCourt: any;
  organizerId: any;
  venueDetail: any = {};
  bookingDetail: any = {date:[]};
  currency: any;
  tokenData: any
  bookingData: any = {}
  list: any = { cardList: [] };
  cardForm: FormGroup
  bookingForm: FormGroup
  userDetail: any;
  orgId: any
  date: any = { selectedDate: '', isDateSelected: false, isSlotSelected: false, selectedSlot: '' }
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    inline: true,
    showInputField: false,
    showTodayBtn: false,
  };
  dateRange = { "startDate": "", "endDate": "" }
  regForm: any = []
  paymenVal = ''
  firstName: any = ''
  lastName: any = ''
  id: any;
  constructor(private service: MainService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.bookingForm = this.fb.group({
      'email': ['']
    })
    this.cardForm = this.fb.group({
      'expiryDate': ['', Validators.compose([Validators.required, Validators.pattern(/^[2][0][1-9][0-9][-]0[1-9]|1[012]$/)])],
      'card': ['', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
      'cvv': ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{3}$/)])]
    })
  }

  ngOnInit() {
    this.currency = this.service.currencyLogo
    this.route.params.subscribe(async params => {
      console.log('PARAMS-->', params);
      this.id = params['id'];
    })
    this.getBookingDetailApi();

  }

  getBookingDetailApi() {
    let data = {
      "_id": this.id,
    }
    this.service.postApi('venue/getVenueBookingData', data, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.bookingDetail = response.result;
        this.totalCourt = response.result.totalCourt
        this.getVenueDetailApi()
      }
    })
  }

  get gBookF() {
    return this.bookingForm.controls;
  }


  getVenueDetailApi() {
    let venueData = {
      "playerId":this.userDetail._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.bookingDetail.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueDetail = response.result
        this.organizerId = response.result.organizerId
        if (this.venueDetail.partialBooking === true) {
          this.partialBookingId = this.venueDetail.partialBookingId
        }
        let dynFormData = [];
        dynFormData = response.result.dynamicFormField
        dynFormData.forEach(obj => {
          if (obj.importance != 'hidden') {
            this.regForm.push(obj)
          } if (obj.fieldType == 'email' ) {
            this.bookingForm = this.fb.group({
              'email': ['', Validators.compose([Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i) ])]
            })
          }
         
        })
      }
    })
  }

  goBack() {
    this.router.navigate(['/player/venueSlots/' + this.bookingDetail.date + '/' + this.bookingDetail.sportName + '/' + this.bookingDetail.venueId])
  }

  saveRegister() {
    var errCount = 0;
    if (this.regForm.length > 0) {
      for (let i = 0; i < this.regForm.length; i++) {
        if (this.regForm[i].importance == "mandatory" && (!this.regForm[i].itemValue || this.regForm[i].itemValue == '')) {
          errCount++;
          this.service.toastrErr(this.regForm[i].field + ' is mandatory!')
          if (errCount == 1) {
            break;
          }
        }
      }
      if (errCount == 0) {
        this.bookServiceFun();
      }
    }
    else {
      this.bookServiceFun()
    }
  }

  get cf() {
    return this.cardForm.controls;
  }

  bookServiceFun() {
    let dynObj = {};
    let dynArr = [];
    this.regForm.forEach((obj) => {
      dynObj = obj
      dynObj[obj.field] = obj.itemValue
      dynArr.push(dynObj);
    });
    this.bookingData = {
      "organizerId": this.organizerId,
      "venueId": this.bookingDetail.venueId,
      "playerId": this.userDetail._id,
      "venueName": this.bookingDetail.venueName,
      // "bookingDate": this.bookingDetail.date,
      "paymentMethod": this.paymenVal,
      // "bookingDateISO": this.bookingDetail.date,
      "totalAmount": this.totalCourt * this.bookingDetail.price,
      "sportName": this.bookingDetail.sportName,
      "slotArray": [{
        "sport": this.bookingDetail.sporName,
        "startTime": this.bookingDetail.startTime,
        "noOfSlot": this.bookingDetail.noOfCourt,
        "totalAmtForThisSlot": this.bookingDetail.price,
        "bookingDate": this.bookingDetail.date,
        "bookingDateISO": this.bookingDetail.date,
      }],
      "dynamicData": dynArr
    }
    console.log('bookingData =>'  +JSON.stringify(this.bookingData))

    if (this.paymenVal == 'Online') {
      $('#paymentPlanChange').modal('show')
    } else if (this.paymenVal == 'Offline') {
      this.service.postApi('venue/bookAVenue', this.bookingData, 1).subscribe(response => {
        if (response.responseCode == 201 || response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage);
          if (this.venueDetail.partialBooking === true) {
            this.deleteBooking ()
          }
          
          this.router.navigate(['/player/venueDetail/' + this.bookingDetail.venueId])
        }
      })
    }
    //************** End *************//
  }


  deleteBooking () {
    let data = {
      "_id": this.partialBookingId,
    }

    this.service.postApi('venue/deleteVenueBookingData', data, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        // this.bookingType = ' '
        // this.disableSelect = false
        // this.getVenueDetail()
      }
    })
  }

  pay() {
    var self = this;
    self.service.spinnerShow()
    TCO.loadPubKey('sandbox', function () {
      var tokenData = {
        sellerId: GlobalConstant.paymentCredential.sellerId,//901386003
        publishableKey: GlobalConstant.paymentCredential.publishableKey,//4769A4CA-5488-4585-B1DF-B8AB85753020
        ccNo: self.cardForm.value.card,//"4111111111111111"
        cvv: self.cardForm.value.cvv,
        expMonth: self.cardForm.value.expiryDate.split('-')[1],
        expYear: self.cardForm.value.expiryDate.split('-')[0]
      }
      TCO.requestToken(succToken, errToken, tokenData)
    });
    var succToken = function (data) {
      console.log("data --->", JSON.stringify(data))
      self.bookingData.data = data
      self.service.postApi('venue/bookAVenue', self.bookingData, 1).subscribe(response => {
        if (response.responseCode == 201 || response.responseCode == 200) {
          self.service.spinnerHide()
          $('#paymentPlanChange').modal('hide')
          self.service.toastrSucc(response.responseMessage);
          self.router.navigate(['/player/venueDetail/' + self.bookingDetail.venueId])
        }
      })
    }
    var errToken = function (err) {
      console.log("err --->", JSON.stringify(err))
      self.service.spinnerHide()
      if (err.errorCode == 200) {
        $('#paymentPlanChange').modal('hide')
        self.service.toastrErr(err.errorMsg);
      }
      // self.service.toastrErr(`Payment failed`)
    }
  }

  goback() {
    this.router.navigate(['/player/venueDetail/' + this.bookingDetail.venueId])
  }

}
