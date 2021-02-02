import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import {  FormControl} from '@angular/forms'

@Component({
  selector: 'app-match-report-cricket',
  templateUrl: './match-report-cricket.component.html',
  styleUrls: ['./match-report-cricket.component.css']
})
export class MatchReportCricketComponent implements OnInit {
  @Output() MessageEvent = new EventEmitter<string>();
  @Input() gameData: any;
  paramData: any;
  cricketGameDetailsData: any;
  CurrentTime: any;
  currentUrl: string;
  bestBatsmanOfTeamOne :any;
  bestBowlerOfTeamOne: any ;

  bestBatsmanOfTeamTwo:any;
  bestBowlerOfTeamTwo:any;
  observation: any;
  observationMessage :string;
  messageFromObservation: any;
  // _id: any;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) {
    this.currentUrl = window.location.href;
    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()}, 1);
   }

  ngOnInit() {
    this.getParamData();
    this.cricketEditGame();
    
    setInterval(()=>{
      this.observation =  JSON.parse(localStorage.getItem('observation'));
    },1000)

    setTimeout(() => {
      console.log('gameData cricket ===>>>', this.gameData);
      this.service.spinnerHide();
      this.getObservation();
      // this.service.toastrSucc(this.gameData.responseCode);
    }, 500);
  }




   //Get Observation
   getObservation(){
    this.service.spinnerShow();
    let apireq = {
      "gameId":this.cricketGameDetailsData.result.teamDeatailsOne[0].gameId,
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
      "gameId": this.cricketGameDetailsData.result.teamDeatailsOne[0].gameId,
      // "teamId":this.cricketGameDetailsData.result.teamDeatailsOne[0].teamId,
      "observation":this.observationMessage
    }
    this.service.postApi('game/cricketGameObservationGame',apireq,1).subscribe(success=>{
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
          "gameId": this.cricketGameDetailsData.result.teamDeatailsOne[0].gameId,
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


  // send URL of this page to the Parent page
  sendURL(){
    this.MessageEvent.emit(this.currentUrl)
  }

  //Cricket Edit Game 
  cricketEditGame(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type: 1
    };
    // console.log("apireq======>",apireq);
    this.service.postApi('game/cricketEditGame', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        console.log("Cricket Edit Game ====>",success);
        this.cricketGameDetails()
        this.service.toastrSucc(success.responseMessage);
        
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
      console.log("error of Cricket edit game details======>");
    });
  }


  // Cricket Game Details Api inetgration 
  cricketGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    // console.log("apireq======>",apireq);
    this.service.postApi('game/cricketGameDetails', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        this.cricketGameDetailsData = success;
        this.bestBatsmanOfTeamOne = this.cricketGameDetailsData.result.teamDeatailsOne[0].bestBatsman;
        this.bestBowlerOfTeamOne = this.cricketGameDetailsData.result.teamDeatailsOne[0].bestBowler;
        this.bestBatsmanOfTeamTwo = this.cricketGameDetailsData.result.teamDeatailsTwo[0].bestBatsman;
        this.bestBowlerOfTeamTwo = this.cricketGameDetailsData.result.teamDeatailsTwo[0].bestBowler;
        console.log("Cricket Game Details from cricket ====>",this.cricketGameDetailsData );
      } 
      this.service.spinnerHide();
      this.service.toastrSucc( success.responseMessage );
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr( error );
      console.log("error of cricket game details");
    });
  }

//Select player
  onChange(){ 
    console.log("Selected Player Best", this.bestBatsmanOfTeamOne);
    console.log("Selected Player Best", this.bestBowlerOfTeamOne);
  }


  //update Team Score 
  onUpdate(){
    this.service.spinnerShow();
    // console.log("Update Score");
    let apireq ={
      "data1": { 
          "docId": this.cricketGameDetailsData.result.teamDeatailsOne[0]._id,
          "teamId":this.cricketGameDetailsData.result.teamDeatailsOne[0].teamId,
          "totalScore":this.cricketGameDetailsData.result.teamDeatailsOne[0].totalScore,
          "totalOut":this.cricketGameDetailsData.result.teamDeatailsOne[0].totalOut,
          "netScore":this.cricketGameDetailsData.result.teamDeatailsOne[0].netScore,
          "leadingSkins":this.cricketGameDetailsData.result.teamDeatailsOne[0].leadingSkins,
          "laggingSkins":this.cricketGameDetailsData.result.teamDeatailsOne[0].laggingSkins,
          "bestBatsman":this.bestBatsmanOfTeamOne,
          "bestBowler":this.bestBowlerOfTeamOne
  },
       
   "data2":{
          "docId": this.cricketGameDetailsData.result.teamDeatailsTwo[0]._id,
          "teamId":this.cricketGameDetailsData.result.teamDeatailsTwo[0].teamId,
          "totalScore":this.cricketGameDetailsData.result.teamDeatailsTwo[0].totalScore,
          "totalOut":this.cricketGameDetailsData.result.teamDeatailsTwo[0].totalOut,
          "netScore":this.cricketGameDetailsData.result.teamDeatailsTwo[0].netScore,
          "leadingSkins":this.cricketGameDetailsData.result.teamDeatailsTwo[0].leadingSkins,
          "laggingSkins":this.cricketGameDetailsData.result.teamDeatailsTwo[0].laggingSkins,
          "bestBatsman":this.bestBatsmanOfTeamTwo,
          "bestBowler":this.bestBowlerOfTeamTwo
   }
    }

    this.service.postApi('game/updateCricketTeamWise',apireq,1).subscribe(success=>{
      if( success.responseCode === 200 ){
         this.service.spinnerHide();
         this.cricketEditGame();
         this.service.toastrSucc( success.responseMessage );
      }
    },error=>{
         this.service.spinnerHide();
         this.service.toastrErr(error);
    })
  }

//Update Player's Score
  onUpdatePlayer(data){
    let apireq :any;
    this.service.spinnerShow();
    if( data == 'teamOne'){
        apireq = {
        "array":this.cricketGameDetailsData.result.teamOne
        }
    }else{
        apireq = {
        "array":this.cricketGameDetailsData.result.teamTwo
        }
    }
   
  this.service.postApi('game/updateCricketPlayerWise ',apireq,1).subscribe(success => {
     if( success.responseCode === 200 ){
      this.service.spinnerHide();
      this.service.toastrSucc( success.responseMessage );
      this.cricketEditGame();
     }
  },error =>{
      this.service.spinnerHide();
      this.service.toastrErr( error );  
    })
  }


  //On Cancel the score updation
  onCancel(){
    this.cricketEditGame();
  } 

  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
      console.log('this.paramData cricket match report ===>>>', this.paramData);
    });
  }
}



