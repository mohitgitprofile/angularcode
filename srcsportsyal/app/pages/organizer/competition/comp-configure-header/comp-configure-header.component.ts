import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, MainService, Router } from '../../../../index';

@Component({
  selector: 'app-comp-configure-header',
  templateUrl: './comp-configure-header.component.html',
  styleUrls: ['./comp-configure-header.component.css']
})
export class CompConfigureHeaderComponent implements OnInit {

  userDetails: any;
  competitionDetail: any = {};
  competitionId: any;
  currUrl: string = '';
  constructor(private route: ActivatedRoute,private service: MainService,private router: Router) { }

  ngOnInit() {
    // console.log('curr header configure url => '+ this.router.url)

    this.currUrl = this.router.url.split('/').splice(1,2).join('/')
    this.route.params.subscribe( async params => {
      console.log("params--->>",params);
     this.competitionId = params['id']
    })
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getCompetitionDetailApi ()
  }

   // **************** Get Competition Detail Api *********** //
   getCompetitionDetailApi() {
      let compData = {
      userId: this.userDetails._id,
      competitionId: this.competitionId
    }

    this.service.postApi(`organizer/competition/getACompetition`, compData, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.competitionDetail = response.result
      }
    })
  }
  // **************** End Get Competition Detail Api *********** //

  publishFun () {
    //************** Configure competition Api Integration *************//
    let configureData = {
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
    }
    this.service.postApi(`organizer/competition/publishCompetition`,configureData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.competitionDetail = response.result
        this.service.toastrSucc(response.responseMessage)
      }
    })
    //************** End *************//
  }

  unpublishFun () {
    //************** Configure competition Api Integration *************//
    let configureData = {
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
    }
    this.service.postApi(`organizer/competition/unPublishCompetition`,configureData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.competitionDetail = response.result
        this.service.toastrSucc(response.responseMessage)
      }
    })
    //************** End *************//
  }



}
