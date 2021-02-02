import { Component, OnInit, MainService, Angular5Csv } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;
declare var window: any;
@Component({
  selector: 'app-data-players',
  templateUrl: './data-players.component.html',
  styleUrls: ['./data-players.component.css']
})
export class DataPlayersComponent implements OnInit {
  userDetails: any = {};
  list: any = { sportsList: [], divisionList: [], periodList: [], comptList: [], venueList: [], clubList: [], limitChangeArr: GlobalConstant.limitChangeArr, teamList: [], teamStatusList: GlobalConstant.teamStatusArr, compStatusList: GlobalConstant.statusArr, genderList: GlobalConstant.genderArr };
  filter: any = { teamStatus: '', team: '', club: '', compStatus: '', sports: [], gender: '', division: [], search: '', currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };
  dropdownSettings: any = GlobalConstant.multidropDownSettings
  playerDet: any = { docs: [] };
  updateData: any = { currId: '', msg: '', isAll: false }
  printData: any = [];
  memberlist: any = [];
  applyForm: FormGroup;
  searchForm: FormGroup;
  membershipId: any;
  membershipname: any;
  servicelist: any = [];
  filters: any = { currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };
  playerlist: any = [];
  pageLimit: any;
  pageTotal: any;
  apiDoc: { "page": any; "limit": number; "search": string; "membershipName": any; "serviceName": any; "gender": any; "status": any; "timeSlots": string; };
  message: any;
  viewPlayerDetail: any = [];
  playerDynamicDetail: any = [];
  applyVenueForm: FormGroup;
  loginTypeArr: any = [];
  constructor(private service: MainService) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');
    this.multGetApiCall()
    this.playerListApi();
    /******************* Membership Section ************/
    this.formValidation();
    this.memberList();
    this.filterFunc('', this.filters.currPage, 1);
    // Venue Section Functionality
    this.getSportListFunctionality();

  }

  // Form Validation Funstionality  Starts Here 

  formValidation() {
    this.applyForm = new FormGroup({
      'status': new FormControl('', Validators.required),
      'membership': new FormControl('', Validators.required),
      'servicename': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required)
    })
    this.searchForm = new FormGroup({
      'search': new FormControl('', ),
    })
    this.applyVenueForm = new FormGroup({
      'venue': new FormControl('', Validators.required),
      'sport': new FormControl('', Validators.required),
    })
  }
  ////////////// Form Validation Functionality Ends Here 
  multGetApiCall() {
    this.service.multipleGetApi(`organizer/selectSport?userId=${this.userDetails._id}`, `organizer/selectPeriod?userId=${this.userDetails._id}`, `organizer/selectDivision?userId=${this.userDetails._id}`, `data/selectCompition?userId=${this.userDetails._id}`, `data/selectVenue?userId=${this.userDetails._id}`, `data/selectTeam?userId=${this.userDetails._id}`).subscribe(responseList => {
      // console.log(JSON.stringify(responseList))
      let [sportResponse, periodResponse, divisionResponse, competitionResponse, venueResponse, teamResponse] = responseList
      if (sportResponse['responseCode'] == 200) {
        this.list.sportsList = sportResponse['result'].map(item => {
          return { item_id: item._id, item_text: item.sportName }
        })
      }
      if (periodResponse['responseCode'] == 200)
        this.list.periodList = periodResponse['result']
      if (divisionResponse['responseCode'] == 200) {
        this.list.divisionList = divisionResponse['result'].map(division => {
          return { item_id: division._id, item_text: division.divisionName }
        })
      }
      if (competitionResponse['responseCode'] == 200)
        this.list.comptList = competitionResponse['result']
      if (venueResponse['responseCode'] == 200)
        this.list.venueList = venueResponse['result']
      if (teamResponse['responseCode'] == 200)
        this.list.teamList = teamResponse['result']
      // if(clubResponse['responseCode'] == 200)
      //   this.list.clubList = clubResponse['result']
    })

  }

  playerListApi(): void {
    let data = {
      teamName: this.filter.team,
      status: this.filter.teamStatus,
      competitionStatus: this.filter.compStatus,
      gender: this.filter.gender,
      division: this.filter.division.length ? this.filter.division.map(item => item.item_text) : '',
      sports: this.filter.sports.length ? this.filter.sports.map(item => item.item_text) : '',
      search: this.filter.search,
      page: this.filter.currPage,
      limit: this.filter.limit,
    }
    this.service.postApi(`data/getListOfPlayer?userId=${this.userDetails._id}`, data, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.playerDet = response.result
      } else if (response.responseCode == 404) {
        this.playerDet = Object.assign({}, { docs: [] })
      }
    })
  }

  getStatus(status) {
    // console.log(status)
    if (status)
      return this.list.teamStatusList.filter(x => x.value == status)[0].name
    else
      return '- - -'
  }
  onChangeLimit() {
    this.filter.limit = Number(this.filter.limitChange)
    this.filter.currPage = 1
    this.playerListApi()
  }
  onSearch(val, event) {
    this.filter.currPage = 1
    if (val === 1) {
      if (event.keyCode == 13 || (!this.filter.search))
        this.playerListApi()
    } else
      this.playerListApi()
  }
  onPageChange(page) {
    this.filter.currPage = page
    this.playerListApi()
  }

  sendMsgModal(id, val) {
    if (val === true) {
      this.updateData = Object.assign({}, { currId: '', isAll: true, msg: '' })
      $(`#dataPlayerSendMsg`).modal({ backdrop: 'static' })
    } else {
      this.updateData = Object.assign({}, { currId: id, isAll: false, msg: '' })
      $(`#SendMsg`).modal({ backdrop: 'static' })
    }
  }
  onSendMsg() {
    let currUrl = '';
    let data = {};
    if (this.updateData.isAll) {
      currUrl = `chat/sendMessageToAllPlayers`
      data = {
        organizerId: this.userDetails._id,
        message: {
          message: this.updateData.msg,
          senderId: this.userDetails._id
        }
      }
      this.service.postApi(currUrl, data, 1).subscribe(response => {
        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage)
          $(`#dataPlayerSendMsg`).modal('hide')
        } else {
          this.service.toastrErr(response.responseMessage)
          $(`#dataPlayerSendMsg`).modal('hide')
        }
      })
    } else {
      currUrl = `chat/sendMessage`
      data = {
        playerId: this.updateData.currId,
        organizerId: this.userDetails._id,
        message: {
          message: this.updateData.msg,
          senderId: this.userDetails._id
        }
      }
      this.service.postApi(currUrl, data, 1).subscribe(response => {
        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage)
          $(`#SendMsg`).modal('hide')
        } else {
          this.service.toastrErr(response.responseMessage)
          $(`#SendMsg`).modal('hide')
        }
      })
    }
  }
  printTeam(val) {
    let data = {
      teamName: this.filter.team,
      status: this.filter.teamStatus,
      competitionStatus: this.filter.compStatus,
      gender: this.filter.gender,
      division: this.filter.division.length ? this.filter.division.map(item => item.item_text) : '',
      sports: this.filter.sports.length ? this.filter.sports.map(item => item.item_text) : '',
      search: this.filter.search,
      page: this.filter.currPage,
      limit: this.filter.limit,
    }
    this.service.postApi(`data/listOfPlayer?userId=${this.userDetails._id}`, data, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.printData = response.result
        if (val === 1) {
          setTimeout(() => {
            this.service.printFun('table_dataPlayers')
          }, 500)
        } else {
          var data = [
            {
              name: 'Name',
              team: 'Team',
              phone: 'Phone',
              email: 'Email',
              country: 'Country of Residence',
              competition: 'Competition',
              dob: 'Birthday',
              gender: 'Gender',
              status: 'Status',
              sports: 'Sports'
            }
          ];
          for (let i = 0; i < this.printData.length; i++) {
            let mNo = '- - -'
            let mVenue = '- - -'
            if (this.printData[i].teamDynamicDetail) {
              mNo = this.printData[i].mobileNumber ? this.printData[i].mobileNumber : mNo
              mVenue = this.printData[i].venue ? this.printData[i].venue : mVenue

            }
            data.push({
              name: this.printData[i].Player.firstName + this.printData[i].Player.lastName,
              team: this.printData[i].teamName || '- - -',
              phone: this.printData[i].Player.mobileNumber,
              email: this.printData[i].Player.email,
              country: this.printData[i].Player.nationality,
              competition: this.printData[i].Comp.competitionName,
              dob: this.printData[i].Player.dob,
              gender: this.printData[i].Player.gender,
              status: this.printData[i].status,
              sports: this.printData[i].Comp.sports || '- - -'
            })
            if (i + 1 == this.printData.length)
              new Angular5Csv(data, 'My Report');
          }

        }

      }
    })


  }
  /*************************************** Membership Api Functionality Starts Here **********************/


  /*********** Get Membership List ****************/
  memberList() {
    var url = `membership/selectMembership?organizerId=` + this.userDetails._id;
    this.service.getApi(url, 1).subscribe(response => {
      if (response.responseCode == 200) {
        console.log(JSON.stringify(response));
        this.memberlist = response.result;
        console.log("member list--> ", this.memberlist);
      } else if (response.responseCode == 402) {

      }
    });
  }
  /*********************** Get MembershipID ****************/
  getMembershipId(event) {
    console.log("MememberName-->  ", event.target.value);
    this.membershipname = event.target.value;
    for (var i = 0; i < this.memberlist.length; i++) {
      console.log("MememberName-->  ", this.membershipname);
      if (this.memberlist[i].membershipName == this.membershipname) {
        this.membershipId = this.memberlist[i]._id;
        this.getServiceList();
        console.log("Membership Id--> ", this.membershipId);
      }
    }
  }
  /************************** Get List Of Service of Particular Membership *****************/
  getServiceList() {
    var url = `membership/selectService?organizerId=` + this.userDetails._id + `&membershipId=` + this.membershipId;
    this.service.getApi(url, 1).subscribe(response => {
      if (response.responseCode == 200) {
        console.log(JSON.stringify(response));
        this.servicelist = response.result;
        console.log("member list--> ", this.servicelist);
      } else if (response.responseCode == 402) {

      }
    });
  }
  /************* Filter Functionality ***********/
  filterFunc(formvalue, page, form) {
    console.log("Page No:---> ", page)
    this.filters.currPage = page;

    console.log("FormValue-----> ", formvalue);
    if (form == 1) {
      this.apiDoc = {
        "page": this.filters.currPage,
        "limit": 4,
        "search": '',
        "membershipName": formvalue.membership ? formvalue.membership : '',
        "serviceName": formvalue.servicename ? formvalue.servicename : '',
        "gender": formvalue.gender ? formvalue.gender : '',
        "status": formvalue.status ? formvalue.status : '',
        "timeSlots": "[“”]"
      }
    }
    else {
      this.apiDoc = {
        "page": this.filters.currPage,
        "limit": 4,
        "search": formvalue.search,
        "membershipName": '',
        "serviceName": '',
        "gender": '',
        "status": '',
        "timeSlots": "[“”]"
      }
    }
    console.log("ApiDoc---->  ", JSON.stringify(this.apiDoc));
    this.service.postApi(`data/getServiceList?organizerId=` + this.userDetails._id, this.apiDoc, 1).subscribe(response => {
      if (response.responseCode == 200) {
        console.log(JSON.stringify(response));
        var playerDetail = response.result;
        this.playerlist = playerDetail.docs;
        this.pageLimit = playerDetail.limit;
        this.pageTotal = playerDetail.total
      } else if (response.responseCode == 402) {

      }
    });
  }
  /******************** Print & Export to CSV ***************/
  print() {
    window.print();
  }
  /***************** Send Message Functionality **********/
  openMessageModal() {
    console.log("MEssage");
    $(`#SendMsg`).modal('show');
  }
  send() {
    console.log("Message---->   ", this.message);
    var apiDoc = {
      "organizerId": this.userDetails._id,
      "message": {
        "message": this.message,
        "senderId": this.userDetails._id
      }
    }
    console.log("ApiDoc---->  ", JSON.stringify(apiDoc));
    this.service.postApi(`chat/sendMessageToAllPlayersMembership`, apiDoc, 1).subscribe(response => {
      console.log(JSON.stringify(response));
      if (response.responseCode == 200) {
        $(`#SendMsg`).modal('hide');
      } else {
        this.service.toastrErr(response.responseMessage)
        $(`#SendMsg`).modal('hide')
      }
    });

  }
  /*************** View Detail Functionality ********************/
  viewDetailFun(id) {
    console.log("Id---->> ", id);
    var url = `data/DetailOfPlayer?organizerId=` + this.userDetails._id + `&playerId=` + id;
    this.service.getApi(url, 1).subscribe(response => {
      if (response.responseCode == 200) {
        $('#viewDetail').modal('show');
        console.log("Response---> ", response);
        this.viewPlayerDetail = response.result;
        console.log("View Player Detail---->   ", JSON.stringify(this.viewPlayerDetail));
        this.playerDynamicDetail = this.viewPlayerDetail[0].Player.playerDynamicDetails;
        console.log("Dynamic Detail of Player----> ", this.playerDynamicDetail);
      } else if (response.responseCode == 402) {

      }
    });
  }
  /***************** Export To CSV **************************/
  exportToCSV() {
    var apiDoc = {
      "page": 1,
      "limit": 10,
      "search": '',
      "membershipName": '',
      "serviceName": '',
      "gender": '',
      "status": '',
      "timeSlots": "[“”]"
    }
    console.log("ApiDoc---->  ", JSON.stringify(apiDoc));
    this.service.postApi(`data/getServiceList?organizerId=` + this.userDetails._id, apiDoc, 1).subscribe(response => {
      if (response.responseCode == 200) {
        console.log(JSON.stringify(response));
        var playerDetail = response.result;
        var playerlist = playerDetail.docs;
        console.log("Player List---> ", playerlist);
        var data = [
          {
            name: 'Playername',
            membership: 'MemberShip Name',
            service: 'Service Name',
            email: 'Email',
            mobile: 'Mobile',
            country: 'Country of Residence',
            dob: 'Date Of Birth',
            gender: 'Gender',
            status: 'Status',
          }
        ];
        for (let i = 0; i < playerlist.length; i++) {
          let mNo = '- - -'
          let mVenue = '- - -'
          if (playerlist[i].teamDynamicDetail) {
            mNo = playerlist[i].mobileNumber ? playerlist[i].mobileNumber : mNo
            mVenue = playerlist[i].venue ? playerlist[i].venue : mVenue

          }
          data.push({
            name: playerlist[i].Player.firstName + playerlist[i].Player.lastName,
            membership: playerlist[i].Service.membershipName,
            service: playerlist[i].Service.serviceName,
            email: playerlist[i].Player.email,
            mobile: playerlist[i].Player.mobileNumber,
            country: playerlist[i].Player.nationality,
            dob: playerlist[i].Player.dob,
            gender: playerlist[i].Player.gender,
            status: playerlist[i].status,

          })
          if (i + 1 == playerlist.length)
            new Angular5Csv(data, 'My Player List');
        }
      } else if (response.responseCode == 402) {

      }
    });
  }

  // Functionality For Venue Section Starts Here  //

  // Get Sports List Without Pagination Api 
  getSportListFunctionality() {
    var apiDoc =
      {
        "organizerId": this.userDetails._id
      }

    this.service.postApi(`organizer/getVenueSportWithoutPagination`, apiDoc, 1).subscribe(response => {
      if (response.responseCode == 200) {
        console.log(JSON.stringify(response));

      } else if (response.responseCode == 402) {

      }
    });
  }

  // Filter Functionality of Venue  
  filterVenueFunc(data) {
    console.log("FormData---??>>>> ", JSON.stringify(data));
  }
}



