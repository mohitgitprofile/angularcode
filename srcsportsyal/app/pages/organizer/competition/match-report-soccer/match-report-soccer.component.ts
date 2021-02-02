import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input ,EventEmitter , Output} from '@angular/core';
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'app-match-report-soccer',
  templateUrl: './match-report-soccer.component.html',
  styleUrls: ['./match-report-soccer.component.css']
})
export class MatchReportSoccerComponent implements OnInit {

  @Output() MessageEvent = new EventEmitter<string>();
  @Input() gameData: any;
  paramData: any;
  soccerGameDetailsData: any;
  currentUrl: string;
  observation: any;
  observationMessage: string;
  messageFromObservation: any;
  // _id: any;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) { 
    this.currentUrl = window.location.href;
  }

  ngOnInit() {
    this.getParamData();
    this.soccerEditGame()
    
    setInterval(()=>{
      this.observation =  JSON.parse(localStorage.getItem('observation'));
    },1000)

    setTimeout(() => {
      console.log('gameData  From soccer page soccer ===>>>', this.gameData);
      this.service.spinnerHide();
      this.getObservation();
      // this.service.toastrSucc(this.gameData.responseCode);
    }, 500);
  }


  //Get Observation
  getObservation(){
    this.service.spinnerShow();
    let apireq = {
      "gameId":this.soccerGameDetailsData.result.teamDeatailsOne[0].gameId,
    }

    this.service.postApi('game/getObservationGame',apireq,1).subscribe(success=>{
      if(success.responseCode == 200){
         this.messageFromObservation = success.result.observation
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
      "gameId": this.soccerGameDetailsData.result.teamDeatailsOne[0].gameId,
      // "teamId":this.soccerGameDetailsData.result.teamDeatailsOne[0].teamId,
      "observation":this.observationMessage
    }
    this.service.postApi('game/soccerGameObservationGame',apireq,1).subscribe(success=>{
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
          "gameId": this.soccerGameDetailsData.result.teamDeatailsOne[0].gameId,
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


   // Soccer game details by suraj
   soccerEditGame() {
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type:1,
    };
    // console.log("apireq======>",apireq);
    this.service.postApi('game/soccerEditGame', apireq , 0).subscribe(success => {
      
      if (success.responseCode === 200) {
        this.soccerGameDetails()
        this.service.toastrSucc(success.responseMessage);
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }

 sendUrl(){
   this.MessageEvent.emit(this.currentUrl)
 }

  soccerGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    this.service.postApi('game/soccerGameDetails', apireq , 0).subscribe(success => {
      
      if (success.responseCode === 200) {
        this.soccerGameDetailsData = success;
        this.service.toastrSucc(success.responseMessage);
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }

  //update Team wise Game details
  updatedScore(){
   this.service.spinnerShow();
    let apireq ={
      "data1":{
        "finalScore": this.soccerGameDetailsData.result.teamDeatailsOne[0].finalScore ,
        "docId": this.soccerGameDetailsData.result.teamDeatailsOne[0]._id,
        "teamId": this.soccerGameDetailsData.result.teamDeatailsOne[0].teamId,
        "mvp": this.soccerGameDetailsData.result.teamDeatailsOne[0].mvp,
        "teamFoul":this.soccerGameDetailsData.result.teamDeatailsOne[0].teamFoul,
        "offSide":this.soccerGameDetailsData.result.teamDeatailsOne[0].offSide,
        "cornerkicks":this.soccerGameDetailsData.result.teamDeatailsOne[0].cornerkicks,
        "goalKeeperSaves":this.soccerGameDetailsData.result.teamDeatailsOne[0].goalKeeperSaves ,             
    },
      "data2":{

        "finalScore": this.soccerGameDetailsData.result.teamDeatailsTwo[0].finalScore ,
        "docId": this.soccerGameDetailsData.result.teamDeatailsTwo[0]._id,
        "teamId": this.soccerGameDetailsData.result.teamDeatailsTwo[0].teamId,
        "mvp": this.soccerGameDetailsData.result.teamDeatailsTwo[0].mvp,
        "teamFoul":this.soccerGameDetailsData.result.teamDeatailsTwo[0].teamFoul,
        "offSide":this.soccerGameDetailsData.result.teamDeatailsTwo[0].offSide,
        "cornerkicks":this.soccerGameDetailsData.result.teamDeatailsTwo[0].cornerkicks,
        "goalKeeperSaves":this.soccerGameDetailsData.result.teamDeatailsTwo[0].goalKeeperSaves ,
      }
    }
    this.service.postApi('game/updateSoccerTeamWise',apireq,1).subscribe(success=>{
      if( success.responseCode === 200){
        this.service.spinnerHide();
        this.soccerEditGame();
        this.service.toastrSucc(success.responseMessage)
      }
    },error=>{
      this.service.spinnerHide();
      this.service.toastrErr(error);
    })
  }

  //Update Score Player Wise
  updateScorePlayerWise(data){
    this.service.spinnerShow();
    let apireq:any;
    if(data == 'teamOne'){
      apireq = {
        "array": this.soccerGameDetailsData.result.teamOne,
      }
    }else if(data== 'teamTwo'){
       apireq = {
         "array": this.soccerGameDetailsData.result.teamTwo,
       }
    }
    
    this.service.postApi('game/updateSoccerPlayerWise',apireq,1).subscribe(success=>{
      if( success.responseCode === 200 ){
        this.service.spinnerHide();
        this.soccerEditGame();
        this.service.toastrSucc(success.responseMessage);
      }
    },error=>{
      this.service.spinnerHide();
      this.service.toastrErr(error);
    })

  }

//On Cancel the score updation
  onCancel(){
    this.soccerEditGame();
  }

  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
      // console.log('this.paramData soccer match report ===>>>', this.paramData);
    });
  }

}
