import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-match-report-table-tennis',
  templateUrl: './match-report-table-tennis.component.html',
  styleUrls: ['./match-report-table-tennis.component.css']
})
export class MatchReportTableTennisComponent implements OnInit {
  @Output() MessageEvent = new EventEmitter<string>();
  @Input() gameData: any;
  paramData: any;
  tableTennisGameDetailsData: any;
  sportType: any;
  currentUrl : string;
  itemArray: any;
  itemArrayTwo: any;
  finalScoreOfOne: any;
  finalScoreOfTwo: any;
  observation: any;
  tableTennisDetailsDouble: any;
  tableTennisDetailsSingle: any;
  messageFromObservation: any;
  observationMessage: any;
  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) { 
    this.currentUrl = window.location.href;
  }

  ngOnInit() {
    this.getParamData();
    // this.tableTennisSingleEditGame();

    setInterval(()=>{
      this.observation =  JSON.parse(localStorage.getItem('observation'));
    },1000)
    
    setTimeout(() => {
      console.log('gameData table tannis ===>>>', this.gameData);
      this.service.spinnerHide();
      this.checkingTypeOfGame(this.gameData.competitionData.sportType);
      console.log("Sport Type=-=-=-=->",this.gameData.competitionData.sportType);

      // this.service.toastrSucc(this.gameData.responseCode);
    }, 500);
  }

  sendUrl(){
   this.MessageEvent.emit(this.currentUrl);
  }

  // Checking The Sport Type of Badminton Game 
  checkingTypeOfGame(type){
    this.sportType = type
       if( this.sportType == "double"){
             console.log("This Is Badminton Double Game");
             this.tableTennisDoubleEditGame();
         }else{
             this.tableTennisSingleEditGame();
      }

      setTimeout(() => {
        this.getObservation();
      }, 500);
   }
  


  // Table Tennis Single Edit Game Details Api inetgration 
  tableTennisSingleEditGame(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type: 1
    };
    this.service.postApi('game/tableTennisSingleEditGame', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        console.log("Table Tennis Single Edit Game ====>",success);
        this.tableTennisSingleGameDetails()
        this.service.toastrSucc(success.responseMessage);
        
      } else {
        this.service.toastrErr(success.responseMessage);
        console.log("error======>");
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      console.log("error of Table Tennis Single edit game details======>");
    });
  }


  // Table Tennis Single Game Details Api inetgration 
  tableTennisSingleGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    // console.log("apireq======>",apireq);
    this.service.postApi('game/tableTennisSingleGameDetails', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        this.tableTennisGameDetailsData = success;
        this.tableTennisDetailsSingle = success ;
        this.itemArray= this.tableTennisGameDetailsData.teamDeatailsOne[0].scoreData;
        this.itemArrayTwo = this.tableTennisGameDetailsData.teamDeatailsTwo[0].scoreData;
        this.finalScoreOfOne = this.tableTennisGameDetailsData.teamDeatailsOne[0].finalScore;
        this.finalScoreOfTwo = this.tableTennisGameDetailsData.teamDeatailsTwo[0].finalScore;
        console.log("Table Tennis Single Game Details====>",this.tableTennisGameDetailsData );
        this.service.toastrSucc(success.responseMessage);
        
      } else {
        // this.service.toastrErr(success.responseMessage);
        console.log("error======>");
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      console.log("error of Table Tennis game details");
    });
  }


   // Table Tennis Double Edit Game Details Api inetgration 
   tableTennisDoubleEditGame(){
    //  console.log("I am in Double Table Tennis");
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type: 1
    };
    this.service.postApi('game/tableTennisDoubleEditGame', apireq , 0).subscribe(success => {
        
      if (success.responseCode === 200) {
        console.log("Table Tennis Double Edit Game ====>",success);
        this.tableTennisDoubleGameDetails()
        this.service.toastrSucc(success.responseMessage);
        
      } else {
        this.service.toastrErr(success.responseMessage);
        console.log("error======>");
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      console.log("error of Table Tennis Double edit game details======>");
    });
  }
  

  // Table Tennis Double Game Details Api inetgration 
  tableTennisDoubleGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    // console.log("apireq======>",apireq);
    this.service.postApi('game/tableTennisDoubleGameDetails', apireq , 0).subscribe(success => {
        
      if ( success.responseCode === 200 ) {
        this.tableTennisGameDetailsData = success;
        this.tableTennisDetailsDouble = success
        this.itemArray= this.tableTennisGameDetailsData.teamDeatailsOne[0].scoreData;
        this.itemArrayTwo = this.tableTennisGameDetailsData.teamDeatailsTwo[0].scoreData;
        this.finalScoreOfOne = this.tableTennisGameDetailsData.teamDeatailsOne[0].finalScore;
        this.finalScoreOfTwo = this.tableTennisGameDetailsData.teamDeatailsTwo[0].finalScore;
        console.log("Table Tennis Double Game Details====>",this.tableTennisGameDetailsData );
        this.service.toastrSucc(success.responseMessage);
        
      } else {
        // this.service.toastrErr(success.responseMessage);
        console.log("error======>");
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      console.log("error of Table Tennis game details");
    });
  }

  //Update The Score of Table Tennis Single
  updatedScore(){
    this.service.spinnerShow()
    let apireq = {
      "data1":{
        "finalScore": this.finalScoreOfOne,
        "docId": this.tableTennisGameDetailsData.teamDeatailsOne[0]._id,
        "teamId": this.tableTennisGameDetailsData.teamDeatailsOne[0].teamId,
        "scoreData": this.itemArray
       },
      "data2":{
        "finalScore": this.finalScoreOfTwo,
        "docId": this.tableTennisGameDetailsData.teamDeatailsTwo[0]._id,
        "teamId": this.tableTennisGameDetailsData.teamDeatailsTwo[0].teamId,
        "scoreData":  this.itemArrayTwo
      }
    }

    if(this.gameData.competitionData.sportType == "single"){
      this.service.postApi('game/updateTableTennisSingleScore',apireq,1).subscribe( success =>{
            if( success.responseCode === 200){
              this.tableTennisSingleEditGame();
              this.service.spinnerHide();
              this.service.toastrSucc(success.responseMessage);
            }
          },error =>{
              this.service.spinnerHide();
              this.service.toastrErr(error)
          })
    }else if(this.gameData.competitionData.sportType == "double"){
      this.service.postApi('game/updateTableTennisDouleScore',apireq,1).subscribe( success =>{
        if( success.responseCode === 200){
          this.tableTennisDoubleEditGame();
          this.service.spinnerHide();
          this.service.toastrSucc(success.responseMessage);
        }
      },error =>{
          this.service.spinnerHide();
          this.service.toastrErr(error)
      })
    }  
 }


 //Get Observation
 getObservation(){
  this.service.spinnerShow();
  let apireq 

  if(this.sportType == "double"){
    apireq = {
        "gameId":this.tableTennisDetailsDouble.teamDeatailsOne[0].gameId,
      }
  }else if(this.sportType == "single"){
    apireq = {
      "gameId":this.tableTennisDetailsSingle.teamDeatailsOne[0].gameId,
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
      "gameId":this.tableTennisDetailsDouble.teamDeatailsOne[0].gameId,
      "observation":this.observationMessage
    }
    this.service.postApi('game/tableTennisDoubleGameObservationGame',apireq,1).subscribe(success=>{
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
      "gameId":this.tableTennisDetailsSingle.teamDeatailsOne[0].gameId,
      "observation":this.observationMessage
    }
    this.service.postApi('game/tableTennisSingleObservationGame',apireq,1).subscribe(success=>{
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
              "gameId":this.tableTennisDetailsDouble.teamDeatailsOne[0].gameId,
              "observation":this.observationMessage
        }
  }else if(this.sportType == "single"){
      apireq = {
              "gameId":this.tableTennisDetailsSingle.teamDeatailsOne[0].gameId,
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

//On Cancel score updation process
onCancel(){
  this.checkingTypeOfGame(this.gameData.competitionData.sportType); 
}

  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
      console.log('this.paramData table tannis match report ===>>>', this.paramData);
    });
  }

}
