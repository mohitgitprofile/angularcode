import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../../providers/mainService.service';

@Component({
  selector: 'app-player-members-sponsor',
  templateUrl: './player-members-sponsor.component.html',
  styleUrls: ['./player-members-sponsor.component.css']
})
export class PlayerMembersSponsorComponent implements OnInit {
  memId: any;
  userDetail: any;
  pageNo:number=1;
  sponsorList: any=[];
  paginationData: any={};
  orgId: any;
  constructor(public route:ActivatedRoute,public service:MainService) { }

  ngOnInit() {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.memId = params['memId'];
      console.log("memId-->>> ",this.memId);
    })
    this.getSponsorList(this.pageNo);
  }
// List Of Sponsor Functionality 
getSponsorList(page){
  this.pageNo = page;
  var apidoc = {
    "membershipId":this.memId,
      "limit":4,
      "page":this.pageNo
    }
    
  console.log(`DATA B4 SEND-->${JSON.stringify(apidoc)}`)      
  this.service.postApi(`data/listOfSponsor`, apidoc, 1).subscribe(response => {
    if(response.responseCode == 200) {
      console.log('SERVICE LIST --> ', JSON.stringify(response));
    this.sponsorList = response.result.docs;
    this.paginationData = response.result;
    }
  })
}
}
