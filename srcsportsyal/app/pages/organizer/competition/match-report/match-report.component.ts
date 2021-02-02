import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { MainService } from '../../../../providers/mainService.service';



declare var $: any;

@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.css']
})
export class MatchReportComponent implements OnInit {
  
  paramData: any;
  compititionData: any;
  editGameForm: FormGroup;
  gameData: any;
  runSelector: any = false;
  genericCompetitionData: any;
  childURL: string;
  observation:boolean;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public service: MainService,
  ) { }

  ngOnInit() {
    this.formValidation();
    this.getParamData();
  }



  receiveURL(data){
    this.childURL = data
  }

  //On back
  onBack(){
    window.history.back();
  }

  formValidation() {
    this.editGameForm = new FormGroup({
      date : new FormControl('', ),
      place : new FormControl('', ),
      team1 : new FormControl('', ),
      result1 : new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
      result2 : new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
      team2 : new FormControl('', )
    });
  }

  getParamData() {
    this.activatedRoute.params.subscribe(params => {
      this.paramData = params;
      
    });
    console.log('this.paramData match report ===>>>', this.paramData);
    this.getsportType();
  }

  getsportType() {
    this.service.spinnerShow();
    let apireq = {
      userId: JSON.parse(localStorage.getItem('userDetailYala'))._id,
      competitionId: this.paramData.compId
    };
    this.service.postApi('organizer/competition/getACompetition', apireq,1).subscribe(success => {
      
      if (success.responseCode === 200) {
        this.compititionData = success.result;
        console.log("this.compititionData=============>",this.compititionData);
        this.statsRouting();
        this.getGameData();
      } else {
        this.service.toastrErr("Something went wrong");
      }
      this.service.spinnerHide();
    }, error => {
      this.service.spinnerHide();
      this.service.toastrErr('Something went wrong');
    });
  }

  statsRouting() {
    
    this.observation = false;
    localStorage.setItem('observation',JSON.stringify(this.observation))
    
    if (this.compititionData.sports === 'Cricket') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportCricket/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    } else if (this.compititionData.sports === 'badminton') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportBadminton/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    } else if (this.compititionData.sports === 'Basketball') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportBasketBall/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    } else if (this.compititionData.sports === 'swimming') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportSwimming/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    } else if (this.compititionData.sports === 'voleyball') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportVoleyball/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    } else if (this.compititionData.sports === 'TableTennis') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportTableTennis/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    } else if (this.compititionData.sports === 'Soccer') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportSoccer/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    } else if (this.compititionData.sports === 'GenericTeam') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportGenericTeam/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    }else if (this.compititionData.sports === 'Generic') {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportGenericTeam/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    }else {
      this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportGeneric/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
    }
  }

  observationRouting() {
    this.observation = true;
    this.router.navigate(['/organizer/matchReport/' + this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id + '/' + 'matchReportObservation/' +this.paramData.compId + '/' + this.paramData.gameId + '/' + this.paramData.team1Id + '/' + this.paramData.team2Id]);
     
    // window.location.reload();
    localStorage.setItem('observation',JSON.stringify(this.observation))
    console.log("Status of Observation ------------:)",this.observation);
    
  }

  getGameData() {
    this.service.spinnerShow();
    var apireq;
    if (this.paramData.team1Id !== 'noId' && this.paramData.team2Id !== 'noId') {
      apireq = {
        teams      :   [this.paramData.team1Id, this.paramData.team2Id],
        type       :   '',
        gameId     :   this.paramData.gameId,
        gameType   :   this.compititionData.sports
      };
    } else if (this.paramData.team1Id !== 'noId') {
      apireq = {
        teams      :   [this.paramData.team1Id],
        type       :   '1',
        gameId     :   this.paramData.gameId,
        gameType   :   this.compititionData.sports
      };
    } else if (this.paramData.team2Id !== 'noId') {
      apireq = {
        teams      :   [this.paramData.team2Id],
        type       :   '2',
        gameId     :   this.paramData.gameId,
        gameType   :   this.compititionData.sports
      };
    } else {
      console.log('this.paramData match report els ===>>>');
      return;
    }
    if(this.compititionData.sports == 'Basketball'){
      this.service.postApi('game/basketballGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          // this.gameData = success;
          console.log("this.game details from match-report BasketBall component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Badminton'  && this.compititionData.sportType == 'double'){
      this.service.postApi('game/badmintonDoubleGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          // this.gameData = success;
          console.log("this.game details from match-report badminton component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Badminton'  && this.compititionData.sportType == 'single'){
      this.service.postApi('game/badmintonSingleGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          // this.gameData = success;
          console.log("this.game details from match-report badminton component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Generic' && this.compititionData.sportType == 'double'){
      this.service.postApi('game/genericDoubleGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          // this.gameData =  this.compititionData;
          console.log(" details from Match Report generic Double game component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Generic' && this.compititionData.sportType == 'single'){
      this.service.postApi('game/genericSingleGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          // this.gameData =  this.compititionData;
          console.log(" details from Match Report generic Double game component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Volleyball'){
      this.service.postApi('game/voleyballGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          console.log("gameData of  Voley Ball Component",this.gameData);
          // this.gameData =  this.compititionData;
          console.log(" details from Match Report Volley Ball game component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Table Tennis'){
      this.service.postApi('game/tableTennisSingleGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          console.log("gameData of  Table Tennis Component",this.gameData);
          // this.gameData =  this.compititionData;
          console.log(" details from Match Report Table Tennis game component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Cricket'){
      this.service.postApi('game/cricketGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          console.log("gameData of  Cricket Component",this.gameData);
          // this.gameData =  this.compititionData;
          console.log(" details from Match Report Cricket game component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Soccer'){
      this.service.postApi('game/soccerGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          console.log("gameData of Soccer Component",this.gameData)
          console.log(" details from Match Report Cricket game component", this.gameData );
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Generic' && this.compititionData.sportType == 'team'){
      this.service.postApi('game/genericTeamGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          console.log("gameData of Generic Team Component",this.gameData)
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
    else if(this.compititionData.sports == 'Swimming'){
      this.service.postApi('game/soccerGameDetails', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          this.gameData = {
            'gameData' : success,
            'competitionData' : this.compititionData,
          }
          console.log("gameData of Generic Team Component",this.gameData)
          this.runSelector = true;
        }
        this.service.spinnerHide();
      }, error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      });
    }
}


  
  editGameInfo () {

    if (this.editGameForm.invalid) {
      return;
    }
    let apireq = {
      gameId : this.paramData.gameId,
      // roundId : this.roundId,
      teamName1 : this.editGameForm.value.team1,
      teamName2 : this.editGameForm.value.team2,
      result1 : this.editGameForm.value.result1,
      result2 : this.editGameForm.value.result2,
      result : this.editGameForm.value.result1 + ' - ' + this.editGameForm.value.result2,
      matchTime : this.editGameForm.value.date === '' ? '' : (this.editGameForm.value.date.epoc * 1000),
      place : this.editGameForm.value.place,
    };
    // console.log('apireq  ==>>', apireq);
    this.service.postApi('organizer/editRound', apireq, 1).subscribe(success => {
      if (success.responseCode === 200) {
        this.service.toastrSucc(success.responseMessage);
        // this.getRoundGames ();
        $('#edit-game').modal('hide');
      } else {
        if (success.responseCode === 201) {
          this.service.toastrSucc( success.responseMessage);
        }
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }
}



