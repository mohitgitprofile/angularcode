import { MainService } from './../../../../providers/mainService.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-match-report-generic',
  templateUrl: './match-report-generic.component.html',
  styleUrls: ['./match-report-generic.component.css']
})
export class MatchReportGenericComponent implements OnInit {
  @Output() MessageEvent = new EventEmitter<string>();
  @Input() gameData: any;
  paramData: any;
  data: any;
  scoreData: any =[];
  sportType: any;
  teamOneScore : FormGroup
  item: any =[]
  currentUrl: string;
  score: any =[];
  itemArray:any;
  itemArrayTwo: any;
  itemArrayDoubleOne: any;
  itemArrayDoubleTwo:any;
  finalScoreOne: any;
  finalScoreTwo: any;
  totalScore: any[];
  finalScore: any[];
  genericDoubleData: any;
  genericSingleData: any;
  messageFromObservation: any;
  observationMessage: any;
  _id: any;
  observation: any;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute,
    public fb :FormBuilder
  ) { 
    this.currentUrl = window.location.href
  }

  ngOnInit() {
    this.getParamData();
    this.checkingTypeOfGame(this.gameData.competitionData.sportType);

    setInterval(()=>{
      this.observation =  JSON.parse(localStorage.getItem('observation'));
    },1000)

    
    setTimeout(() => {
      console.log(' generic Data ===>>>', this.gameData);
      this.service.spinnerHide();
      // this.service.toastrSucc(this.gameData.responseCode);
    },1000);
  }
 

  //Sending the current page url to parent component to Share Match Report
  sendUrl(){
    this.MessageEvent.emit(this.currentUrl);
 }

  // Checking the type of Game
  checkingTypeOfGame(type){
    console.log("I'm From Checking Type of Game ");
this.sportType = type;
if(this.sportType == "double"){
 this.genericDoubleEditGame()
}else if(this.sportType == "single"){
  this.genericSingleEditGame()
}

setTimeout(() => {
  this.getObservation();
},1000);
  }

  
  //genericDoubleEditeGame api integration **Suraj**
  genericDoubleEditGame(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type:1,
    };
    this.service.postApi('game/genericDoubleEditGame', apireq , 0).subscribe(success => {
      
      if (success.responseCode === 200) {
        this.genericDoubleGameDetails()
        console.log("success of generic Double Edit game======>",success);
        this.service.toastrSucc(success.responseMessage);
      } else {
        // this.service.toastrErr(success.responseMessage);
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }

 //generic Double game details api integration
  genericDoubleGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    this.service.postApi('game/genericDoubleGameDetails', apireq , 0).subscribe(success => {
      
      if (success.responseCode === 200) {
        console.log("success of generic Double game details=====>",success);
        this.genericDoubleData = success
        this.data = success;
        this.finalScoreOne = this.data.teamDeatailsOne[0].finalScore
        this.finalScoreTwo = this.data.teamDeatailsTwo[0].finalScore
        this.itemArray = this.data.teamDeatailsOne[0].scoreData;
        this.itemArrayTwo = this.data.teamDeatailsTwo[0].scoreData;
        // console.log("this.genericDoubleGameDetails==================>",this.genericDoubleGameDetails);
        this.service.toastrSucc(success.responseMessage);
      } else {
        // this.service.toastrErr(success.responseMessage);
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }


  //genericSingleEditeGame api integration **Suraj**
  genericSingleEditGame(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type:1,
    };
    this.service.postApi('game/genericSingleEditGame', apireq , 0).subscribe(success => {
      
      if (success.responseCode === 200) {
        this.genericSingleGameDetails()
        console.log("success of generic Single Edit game======>",success);
        this.service.toastrSucc(success.responseMessage);
      } else {
        // this.service.toastrErr(success.responseMessage);
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }
  
 //generic Single game details api integration
  genericSingleGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    };
    this.service.postApi('game/genericSingleGameDetails', apireq , 0).subscribe(success => {
      
      if (success.responseCode === 200) {
        // console.log("success of generic Single game details=====>",success);
        this.genericSingleData  = success
        this.data = success
        this.finalScoreOne = this.data.teamDeatailsOne[0].finalScore
        this.finalScoreTwo = this.data.teamDeatailsTwo[0].finalScore
        this.itemArray= this.data.teamDeatailsOne[0].scoreData;
        this.itemArrayTwo = this.data.teamDeatailsTwo[0].scoreData
        this.service.toastrSucc(success.responseMessage);

        console.log("itemArray====>",this.itemArray);
        console.log("itemArrayTwo",this.itemArrayTwo);
      } else {
        // this.service.toastrErr(success.responseMessage);
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });

  }

//Update Score 
  updatedScore(){
    this.service.spinnerShow()
      let apireq={
        "data1":{
          "finalScore": this.finalScoreOne,
          "docId": this.data.teamDeatailsOne[0]._id,
          "teamId": this.data.teamDeatailsOne[0].teamId,
          "scoreData": this.itemArray
         },
        "data2":{  
          "finalScore": this.finalScoreTwo,
          "docId": this.data.teamDeatailsTwo[0]._id,
          "teamId": this.data.teamDeatailsTwo[0].teamId,
          "scoreData": this.itemArrayTwo       
       }
             };

        //  console.log("Sport Type =======-=-=-=-=-=----=-=-=--=-=->",this.sportType);
        //  console.log("api req----->",apireq);
        if( this.sportType == 'single' ){
          //Update Score Of Generic Single Game
           this.service.postApi('game/updateGenericSingleScore',apireq,0).subscribe(success =>{
              if(success.responseCode === 200){
                this.genericSingleEditGame();
                this.service.spinnerHide()
                this.service.toastrSucc(success.responseMessage);
              }
             }, error =>{
              this.service.spinnerHide()
              this.service.toastrErr(error)
             })
        }else{
          //Update Score Of Generic Double Game
          this.service.postApi('game/updateGenericDouleScore',apireq,0).subscribe(success =>{
            if(success.responseCode === 200){
              this.genericDoubleEditGame();
              this.service.spinnerHide()
              this.service.toastrSucc(success.responseMessage);
            }
           }, error =>{
            this.service.spinnerHide()
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
          "gameId":this.genericDoubleData.teamDeatailsOne[0].gameId,
        }
    }else if(this.sportType == "single"){
      apireq = {
        "gameId":this.genericSingleData.teamDeatailsOne[0].gameId,
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
        "gameId":this.genericDoubleData.teamDeatailsOne[0].gameId,
        "observation":this.observationMessage
      }
      this.service.postApi('game/genericDoubleObservationGame',apireq,1).subscribe(success=>{
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
        "gameId":this.genericSingleData.teamDeatailsOne[0].gameId,
        "observation":this.observationMessage
      }
      this.service.postApi('game/genericSingleObservationGame',apireq,1).subscribe(success=>{
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
                "gameId":this.genericDoubleData.teamDeatailsOne[0].gameId,
                "observation":this.observationMessage
          }
    }else if(this.sportType == "single"){
        apireq = {
                "gameId":this.genericSingleData.teamDeatailsOne[0].gameId,
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



  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
      console.log('generic report ===>>>', this.paramData);
    });
  }
}
