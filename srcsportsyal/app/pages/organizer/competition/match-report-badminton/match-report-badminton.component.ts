import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-report-badminton',
  templateUrl: './match-report-badminton.component.html',
  styleUrls: ['./match-report-badminton.component.css']
})
export class MatchReportBadmintonComponent implements OnInit {
  @Output() MessageEvent = new EventEmitter<string>();
  @Input() gameData: any;
  paramData: any;
  basketballGameDetailsData: any;
  sportType: any;
  scoreOfOne: any;
  scoreOfTwo: any;
  finalScoreOne: any;
  finalScoreTwo: any;
  currentUrl: string;
  observation: any;
  messageFromObservation: any;
  observationMessage: any;
  basketballGameDetailsDouble: any;
  basketballGameDetailsSingle: any;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) { 
    this.currentUrl = window.location.href;
  }

  ngOnInit() {
    this.getParamData();

    setInterval(()=>{
      this.observation =  JSON.parse(localStorage.getItem('observation'));
    },1000)

    
    setTimeout(() => {
      console.log("Game data ------>",this.gameData); 
      console.log("Type data ------>",this.gameData.competitionData.sportType); 
      this.checkingTypeOfGame(this.gameData.competitionData.sportType) ;
      this.service.spinnerHide();
    }, 500);
    
  }



  
  
  //Send current url
  send(){
    this.MessageEvent.emit(this.currentUrl);
  } 

// Checking The Sport Type of Badminton Game 
  checkingTypeOfGame(type){
    this.sportType = type
       if( this.sportType == "double"){
             console.log("This Is Badminton Double Game");
             this.badmintonDoubleEditGame();
         }else{
             this.badmintonSingleEditGame();
      }
      setTimeout(() => { 
       this.getObservation();
      }, 500);

   }


 // Badminton Double Edit game Api integration
  badmintonDoubleEditGame(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type: 1
    };
    this.service.postApi('game/badmintonDoubleEditGame', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        this.badmintonDoubleGameDetails()
        this.service.toastrSucc(success.responseMessage);
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }

// Badminton Double Game Details Api integration
  badmintonDoubleGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    this.service.postApi('game/badmintonDoubleGameDetails', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        this.basketballGameDetailsData = success;
        this.basketballGameDetailsDouble = success;
        this.scoreOfOne = this.basketballGameDetailsData.teamDeatailsOne[0].scoreData;
        this.scoreOfTwo = this.basketballGameDetailsData.teamDeatailsTwo[0].scoreData;
        this.finalScoreOne = this.basketballGameDetailsData.teamDeatailsOne[0].finalScore;
        this.finalScoreTwo = this.basketballGameDetailsData.teamDeatailsTwo[0].finalScore;
        console.log("badminton Double Game Details====>",this.basketballGameDetailsData );
        this.service.toastrSucc(success.responseMessage);
        
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  } 
  

// Badminton Single Edit game Api integration
  badmintonSingleEditGame(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type: 1
    };
    this.service.postApi('game/badmintonSingleEditGame', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        this.badmintonSingleGameDetails()
        this.service.toastrSucc(success.responseMessage);
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  } 
 
// Badminton Single Game Details Api integration
  badmintonSingleGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    this.service.postApi('game/badmintonSingleGameDetails', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        this.basketballGameDetailsData = success;
        this.basketballGameDetailsSingle = success;
        this.scoreOfOne = this.basketballGameDetailsData.teamDeatailsOne[0].scoreData;
        this.scoreOfTwo = this.basketballGameDetailsData.teamDeatailsTwo[0].scoreData;
        this.finalScoreOne = this.basketballGameDetailsData.teamDeatailsOne[0].finalScore;
        this.finalScoreTwo = this.basketballGameDetailsData.teamDeatailsTwo[0].finalScore;
        this.service.toastrSucc(success.responseMessage);
        
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }


  //Update score 
  updatedScore(){
    this.service.spinnerShow();
   let apireq ={
    "data1":{
         "finalScore": this.finalScoreOne,
         "docId": this.basketballGameDetailsData.teamDeatailsOne[0]._id,
         "teamId": this.basketballGameDetailsData.teamDeatailsOne[0].teamId,
         "scoreData": this.scoreOfOne 
    },
    "data2":{

        "finalScore": this.finalScoreTwo,
        "docId": this.basketballGameDetailsData.teamDeatailsTwo[0]._id,
        "teamId": this.basketballGameDetailsData.teamDeatailsTwo[0].teamId,
        "scoreData": this.scoreOfTwo
    }
    }
    if( this.sportType == 'single'){
       this.service.postApi('game/updateBadmintonSingleScore',apireq,1).subscribe(success=>{
          if( success.responseCode === 200 ){
             this.service.spinnerHide();
             this.badmintonSingleEditGame();
             this.service.toastrSucc( success.responseMessage );
          }
       },error=>{
             this.service.spinnerHide();
             this.service.toastrErr(error);
       })
    }else{
      this.service.postApi('game/updateBadmintonDouleScore',apireq,1).subscribe(success=>{
          if( success.responseCode === 200 ){
             this.service.spinnerHide();
             this.badmintonDoubleEditGame();
             this.service.toastrSucc( success.responseMessage )
          }
      },error=>{
        this.service.spinnerHide();
        this.service.toastrErr(error);
      })

    }
  }


  //Get Observation
  getObservation(){
    this.service.spinnerShow();
    let apireq 

    if(this.sportType == "double"){
      apireq = {
          "gameId":this.basketballGameDetailsDouble.teamDeatailsOne[0].gameId,
        }
    }else if(this.sportType == "single"){
      apireq = {
        "gameId":this.basketballGameDetailsSingle.teamDeatailsOne[0].gameId,
      }
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
      let apireq
      this.service.spinnerShow();
      //for Badminton Double
     if(this.sportType == "double"){
      apireq = {
        "gameId":this.basketballGameDetailsDouble.teamDeatailsOne[0].gameId,
        "observation":this.observationMessage
      }
      this.service.postApi('game/badmintonDoubleObservationGame',apireq,1).subscribe(success=>{
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
     // For badmintonSingle
     else if(this.sportType == "single"){
      apireq = {
        "gameId":this.basketballGameDetailsSingle.teamDeatailsOne[0].gameId,
        "observation":this.observationMessage
      }
      this.service.postApi('game/badmintonSingleObservationGame',apireq,1).subscribe(success=>{
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
    } 


    //Update Observation
  updateObservation(){
    let apireq
    this.service.spinnerShow()
    if(this.sportType == "double"){
        apireq = {
                "gameId":this.basketballGameDetailsDouble.teamDeatailsOne[0].gameId,
                "observation":this.observationMessage
          }
    }else if(this.sportType == "single"){
        apireq = {
                "gameId":this.basketballGameDetailsSingle.teamDeatailsOne[0].gameId,
                "observation":this.observationMessage
          }
    }
   
    this.service.postApi('game/updateObservationsGame',apireq,1).subscribe(success=>{
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


  //On Cancel the score update proccess
  onCancel(){
    this.checkingTypeOfGame(this.gameData.competitionData.sportType);
  }

  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
    });
  }

}
