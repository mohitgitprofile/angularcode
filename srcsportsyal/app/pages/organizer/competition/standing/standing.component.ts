import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from './../../../../providers/mainService.service';
import { Component, OnInit } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

declare var $: any;
// declare var kendo: any;

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {
  cupLength: any = [1, 2, 3, 4, 5, 6];
  tiebreakerForm: FormGroup;
  createCupForm: FormGroup;
  autometicCalForm: FormGroup;
  manualCalForm: FormGroup;
  tiebreakersList: any;
  competitionId: any;
  groupList: any;
  cupList: any;
  noOfTeam = [2, 4, 8, 16, 32, 64, 128];
  bestArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  activeTabId: any;
  groupTeamList: any = [];
  paginationOfTeamList: any = {limit: 2, total: 0 };
  searchKey: any = '';
  limit: any = 2;
  pageNumber: any = 1;
  teamListToAddTeam: any;
  teamToAddInGroup: any = '';
  teamDataToDelete: any;
  grouporcup: any;
  teamToAddInCup: any = '';
  cupTeamList: any = [];
  groupStandingOrFixture = 'groupStanding';
  groupAllTeamList: any;
  teamPairArr: any = [];
  numberOfTeamsInEachRound: number;
  roundArr: any = [];
  finalAutometicCalenderData: any = [];
  dataArrForApi: any = [];
  roundWiseData: any = [];
  roundId: any;
  particularRoundGame: any = [];
  particularRoundGamelimit: any = 2;
  particularRoundGameTotal: any;
  particularRoundGameTotalCurrentPage: any = 1;
  gameId: any;
  selectedGroupDetail: any;
  editGameForm: FormGroup;
  currentRoundData: any = [];
  startDateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    todayBtnTxt: 'Today',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    disableSince: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()+1}
  };
  endDateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    todayBtnTxt: 'Today',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    disableSince: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()+1}
  };
  profileData: any;
  cupTeamData: any = [];
  configureRoundModalForm: FormGroup;
  roundConfigureData: any;
  cupRoundData: any;
  thirdAndForthPlace: any = [];

  constructor(
    public service: MainService,
    public activatedroute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.getCompetitionId();
    this.getGroupList();
    setTimeout(() => {
      this.getCupList();
    }, 100);
    this.getListOfTeamWithoutPagination();
    this.FormValidation();
    this.getTiebreakers();
  }

  FormValidation() {
    this.editGameForm = new FormGroup({
      date : new FormControl(''),
      place : new FormControl(''),
      team1 : new FormControl(''),
      result1 : new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
      result2 : new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
      team2 : new FormControl('')
    });

    this.createCupForm = new FormGroup({
      cupName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)
      ]),
      noOfTeam: new FormControl('', [Validators.required]),
      theBest: new FormControl('', [Validators.required]),
      TandFvalue: new FormControl(false)
    });

    this.tiebreakerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)
      ]),
      tiebreaker: new FormControl('', [Validators.required])
    });

    this.autometicCalForm = new FormGroup({
      againstTeams: new FormControl('', [Validators.required]),
      sameTeamMatches: new FormControl('', [Validators.required]),
      round1StartDate: new FormControl('', [Validators.required]),
      round2StartDate: new FormControl('', [Validators.required]),
      eachRoundTime: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]),
      selectPeriod: new FormControl('', [Validators.required])
    });

    this.manualCalForm = new FormGroup({
      noOfRounds: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]),
      noOfGamesPerRound: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ])
    });
    this.configureRoundModalForm = new FormGroup({
      name: new FormControl('', ),
      bestOf: new FormControl('', ),
      startDate: new FormControl('', ),
      endDate: new FormControl('', ),
    });
  }
  // team list without pagination

  getListOfTeamWithoutPagination() {
    this.service
      .getApi(
        'organizer/competition/getTeamInCompetitionWithoutPagination?userId=' +
        JSON.parse(localStorage.getItem('userDetailYala'))._id +
        '&competitionId=' +
        this.competitionId.id,
        1
      )
      .subscribe(
        success => {
          if (success.responseCode === 200) {
            this.teamListToAddTeam = success.result;
          }
        },
        error => {
          this.service.toastrErr('Something went wrong');
        }
      );
  }

  // get competition id

  getCompetitionId() {
    this.activatedroute.params.subscribe(param => {
      this.competitionId = param;
      console.log(this.competitionId)
    });
  }

  // get group list

  getGroupList() {
    this.service.spinnerShow();
    let apireq = {
      competitionId: this.competitionId.id
    };
    this.service.postApi('organizer/groupList', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          this.groupList = success.result;
          this.activeTabId = this.groupList[0] ? this.groupList[0]._id : '';
          this.selectedGroupDetail = this.groupList[0] ? this.groupList[0] : '';
          if (this.groupList.length > 0) {
            this.grouporcup = 'group';
            this.groupTeamListApi();
          } else {
            this.getCupList();
            this.grouporcup = 'cup';
            // this.cupTeamListApi();
          }
          this.service.spinnerHide();
        } else {
          this.service.spinnerHide();
        }
      },
      error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  manageActiveTab(groupDetail, grouporcup) {
    this.activeTabId = groupDetail._id;
    this.selectedGroupDetail = groupDetail;
    console.log('groupDetail ===>>>', this.activeTabId);
    this.grouporcup = grouporcup;
    this.pageNumber = 1;
    if (this.grouporcup === 'group') {
      this.groupStandingOrFixture = 'groupStanding';
      this.groupTeamListApi();
    } else {
      this.cupTeamListApi();
    }
  }

  standingClick() {
    this.groupStandingOrFixture = 'groupStanding';
    if (this.grouporcup === 'group') {
      this.groupTeamListApi();
    } else {
      this.cupTeamListApi();
    }
  }

  fixtureClick() {
    this.groupStandingOrFixture = 'groupFixture';
    this.getRoundData();
  }

  // group team list

  searchKeyUP() {
    if (this.searchKey === '') {
      this.groupTeamListApi();
    }
  }

  groupTeamListApi() {
    let apireq = {
      groupId: this.activeTabId,
      search: this.searchKey,
      limit: this.limit,
      pageNumber: this.pageNumber
    };
    this.service.postApi('organizer/teamListInAGroup', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          this.groupTeamList = success.allData;
          this.paginationOfTeamList.total = success.allData.length;
        } else {
          if (success.responseCode === 404) {
            this.groupTeamList = [];
            this.paginationOfTeamList['total'] = 0;
          }
        }
      },
      error => {
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  groupTeamPage(event) {
    this.paginationOfTeamList.currentPage = event;
  }

  groupTeamPageLimit() {
    this.paginationOfTeamList.limit = this.limit;
  }

  // delete group

  deleteGroup() {
    this.service.spinnerShow();
    let apireq = {
      groupId: this.activeTabId
    };
    this.service.postApi('organizer/deleteGroup', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          $('#delete-group').modal('hide');
          this.service.spinnerHide();
          this.service.toastrSucc(success.responseMessage);
          this.getGroupList();
        } else {
          this.service.spinnerHide();
          this.service.toastrErr(success.responseMessage);
        }
      },
      error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  // delete cup
  deletecup() {
    this.service.spinnerShow();
    let apireq = {
      cupId: this.activeTabId
    };
    this.service.postApi('organizer/deleteCup', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          $('#delete-cup').modal('hide');
          this.grouporcup = 'group';
          this.service.spinnerHide();
          this.service.toastrSucc(success.responseMessage);
          this.getCupList();
        } else {
          this.service.spinnerHide();
          this.service.toastrErr(success.responseMessage);
        }
      },
      error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  // get cup list

  getCupList() {
    this.service.spinnerShow();
    let apireq = {
      competitionId: this.competitionId.id,
      organizerId: JSON.parse(localStorage.getItem('userDetailYala'))._id
    };
    this.service.postApi('organizer/cupList', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          this.cupList = success.result;
          this.activeTabId = this.groupList.length
            ? this.groupList[0]._id
            : (this.cupList.length ? this.cupList[0]._id : '');
          console.log('cup list ===>>>', this.cupList);
          if (this.grouporcup === 'cup' && this.cupList.length) {
            this.cupTeamListApi();
          }
          if (this.groupList.length) {
            this.grouporcup = 'group';
          } else {
            if (this.cupList.length) {
              this.grouporcup = 'cup';
            } else {
              this.grouporcup = '';
            }
          }
          this.service.spinnerHide();
        } else {
          this.service.spinnerHide();
        }
      },
      error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  // add group modal tiebreaker drop down value

  getTiebreakers() {
    this.service.spinnerShow();
    let apireq = {
      userId: JSON.parse(localStorage.getItem('userDetailYala'))._id
    };
    this.service.postApi('organizer/config/standing/getAllStandingWithoutPagination', apireq, 1)
      .subscribe(
        success => {
          if (success.responseCode === 200) {
            this.tiebreakersList = success.result;
            this.service.spinnerHide();
          }
        },
        error => {
          this.service.spinnerHide();
          this.service.toastrErr('Something went wrong');
        }
      );
  }

  // add group modal

  addGroupModal() {
    this.tiebreakerForm.reset();
    this.tiebreakerForm.patchValue({
      tiebreaker: '',
      navigationtab: false
    });
    $('#add-group').modal({ backdrop: 'static', keyboard: false });
  }

  // add group api

  addGroup() {
    this.service.spinnerShow();
    if (this.tiebreakerForm.invalid) {
      this.service.spinnerHide();
      return;
    }
    let apireq = {
      competitionId: this.competitionId.id,
      organizerId: JSON.parse(localStorage.getItem('userDetailYala'))._id,
      groupName: this.tiebreakerForm.value.name,
      tieBreaker: {
        standingName: this.tiebreakerForm.value.tiebreaker.standingName,
        standingId: this.tiebreakerForm.value.tiebreaker._id
      }
      // inNavigationTab: this.tiebreakerForm.value.navigationtab
    };
    this.service.postApi('organizer/createGroup', apireq, 1).subscribe(
      success => {
        this.service.spinnerHide();
        if (success.responseCode === 201) {
          this.service.toastrSucc(success.responseMessage);
          this.getGroupList();
          $('#add-group').modal('hide');
        } else {
          this.service.toastrErr(success.responseMessage);
        }
      },
      error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  // create cup

  createCup() {
    this.service.spinnerShow();
    console.log('create cup form value ====>>>', this.createCupForm.value);
    if (this.createCupForm.invalid) {
      this.service.spinnerHide();
      return;
    }
    let apireq = {
      competitionId         : this.competitionId.id,
      organizerId           : JSON.parse(localStorage.getItem('userDetailYala'))._id,
      cupName               : this.createCupForm.value.cupName,
      noOfTeams             : this.createCupForm.value.noOfTeam,
      bestOf                : this.createCupForm.value.theBest,
      thirdAndFourthPlace   : this.createCupForm.value.TandFvalue
    };
    console.log('apireq ===>>>', apireq);
    this.service.postApi('organizer/createCup', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 201) {
          this.service.spinnerHide();
          this.getCupList();
          $('#create-cup').modal('hide');
          this.service.toastrSucc(success.responseMessage);
        } else {
          this.service.spinnerHide();
          this.service.toastrErr(success.responseMessage);
        }
      },
      error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  // cancel add cup
  addCupModal() {
    this.createCupForm.reset();
    this.createCupForm.patchValue({
      noOfTeam: '',
      theBest: '',
      TandFvalue: false
    });
  }

  // ********************************************************************************************************* //
  //                                                                                                           //
  //                                            add team to group                                              //
  //                                                                                                           //
  // ********************************************************************************************************* //

  addTeamToGroup() {
    console.log(this.teamToAddInGroup)
    this.service.spinnerShow();
    if (this.teamToAddInGroup === '') {
      this.service.spinnerHide();
      return;
    }
    let apireq = {
      groupId: this.activeTabId,
      teams: [
        {
          teamName: this.teamToAddInGroup.teamName,
          teamId: this.teamToAddInGroup._id,
          createdAt: new Date().toISOString()
        }
      ]
    };
    this.service.postApi('organizer/addTeamInGroup', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          this.service.spinnerHide();
          $('#add-group-team').modal('hide');
          this.groupTeamListApi();
          this.service.toastrSucc(success.responseMessage);
        } else {
          this.service.spinnerHide();
          this.service.toastrErr(success.responseMessage);
        }
      },
      error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  addTeam() {
    this.teamToAddInGroup = '';
    this.teamToAddInCup = '';
  }

  // ********************************************************************************************************* //
  //                                                                                                           //
  //                               delete Group Team modal and get data of team                                //
  //                                                                                                           //
  // ********************************************************************************************************* //

  deleteGroupTeamModal(teamData) {
    this.teamDataToDelete = teamData;
    $('#delete-group-team').modal({ backdrop: 'static', keyboard: true });
  }

  // ********************************************************************************************************* //
  //                                                                                                           //
  //                                       delete group team api                                               //
  //                                                                                                           //
  // ********************************************************************************************************* //

  deleteGroupTeam() {
    this.service.spinnerShow();
    let apireq = {
      groupId: this.activeTabId,
      teamId: this.teamDataToDelete.teams.teamId
    };
    this.service.postApi('organizer/deleteTeamInGroup', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          this.service.spinnerHide();
          $('#delete-group-team').modal('hide');
          this.groupTeamListApi();
          this.service.toastrSucc(success.responseMessage);
        } else {
          this.service.spinnerHide();
          this.service.toastrSucc(success.responseMessage);
        }
      },
      error => {
        this.service.spinnerHide();
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  // ********************************************************************************************************* //
  //                                                                                                           //
  //                                         cup team list api                                                 //
  //                                                                                                           //
  // ********************************************************************************************************* //

  cupTeamListApi() {
    let apireq = {
      cupId: this.activeTabId,
    };
    console.log('apireq ===>>>' , apireq);
    this.service.postApi('organizer/getGameListCupWise', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          this.cupTeamList = success.results;
          this.manageCupData(this.cupTeamList);
        }
      },
      error => {
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  manageCupData(cupTeamList) {
    this.thirdAndForthPlace = [];
    this.cupTeamData = [];
    var finaldata = [];
    var semiFinaldata = [];
    var quarterFinaldata = [];
    let sixtyFourthdata = [];
    let thirtyTwodata = [];
    let sixteenthdata = [];
    let eighthdata = [];
    cupTeamList.forEach((element, i) => {
        if (element.roundType === 'Final') {
          finaldata.push(element);
        } else {
          if (element.roundType === 'Semi Final') {
            semiFinaldata.push(element);
          } else {
            if (element.roundType === 'Quarter') {
              quarterFinaldata.push(element);
            } else {
              if (element.roundType === '64') {
                sixtyFourthdata.push(element);
              } else {
                if (element.roundType === '32') {
                  thirtyTwodata.push(element);
                } else {
                  if (element.roundType === '16') {
                    sixteenthdata.push(element);
                  } else {
                    if (element.roundType === '8') {
                      eighthdata.push(element);
                    }
                  }
                }
              }
            }
          }
        }
        if (element.roundType === 'thirdAndFourthPlace') {
          this.thirdAndForthPlace.push(element);
        }
    });
    console.log('this.thirdAndForthPlace ===>>>', this.thirdAndForthPlace);
    if (sixtyFourthdata.length) {
      this.cupTeamData.push(sixtyFourthdata);
    }
    if (thirtyTwodata.length) {
      this.cupTeamData.push(thirtyTwodata);
    }
    if (sixteenthdata.length) {
      this.cupTeamData.push(sixteenthdata);
    }
    if (eighthdata.length) {
      this.cupTeamData.push(eighthdata);
    }
    if (quarterFinaldata.length) {
      this.cupTeamData.push(quarterFinaldata);
    }
    if (semiFinaldata.length) {
      this.cupTeamData.push(semiFinaldata);
    }
    if (finaldata.length) {
      this.cupTeamData.push(finaldata);
    }
    console.log('this.cupTeamData ===>>>', this.cupTeamData);
  }

  getGameData(gameDetail) {
    console.log('gameDetail', gameDetail);
    console.log('gameDetail aaaa', 'organizer/matchReport/' + this.competitionId.id + '/' + gameDetail._id + '/' + (!!gameDetail.team1 ? gameDetail.team1 : 'noId') + '/' + (!!gameDetail.team2 ? gameDetail.team2 : 'noId'));
    this.router.navigate(['organizer/matchReport/' + this.competitionId.id + '/' + gameDetail._id + '/' + (!!gameDetail.team1 ? gameDetail.team1 : 'noId') + '/' + (!!gameDetail.team2 ? gameDetail.team2 : 'noId') ]);
  }

  roundConfigure(data, index) {
    this.roundConfigureData = {data: data, index: index};
    this.configureRoundModalForm.reset();
    console.log('round configure data ===>>>', this.roundConfigureData);
    $('#configureRound').modal({backdrop: 'static', keyboard: false});
    this.configureRoundModalForm.patchValue({
      name           : data[0].roundType === 'thirdAndFourthPlace' ? 'Third and Fourth Place' : (data.length === 1 ? 'Final round' : (data.length === 2 ? 'Semi Final round' : (data.length === 4 ? 'Quarter Final round' :(data.length + 'th round')))),
      bestOf         : data[0].games.length,
      startDate      : !!data[0].startDate ? {
          date       : {
            year       :    new Date((data[0].startDate)).getFullYear(),
            month      :    new Date((data[0].startDate)).getMonth() + 1,
            day        :    new Date((data[0].startDate)).getDate(),
          },
          epoc       : (new Date(data[0].startDate).getTime()) / 1000,
          formatted  : new Date((data[0].startDate)).getFullYear() + '-' + (new Date((data[0].startDate)).getMonth() + 1) + '-' + new Date((data[0].startDate)).getDate(),
          jsdate     : new Date((data[0].startDate)),
        } : '',
      endDate      : !!data[0].endDate ? {
        date       : {
          year       :    new Date((data[0].endDate)).getFullYear(),
          month      :    new Date((data[0].endDate)).getMonth() + 1,
          day        :    new Date((data[0].endDate)).getDate(),
        },
        epoc       : (new Date(data[0].endDate).getTime()) / 1000,
        formatted  : new Date((data[0].endDate)).getFullYear() + '-' + (new Date((data[0].endDate)).getMonth() + 1) + '-' + new Date((data[0].endDate)).getDate(),
        jsdate     : new Date((data[0].endDate)),
      } : '',
    });
    console.log('value to edit', this.configureRoundModalForm.value);
  }

  accept() {
    console.log('this.configureRoundModalForm.value===>>>', this.configureRoundModalForm.value);
    let apireq = {
                    cupId       :  this.activeTabId,
                    roundType   :  this.roundConfigureData.data[0].roundType ,
                    numOfRound  :  this.configureRoundModalForm.value.bestOf,
                    startDate   :  !!this.configureRoundModalForm.value.startDate ? (this.configureRoundModalForm.value.startDate.epoc * 1000) : '',
                    endDate     :  !!this.configureRoundModalForm.value.endDate ? (this.configureRoundModalForm.value.endDate.epoc * 1000) : '',
                 };
    console.log('apireq ===>>>', apireq);
    this.service.postApi('organizer/updateRoundGame', apireq, 1).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.service.toastrSucc(success.responseMessage);
        this.cupTeamListApi();
      }
      $('#configureRound').modal('hide');
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }

  addTeamToCupRound(data, whichTeam) {
    this.cupRoundData = {data : data, whichTeam : whichTeam};
    console.log(this.cupRoundData);
    $('#add-cup-team').modal({backdrop: 'static', keyboard: false});
  }


  // ********************************************************************************************************* //
  //                                                                                                           //
  //                                              add team to cup                                              //
  //                                                                                                           //
  // ********************************************************************************************************* //

  addTeamToCup() {
    var apireq;
    if (this.cupRoundData.whichTeam === 'team1') {
      apireq = {
        roundId     :   this.cupRoundData.data._id,
        teamName1   :   this.teamToAddInCup.teamName,
        team1   :   this.teamToAddInCup._id
      };
    } else {
      apireq = {
        roundId     :   this.cupRoundData.data._id,
        teamName2   :   this.teamToAddInCup.teamName,
        team2   :   this.teamToAddInCup._id
      };
    }
    console.log('apireq ===>>', apireq);
    // return;
    this.service.postApi('organizer/cupGameEdit', apireq, 1).subscribe(
      success => {
        if (success.responseCode === 200) {
          $('#add-cup-team').modal('hide');
          this.cupTeamListApi();
        }
      },
      error => {
        this.service.toastrErr('Something went wrong');
      }
    );
  }

  // ********************************************************************************************************* //
  //                                                                                                           //
  //                                     create autometic calender                                             //
  //                                                                                                           //
  // ********************************************************************************************************* //

  dragAndDrop(event) {
    this.service.spinnerShow();
    this.setRounds();
  }

  autometicCalNext() {
    if (!this.groupTeamList.length) {
      this.service.toastrErr('Please add teams first');
      return;
    }
    if (this.autometicCalForm.invalid) {
      return;
    }
    let apireq = {
      groupId: this.activeTabId
    };
    this.service.postApi('organizer/fetchData', apireq, 1).subscribe(success => {
      if (success.responseCode === 200) {
        this.groupAllTeamList = success.result[0].teams ? success.result[0].teams : [];
        this.setRounds();
      } else {
        this.service.toastrErr(success.responseMessage);
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }

  setRounds() {
    this.service.spinnerShow();
    for (let i = 0; i < this.groupAllTeamList.length; i++) {
      this.groupAllTeamList[i]['number'] = i + 1;
    }
    var totalRounds;
    if ((this.paginationOfTeamList.total % 2) === 0) {
      totalRounds = ((this.paginationOfTeamList.total - 1));
      if (totalRounds < 0) {
        totalRounds = 0;
      }
      this.autometicCalenderForEvenNoOfTeam(totalRounds);
    } else {
      totalRounds = (this.paginationOfTeamList.total);
      this.autometicCalenderForOddNoOfTeam(totalRounds);
    }
  }

  autometicCalenderForEvenNoOfTeam(totalRounds) {
    var pairGroupArr = [];
    for (let m = 0; m < totalRounds; m++) {
      pairGroupArr.push([]);
    }
    this.teamPairArr = [];
    var evenArr = [];
    var oddArr = [];
    var moreThanThreeEven = [];
    var moreThanThreeOdd = [];
    var lastindexArr = [];
    var lindex = [];
    var index = 1;
    for (let i = 0; i < this.groupAllTeamList.length; i++) {
      for (let j = i + 1; j < this.groupAllTeamList.length; j++) {
        if (i === 0) {
          this.teamPairArr.push({
            team1: this.groupAllTeamList[i],
            team2: this.groupAllTeamList[j]
          });
        } else {
          if (i === 1) {
            if (j % 2 === 0) {
              evenArr.push({
                team1: this.groupAllTeamList[i],
                team2: this.groupAllTeamList[j]
              });
            } else {
              oddArr.push({
                team1: this.groupAllTeamList[i],
                team2: this.groupAllTeamList[j]
              });
            }
            if (j === (this.groupAllTeamList.length - 1)) {
              var a = oddArr.concat(evenArr);
              this.teamPairArr = this.teamPairArr.concat(a);
            }
          } else {
            if (j < (this.groupAllTeamList.length - index)) {
              if ((j % 2) === 0) {
                moreThanThreeEven.push({
                  team1 : this.groupAllTeamList[i],
                  team2 : this.groupAllTeamList[j]
                });
              } else {
                moreThanThreeOdd.push({
                  team1 : this.groupAllTeamList[i],
                  team2 : this.groupAllTeamList[j]
                });
              }
            } else {
              if ((j % 2) === 0) {
                lindex.push({
                  team1: this.groupAllTeamList[i],
                  team2: this.groupAllTeamList[j]
                });
              } else {
                lastindexArr.push({
                  team1: this.groupAllTeamList[i],
                  team2: this.groupAllTeamList[j]
                });
              }
            }
            if (j === (this.groupAllTeamList.length - 1)) {
              var b;
              var c;
              var d;
              var m;
              if (i % 2 !== 0) {
                b = this.teamPairArr.concat(lindex);
                c = b.concat(moreThanThreeOdd);
                m = c.concat(lastindexArr);
                d = m.concat(moreThanThreeEven);
                this.teamPairArr = d;
              } else {
                b = this.teamPairArr.concat(lastindexArr);
                c = b.concat(moreThanThreeEven);
                m = c.concat(lindex);
                d = m.concat(moreThanThreeOdd);
                this.teamPairArr = d;
              }
            }
          }
        }
      }
      if (i >= 2) {
        index++;
        moreThanThreeEven = [];
        moreThanThreeOdd = [];
        lastindexArr = [];
        lindex = [];
      }
    }
    var breakSecondLoop = false;
    for (let team = 0; team < this.teamPairArr.length; team++) {
      for (let k = 0; k < pairGroupArr.length; k++) {
        if (!pairGroupArr[k].length) {
          for (let j = 0; j < (this.autometicCalForm.value.sameTeamMatches); j++) {
            pairGroupArr[k].push(this.teamPairArr[team]);
            if (this.teamPairArr[team].team1.teamName === '') {
              break;
            }
          }
          break;

        } else {
          breakSecondLoop = false;
          for (let p = 0; p < pairGroupArr[k].length; p++) {
            if (this.teamPairArr[team]['team1']['teamName'] === pairGroupArr[k][p]['team1']['teamName'] ||
              this.teamPairArr[team]['team1']['teamName'] === pairGroupArr[k][p]['team2']['teamName'] ||
              this.teamPairArr[team]['team2']['teamName'] === pairGroupArr[k][p]['team1']['teamName'] ||
              this.teamPairArr[team]['team2']['teamName'] === pairGroupArr[k][p]['team2']['teamName']) {
              breakSecondLoop = true;
              break;
            }
          }
          if (!breakSecondLoop) {
            for (let j = 0; j < (this.autometicCalForm.value.sameTeamMatches); j++) {
              pairGroupArr[k].push(this.teamPairArr[team]);
            }
            break;
          }
        }
      }
    }
    this.finalAutometicCalenderData = [];
    for (let j = 0; j < this.autometicCalForm.value.againstTeams; j++) {
      for (let i = 0; i < pairGroupArr.length; i++) {
        this.finalAutometicCalenderData.push(pairGroupArr[i]);
        // this.dataArrForApi.push(pairGroupArr[i]);
      }
    }
    if (this.autometicCalForm.value.selectPeriod === 'days') {
      var timestamp = 24 * 60 * 60 * 1000;
    } else {
      if (this.autometicCalForm.value.selectPeriod === 'hours') {
        var timestamp = 60 * 60 * 1000;
      } else {
        var timestamp = 60 * 1000;
      }
    }
    // return
    for (let i = 0; i < this.finalAutometicCalenderData.length; i++) {
      var keys = Object.keys(this.finalAutometicCalenderData[i][this.finalAutometicCalenderData[i].length - 1]);
      for (let m = 0; m < keys.length; m++) {
        if (keys[m] === 'startDate') {
          var isStartDatePresent = true;
          break;
        } else {
          var isStartDatePresent = false;
        }
      }
      if (isStartDatePresent) {
        this.finalAutometicCalenderData[i][this.finalAutometicCalenderData[i].length - 1]['startDate'] = (new Date(this.autometicCalForm.value.round1StartDate.jsdate).getTime() + (this.autometicCalForm.value.eachRoundTime * timestamp * i));
        this.finalAutometicCalenderData[i][this.finalAutometicCalenderData[i].length - 1]['endDate'] = (new Date(this.autometicCalForm.value.round2StartDate.jsdate).getTime() + (this.autometicCalForm.value.eachRoundTime * timestamp * i));
      } else {
        this.finalAutometicCalenderData[i].push({
          startDate: (new Date(this.autometicCalForm.value.round1StartDate.jsdate).getTime() + (this.autometicCalForm.value.eachRoundTime * timestamp * i)),
          endDate: (new Date(this.autometicCalForm.value.round2StartDate.jsdate).getTime() + (this.autometicCalForm.value.eachRoundTime * timestamp * i))
        });
      }
    }
    $('#automatic-calender').modal('hide');
    $('#autometicCalenderStep2').modal({backdrop: 'static', keyboard : false});
    if (this.groupAllTeamList[0].teamName === '') {
      this.groupAllTeamList = this.groupAllTeamList.splice(1, this.groupAllTeamList.length);
    }
    this.service.spinnerHide();
    // this.automaticCalenderApi()
  }

  autometicCalenderForOddNoOfTeam(totalRounds) {
    if (this.groupAllTeamList.length % 2 !== 0) {
      this.groupAllTeamList.unshift({teamName : '', teamId : ''});
    }
    this.autometicCalenderForEvenNoOfTeam(totalRounds);
  }

  changeStartDate(date, index) {
    console.log('hello index ===>>>', date, index);
    this.finalAutometicCalenderData[index][this.finalAutometicCalenderData[index].length - 1]['startDate'] = date.epoc * 1000;
    console.log('this.finalAutometicCalenderData===>>>', this.finalAutometicCalenderData);
  }

  changeendDate(date, index) {
    console.log('hello index ===>>>', date, index);
    this.finalAutometicCalenderData[index][this.finalAutometicCalenderData[index].length - 1]['endDate'] = date.epoc * 1000;
    console.log('this.finalAutometicCalenderData===>>>', this.finalAutometicCalenderData);
  }

  automaticCalenderApi () {
    // for (let i = 0; i < this.finalAutometicCalenderData.length; i++ ) {
    //   this.dataArrForApi[i] = this.finalAutometicCalenderData[i].slice(0, this.finalAutometicCalenderData[i].length - 1);
    // }
    console.log('this.finalAutometicCalenderData ===>>>', JSON.stringify(this.finalAutometicCalenderData));
    let apireq = {
        'type': 'dynamic',
        'competitionId': this.competitionId.id,
        'organizerId': JSON.parse(localStorage.getItem('userDetailYala'))._id,
        'groupId': this.activeTabId,
        'allData': this.finalAutometicCalenderData,
      };
      this.service.postApi('organizer/games', apireq, 1).subscribe(success => {
        if (success.responseCode === 200) {
          $('#autometicCalenderStep2').modal('hide');
          this.service.toastrSucc(success.responseMessage);
          this.getRoundData();
        } else {
          this.service.toastrErr(success.responseMessage);
        }
      }, error => {
        this.service.toastrErr('Something went wrong');
      });
  }

  // ********************************************************************************************************* //
  //                                                                                                           //
  //                                     create manual calender                                                //
  //                                                                                                           //
  // ********************************************************************************************************* //

  manualCalAccept() {
    if (this.manualCalForm.invalid) {
      return;
    }
    let apireq = {
      'competitionId': this.competitionId.id,
      'organizerId': JSON.parse(localStorage.getItem('userDetailYala'))._id,
      'groupId': this.activeTabId,
      'noOfGames': this.manualCalForm.value.noOfGamesPerRound,
      'noOfRounds': this.manualCalForm.value.noOfRounds
    }
    this.service.postApi('organizer/games', apireq, 1).subscribe(success => {
      if (success.responseCode === 200) {
        this.service.toastrSucc(success.responseMessage);
        $('#manuel-calender').modal('hide');
        this.getRoundData();
      } else {
        this.service.toastrErr(success.responseMessage);
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }

  getRoundData() {
    let apireq = {
      groupId : this.activeTabId,
      page : 1,
      limit : 10
    };
    this.service.postApi('organizer/getGameListRoundWise', apireq, 1).subscribe(success =>{
      if (success.responseCode === 200) {
        this.roundWiseData = success.results;
        this.roundId = success.results.length ? success.results[0]._id : '';
        this.getRoundGames();
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }

  getRoundsId(roundId) {
    this.roundId = roundId.target.value;
    console.log('this.roundId ==>>', this.roundId);
    this.getRoundGames();
  }

  getRoundGames () {
    let apireq = {
      roundId : this.roundId
    };
    this.service.postApi('organizer/roundDetails', apireq, 1).subscribe(success => {
      if (success.responseCode === 200) {
        this.particularRoundGame = success.roundData.games;
        // this.particularRoundGamelimit = 2;
        this.particularRoundGameTotal = success.roundData.games.length;
        // this.particularRoundGameTotalCurrentPage = 1;
      } else {
        if (success.responseCode === 501) {
          this.particularRoundGame = [];
          this.particularRoundGameTotal = 0;
        }
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }

  particularRoundGamePage(event) {
    this.particularRoundGameTotalCurrentPage = event;
  }

  deleteRound() {
    this.service.getApi('organizer/roundDelete/' + this.roundId, 1).subscribe(success => {
      if (success.responseCode === 200) {
        this.service.toastrSucc(success.responseMessage);
        $('#delete-round').modal('hide');
        this.getRoundData();
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }

  deleteGameModal(gameId) {
    this.gameId = gameId;
  }

  deleteGameApi () {
    let apireq = {
      'gameId': this.gameId._id,
      'roundId': this.roundId
    };
    this.service.postApi('organizer/deleteGame', apireq, 1).subscribe(success => {
      if (success.responseCode === 200  ) {
        this.service.toastrSucc(success.responseMessage);
        $('#delete-game').modal('hide');
        this.getRoundGames();
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }

  editGame(gameId) {
    // this.editGameForm.reset();
    this.gameId = gameId;
    console.log(this.gameId);
    // var splitResult = (this.gameId.result === '') ? ['', ''] : (this.gameId.result !== ' - ') ? this.gameId.result.split(' - ') : ['', ''];
    var date = this.gameId.matchTime === '' ? new Date().getTime() : (Number(this.gameId.matchTime));
    this.editGameForm.patchValue({
      date : {
              'date': {
                        'year': new Date(date).getFullYear(),
                        'month': new Date(date).getMonth() + 1,
                        'day': new Date(date).getDate()
                      },
              'jsdate': new Date(date).toISOString(),
              'formatted': new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate(),
              'epoc': date / 1000
            },
      place : this.gameId.place,
      result1 : this.gameId.result1,
      result2 : this.gameId.result2,
      team1 : this.gameId.teamName1,
      team2 : this.gameId.teamName2
    });
  }

  editGameInfo() {
    if (this.editGameForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.editGameForm.value));
    let apireq = {
      gameId : this.gameId._id,
      roundId : this.roundId,
      teamName1 : this.editGameForm.value.team1,
      teamName2 : this.editGameForm.value.team2,
      result1 : this.editGameForm.value.result1,
      result2 : this.editGameForm.value.result2,
      result : this.editGameForm.value.result1 + ' - ' + this.editGameForm.value.result2,
      matchTime : this.editGameForm.value.date === '' ? '' : (this.editGameForm.value.date.epoc * 1000),
      place : this.editGameForm.value.place,
    };
    this.service.postApi('organizer/editRound', apireq, 1).subscribe(success => {
      if (success.responseCode === 200) {
        this.service.toastrSucc(success.responseMessage);
        this.getRoundGames ();
        $('#edit-game').modal('hide');
      } else {
        if (success.responseCode === 201) {
          this.service.toastrErr(success.responseMessage);
        }
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });
  }

  exportCSV() {
    var data = [
      {
        team1: 'Team 1',
        team2: 'Team 2',
        result1: 'Result 1',
        result2: 'Result 2',
        place: 'place'
      }
    ];
    for (let i = 0; i < this.particularRoundGame.length; i++) {
      data.push({
        team1: this.particularRoundGame[i].teamName1 || 'N/A',
        team2: this.particularRoundGame[i].teamName2 || 'N/A',
        result1: this.particularRoundGame[i].result1 || 'N/A',
        result2: this.particularRoundGame[i].result2 || 'N/A',
        place: this.particularRoundGame[i].place || 'N/A'
      });
      if ( i + 1 === this.particularRoundGame.length) {
        new Angular5Csv(data, 'My Report');
      }
    }
  }

  downloadPdf() {
    this.service.getApi(`users/getDetail?_id=${JSON.parse(localStorage.getItem('userDetailYala'))._id}`, 1).subscribe(response => {
      if (response.responseCode === 200) {
        this.profileData = response.result;
      }
    });
    this.currentRoundData = this.roundWiseData.filter((data) => {
      return data._id === this.roundId;
    });
    $('#pdfDownloadModal').modal({backdrop: 'static', keyboard: false});
  }

  downloadPDF(id) {
    setTimeout(() => {
      this.service.printFun(id);
    //   kendo.drawing
    //  .drawDOM('#' + id,
    //  {
    //  paperSize: "A4",
    //  margin: { top: "0.8cm", bottom: "1cm" },
    //  scale: 0.8,
    //  height: 400,
    //  // landscape : false,
    //  // border: "none",
    //  // overflow:'initial'
    //  })
    //  .then(function (group) {
    //  kendo.drawing.pdf.saveAs(group, "Prescription.pdf")
    //  });
    }, 500);
  }

  //******************************************************************************************************* //
  //                                                                                                           //
  //                                        calender reset form                                                //
  //                                                                                                           //
  // ********************************************************************************************************* //

  CalenderFormReset() {
    this.manualCalForm.reset();
    this.autometicCalForm.reset();
    this.autometicCalForm.patchValue({
      againstTeams: '',
      sameTeamMatches: '',
      selectPeriod: ''
    });
  }

  sliceFunction(data) {
    if (data) {
      if (String(data).length > 4) {
        return (data.substring(0, 4) + '..');
      }
    } else {
      return data;
    }
  }
}

