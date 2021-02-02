import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../providers/mainService.service';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-sponsor',
  templateUrl: './player-sponsor.component.html',
  styleUrls: ['./player-sponsor.component.css']
})
export class PlayerSponsorComponent implements OnInit {
  userDetail: any;
  compId: any;
  pageNo: number = 1;
  sponsorList: any=[];
  paginationData: any={};

  constructor(public service: MainService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.compId = params['compId'];
      console.log("compId-->>> ",this.compId);
    })
    this.getSponsorList(this.pageNo);
  }

  // List Of Sponsor Functionality 
getSponsorList(page){
  this.pageNo = page;
  var apidoc = {
    "competitionId":this.compId,
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
