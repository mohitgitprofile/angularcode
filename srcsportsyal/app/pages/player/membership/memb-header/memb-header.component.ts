import { Component, OnInit, MainService, ActivatedRoute, Router   } from '../../../../index';
declare var $:any
@Component({
  selector: 'app-memb-header',
  templateUrl: './memb-header.component.html',
  styleUrls: ['./memb-header.component.css']
})
export class MembHeaderComponent implements OnInit {
  membershipDetail: any={}
  membershipId: any;
  organizerId: any;
  pageName: string;
  serviceId:any
  userDetail:any
  constructor(private service: MainService, private route: ActivatedRoute, public router: Router) { 
    
  }

  ngOnInit() {
    // this.route.params.subscribe(async params => {
    //   this.membershipId = params['compId']
    //   this.organizerId = this.userDetail._id
    //   this.serviceId= params['serId']
    //   console.log(params)
    // })
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.membershipId = params['memId'];
      console.log("memId-->>> ",this.membershipId);
      console.log("userID-->>> ",this.userDetail._id);
    })
    this.route.queryParams
      .subscribe(params => {
        console.log("params", params);
        if(params.serId){
          this.serviceId= params['serId']
        }
      });
    var url = this.router.url.split('/');
    this.pageName = url[2];    
    this.getMembership()
  }
  getMembership(){
    this.service.getApi(`membership/getAMembership?organizerId=${this.userDetail._id}&membershipId=${this.membershipId}`, 1).subscribe(response => {
      if(response.responseCode == 200) {        
        this.membershipDetail = response['result']
      }
    })
  }
  unfollowModal() {
    $("#unfollow_modal").modal(`show`);
  }
  unfollow(){    
      // this.service.getApi(`membership/unFollowMembership?playerId=${this.userDetail._id}&membershipId=${this.membershipId}`, 1).subscribe(responseList => {
      //   let Response = responseList;
      //   if (Response['responseCode'] == 200) {
      //     this.router.navigate(['player/membership'])
      //     this.service.toastrSucc(responseList.responseMessage)               
      //   }
      // })
      return new Promise((resolve, reject) => {
        this.service.getApi(`membership/unFollowMembership?playerId=${this.userDetail._id}&membershipId=${this.membershipId}`, 1).subscribe(responseList => {
          let Response = responseList;
          if (Response['responseCode'] == 200) {
            this.service.toastrSucc(responseList.responseMessage)
            $("#unfollow_modal").modal(`hide`);
            this.router.navigate(['player/membership'])
            resolve(true)
          }
        })
      })

  }
}
