import { Component, OnInit, MainService, Angular5Csv } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;
@Component({
  selector: 'app-data-teams',
  templateUrl: './data-teams.component.html',
  styleUrls: ['./data-teams.component.css']
})
export class DataTeamsComponent implements OnInit {
  userDetails: any = {};
  list: any = { sportsList: [], periodList: [], divisionList: [], statusList: GlobalConstant.statusArr, limitChangeArr: GlobalConstant.limitChangeArr, comptList: [], venueList: [], teamStatusList: GlobalConstant.teamStatusArr }
  filter: any = { sports: [], period: '', division: [], status: '', search: '', currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit, competitionStatus: '', competitionName: '', venue: '' };
  dropdownSettings: any = GlobalConstant.multidropDownSettings
  teamsDet: any = {docs: []};
  updateData: any = { currId: '', msg: '' }
  printData: any = [];
  teamDetailData: any;


  constructor(private service: MainService) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.multGetApiCall()
    this.teamsListApi()
  }

  multGetApiCall() {
      this.service.multipleGetApi(`organizer/selectSport?userId=${this.userDetails._id}`, `organizer/selectPeriod?userId=${this.userDetails._id}`, `organizer/selectDivision?userId=${this.userDetails._id}`, `data/selectCompition?userId=${this.userDetails._id}`, `data/selectVenue?userId=${this.userDetails._id}`).subscribe(responseList => {
        // console.log(JSON.stringify(responseList))
        let [ sportResponse, periodResponse, divisionResponse, competitionResponse, venueResponse ] = responseList
        if (sportResponse['responseCode'] === 200) {
          this.list.sportsList = sportResponse['result'].map(item => {
            return { item_id: item._id, item_text: item.sportName };
          });
        }
        if (periodResponse['responseCode'] === 200) {
          this.list.periodList = periodResponse['result'];
        }
        if (divisionResponse['responseCode'] === 200) {
          this.list.divisionList = divisionResponse['result'].map(division => {
            return { item_id: division._id, item_text: division.divisionName }
          });
        }
        if (competitionResponse['responseCode'] === 200) {
          this.list.comptList = competitionResponse['result'];
        }
        if (venueResponse['responseCode'] === 200) {
          this.list.venueList = venueResponse['result'];
        }
      });

  }
  teamsListApi() {


    let data = {
      page: this.filter.currPage,
      limit: this.filter.limit,
      period: this.filter.period,
      competitionStatus: this.filter.competitionStatus,
      venue: this.filter.venue,
      competitionName: this.filter.competitionName,
      division: this.filter.division.length ? this.filter.division.map(item => item.item_text) : '',
      search: this.filter.search,
      status: this.filter.status,
      sports: this.filter.sports.length ? this.filter.sports.map(item => item.item_text) : ''
    };
    // console.log(JSON.stringify(data))
    this.service.postApi(`data/filterTeam?userId=${this.userDetails._id}`, data, 1).subscribe(response => {
      if (response.responseCode === 200) {
        this.teamsDet = response.result;
      } else if (response.responseCode === 404) {
        this.teamsDet = Object.assign({}, {docs: []});
      }
    });
  }
  onSearch(val, event) {
    this.filter.currPage = 1
    if(val === 1) {
      if(event.keyCode == 13 || (!this.filter.search))
        this.teamsListApi()
    } else if(val === 2)
      this.teamsListApi()

  }
  getStatus(status) {
    if(status) {
      if(this.list.teamStatusList.filter(x => x.value == status).length) {
        return this.list.teamStatusList.filter(x => x.value == status)[0].name
      } else {
        return '- - -'
      }
    } else {
      return '- - -'
    }



  }
  onChangeLimit() {
    this.filter.limit = Number(this.filter.limitChange)
    this.filter.currPage = 1
    this.teamsListApi()
  }

  printTeam(val) {
    let data = {
      period: this.filter.period,
      competitionStatus: this.filter.competitionStatus,
      venue: this.filter.venue,
      competitionName: this.filter.competitionName,
      division: this.filter.division.length ? this.filter.division.map(item => item.item_text) : '',
      search: this.filter.search,
      status: this.filter.status,
      sports: this.filter.sports.length ? this.filter.sports.map(item => item.item_text) : ''
    }
    this.service.postApi(`data/listOfTeam?userId=${this.userDetails._id}`, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.printData = response.result
        if(val === 1) {
          setTimeout(() => {
            this.service.printFun('table_dataTeams')
          }, 500)
        } else {
          var data = [
            {
              name: 'Name',
              date: 'Signup date',
              phone: 'Phone',
              email: 'Email',
              venue: 'Venue',
              competition: 'Competition',
              status: 'Status',
              sports: 'Sports'
            }
          ];
          for(let i=0; i < this.printData.length; i++) {
            let mNo = '- - -'
            let mVenue = '- - -'
            if(this.printData[i].teamDynamicDetail) {
              mNo = this.printData[i].mobileNumber ? this.printData[i].mobileNumber : mNo
              mVenue = this.printData[i].venue ? this.printData[i].venue : mVenue

            }
            data.push({
              name: this.printData[i].teamName,
              date: this.dateFormat(this.printData[i].createdAt),
              phone: mNo,
              email: this.printData[i].email,
              venue: mVenue,
              competition: this.printData[i].Comp.competitionName,
              status: this.printData[i].status,
              sports: this.printData[i].sports || '- - -'
            })
            if(i+1 == this.printData.length)
              new Angular5Csv(data, 'My Report');
          }

        }

      }
    })


  }
  dateFormat(date) {
    let d = new Date(date)
    return (d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear())
  }

sendMsgModal(id, val) {
  if(val === true) {
    this.updateData = Object.assign({}, {currId: '', isAll: true, msg: ''})
  } else {
    this.updateData = Object.assign({}, {currId: id, isAll: false, msg: ''})
  }

  $(`#dataTeamSendMsg`).modal({backdrop: 'static'})
}
onSendMsg() {
  //console.log(this.updateData.currId)
  let currUrl = '';
  let data = {};
  if(!this.updateData.isAll) {
    currUrl = `chat/sendMsgToAllPlayersOfATeam`
    data = {
      teamId: this.updateData.currId,
      organizerId: this.userDetails._id,
      message: {
        message: this.updateData.msg,
        senderId: this.userDetails._id
      }
    }
  } else {
    currUrl = 'chat/sendMessageToAllTeam'
    data = {
      organizerId: this.userDetails._id,
      message: {
        message: this.updateData.msg,
        senderId: this.userDetails._id
      }
    }
  }
  this.service.postApi(currUrl, data, 1).subscribe(response => {
    if(response.responseCode == 200) {
      this.service.toastrSucc(response.responseMessage)
      $(`#dataTeamSendMsg`).modal('hide')
    } else {
      this.service.toastrErr(response.responseMessage)
      $(`#dataTeamSendMsg`).modal('hide')
    }
  })
}
  onPageChange(page) {
    this.filter.currPage = page
    this.teamsListApi()
  }
// Team Detail Modal
teamData(teamId){
  console.log("Team ID---->>>> ",teamId);
  this.service.getApi(`data/getDetailOfTeam?userId=${this.userDetails._id}&teamId=${teamId}`,1).subscribe(response => {
    if(response.responseCode == 200) {
      this.teamDetailData = response.result[0];
      $('#teamDetail').modal({backdrop:'static'});
      console.log("Response---->>> ",JSON.stringify(response))
    } else if(response.responseCode == 404) {

    }
  })

}
}
