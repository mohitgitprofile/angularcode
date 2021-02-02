import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-report-generic-team',
  templateUrl: './match-report-generic-team.component.html',
  styleUrls: ['./match-report-generic-team.component.css']
})
export class MatchReportGenericTeamComponent implements OnInit {
  @Output() MessageEvent = new EventEmitter<string>();
  @Input() gameData: any;
  paramData: any;
  genericTeamData: any;
  bestBatsmanOfTeamOne: any;
  bestBowlerOfTeamTwo: any;
  bestBowlerOfTeamOne: any;
  bestBatsmanOfTeamTwo: any;
  information:string ="Select Player "
  currenUrl: string;
  observation: any;
  observationMessage: string;
  messageFromObservation: any;
  _id: any;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) {
    this.currenUrl = window.location.href
   }

  ngOnInit() {
    this.getParamData();
    this.genericTeamEditGame()
    

    setInterval(()=>{
      this.observation =  JSON.parse(localStorage.getItem('observation'));
    },1000)

    setTimeout(() => {
      console.log('generic team competition and gamedata data ===>>>', this.gameData);
      this.service.spinnerHide();
      this.getObservation();
    }, 500);
  }





  //Send current Url 
  send(){
    this.MessageEvent.emit(this.currenUrl);
  }


//Generic Team Edit Game api integration 
   genericTeamEditGame(){
    //  this.service.spinnerShow();
     let apireq ={
      teams: [this.paramData.team1Id,this.paramData.team2Id] ,
      gameId: this.paramData.gameId,
      type:"3",
     }
     this.service.postApi('game/genericTeamGameEdit',apireq,0).subscribe(success=>{
       if( success.responseCode == 200 ){
        //  this.service.spinnerHide();
         this.genericTeamGameDetails();
         this.getObservation();
        //  this.service.toastrSucc(success.responseMessage);
       }
     },error=>{
       this.service.spinnerHide();
       this.service.toastrErr(error);
     })
   }

//Generic Team Game Details 
   genericTeamGameDetails(){
     this.service.spinnerShow();
     let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
     }
     this.service.postApi('game/genericTeamGameDetails',apireq,0).subscribe(success=>{
       if(success.responseCode == 200){
         this.service.spinnerHide();
         this.genericTeamData = success;
         this.bestBatsmanOfTeamOne = this.genericTeamData.result.teamDeatailsOne[0].bestBatsman;
        this.bestBowlerOfTeamOne = this.genericTeamData.result.teamDeatailsOne[0].bestBowler;
        this.bestBatsmanOfTeamTwo = this.genericTeamData.result.teamDeatailsTwo[0].bestBatsman;
        this.bestBowlerOfTeamTwo = this.genericTeamData.result.teamDeatailsTwo[0].bestBowler;
         console.log("Generic Team Details Data=-=-=-=-=->",this.genericTeamData);
         this.service.toastrSucc(success.responseMessage);
       }
     },error=>{
       this.service.spinnerHide();
       this.service.toastrErr(error);
     })
   }


//Update team score 
   updatedTeamScore(){
     this.service.spinnerShow();
     let apireq ={  
      "data1": { 
        "docId": this.genericTeamData.result.teamDeatailsOne[0]._id,
        "teamId":this.genericTeamData.result.teamDeatailsOne[0].teamId,
        "totalScore":this.genericTeamData.result.teamDeatailsOne[0].totalScore,
        "totalOut":this.genericTeamData.result.teamDeatailsOne[0].totalOut,
        "netScore":this.genericTeamData.result.teamDeatailsOne[0].netScore,
        "leadingSkins":this.genericTeamData.result.teamDeatailsOne[0].leadingSkins,
        "laggingSkins":this.genericTeamData.result.teamDeatailsOne[0].laggingSkins,
        "bestBatsman":this.bestBatsmanOfTeamOne,
        "bestBowler":this.bestBowlerOfTeamOne
      },
          
      "data2":{
        "docId": this.genericTeamData.result.teamDeatailsTwo[0]._id,
        "teamId":this.genericTeamData.result.teamDeatailsTwo[0].teamId,
        "totalScore":this.genericTeamData.result.teamDeatailsTwo[0].totalScore,
        "totalOut":this.genericTeamData.result.teamDeatailsTwo[0].totalOut,
        "netScore":this.genericTeamData.result.teamDeatailsTwo[0].netScore,
        "leadingSkins":this.genericTeamData.result.teamDeatailsTwo[0].leadingSkins,
        "laggingSkins":this.genericTeamData.result.teamDeatailsTwo[0].laggingSkins,
        "bestBatsman":this.bestBatsmanOfTeamTwo,
        "bestBowler":this.bestBowlerOfTeamTwo
      }     
     }
     console.log("api request---->",apireq);
     this.service.postApi('game/updateGenericTeamGameTeamWise',apireq,1).subscribe(success=>{
       if(success.responseCode == 200){
         this.service.spinnerHide();
         this.genericTeamEditGame();
         this.service.toastrSucc(success.responseMessage);
       }
     },error=>{
       this.service.spinnerHide();
       this.service.toastrErr(error);
     })
   }


   //Update score player Wise 
   updatedTeamScorePlayerWise(data){
     this.service.spinnerShow();
     let apireq
     if(data == 'teamOne'){
       apireq = {
        "array":this.genericTeamData.result.teamOne
       }
     }
     else {
       apireq = {
        "array":this.genericTeamData.result.teamTwo
       }
     }
     this.service.postApi('game/updateGenericTeamGamePlayerWise',apireq,1).subscribe(success=>{
       if(success.responseCode == 200){
         this.service.spinnerHide();
         this.genericTeamEditGame();
         this.service.toastrSucc(success.responseMessage);
       }
     },error=>{
       this.service.spinnerHide();
       this.service.toastrErr(error);
     })
   }


     //Get Observation
  getObservation(){
    this.service.spinnerShow();
    let apireq = {
      "gameId":this.genericTeamData.result.teamDeatailsOne[0].gameId,
    }

    this.service.postApi('game/getObservationGame',apireq,1).subscribe(success=>{
      if(success.responseCode == 200){
        this.messageFromObservation = success.result.observation;
         this.observationMessage = success.result.observation;
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
      "gameId": this.genericTeamData.result.teamDeatailsOne[0].gameId,
      "observation":this.observationMessage
    }
    this.service.postApi('game/genericTeamGameObservationGame',apireq,1).subscribe(success=>{
      if( success.responseCode == 200 ){
        this.service.spinnerHide();
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
    // console.log("Idjhjkhkhjkhjkhjkhjh=-==-",this._id)
    let apireq = {
          "gameId": this.genericTeamData.result.teamDeatailsOne[0].gameId,
          "observation":this.observationMessage
    }
    this.service.postApi('game/updateObservationsGame ',apireq,1).subscribe(success=>{
      if( success.responseCode == 200){
        this.service.spinnerHide();
        this.getObservation();
        this.service.toastrSucc(success.responseMessage);
        
      }
    },error=>{
      this.service.spinnerHide();
      this.service.toastrErr(error);      
    })
  }
  

//On Cancel the score updation
   onCancel(){
     this.genericTeamEditGame();
   }

  // Getting Param Data 
  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
      console.log('generic team data ===>>>', this.paramData);
    });
  }

}
