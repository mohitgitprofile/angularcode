import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-report-observation',
  templateUrl: './match-report-observation.component.html',
  styleUrls: ['./match-report-observation.component.css']
})
export class MatchReportObservationComponent implements OnInit {

  @Input() gameData: any;
  paramData: any;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getParamsData();
    setTimeout(() => {
      console.log('gameData cricket ===>>>', this.gameData);
      this.service.spinnerHide();
      // this.service.toastrSucc(this.gameData.responseCode);
    }, 500);
  }
   
  //Observation
  // observation(){
  //   this.service.spinnerShow()
  //   let apireq = {

  //   }
  //   console.log("apiRequest=-=-=--=-=-->",apireq);
  //   this.service.postApi('',apireq,1).subscribe(success=>{
  //     if(success.responseCode == 200){
  //       this.service.spinnerHide();
  //       this.service.toastrSucc(success.responseMessage);
  //     }
  //   },error=>{
  //     this.service.spinnerHide();
  //     this.service.toastrErr(error);
  //   })
  // }

  getParamsData() {
    this.activatedRoute.params.subscribe(params => {
      this.paramData = params;
      console.log('param data observation ===>>>', this.paramData);
    });
  }

}
