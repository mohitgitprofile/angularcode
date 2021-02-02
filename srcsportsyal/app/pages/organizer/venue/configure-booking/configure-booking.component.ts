import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, MainService, Router } from '../../../../index';
declare var $: any;

@Component({
  selector: 'app-configure-booking',
  templateUrl: './configure-booking.component.html',
  styleUrls: ['./configure-booking.component.css']
})
export class ConfigureBookingComponent implements OnInit {
  configureArrList: any = [];
  venueId: any;
  userDetails: any = {};
  venueList: any = [];
  configureArr: any = [{ field: "", fieldType: "text", importance: "optional" }];
  currUrl: any;
  configureField: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private service: MainService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getVenueListApi()
    this.route.params.subscribe(async params => {
      this.currUrl = params['tab']
    })
  }

  /*********************************************** API INTEGRATION TO GET VENUE LIST ********************************************/
  getVenueListApi() {
    this.service.getApi('venue/getVenueWithoutPagination?organizerId=' + this.userDetails._id, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueList = response.result
        if (this.venueList.length) {
          this.venueId = this.venueList[0]._id;
          this.getVenueDetailApi()
        }
      }
    })
  }
  /**************************************************************** END *********************************************************/

  /********************************************* API INTEGRATION TO GET VENUE DETAIL ********************************************/
  getVenueDetailApi() {
    let venueData = {
      "playerId": this.userDetails._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.configureArrList = response.result.dynamicFormField
      }
    })
  }
  /**************************************************************** END *********************************************************/

  configureFieldModal() {
    this.configureArr = [{ field: "", fieldType: "text", importance: "optional" }];
    $(`#configurField_modal`).modal({ backdrop: 'static' })
  }

  //************************************* Configure Dynamic  fields Api Integration ********************************************//
  saveConfigFields(type) {
    let dynamicArr = [];
    if (type == "modal") {
      dynamicArr = this.configureArr.concat(this.configureArrList)
    } else {
      dynamicArr = this.configureArrList
    }
    let dynamicFieldsData = {
      "venueId": this.venueId,
      "dynamicFormField": dynamicArr
    }
    this.service.postApi(`venue/dynamicFormField`, dynamicFieldsData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $('#configurField_modal').modal('hide');
        this.getVenueDetailApi();
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
    //**************************************************************** End **************************************************************//
  }

  addOtherField() {
    var dataFill = false;
    for (var i = 0; i < this.configureArr.length; i++) {
      if (this.configureArr[i].field == "") {
        this.service.toastrErr('Please enter Field.')
        dataFill = false;
        break;
      } else {
        dataFill = true;
      }
    }
    if (dataFill == true) {
      this.configureArr.push({ field: "", fieldType: "", importance: "optional" });
    }
  }

  /*********************************************** API INTEGRATION TO GET VENUE LIST ********************************************/
  getConfigureFieldApi() {
    let reqData = {
      "organizerId": this.userDetails._id,
      "venueId": this.venueId,
      "search": " ",
      "bookingStatus": " ",
      "page": 1,
      "limit": 10,
      "fromDate": " ",
      "toDate": " "
    }
    this.service.postApi(`venue/getBookingList`, reqData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.configureField = response.result
      }
    })
  }
  /**************************************************************** END *********************************************************/

  onVenueSelect() {
    this.getVenueDetailApi();
  }

}
