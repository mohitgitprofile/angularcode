import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { IMyDpOptions } from 'mydatepicker';
declare var $: any;
import { RatingModule } from "ngx-rating";

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {
  totalCourt: any;
  partialBookingDateArr: any = [];
  partialBookingId: any;
  ratingMessage: any;
  newRating: any;
  averageRating: any;
  userRating: any;
  venueId: any;
  currency: any;
  sportsList: any = [];
  dateSlotArr: any = [];
  userDetails: any = {};
  selectedSport: any = ""
  date: any = { selectedDate: '', isDateSelected: false, isSlotSelected: false, selectedSlot: '' }
  venueDetail: any = { images: [] };
  organizerId: any;
  starsCount: any = 5
  constructor(private fb: FormBuilder, private service: MainService, private router: Router, private route: ActivatedRoute) { }
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    inline: true,
    highlightDates: [],
    disableDays: [],
    markDates: [],
    showTodayBtn: true,
    sunHighlight: false
  };

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.organizerId = this.userDetails._id;
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
    })
    this.getVenueDetailApi()
    this.getVenueRating()
  }

  getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }

  getVenueRating() {
    /************************************************ GET RATING  ON A VENUE  ********************************************************/
    let ratingData = {
      "venueId": this.venueId
    }

    this.service.postApi('venue/getVenueRating', ratingData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.averageRating = response.result
      }
    })
    /********************************************************** END ******************************************************************/
  }

  /************************************ API INTEGRATION TO GET SLOTS ON THE BASIS OF SPORTS  ********************************************/
  onSportSelect() {
    let todayDate = new Date()
    let currYear = todayDate.getFullYear() + 20
    let currMonth = todayDate.getMonth() + 1
    let currDate = todayDate.getDate() - 1
    let copy1 = this.getCopyOfOptions();
    copy1.disableDays = []
    copy1.highlightDates = []
    if (this.venueDetail.partialBooking === false) {
      copy1.markDates = [{ dates: [], color: '' }]
    }
    copy1.disableSince = { year: currYear, month: currMonth, day: currDate }
    copy1.disableUntil = { year: currYear, month: currMonth, day: currDate }
    this.myDatePickerOptions = copy1;
    let sportData = {
      "venueId": this.venueId,
      "playerId": this.userDetails._id,
      "venueName": this.venueDetail.venueName,
      "sportName": this.selectedSport
    }

    this.service.postApi('venue/getVenueStatus', sportData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        var newArr = [];
        var arr = response.result;
        arr.forEach(obj => {
          for (let key in obj) {
            let count = 0;
            // if (key != 'partialBooking' && key != 'partialBookingId') {
              obj[key].forEach(e => {
                if (e.noOfSlot <= 0) {
                  count++;
                }
              });
              newArr.push({
                date: key,
                disablestatus: obj[key].length == count ? true : false
              });
            }
          //}
        });
        this.dateSlotArr = newArr
        // this.getPartialVenueDetail()
        /******************************** DISABLE ENABLE CALENDER WITH RED/GREEN COLOUR FUNCTIONALITY ************************************/
        this.dateSlotArr.forEach(ele => {
          if (ele.disablestatus == false) {
            let tempYear = ele.date.split("-")[0];
            let tempMonth = ele.date.split("-")[1];
            let tempDate = ele.date.split("-")[2];
            if (tempDate[0] == 0) {
              tempDate = tempDate.slice(1)
            }
            if (tempMonth[0] == 0) {
              tempMonth = tempMonth.slice(1)
            }
            let copy1 = this.getCopyOfOptions();
            let todayDate = new Date()
            let currYear = todayDate.getFullYear()
            let currMonth = todayDate.getMonth() + 1
            let currDate = todayDate.getDate() - 1
            copy1.disableSince = { year: currYear, month: currMonth + 2, day: currDate + 3 }
            copy1.disableUntil = { year: currYear, month: currMonth, day: currDate }
            copy1.markDates.push({ dates: [{ year: JSON.parse(tempYear), month: JSON.parse(tempMonth), day: JSON.parse(tempDate) }], color: 'green' })
            this.myDatePickerOptions = copy1;
          } else {
            let tempYear = ele.date.split("-")[0];
            let tempMonth = ele.date.split("-")[1];
            let tempDate = ele.date.split("-")[2];
            if (tempDate[0] == 0) {
              tempDate = tempDate.slice(1)
            }
            if (tempMonth[0] == 0) {
              tempMonth = tempMonth.slice(1)
            }
            let copy1 = this.getCopyOfOptions();
            let todayDate = new Date()
            let currYear = todayDate.getFullYear()
            let currMonth = todayDate.getMonth() + 1
            let currDate = todayDate.getDate() - 1
            copy1.disableSince = { year: currYear, month: currMonth + 2, day: currDate }
            copy1.disableUntil = { year: currYear, month: currMonth, day: currDate }
            copy1.highlightDates.push({ year: JSON.parse(tempYear), month: JSON.parse(tempMonth), day: JSON.parse(tempDate) })
            copy1.disableDays.push({ year: JSON.parse(tempYear), month: JSON.parse(tempMonth), day: JSON.parse(tempDate) })
            this.myDatePickerOptions = copy1;
          }
        })
      } else {
        let todayDate = new Date()
        let currYear = todayDate.getFullYear() + 20
        let currMonth = todayDate.getMonth() + 1
        let currDate = todayDate.getDate() - 1
        let copy1 = this.getCopyOfOptions();
        copy1.disableDays = []
        copy1.highlightDates = []
        copy1.markDates = [{ dates: [], color: '' }]
        copy1.disableSince = { year: currYear, month: currMonth, day: currDate }
        copy1.disableUntil = { year: currYear, month: currMonth, day: currDate }
        this.myDatePickerOptions = copy1;
        this.service.toastrErr(response.responseMessage)
      }
    })
  }
  /********************************************************** END ******************************************************************/


  /*********************************************** GET PARTIAL VENUE DETAIL  API ***************************************************/
  // getPartialVenueDetail() {
  //   let data = {
  //     "venueId": this.venueId,
  //     "_id": this.partialBookingId,
  //     "sportName": this.selectedSport

  //   }
  //   this.service.postApi('venue/getPartialVenueStatus', data, 1).subscribe(response => {
  //     if (response.responseCode == 201 || response.responseCode == 200) {
  //       console.log('data =>' + JSON.stringify(response.result))

  //       response.result.forEach(ele => {
  //         let tempYear = ele.date.split("-")[0];
  //         let tempMonth = ele.date.split("-")[1];
  //         let tempDate = ele.date.split("-")[2];
  //         if (tempDate[0] == 0) {
  //           tempDate = tempDate.slice(1)
  //         }
  //         if (tempMonth[0] == 0) {
  //           tempMonth = tempMonth.slice(1)
  //         }
  //         let copy1 = this.getCopyOfOptions();
  //         let todayDate = new Date()

  //         let currYear = todayDate.getFullYear()
  //         let currMonth = todayDate.getMonth() + 1
  //         let currDate = todayDate.getDate() - 1
  //         console.log(currYear)
  //         console.log(currMonth)
  //         console.log(currDate)
  //         copy1.highlightDates.push({ year: JSON.parse(tempYear), month: JSON.parse(tempMonth), day: JSON.parse(tempDate) })
  //         this.myDatePickerOptions = copy1;
  //       })
  //     }
  //   })
  // }
  /********************************************************** END ******************************************************************/


  /*********************************************** GET PARTIAL BOOKING DETAIL  API *************************************************/
  getPartialBookingDetail() {
    let data = {
      "_id": this.partialBookingId,
    }
    this.service.postApi('venue/getVenueBookingData', data, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.selectedSport = response.result.sportName
        this.partialBookingDateArr = response.result.date
        this.totalCourt = response.result.totalCourt
        this.partialBookingDateArr.forEach(ele => {
          let copy1 = this.getCopyOfOptions();
          let partialYear = ele.date.split("-")[0];
          let partialMonth = ele.date.split("-")[1];
          let partialDate = ele.date.split("-")[2];
          if (partialDate[0] == 0) {
            partialDate = partialDate.slice(1)
          }
          if (partialMonth[0] == 0) {
            partialMonth = partialMonth.slice(1)
          }
          copy1.markDates.push({ dates: [{ year: JSON.parse(partialYear), month: JSON.parse(partialMonth), day: JSON.parse(partialDate) }], color: '#FF9800' })
          this.myDatePickerOptions = copy1;
        })
        this.onSportSelect()
      }
    })
  }
  /********************************************************** END ******************************************************************/


  /************************************************** GET VENUE DETAIL  API ********************************************************/
  getVenueDetailApi() {
    let venueData = {
      "playerId": this.userDetails._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueDetail = response.result
        this.organizerId = response.result.organizerId
        this.sportsList = response.result.sport
        if (this.venueDetail.partialBooking === true) {
          this.partialBookingId = this.venueDetail.partialBookingId
          this.getPartialBookingDetail();
        }
      }
    })
  }
  /********************************************************** END ******************************************************************/

  bookSlot() {
    this.router.navigate(['/player/venueSlots/' + this.date.selectedDate.formatted + '/' + this.selectedSport + '/' + this.venueId])
  }

  onDateSelect(e) {
    this.date.selectedDate = e
    this.date.isDateSelected = true
  }

  onRatingClicked() {
    this.newRating = this.userRating
  }

  /*********************************************** GET RATING BY THE USER ON A VENUE **********************************************/
  getparticularRating() {
    $('#venue_rating').modal('show')

    let getRatingData = {
      "venueId": this.venueId,
      "userId": this.userDetails._id
    }

    this.service.postApi('venue/getVenueRatingOfAUser', getRatingData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.ratingMessage = response.responseMessage
        if (response.responseMessage == 'Please rate this venue') {
          this.userRating = 0
        } else {
          this.userRating = response.result.venueRating[0].rating
        }
      }
    })
  }
  /************************************************************* END ******************************************************************/

  /*************************************************** RATE/ UPDATE RATING OF A VENUE ***********************************************************/
  saveRatingFun() {
    if (this.ratingMessage == 'Please rate this venue') {
      this.service.getApi('venue/rateAVenue?venueId=' + this.venueId + '&rating=' + this.newRating + '&userId=' + this.userDetails._id, 1).subscribe(response => {
        if (response.responseCode == 201 || response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage)
          $('#venue_rating').modal('hide')
        }
      })
    } else {
      let updateRatingData = {
        "venueId": this.venueId,
        "userId": this.userDetails._id,
        "rating": this.newRating
      }
      this.service.postApi('venue/editVenueRating', updateRatingData, 1).subscribe(response => {
        if (response.responseCode == 201 || response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage)
          this.getVenueRating()
          $('#venue_rating').modal('hide')
        }
      })
    }
    /********************************************************** END ******************************************************************/
  }

  bookNow() {
    this.router.navigate(['/player/venueBookingForm/' + this.partialBookingId])
  }

}
