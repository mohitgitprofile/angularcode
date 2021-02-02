import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';


@Component({
  selector: 'app-match-report-basket-ball',
  templateUrl: './match-report-basket-ball.component.html',
  styleUrls: ['./match-report-basket-ball.component.css']
})
export class MatchReportBasketBallComponent implements OnInit {
  @Output() MessageEvent = new EventEmitter<string>();
  @Input() gameData: any;
  paramData: any;
  basketballGameDetailsData: any;
  currentUrl: string;
  scoreArrayOne: any;
  scoreArrayTwo: any;
  finalScoreOne: any;
  finalScoreTwo: any;
  players: any;
  playerOne:any;
  playerTwo:any;
  totalScore: any[];
  finalOfTeamOne: any;
  finalOfTeamTwo: any[];
  observation: any;
  observationMessage :string;
  messageFromObservation: any;
  // _id: any;

  constructor(
    public service: MainService,
    public activatedRoute: ActivatedRoute
  ) {
    this.currentUrl = window.location.href
   }

  ngOnInit() {
    this.getParamData();
    this.basketballEditGame();
    

    // this.addObservation();

    console.log('koi bhi console');
    setInterval(()=>{
      this.observation =  JSON.parse(localStorage.getItem('observation'));
    },1000)

    
    setTimeout(() => {
      console.log('gameData ===>>>', this.gameData);
      // this.service.spinnerHide();
      this.getObservation();
    }, 500);


  }

  
  
//Send URL of this page to the parent page
  sendUrl(){
     this.MessageEvent.emit(this.currentUrl);
  }


  // BasketBall Edit game api integration
  basketballEditGame() {
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId,
         type:1,
    };
    this.service.postApi('game/basketballEditGame', apireq , 0).subscribe(success => {
      if (success.responseCode === 200) {
        console.log("success of basketBall  Edit ======>",success);
        this.basketballGameDetails()
        this.service.toastrSucc(success.responseMessage);
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }


//BasketBall Game Details Api Integration
  basketballGameDetails(){
    this.service.spinnerShow();
    let apireq = {
         teams: [this.paramData.team1Id,this.paramData.team2Id] ,
         gameId: this.paramData.gameId
    }
    this.service.postApi('game/basketballGameDetails', apireq , 0).subscribe(success => {
      if (success.responseCode === 200) {
        this.basketballGameDetailsData = success;
        this.scoreArrayOne =  this.basketballGameDetailsData.result.teamDeatailsOne[0].scoreData;
        this.scoreArrayTwo = this.basketballGameDetailsData.result.teamDeatailsTwo[0].scoreData;
        this.finalScoreOne = this.basketballGameDetailsData.result.teamDeatailsOne[0].finalScore;
        this.finalScoreTwo = this.basketballGameDetailsData.result.teamDeatailsTwo[0].finalScore;
        this.playerOne = this.basketballGameDetailsData.result.teamDeatailsOne[0].mvp;
        this.playerTwo = this.basketballGameDetailsData.result.teamDeatailsTwo[0].mvp;
        // console.log("success score of basketBallGameDetails ======>",this.scoreArrayOne,this.scoreArrayTwo);
        this.service.toastrSucc(success.responseMessage);
      } 
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr(error);
    });
  }

  //Update Team's Details 
  onUpdate(){
    this.service.spinnerShow();
    let apireq ={
      "data1":{
               "finalScore": this.finalScoreOne ,
               "docId": this.basketballGameDetailsData.result.teamDeatailsOne[0]._id,
               "teamId": this.basketballGameDetailsData.result.teamDeatailsOne[0].teamId,
               "scoreData": this.scoreArrayOne,
               "mvp": this.playerOne              
           },
      "data2":{
 
              "finalScore": this.finalScoreTwo,
              "docId": this.basketballGameDetailsData.result.teamDeatailsTwo[0]._id,
              "teamId": this.basketballGameDetailsData.result.teamDeatailsTwo[0].teamId,
              "scoreData": this.scoreArrayTwo,
              "mvp": this.playerTwo
}
          }
     console.log("Most Favarable Player One =-=-=-=-=>",this.playerOne);
     console.log("Most Favarable Player Two =-=-=-==->",this.playerTwo);
      
    this.service.postApi('game/updateBasketBallTeamWise',apireq,1).subscribe(success=>{
       if( success.responseCode=== 200 ){
           this.basketballEditGame();
           this.service.spinnerHide();
           this.service.toastrSucc( success.responseMessage )
       }
    },error=>{
        this.service.spinnerHide();
        this.service.toastrErr(error);
    })
  }
  

  onChange(){ 
    // console.log("Most Valuable Player",this.playerOne.userDetails[0].firstName,this.playerTwo.userDetails[0].firstName);
    console.log("Player Name Selected ",this.playerOne);
    console.log("=-=-=-=--=>",this.playerTwo);

  }


  //Get Observation
  getObservation(){
    this.service.spinnerShow();
    let apireq = {
      "gameId":this.basketballGameDetailsData.result.teamDeatailsOne[0].gameId,
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
      "gameId": this.basketballGameDetailsData.result.teamDeatailsOne[0].gameId,
      "observation":this.observationMessage
    }
    this.service.postApi('game/basketBallObservationGame',apireq,1).subscribe(success=>{
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
          "gameId": this.basketballGameDetailsData.result.teamDeatailsOne[0].gameId,
          "observation":this.observationMessage
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


//Update Player's Details
  updatePlyerDetails(data){
    this.service.spinnerShow();
    let apireq
    if( data == "teamOne" ){
           apireq = {
                "array":this.basketballGameDetailsData.result.teamOne,
              }
    }else if( data == "teamTwo"){
           apireq = {
               "array":this.basketballGameDetailsData.result.teamTwo,
          }
    }
    this.service.postApi('game/updateBasketBallPlayerWise',apireq,1).subscribe( success =>{
      if( success.responseCode === 200 ){
         this.service.spinnerHide();
         this.service.toastrSucc(success.responseMessage);
         this.basketballEditGame();
      }
    },error => {
       this.service.spinnerHide();
       this.service.toastrErr(error);
    })
  }

  //On cancel score updation proccess
  onCancel(){
    this.basketballEditGame()
  }

  getParamData() {
    this.activatedRoute.params.subscribe(param => {
      this.paramData = param;
      console.log('this.paramData basket-ball match report ===>>>', this.paramData);
      this.observation = JSON.parse(localStorage.getItem('observation'));
      console.log("=-=-=-==-=-=->",this.observation);
    });
  }

}
