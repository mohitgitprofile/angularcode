import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input ,Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-report-swimming',
  templateUrl: './match-report-swimming.component.html',
  styleUrls: ['./match-report-swimming.component.css']
})
export class MatchReportSwimmingComponent implements OnInit {

  @Output() MessageEvent = new EventEmitter<string>()
  @Input() gameData: any;
  paramData: any;
  swimmingGameDetailsData: any;
  teamOneLane: any;
  teamOnePlace: any;
  teamOneTime: any;
  teamTwoLane: any;
  teamTwoPlace: any;
  teamTwoTime: any;
  currentUrl: string;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getParamData();
    this.swimmingEditGame();
    setTimeout(() => {
      console.log('gameData swimming ===>>>', this.gameData);
      this.service.spinnerHide();
    }, 500);
  }

  //Send current Url
  send(){
    this.currentUrl = window.location.href;
  }

  // Swimming Edit  game details 
  swimmingEditGame() {
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type:1,
    };
    this.service.postApi('game/swimmingEditGame', apireq , 0).subscribe(success => {
      
      if (success.responseCode === 200) {
        console.log("success of Swimming  Edit ======>",success);
        this.swimmingGameDetails()
        // this.service.toastrSucc(success.responseMessage);
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }


//Swimming Game Details 
  swimmingGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    this.service.postApi('game/swimmingGameDetails',apireq,0).subscribe(success => {
      
      if (success.responseCode === 200) {
        this.swimmingGameDetailsData = success;
        this.teamOneLane = this.swimmingGameDetailsData.teamDeatailsOne[0].scoreData[0].lane,
        this.teamOnePlace =  this.swimmingGameDetailsData.teamDeatailsOne[0].scoreData[0].place,
        this.teamOneTime = this.swimmingGameDetailsData.teamDeatailsOne[0].scoreData[0].time,

        this.teamTwoLane = this.swimmingGameDetailsData.teamDeatailsTwo[0].scoreData[0].lane,
        this.teamTwoPlace =  this.swimmingGameDetailsData.teamDeatailsTwo[0].scoreData[0].place,
        this.teamTwoTime = this.swimmingGameDetailsData.teamDeatailsTwo[0].scoreData[0].time,
        console.log("success of Swimming Details ======>",this.swimmingGameDetailsData);
        this.service.toastrSucc(success.responseMessage);
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }

//On Cancel the edit score
  onCancel(){
     this.swimmingEditGame();
  }

// update score
  updatedTeamScore(){
    this.service.spinnerShow();
    let apireq = {
      "data1":{    
                "docId": this.swimmingGameDetailsData.teamDeatailsOne[0]._id,
                "teamId": this.swimmingGameDetailsData.teamDeatailsOne[0].teamId,
                "scoreData": [
                    {
                        "_id": this.swimmingGameDetailsData.teamDeatailsOne[0].scoreData[0]._id,
                        "lane": this.teamOneLane,
                        "time":"",
                        "place":this.teamOnePlace
                    }
                ]
      },
      "data2":{

                 "docId": this.swimmingGameDetailsData.teamDeatailsTwo[0]._id,
                 "teamId": this.swimmingGameDetailsData.teamDeatailsTwo[0].teamId,
                      "scoreData": [
                          {
                            "_id": this.swimmingGameDetailsData.teamDeatailsTwo[0].scoreData[0]._id,
                            "lane": this.teamTwoLane,
                            "time":"",
                            "place": this.teamTwoPlace
                          }
                
                      ]
      }
    }

    this.service.postApi('game/updateSwimmingGameTeamWise',apireq,1).subscribe( success =>{
      if( success.responseCode == 200){
        this.service.spinnerHide();
        this.swimmingEditGame();
      }
    },error =>{
      this.service.spinnerHide();
      this.service.toastrErr(error);
    })
  }



  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
      console.log('this.paramData swimming report ===>>>', this.paramData);
    });
  }

}
