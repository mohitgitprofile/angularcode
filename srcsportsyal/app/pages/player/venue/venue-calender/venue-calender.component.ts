import { Component, OnInit, MainService, ActivatedRoute, FormGroup, Validators, FormBuilder } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
declare var $: any
declare var TCO: any

@Component({
  selector: 'app-venue-calender',
  templateUrl: './venue-calender.component.html',
  styleUrls: ['./venue-calender.component.css']
})
export class VenueCalenderComponent implements OnInit {
  highlightDateGreen: any = [];
  highlightDateRed: any = [];
  dateSlotArr: any = [];
  currYear: number;
  currMonth: number;
  currDate: number;
  currency: any;
  selectedSport: any = ""
  organizerId: any;
  venueId: any;
  userDetails: any = {};
  venueDetail: any = {};
  sportsList: any = [];
  userDetail: any;
  date: any = { selectedDate: '', isDateSelected: false, isSlotSelected: false, selectedSlot: '' }
  //   /**************** Date managing***************/
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    disableUntil: { year: this.currYear, month: this.currMonth, day: this.currDate },
    inline: true,
    highlightDates: [],
    disableDays: [],
    disableSince: { year: this.currYear, month: this.currMonth, day: this.currDate },
    markDates: [],
    showTodayBtn: true,
    sunHighlight: false
  };
  constructor(private service: MainService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
  }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetailYala'));
    this.currency = this.service.currencyLogo
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
    })
    this.getVenueDetailApi();
    // this.onSportSelect();
  }

  getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }

  /************************************ API INTEGRATION TO GET SLOTS ON THE BASIS OF SPORTS  ********************************************/
  onSportSelect() {
    let todayDate = new Date()
    this.currYear = todayDate.getFullYear() + 20
    this.currMonth = todayDate.getMonth() + 1
    this.currDate = todayDate.getDate() - 1
    let copy1 = this.getCopyOfOptions();
    copy1.disableDays = []
    copy1.highlightDates = []
    copy1.markDates = [{ dates: [], color: '' }]
    copy1.disableSince = { year: this.currYear, month: this.currMonth, day: this.currDate }
    copy1.disableUntil = { year: this.currYear, month: this.currMonth, day: this.currDate }
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
        });
        this.dateSlotArr = newArr
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
            copy1.markDates.push(
              { dates: [{ year: JSON.parse(tempYear), month: JSON.parse(tempMonth), day: JSON.parse(tempDate) }], color: 'green' })
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
            copy1.disableSince = { year: currYear, month: currMonth + 2, day: this.currDate }
            copy1.disableUntil = { year: currYear, month: currMonth, day: currDate }
            copy1.highlightDates.push({ year: JSON.parse(tempYear), month: JSON.parse(tempMonth), day: JSON.parse(tempDate) })
            copy1.disableDays.push({ year: JSON.parse(tempYear), month: JSON.parse(tempMonth), day: JSON.parse(tempDate) })
            this.myDatePickerOptions = copy1;
          }
        })
      } else {
        let todayDate = new Date()
        this.currYear = todayDate.getFullYear() + 20
        this.currMonth = todayDate.getMonth() + 1
        this.currDate = todayDate.getDate() - 1
        let copy1 = this.getCopyOfOptions();
        copy1.disableDays = []
        copy1.highlightDates = []
        copy1.markDates = [{ dates: [], color: '' }]
        copy1.disableSince = { year: this.currYear, month: this.currMonth, day: this.currDate }
        copy1.disableUntil = { year: this.currYear, month: this.currMonth, day: this.currDate }
        this.myDatePickerOptions = copy1;
        this.service.toastrErr(response.responseMessage)
      }
    })
  }
  /********************************************************** END ******************************************************************/

  getVenueDetailApi() {
    let venueData = {
      "playerId": this.userDetail._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueDetail = response.result
        this.organizerId = response.result.organizerId
        this.sportsList = response.result.sport
      }
    })
  }

  bookSlot() {
    this.router.navigate(['/player/venueSlots/' + this.date.selectedDate.formatted + '/' + this.selectedSport + '/' + this.venueId])
  }

  goback() {
    this.router.navigate(['/player/venueDetail/' + this.venueId])
  }

  onDateSelect(e) {
    this.date.selectedDate = e
    this.date.isDateSelected = true
  }

}
