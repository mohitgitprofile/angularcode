import { Component, OnInit, MainService, ActivatedRoute, Router } from '../../../index';
import { GlobalConstant } from '../../../global/global.constant';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  memBody:any={}
  userDetails: any = {};
  bodyData: any = {};
  list: any = { sponsorList: {}, competitionList: {}, memberList: {}, limitChangeArr: GlobalConstant.limitChangeArr, limit: GlobalConstant.paginationLimit };
  limitChange: any = GlobalConstant.limitChangeArr[0];
  tab: any;
  followStatus:any
  searchVal:any=''
  constructor(private service: MainService, private route: ActivatedRoute, public router: Router) {
   
   }

  ngOnInit() {
    this.tab = "competition"
    
    this.route.params.subscribe(async params => {
      this.followStatus = params.id
    })
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.bodyData = {
      'userId': this.userDetails._id,
      'filterFields': {
        'followStatus': this.followStatus,
        'search': ''
      },
      'page': 1,
      'limit': this.list.limit
    }

    this.memBody={
      "playerId":this.userDetails._id,
      "followStatus":this.followStatus ,  
        "search":'',
        "page":1,
        "limit":this.list.limit      
    }
    this.getCompetitionApi();
    this.getMembershipApi()
  }

  // ************ get competition list Api **************************************************************************************** //
  getCompetitionApi() {
    return new Promise((resolve, reject) => {
      this.service.postApi('player/competition/filterCompetitions', this.bodyData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.list.competitionList = Response[`result`]
          resolve(true)
        }
      })
    })
  }
  // ************ End get competition list Api **************************************************************************************** //
   // ************ get membership list Api **************************************************************************************** //
   getMembershipApi() {
    return new Promise((resolve, reject) => {
      this.service.postApi('membership/getMembership', this.memBody, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.list.memberList = Response[`result`]
          console.log(`MEMBERSHIP LIST--->${JSON.stringify(this.list.memberList)}`)
          resolve(true)
        }
      })
    })
  }
  // ************ End get membership list Api **************************************************************************************** //

  // ************ Unfollow competition Api **************************************************************************************** //
  unfollow(data) {
    let unfollowData = {
      "userId": this.userDetails._id,
      "competitionId": data._id
    }
    return new Promise((resolve, reject) => {
      this.service.postApi('player/competition/unFollowCompetition', unfollowData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 204) {
          this.service.toastrSucc(responseList.responseMessage)
          this.getCompetitionApi();
          resolve(true)
        }
      })
    })
  }
  // ************ End unfollow competition Api **************************************************************************************** //
   // ************ Unfollow competition Api **************************************************************************************** //
   unfollowm(data) {
    return new Promise((resolve, reject) => {
      this.service.getApi(`membership/unFollowMembership?playerId=${this.userDetails._id}&membershipId=${data._id}`, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.service.toastrSucc(responseList.responseMessage)
          this.getMembershipApi();
          resolve(true)
        }
      })
    })
  }
  // ************ End unfollow competition Api **************************************************************************************** //

  // ************ End competition detail **************************************************************************************** //
  competitionDetail(data) {
    var compId = data._id
    var orgId = data.organizer._id
    if (data.playerFollow == 'APPROVED') {
      this.router.navigate(['/player/summary', compId, orgId])
    }
  }
  // ************ End competition detail **************************************************************************************** //

  changePage(data) {
    if(this.tab == "competition"){
    this.bodyData.page = data
    this.bodyData.limit = this.list.limit
    this.getCompetitionApi();}
    else if(this.tab == "membership"){
      this.memBody.page = data
      this.memBody.limit = this.list.limit
      this.getMembershipApi();
    }
  }

  changeLimit() {
    if(this.tab == "competition"){
          this.bodyData.limit = Math.floor(this.limitChange)
          this.bodyData.page = 1
          this.getCompetitionApi();
        }
      else if(this.tab == "membership"){
        this.memBody.limit = Math.floor(this.limitChange)
        this.memBody.page = 1
        this.getMembershipApi();
      }
    
  }

  onSearch(val, event) {
    
    this.memBody.page = 1
    this.bodyData.page = 1
    if(this.tab == "competition"){
      if(val === 1) {
        if(!this.bodyData.filterFields.search || event.keyCode == 13)
        console.log(`competition ${this.bodyData.filterFields.search} val ${val} event ${event}`)
          this.getCompetitionApi()
      } else if(val === 2)   
      console.log(`competition ${this.bodyData.filterFields.search} val ${val} event ${event}`)   
        this.getCompetitionApi()
    }
  else if(this.tab == "membership"){
    
    if(val === 1) {      
      if(!this.memBody.search || event.keyCode == 13)    
        this.getMembershipApi()
    } else if(val === 2)    
      this.getMembershipApi()
  }
    
  }
  tabChange(tab){
    this.tab = tab
    if(tab == "competition"){
      this.bodyData = {
        'userId': this.userDetails._id,
        'filterFields': {
          'followStatus': this.followStatus,
        },
        'page': 1,
        'limit': this.list.limit
      }
      this.getCompetitionApi()
    }
    else if(tab == "membership"){
      this.memBody={
        "playerId":this.userDetails._id,
        "followStatus":this.followStatus ,   
          "page":1,
          "limit":this.list.limit      
      }
      this.getMembershipApi()
    }
    else {

    }
  }
}