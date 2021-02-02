import { Component, OnInit, MainService } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  dropdownSettings: any = GlobalConstant.multidropDownSettings
  userDetails: any = {};
  list: any = { periodList: [], divisionList: [], sportsList: [], statusList: GlobalConstant.statusArr, limitChangeArr: GlobalConstant.limitChangeArr };
  competitionData: any = {docs: []};
  filter: any = { sports: [], period: "", division: [], status: "", search: "", currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };

  constructor(private service: MainService) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.multGetApiCall();
    this.getCompetitionApi();
  }
  getCompetitionApi() {
    let compData  = {
      userId: this.userDetails._id,
      page: this.filter.currPage,
      limit: this.filter.limit,
      filterFields: {
        "sports": this.filter.sports.length ? this.filter.sports.map(item => item.item_text) : '',
        "period": this.filter.period,
        "division": this.filter.division.length ? this.filter.division.map(item => item.item_text) : '',
        "status": this.filter.status,
        "search": this.filter.search // Make it from backend
      }
    }
    this.service.postApi(`organizer/competition/filterCompetition`, compData, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.competitionData = response.result;
      }
    })

  }

  multGetApiCall() {
    console.log('multiple get api ')
      this.service.multipleGetApi(`organizer/selectSport?userId=${this.userDetails._id}`, `organizer/selectPeriod?userId=${this.userDetails._id}`, `organizer/selectDivision?userId=${this.userDetails._id}`).subscribe(responseList => {
        // console.log(JSON.stringify(responseList))
        let [ sportResponse, periodResponse, divisionResponse] = responseList
        if(sportResponse['responseCode'] == 200) {
          this.list.sportsList = sportResponse['result'].map(item => {
            return { item_id: item._id, item_text: item.sportName }
          })
        }
        if(periodResponse['responseCode'] == 200)
          this.list.periodList = periodResponse['result']
        if(divisionResponse['responseCode'] == 200) {
          this.list.divisionList = divisionResponse['result'].map(division => {
            return { item_id: division._id, item_text: division.divisionName }
          })
        }
      })

  }
  // ************ End Get Division, Period Api ********* //



  onPageChange(pageNo) {
    this.filter.currPage = pageNo
    // this.filter.limitChange =
    this.getCompetitionApi()
  }
  onChangeLimit() {
    this.filter.limit = Number(this.filter.limitChange)
    this.filter.currPage = 1
    this.getCompetitionApi()
  }

  getStatus(status) {
    return this.list.statusList.filter(x => x.value == status)[0].name
  }

  onSearch(val, event) {
    this.filter.currPage = 1
    if(val === 1) {
      if( (event.keyCode == 13) || (!this.filter.search) )
        this.getCompetitionApi()
    } else if(val === 2)
      this.getCompetitionApi()
  }



}
