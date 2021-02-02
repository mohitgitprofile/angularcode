import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-report-voley-ball',
  templateUrl: './match-report-voley-ball.component.html',
  styleUrls: ['./match-report-voley-ball.component.css']
})
export class MatchReportVoleyBallComponent implements OnInit {
  @Output()  MessageEvent = new EventEmitter<string>();
  @Input() gameData: any;
  paramData: any;
  voleyBallGameDetailsData: any;
  teamOneScore: any;
  teamTwoScore: any;
  finalScoreOne: any;
  finalScoreTwo: any;
  mvpOfTeamOne: any;
  mvpOfTeamTwo: any;
  currentUrl: string;
  observation: any;
  observationMessage: string;
  messageFromObservation: any;
  _id: any;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) { 
    this.currentUrl = window.location.href
  }

  ngOnInit() {
    console.log("console of VOLEY BALL COMPONENT");
    this.getParamData();
    this.voleyBallEditGame();
    
    setInterval(()=>{
      this.observation =  JSON.parse(localStorage.getItem('observation'));
    },1000)

    setTimeout(() => {
      console.log('gameData voley ball ===>>>', this.gameData);
      this.service.spinnerHide();
      this.getObservation();
      // this.service.toastrSucc(this.gameData.responseCode);
    }, 500);
  }
 

  //Get Observation
  getObservation(){
    this.service.spinnerShow();
    let apireq = {
      "gameId":this.voleyBallGameDetailsData.result.teamDeatailsOne[0].gameId,
    }

    this.service.postApi('game/getObservationGame',apireq,1).subscribe(success=>{
      if(success.responseCode == 200){
        this.messageFromObservation = success.result.observation;
         this.observationMessage = success.result.observation;
        //  this._id = success.result.docs[0]._id;
         console.log("Observation Data=-=-=-=-=-=->",this.observationMessage);
        this.service.spinnerHide();
        this.service.toastrSucc(success.responseMessage);
      }
    },error=>{
      this.service.spinnerHide();
      this.service.toastrErr(error);
    })
  }

  //Add Observation or Upload Observation 
  addObservation(){
    this.service.spinnerShow();
    let apireq = {
      "gameId": this.voleyBallGameDetailsData.result.teamDeatailsOne[0].gameId,
      // "teamId":this.voleyBallGameDetailsData.result.teamDeatailsOne[0].teamId,
      "observation":this.observationMessage
    }
    this.service.postApi('game/voleyballGameObservationGame,',apireq,1).subscribe(success=>{
      if( success.responseCode == 200 ){
        this.service.spinnerHide();
        // this._id = success.result3._id;
        this.getObservation();
        this.service.toastrSucc(success.responseMessage);
      }
    },error=>{
      this.service.spinnerHide();
      this.service.toastrErr(error);
    })
  } 


  //Update Observation
  updateObservation(){
    this.service.spinnerShow()
    let apireq = {
          "gameId": this.voleyBallGameDetailsData.result.teamDeatailsOne[0].gameId,
          "observation":this.observationMessage
    }
    this.service.postApi('game/updateObservationsGame ',apireq,1).subscribe(success=>{
      if( success.responseCode == 200){
        this.service.spinnerHide();
        this.service.toastrSucc(success.responseMessage);
        this.getObservation();
      }
    },error=>{
      this.service.spinnerHide();
      this.service.toastrErr(error);      
    })
  }


  // Volley Ball Edit Game Api integration
  voleyBallEditGame(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type: 1
    };
    this.service.postApi('game/voleyballEditGame', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        console.log("Volley Ball  Edit Game ====>",success);
        this.voleyBallGameDetails()
        this.service.toastrSucc(success.responseMessage);
        
      } else {
        this.service.toastrErr(success.responseMessage);
        console.log("error======>");
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      console.log("error of Volley Ball double edit game details======>");
    });
  }


  // Volley ball Game Details Api inetgration 
  voleyBallGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    // console.log("apireq======>",apireq);
    this.service.postApi('game/voleyballGameDetails', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        this.voleyBallGameDetailsData = success;
        this.teamOneScore =  this.voleyBallGameDetailsData.result.teamDeatailsOne[0].scoreData;
        this.finalScoreOne = this.voleyBallGameDetailsData.result.teamDeatailsOne[0].finalScore;
        this.teamTwoScore = this.voleyBallGameDetailsData.result.teamDeatailsTwo[0].scoreData;
        this.finalScoreTwo = this.voleyBallGameDetailsData.result.teamDeatailsTwo[0].finalScore;
        this.mvpOfTeamOne = this.voleyBallGameDetailsData.result.teamDeatailsOne[0].mvp;
        this.mvpOfTeamTwo = this.voleyBallGameDetailsData.result.teamDeatailsTwo[0].mvp;
        console.log("Volley Ball Game Details====>",this.voleyBallGameDetailsData );
        this.service.toastrSucc(success.responseMessage);
        
      } else {
        // this.service.toastrErr(success.responseMessage);
        console.log("error======>");
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      console.log("error of badminton game details");
    });
  }

  //For tracking and updating the score
  trackByIndex(index: any , obj : any){

  }

// Update Score Data Team Wise
  updatedScore(){
    this.service.spinnerShow();
    let apireq = {
      "data1": {
        "finalScore": this.finalScoreOne ,
        "docId": this.voleyBallGameDetailsData.result.teamDeatailsOne[0]._id,
        "teamId": this.voleyBallGameDetailsData.result.teamDeatailsOne[0].teamId,
        "scoreData": this.voleyBallGameDetailsData.result.teamDeatailsOne[0].scoreData,
        "mvp": this.mvpOfTeamOne 
      },
      "data2":{
        "finalScore": this.finalScoreTwo ,
        "docId": this.voleyBallGameDetailsData.result.teamDeatailsTwo[0]._id,
        "teamId": this.voleyBallGameDetailsData.result.teamDeatailsTwo[0].teamId,
        "scoreData": this.voleyBallGameDetailsData.result.teamDeatailsTwo[0].scoreData,
        "mvp": this.mvpOfTeamTwo 
      }
    }
    // console.log("apiReq=-=-=-=-=-=-=-=-=-=->",apireq);
    this.service.postApi('game/updateVoleyBallTeamWise',apireq,1).subscribe(success=>{
      if(success.responseCode === 200){
        this.service.spinnerHide();
        this.voleyBallEditGame();
        this.service.toastrSucc(success.responseMessage);
      }
    },error=>{
      this.service.spinnerHide();
      this.service.toastrErr(error);
    })
  }

//Update score Data Player Wise
  updatedScoreDataPlayerWise(data){
    let apireq 
    if( data == 'teamOne'){
      apireq={
        "array": this.voleyBallGameDetailsData.result.teamOne
      }
    }else if(data == 'teamTwo'){
      apireq ={
        "array": this.voleyBallGameDetailsData.result.teamTwo
      }
    }
    this.service.postApi('game/updateVoleyBallPlayerWise',apireq,1).subscribe(success=>{
      if(success.responseCode == 200){
        this.service.spinnerHide();
        this.voleyBallEditGame();
        this.service.toastrSucc(success.responseMessage);
      }
    },error=>{
      this.service.spinnerHide();
      this.service.toastrErr(error);
    })
  }

//Send url For Share Match report
send(){
 this.MessageEvent.emit(this.currentUrl);
}

//On Cancel the score updation process
onCancel(){
  this.voleyBallEditGame();
}

  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
      console.log('this.paramData voley ball match report ===>>>', this.paramData);
    });
  }

}
