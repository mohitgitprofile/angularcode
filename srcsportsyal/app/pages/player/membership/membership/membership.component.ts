import { Component, OnInit, MainService, Router  } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $:any
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  data:any={}
  ClubName:any=[]
  membershipList:any=[]
  userDetail:any
  pagination:any={itemPP:'', total:'',currPage:''} 
  list: any = { sponsorList: {}, competitionList: {}, limitChangeArr: GlobalConstant.limitChangeArr, limit: GlobalConstant.paginationLimit, statusList: GlobalConstant.statusArr };
  filter: any = { limit: GlobalConstant.paginationLimit, productType: '', currPage: 1 }
  financialData: { "userId": string; "page": any; "limit": any; };
  page: any=1  
financialResult:any=[]
  financiaList: any=[]
  
  currency:any
  financials: any={};
  pageLimit: any;
  pageTotal: any;
  constructor(private service: MainService, private router:Router) { 
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    
  }
   
  ngOnInit() {
    this.currency  = this.service.currencyLogo
    this.data ={
      playerId:this.userDetail._id,      
       page:this.filter.currPage,
       limit:5,
       followStatus:'',
       status:'',
       clubName:""      
    }
    this.getMembershipList()
    this.getClub()
    
  }
  getClub(){
    this.service.getApi(`membership/getClubList`, 1).subscribe(response => {
      if(response.responseCode == 200) {        
        this.ClubName = response['result']
      }
    })
  }
  getMembershipList(){   
    // for (let val in this.data) 
    // {
    //     if (this.data[val] == '') 
    //     {
    //         delete this.data[val]
    //     }
    // }
  
    this.service.postApi(`membership/getMembership`, this.data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.membershipList = response.result.docs
        this.pagination.itemPP = response.result.limit
        this.pagination.currPage = response.result.page
        this.pagination.total = response.result.total
      }
    })
  }
  onSearch(val, event) {
    this.data.page = 1
    if (val === 1) {  
      if (!this.data.search || event.keyCode == 13)  {
        this.getMembershipList()        
      }            
    } else if (val === 2)   { 
      this.getMembershipList()
    }
  }

  // ************ Unfollow competition Api **************************************************************************************** //
  unfollow(data) {
    return new Promise((resolve, reject) => {
      this.service.getApi(`membership/unFollowMembership?playerId=${this.userDetail._id}&membershipId=${data._id}`, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.service.toastrSucc(responseList.responseMessage)
          this.getMembershipList();
          resolve(true)
        }
      })
    })
  }
  // ************ End unfollow competition Api **************************************************************************************** //

  // ************ Follow competition Api **************************************************************************************** //
  follow(data) {
    let unfollowData = {
      "playerId": this.userDetail._id,
      "membershipId": data._id
    }
    return new Promise((resolve, reject) => {
      this.service.postApi('membership/followMembership', unfollowData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.service.toastrSucc(responseList.responseMessage)
          this.getMembershipList();
          resolve(true)
        }
      })
    })
  }
  // ************ End follow competition Api **************************************************************************************** //

  applyFilter() {
    this.data.page = 1    
    this.getMembershipList();
  }
  membershipDetail(data){
    var compId = data._id
    var orgId = data.organizerId[0]._id
    if (data.playerFollowStatus.followStatus == 'APPROVED') {
      this.router.navigate(['/player/membershipDetail', compId, orgId])
    }
  }
  
  onPageChange(page) {
    this.filter.currPage = page
    this.data.page = page
    this.getMembershipList()
  }
  financial(page){
    this.financiaList =[];
    this.page = page
    this.financialData = {
      "userId": this.userDetail._id,
      "page": this.page,
      "limit": 2,
      }
    
        //********** Get Financial/Transaction List Api Integration ***********//
        this.service.postApi(`membership/getUserTransaction`, this.financialData, 1).subscribe(response => {
          if(response.responseCode == 200) {
            this.financials= response.result;
            this.pageLimit = this.financials.limit;
            this.pageTotal = this.financials.total
            this.financialResult = this.financials.docs
            for (let i = 0; i < this.financialResult.length; i++) {
              this.financiaList.push(this.financialResult[i]);
              }         
              $('#sell').modal('show');
              console.log(`financiaList-->${JSON.stringify(this.financiaList)}`)
          }
        })    
        //************** End *************// 
  }

 

  
}
