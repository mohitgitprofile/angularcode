import { Component, OnInit, MainService, ActivatedRoute, FormGroup, Validators, FormBuilder } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
declare var $: any

@Component({
  selector: 'app-venue-slots',
  templateUrl: './venue-slots.component.html',
  styleUrls: ['./venue-slots.component.css']
})
export class VenueSlotsComponent implements OnInit {
  initialDateArr: any = [];
  disableSelect: boolean = false;
  url: string;
  totalCourt: any;
  bookingDetail: any;
  checkedStatus: boolean;
  partialSelectedTimeArr: any = [];
  partialBookingId: any;
  selectedTimeArr: any = [];
  selectedMultiCourt: any = false;
  timeSlotIndex: any;
  individualDateSlotArr: any = [];
  totalSlot: any;
  bookingType = ' '
  groupDateSlotArr: any = [];
  slotDuration: any;
  price: any;
  selectedCourt: any = ' ';
  totalCourtArr: any = [];
  currency: any;
  selectedDate: any;
  selectedSport: any;
  selectedTime: any = false;
  dateSlotArr: any = []
  venueId: any;
  organizerId: any;
  userDetail: any = {};
  venueDetail: any = {};
  constructor(private service: MainService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.currency = this.service.currencyLogo
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
      this.selectedSport = params['sport']
      this.selectedDate = params['date']
    })
  }

  ngOnInit() {
    this.getVenueDetail()
  }

  getVenueDetail() {
    let venueData = {
      "playerId": this.userDetail._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueDetail = response.result
        this.organizerId = response.result.organizerId
        if (this.venueDetail.partialBooking === true) {
          this.partialBookingId = this.venueDetail.partialBookingId
          this.getPartialBookingDetail();
        } else if (this.venueDetail.partialBooking === false) {
          this.getSlotDurationApi()
        }
      }
    })
  }

  /*********************************************** GET PARTIAL BOOKING DETAIL  API *************************************************/
  getPartialBookingDetail() {
    let data = {
      "_id": this.partialBookingId,
    }
    this.service.postApi('venue/getVenueBookingData', data, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.bookingDetail = response.result;
        this.selectedSport = response.result.sportName
        this.totalCourt = response.result.totalCourt
        this.bookingDetail.date.forEach(dObj => {
          if (dObj.date == this.selectedDate) {
            this.partialSelectedTimeArr = dObj.startTime
            this.bookingType = dObj.typeOfBooking
            this.disableSelect = true
            if (this.bookingType == 'Individual') {
              this.selectedCourt = dObj.noOfCourt
            }
          }
        })
        this.getSlotDurationApi()
      }
    })
  }
  /********************************************************** END ******************************************************************/

  /****************************************************** GET SLOT DURATION API ****************************************************/
  getSlotDurationApi() {
    let slotData = {
      "venueId": this.venueId,
      "playerId": this.userDetail._id,
      "venueName": this.venueDetail.venueName,
      "sportName": this.selectedSport,
      "date": this.selectedDate
    }

    this.service.postApi('venue/getVenueTimeSlots', slotData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        var obj = response.result;
        this.dateSlotArr = []
        for (let key in obj) {
          this.slotDuration = obj.duration
          this.totalSlot = obj.totalSlot
        }
        this.getSlotDetailApi()
      }
    })
  }
  /********************************************************** END ******************************************************************/

  /****************************************************** GET SLOT DETAIL API ******************************************************/
  getSlotDetailApi() {
    let slotData = {
      "venueId": this.venueId,
      "playerId": this.userDetail._id,
      "venueName": this.venueDetail.venueName,
      "sportName": this.selectedSport,
    }

    this.service.postApi('venue/getVenueStatus', slotData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        let disableDate = false
        let dateArray = response.result
        dateArray.forEach(obj => {
          for (let key in obj) {
            if (this.selectedDate == key) {
              let tempArr = [];
              tempArr = [...obj[key]]
              tempArr.forEach(val => {
                val.duration = this.slotDuration
                val.totalSlot = this.totalSlot
                val.multipleCheck = false
                if (val.noOfSlot > 0) {
                  this.initialDateArr.push(val)
                  this.dateSlotArr.push(val)
                }
              })
            }
          }
        })
        if (this.venueDetail.partialBooking === true) {
          this.selectBookingType('prevSelected');
        }
      }
    })
  }
  /********************************************************** END ******************************************************************/

  selectBookingType(val) {
    let eventType = val
    this.selectedTimeArr = []
    this.selectedTime = false
    this.timeSlotIndex = null
    this.groupDateSlotArr = []
    this.individualDateSlotArr = []
    if (eventType == 'onChange') {
      this.selectedCourt = ' '
    }
    if (this.bookingType == 'Group') {
      this.dateSlotArr.forEach(obj => {
        if (obj.noOfSlot == this.totalSlot) {
          if (this.venueDetail.partialBooking === true) {
            this.partialSelectedTimeArr.forEach(dObj => {
              if (dObj == obj.time) {
                obj.multipleCheck = true
                this.onTimeSelection(obj, 'val', 'partial')
              }
            })
          }
          this.groupDateSlotArr.push(obj)
        }
      })
      this.dateSlotArr = this.groupDateSlotArr
    } else {
      this.dateSlotArr = this.initialDateArr
      this.dateSlotArr.forEach(obj => {
        if (this.venueDetail.partialBooking === true) {
          this.partialSelectedTimeArr.forEach(dObj => {
            if (dObj == obj.time) {
              obj.multipleCheck = true
              this.onTimeSelection(obj, 'partialCourtData', 'partial')
            }
          })
          this.individualDateSlotArr.push(obj)
        } else {
          this.individualDateSlotArr = this.initialDateArr
        }
      })
      this.dateSlotArr = this.individualDateSlotArr
    }
  }

  onTimeSelection(data, idx, event) {
    if (this.venueDetail.partialBooking === false) {
      this.selectedCourt = ' '
    }
    if (this.bookingType == 'Individual') {
      this.totalCourtArr = []
      this.selectedTimeArr = []
      this.selectedTime = data.time
      this.selectedTimeArr.push(data.time)
      this.price = data.price
      for (let i = 1; i <= data.noOfSlot; i++) {
        this.totalCourtArr.push({ 'slotCount': i })
      }
      if (idx == 'partialCourtData') {
        for (let i = 0; i < this.dateSlotArr.length; i++) {
          if (this.dateSlotArr[i].multipleCheck === true) {
            this.timeSlotIndex = i
          }
        }
      } else {
        this.timeSlotIndex = idx
      }
    } else {
      if (event == 'partial') {
        const checked = true;
        this.checkedStatus = checked
      } else {
        const checked = event.target.checked;
        this.checkedStatus = checked
      }
      if (this.checkedStatus) {
        this.selectedTimeArr.push(data.time)
        this.selectedCourt = this.selectedTimeArr.length * this.totalSlot
      } else {
        for (let i = 0; i <= this.selectedTimeArr.length; i++) {
          if (data.time == this.selectedTimeArr[i]) {
            this.selectedTimeArr.splice(i, 1);
          }
        }
        this.selectedCourt = this.selectedTimeArr.length * this.totalSlot
      }
      if (this.selectedTimeArr.length) {
        this.selectedTime = true
      } else {
        this.selectedTime = false
      }
    }
  }

  onCourtSelection() {
    // console.log('selectedCourt =>' + JSON.stringify(this.selectedCourt))
  }

  goNextPage() {
    let selectedDateArr = []
    let previousSelectedData = []
    if (this.venueDetail.partialBooking === true) {
      previousSelectedData = [...this.bookingDetail.date]
      let arr = previousSelectedData.filter(dObj => dObj.date == this.selectedDate)
      if (arr.length) {
        previousSelectedData.forEach(dObj => {
          if (dObj.date == this.selectedDate) {
            dObj.typeOfBooking = this.bookingType
            dObj.startTime = this.selectedTimeArr
            dObj.noOfCourt = this.selectedCourt
          }
        })
      } else {
        previousSelectedData.push({ "date": this.selectedDate, "startTime": this.selectedTimeArr, "typeOfBooking": this.bookingType, "noOfCourt": this.selectedCourt })
      }
      selectedDateArr = previousSelectedData
    } else {
      selectedDateArr.push({ "date": this.selectedDate, "startTime": this.selectedTimeArr, "typeOfBooking": this.bookingType, "noOfCourt": this.selectedCourt })
    }

    let bookingData = {
      "playerId": this.userDetail._id,
      "venueId": this.venueId,
      "venueName": this.venueDetail.venueName,
      "sportName": this.selectedSport,
      "date": selectedDateArr,
      "duration": this.dateSlotArr[0].duration,
      "price": this.dateSlotArr[0].price,
    }
    if (this.venueDetail.partialBooking === true) {
      bookingData["_id"] = this.partialBookingId
      this.url = 'updateVenueBookingData'
    } else {
      this.url = 'saveVenueBookingData'
    }

    this.service.postApi('venue/' + this.url, bookingData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.router.navigate(['/player/venueBookingForm/' + response.result._id])
      }
    })
  }

  goback() {
    this.router.navigate(['/player/venueDetail/' + this.venueId])
  }

  resetPartial() {
    let data = {
      "_id": this.partialBookingId,
      "date": this.selectedDate
    }

    this.service.postApi('venue/resetVenueBookingData', data, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.bookingType = ' '
        this.disableSelect = false
        this.getVenueDetail()
      }
    })
  }

}
