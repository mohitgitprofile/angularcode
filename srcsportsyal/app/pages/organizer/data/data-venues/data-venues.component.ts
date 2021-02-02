import { Component, OnInit } from '@angular/core';
import { GlobalConstant } from "../../../../global/global.constant";
import { MainService } from "../../../../index";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-data-venues',
  templateUrl: './data-venues.component.html',
  styleUrls: ['./data-venues.component.css']
})
export class DataVenuesComponent implements OnInit {
  venueLocation1: any;
  venueLocation: any;
  venueId: any;
  ClubsList: any;
  CreateVenueForm: FormGroup;
  searchKey: any;
  VenuesList: any = { docs: [] };
  userDetails: any;
  list: any = { limitChangeArr: GlobalConstant.limitChangeArr, statusList: GlobalConstant.teamStatusArr };
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };
  searchForm: FormGroup;
  membervenueList: any=[];
  pageLimit: any;
  pageTotal: any;
  addMemberVenueForm: FormGroup;
  editmemberVenueForm: FormGroup;
  venueid: any;
  viewVenueDetail: any ={club:{clubName :''},venue : '',status:''};
  loginTypeArr: any=[];
  constructor(private service: MainService, private fb: FormBuilder) {
    this.CreateVenueForm = fb.group({
      'club': ['', Validators.compose([Validators.required])],
      'status': ['', Validators.compose([Validators.required])],
      'venue': ['', Validators.compose([Validators.required])]
    });
    this.searchForm = new FormGroup({
      'search': new FormControl('',)
    })
    this.addMemberVenueForm = new FormGroup({
      'venuename':new FormControl('',[Validators.required,Validators.pattern(/^[^\s][a-zA-Z ]*$/)]),
      'status':new FormControl('',Validators.required),
      'clubname':new FormControl('',Validators.required)
    })
    this.editmemberVenueForm = new FormGroup({
      'venuename':new FormControl('',[Validators.required,Validators.pattern(/^[^\s][a-zA-Z ]*$/)]),
      'status':new FormControl('',Validators.required),
      'clubname':new FormControl('',Validators.required)
    })
    // this.VenuesList = null;
    this.venueLocation = null;
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'));
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');  

    this.getClubsListApi();
    if(this.loginTypeArr.includes('COMPETITION'))
    {this.getVenuesListApi();}
    if(this.loginTypeArr.includes('COMPETITION'))
   { this.getVenueList('',this.filter.currPage);}
    this.userSettings = Object.assign({}, this.userSettings)
  }

  getVenuesListApi() {
    return new Promise((resolve, reject) => {
      let data;
      if (this.searchKey) {
        data = { page: this.filter.currPage, limit: this.filter.limit, search: this.searchKey }
      } else {
        data = { page: this.filter.currPage, limit: this.filter.limit, search: '' }
      }
      this.service.postApi('data/getListOfVenue?userId=' + this.userDetails._id, data, 1).subscribe(responseList => {
        let Response = responseList; 
        if (Response['responseCode'] == 200) {
          this.VenuesList = Response[`result`]
          resolve(true)
        }
        else if (Response['responseCode'] == 404)
          // this.VenuesList = null;
          this.VenuesList = Object.assign({}, { docs: [] })
      })
    })
  }

  getClubsListApi() {
    return new Promise((resolve, reject) => {
      let data = { page: this.filter.currPage, limit: this.filter.limit }
      this.service.getApi('data/selectClub?userId=' + this.userDetails._id, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.ClubsList = Response[`result`];
          resolve(true)
        }
      })
    })
  }

  onPageChange(pageNo) {
    this.filter.currPage = pageNo
    // this.filter.limitChange = 
    this.getVenuesListApi()
  }

  onChangeLimit() {
    this.filter.limit = Number(this.filter.limitChange)
    this.filter.currPage = 1
    this.getVenuesListApi()
  }

  onSearch(val, event) {
    if (val === 1) {
      if (!this.searchKey || event.keyCode == 13)
        this.getVenuesListApi();
    }
    else if (val === 2)
      this.getVenuesListApi();
  }

  searchApi() {
    return new Promise((resolve, reject) => {
      let data = { search: this.searchKey }
      this.service.postApi('data/searchVenue?userId=' + this.userDetails._id, data, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.VenuesList = Response[`result`]
          resolve(true)
        }
      })
    })
  }

  addVenue() {
    this.CreateVenueForm.reset();
    this.CreateVenueForm.setValue({ club: '', status: '', venue: '' })
    $('#add_venue').modal('show')
  }

  createVenue() {
    return new Promise((resolve, reject) => {
      let data = { venue: this.CreateVenueForm.value.venue, club: this.CreateVenueForm.value.club, status: this.CreateVenueForm.value.status }
      this.service.postApi('data/addVenue?userId=' + this.userDetails._id, data, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 201) {
          this.service.toastrSucc(Response.responseMessage)
          this.getVenuesListApi();
          $('#add_venue').modal('hide');
          resolve(true)
        }
      })
    })
  }

  getDetails(venue_id) {
    this.venueId = venue_id
    $('#edit_venue').modal('show');
    return new Promise((resolve, reject) => {
      this.service.getApi('data/getEditDetailOfVenue?userId=' + this.userDetails._id + '&venueId=' + venue_id, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.CreateVenueForm.setValue({ club: Response[`result`].club.clubName, status: Response[`result`].status, venue: Response[`result`].venue })
          resolve(true)
        }
      })
    })
  }

  editVenue() {
    return new Promise((resolve, reject) => {
      let data = this.CreateVenueForm.value
      this.service.postApi('data/editVenue?userId=' + this.userDetails._id + '&venueId=' + this.venueId, data, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.service.toastrSucc(Response.responseMessage)
          this.getVenuesListApi();
          $('#edit_venue').modal('hide');
          resolve(true)
        }
      })
    })
  }

  delete(venue_id) {
    this.venueId = venue_id;
    $('#delete_venue').modal('show');
  }

  onDeleteVenue() {
    return new Promise((resolve, reject) => {
      this.service.getApi('data/deleteVenue?userId=' + this.userDetails._id + '&venueId=' + this.venueId, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 204) {
          this.service.toastrSucc(Response.responseMessage)
          this.getVenuesListApi();
          $('#delete_venue').modal('hide');
          resolve(true)
        }
      })
    })
  }

  autoCompleteCallback1(selectedData: any) {
    if (selectedData.response == true)
      this.venueLocation = selectedData.data.formatted_address;
    else
      this.venueLocation = null;
  }

  userSettings = {
    "showCurrentLocation": false,
  }
  /**************** MemberShip Api Function *****************/
  /****************** Get venue List *************/
  getVenueList(formval,page){
    this.filter.currPage = page;
    console.log("Form Data  --> ",formval)
    var apiDoc ={
      "page":this.filter.currPage,
      "limit":4,
      "search":formval?formval.search:''
  }
    console.log("ApiDoc--> ",apiDoc);
   this.service.postApi('data/getListOfVenue?userId=' + this.userDetails._id,apiDoc, 1).subscribe(responseList => {
     let Response = responseList;
     console.log("Response--> ",JSON.stringify(Response));
     if (Response['responseCode'] == 200) {
      var sponsorDetail = Response.result;
      this.membervenueList = sponsorDetail.docs;
      this.pageLimit = sponsorDetail.limit;
      this.pageTotal = sponsorDetail.total;
     }
   })
  }
  /************** Add Venue Function *******************/
  addmemberVenue(formval){
  console.log("Add Venue Form Data==> ",formval);
  var apiDoc = {
    "venue":formval.venuename,
    "status":formval.status,
    "club":formval.clubname,    
  }
  console.log("Api Doc---> ",apiDoc);
  this.service.postApi('data/addVenue?userId=' + this.userDetails._id,apiDoc, 1).subscribe(responseList => {
    let Response = responseList;
    console.log("Response--> ",JSON.stringify(Response));
    if (Response['responseCode'] == 201) {
      this.getVenueList('',this.filter.currPage);
      this.addMemberVenueForm.reset();
     $('#addVenue').modal('hide');
    }
  })
  }
  /************************ Edit Venue Detail Functionality *****************/
  editData(id){
  this.venueid = id;
  var url = `data/getEditDetailOfVenue?userId=`+this.userDetails._id+`&venueId=`+this.venueid;
     console.log("Url--> ",url);
    this.service.getApi(url,1).subscribe(responseList => {
      let Response = responseList;
      console.log("Response--> ",JSON.stringify(Response));
      if (Response['responseCode'] == 200) {
        this.viewVenueDetail = Response.result;
          $('#editVenue').modal('show');
       
      }
    })
  }
  editMemberVenue(formvalue){
    console.log("Form Value --> ",formvalue);
    var apiDoc = {
      "venue":formvalue.venuename?formvalue.venuename:this.viewVenueDetail.venue,
      "status":formvalue.status?formvalue.status:this.viewVenueDetail.status,
      "club":formvalue.clubname?formvalue.clubname:this.viewVenueDetail.club.clubName
    }
    console.log("Api Doc ----> ",apiDoc);
    var url = `data/editVenue?userId=`+this.userDetails._id+`&venueId=`+this.venueid;
      console.log("Url--> ",url);
    this.service.postApi(url,apiDoc,1).subscribe(responseList => {
      let Response = responseList;
      console.log("Response--> ",JSON.stringify(Response));
      if (Response['responseCode'] == 200) {
        $('#editVenue').modal('hide'); 
        this.editmemberVenueForm.reset();      
        this.getVenueList('',this.filter.currPage);
      }
    })
  }
  /************************** Delete Venue Functionality *****************/
  deleteData(id){
    this.venueid = id;
    $('#deleteVenue').modal('show');
  }
  deleteMembershipVenue(){
     var url = `data/deleteVenue?userId=`+this.userDetails._id+`&venueId=`+this.venueid;
       console.log("Url--> ",url);
      this.service.getApi(url,1).subscribe(responseList => {
          let Response = responseList;
        console.log("Response--> ",JSON.stringify(Response));
        if (Response['responseCode'] == 204) {
           $('#deleteVenue').modal('hide');
           this.getVenueList('',this.filter.currPage);
        }
      })
  }
}
