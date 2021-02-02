import {
  Component,
  OnInit,
  ActivatedRoute,
  MainService,
  FormGroup,
  FormBuilder,
  Validators,
  ViewChild,
  ElementRef,
  Router
} from '../../../../index';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { GlobalConstant } from '../../../../global/global.constant';

declare var $: any;
@Component({
  selector: 'app-comp-configure',
  templateUrl: './comp-configure.component.html',
  styleUrls: ['./comp-configure.component.css']
})
export class CompConfigureComponent implements OnInit {
  /**
   * Competition List
   */
  userDetails: any = {};
  competitionDetObj: any = {
    competitionId: '',
    competitionDetail: {},
    compImage: ''
  };
  competitionForm: FormGroup;
  list: any = {
    periodList: [],
    divisionList: [],
    clubList: [],
    venueList: [],
    sportsList: [],
    statusList: GlobalConstant.statusArr
  };
  startDateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  endDateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  date: any = { startDate: '', endDate: '' };
  tabRole: any = 1;
  dateErr: boolean;
  visibleColumns: any = [
    { item_id: 1, item_text: 'Points' },
    { item_id: 2, item_text: 'Played matches' },
    { item_id: 3, item_text: 'Won matches' },
    { item_id: 4, item_text: 'Lost matches' },
    { item_id: 5, item_text: 'For' },
    { item_id: 6, item_text: 'Against' },
    { item_id: 7, item_text: 'Difference' },
    { item_id: 8, item_text: 'Periods won' },
    { item_id: 9, item_text: 'Periods lost' },
    { item_id: 10, item_text: 'Difference of partials' }
  ];
  dropdownSettings: any = GlobalConstant.multidropDownSettings;
  /**
   * End Competition List
   */

  /**
   * Prize List
   */
  addPrizeForm: FormGroup;
  sportList: any;
  updPrizeData: any = { isAddPrize: false, currId: '' };
  prizeDet: any = { docs: [] };
  prizePage: any = {
    currPage: 1,
    limit: GlobalConstant.paginationLimit,
    search: '',
    limitChangeArr: GlobalConstant.limitChangeArr,
    entryLimit: GlobalConstant.limitChangeArr[0]
  };
  // prizePagination: any = {}
  /**
   * End Prize List
   */

  /**
   *  File List
   */
  filePage: any = {
    currPage: 1,
    limit: GlobalConstant.paginationLimit,
    search: '',
    limitChangeArr: GlobalConstant.limitChangeArr,
    entryLimit: GlobalConstant.limitChangeArr[0]
  };
  fileDet: any = { docs: [] };
  @ViewChild('compConfAddFileInput')
  myInputVariable: ElementRef;
  /**
   * End File List
   */

  /**
   *  Match & Standing List
   */
  MatchStandingId: any;
  matchId: any;
  matchList: any = { docs: [] };
  standinId: any;
  criteriaArr: any = [{ criteria: 'Points', order: 'highToLow' }];
  editStandingForm: FormGroup;
  visibleColumnsData: any = [];
  editStandingData: any;
  standingList: any = { docs: [] };
  page: any = {
    currPage: 1,
    limit: GlobalConstant.paginationLimit,
    search: '',
    limitChangeArr: GlobalConstant.limitChangeArr,
    entryLimit: GlobalConstant.limitChangeArr[0]
  };
  updFileData: any = { isAdd: true, currId: '' };
  addFileData: any = { name: '', file: '', size: 0, ext: '' };
  addStandingData: any = { name: '', sports: '' };
  addMatchData: any = { name: '', sportName: '' };
  editMatchData: any = { name: '', startDate: '', endDate: '' };
  basketball: any = {
    basketballName : '',
    sports : '',
    basketballDuration : 0,
    basketballwin : 0,
    basketballtie : 0,
    basketballloss : 0,
    basketballbaskets: false,
    basketballbasketsInput : 0,
    basketballfouls : false,
    basketballfoulsInput : 0
  };
  cricket: any = {
    tie: '',
    cricketName: '',
    sports: '',
    duration: '',
    win: '',
    cricketloss: '',
    ballFacedInput: '',
    runsInput: '',
    foursInput: '',
    sixInput: '',
    six: false,
    runs: false,
    ballFaced: false,
    fours: false
  };
  soccer: any= {
    soccerName: '',
    soccerSport: '',
    soccerDuration: 0,
    soccerwin: 0,
    soccerTie: 0,
    soccerLoss: 0,
    soccerGoal: false,
    soccerGoalsInput: 0,
    soccerShots: false,
    soccerShotsInput: 0,
    soccerYellow: false,
    soccerYellowCardInput: 0,
    soccerRedCard: false,
    soccerRedCardInput: 0,
    soccerOffSide: false,
    soccerOffSideInput: 0,
    soccerCornerKicks: false,
    soccerCornerKicksInput: 0,
    soccerGoalKeeperSaves: false,
    soccerGoalKeeperSavesInput: 0,
    soccerMVP: false,
    soccerMVPInput: 0
  };
  volleyball: any = {
    volleyballName: '',
    volleyballSports: '',
    volleyballDuration: 0,
    volleyballwin: 0,
    volleyballTie: 0,
    volleyballLoss: 0,
    set1Score: false,
    set1ScoreInput: 0,
    set1Timeout: false,
    volleyballset1TimeoutInput: 0,
    set2Score: false,
    volleyballSet2ScoreInput: 0,
    volleyballSet2Timeout: false,
    volleyballSet2TimeoutInput: 0,
    volleyballset3score: false,
    volleyballset3ScoreInput: 0,
    volleyballset3timeout: false,
    volleyballset3TimeoutInput: 0,
    volleyballset4score: false,
    volleyballset4ScoreInput: 0,
    volleyballset4timeout: false,
    volleyballset4TimeoutInput: 0,
    volleyballset5score: false,
    volleyballset5ScoreInput: 0,
    volleyballset5timeout: false,
    volleyballset5TimeoutInput: 0
  };
  swimming: any = {
    swimmingName : '',
    swimmingSports : '',
    swimmingDuration : 0,
    swimmingwin : 0,
    swimmingTie : 0,
    swimmingLoss : 0,
    swimmingLane : false,
    swimmingLaneInput : 0,
    swimmingPlace : false,
    swimmingPlaceInput : 0,
    swimmingTime : false,
    swimmingTimeInput : 0
  };
  other: any = {
    otherName : '',
    otherSports : '',
    otherDuration : 0,
    otherwin : 0,
    otherTie : 0,
    otherLoss : 0,
    otherset1Score : false,
    otherset1ScoreInput : 0,
    otherset1Timeout : false,
    otherset1TimeoutInput : 0,
    otherset2Score : false,
    otherSet2ScoreInput : 0,
    otherSet2Timeout : false,
    otherSet2TimeoutInput : 0,
    otherset3score : false,
    otherset3ScoreInput : 0,
    otherset3timeout : false,
    otherset3TimeoutInput : 0,
    otherset4score : false,
    otherset4ScoreInput : 0,
    otherset4timeout : false,
    otherset4TimeoutInput : 0,
    otherset5score : false,
    otherset5ScoreInput : 0,
    otherset5timeout : false,
    otherset5TimeoutInput : 0,
    otherset6score : false,
    otherset6ScoreInput : 0,
    otherset6timeout : false,
    otherset6TimeoutInput : 0,
    otherset7score : false,
    otherset7ScoreInput : 0,
    otherset7timeout : false,
    otherset7TimeoutInput : 0
  };
  /**
   * End Match & Standing
   */

  constructor(
    private route: ActivatedRoute,
    private service: MainService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    /** Disable date for start date  */
    let currDate = new Date();
    currDate.setDate(currDate.getDate() - 1);
    this.startDateOptions = JSON.parse(JSON.stringify(this.startDateOptions));
    this.startDateOptions.disableUntil = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: currDate.getDate()
    };
    this.endDateOptions.disableUntil = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: currDate.getDate()
    };
    // this.endDateOptions.disableUntil = {year: new Date().getFullYear(), month: }

    /** Competition Form Define  */
    this.competitionForm = this.fb.group({
      compName: ['', Validators.compose([Validators.required])],
      venue: ['', Validators.required],
      division: ['', Validators.required],
      period: ['', Validators.required],
      sports: ['', Validators.required],
      status: ['', Validators.required],
      club: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
    this.editStandingForm = this.fb.group({
      standingName: ['', Validators.compose([Validators.required])],
      sport: ['', Validators.required],
      visibleColumns: ['', Validators.required],
      status: ['', Validators.required]
      // sports: ['', Validators.required],
      // status: ['', Validators.required],
      // club: ['', Validators.required],
      // startDate: [null, Validators.required],
      // endDate: [null, Validators.required]
    });
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'));
    /** URL Params Get (Competition Id)  */
    let self = this;
    this.route.params.subscribe(async params => {
      this.competitionDetObj.competitionId = params['id'];
      this.tabRole = params['tab'];
      console.log(
        'Id--->>',
        this.competitionDetObj.competitionId + '    tabRole-->>',
        this.tabRole
      );
      if (this.tabRole == '1') {
        // Prize List

        this.prizeListApi();
        // End Prize List
        // File List
        this.fileListApi();
        // End File List

        // await self.multPostApiCall()
      } else if (params['tab'] == '2') {
      } else if (params['tab'] == '3') {
        this.page = {
          currPage: 1,
          limit: GlobalConstant.paginationLimit,
          search: '',
          limitChangeArr: GlobalConstant.limitChangeArr,
          entryLimit: GlobalConstant.limitChangeArr[0]
        };

        this.getStandingList();
      } else if (params['tab'] == '4') {
        this.page = {
          currPage: 1,
          limit: GlobalConstant.paginationLimit,
          search: '',
          limitChangeArr: GlobalConstant.limitChangeArr,
          entryLimit: GlobalConstant.limitChangeArr[0]
        };
        this.getMatchList();
      }
      this.initializeAddPrizeForm();
      await self.multGetApiCall();

      this.getCompetitionDetailApi();
    });
    console.log('this =>', this);

    this.getAllSportList();
  }

  // get all sport list

  getAllSportList() {
    this.service.spinnerShow();
    let apireq = {
      userId: this.userDetails._id
    };
    this.service
      .postApi('organizer/getSportWithoutPagination', apireq, 1)
      .subscribe(
        success => {
          console.log('success ===>>>>', success);
          if (success.responseCode === 200) {
            this.service.spinnerHide();
            this.sportList = success.result;
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

  // ************ Get Venue, Sports, Clubs Api ********* //
  multGetApiCall() {
    // console.log('multiple get api ')
    return new Promise((resolve, reject) => {
      this.service
        .multipleGetApi(
          `data/selectClub?userId=${this.userDetails._id}`,
          `data/selectVenue?userId=${this.userDetails._id}`,
          `organizer/selectSport?userId=${this.userDetails._id}`,
          `organizer/selectPeriod?userId=${this.userDetails._id}`,
          `organizer/selectDivision?userId=${this.userDetails._id}`
        )
        .subscribe(responseList => {
          // console.log(JSON.stringify(responseList))
          let [
            clubResponse,
            venueResponse,
            sportResponse,
            periodResponse,
            divisionResponse
          ] = responseList;
          if (
            clubResponse['responseCode'] == 200 &&
            venueResponse['responseCode'] == 200 &&
            sportResponse['responseCode'] == 200 &&
            periodResponse['responseCode'] == 200 &&
            divisionResponse['responseCode'] == 200
          ) {
            this.list.clubList = clubResponse['result'];
            this.list.venueList = venueResponse['result'];
            this.list.sportsList = sportResponse['result'];
            this.list.periodList = periodResponse['result'];
            this.list.divisionList = divisionResponse['result'];
            resolve(true);
          }
        });
    });
  }
  // ************ End Get Venue, Sports, Clubs Api ********* //

  // **************** Get Competition Detail Api *********** //
  getCompetitionDetailApi() {
    console.log('Competition');
    let compData = {
      userId: this.userDetails._id,
      competitionId: this.competitionDetObj.competitionId
    };
    this.service
      .postApi(`organizer/competition/getACompetition`, compData, 1)
      .subscribe(response => {
        if (response.responseCode == 200) {
          this.competitionDetObj.competitionDetail = response.result;
          let compD = this.competitionDetObj.competitionDetail;
          this.competitionForm.patchValue({
            compName: compD.competitionName,
            venue: compD.venue,
            status: compD.status,
            sports: this.list.sportsList.filter(
              item => item.sportName == compD.sports
            )[0]._id,
            division: compD.division,
            period: compD.period,
            club: compD.club
            // startDate: compD.startDate || null,
            // endDate: compD.endDate || null
          });
          if (compD.startDate && compD.endDate) {
            let date = new Date(compD.startDate);
            let date1 = new Date(compD.endDate);
            this.competitionForm.patchValue({
              startDate: {
                date: {
                  year: date.getFullYear(),
                  month: date.getMonth() + 1,
                  day: date.getDate()
                },
                formatted: compD.startDate,
                epoc: date.getTime() / 1000
              },
              endDate: {
                date: {
                  year: date1.getFullYear(),
                  month: date1.getMonth() + 1,
                  day: date1.getDate()
                },
                formatted: compD.endDate,
                epoc: date1.getTime() / 1000
              }
            });
          }
          this.competitionDetObj.compImage = compD.imageURL
            ? compD.imageURL
            : '';
        }
      });
  }
  // **************** End Get Competition Detail Api *********** //

  // ********* Return Competition form control **************** //
  get compForm() {
    return this.competitionForm.controls;
  }
  // ********* End Return Competition form control ************* //

  // ********* Return Standing form control **************** //
  get standingForm() {
    return this.editStandingForm.controls;
  }
  // ********* End Return Competition form control ************* //

  fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log(e.target.result)
        this.competitionDetObj.compImage = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onStartDateChanged(event) {
    // console.log('start date value change => ', event)
    setTimeout(() => {
      // console.log(this.competitionForm.value)
      if (
        this.competitionForm.value.startDate &&
        this.competitionForm.value.endDate
      ) {
        if (
          this.competitionForm.value.startDate.epoc >
          this.competitionForm.value.endDate.epoc
        ) {
          this.dateErr = true;
        } else {
          this.dateErr = false;
        }
      }
    }, 300);
  }

  onEndDateChanged(event) {
    // console.log('end date value change => ', event)
    setTimeout(() => {
      // console.log(this.competitionForm.value)
      if (
        this.competitionForm.value.startDate &&
        this.competitionForm.value.endDate
      ) {
        if (
          this.competitionForm.value.startDate.epoc >
          this.competitionForm.value.endDate.epoc
        ) {
          this.dateErr = true;
        } else {
          this.dateErr = false;
        }
      }
    }, 300);
  }

  // ******** Update Competition Detail Api (Configure) *********** //
  updateCompDetail() {
    // console.log(this.competitionDetObj.compImage)
    let formValue = this.competitionForm.value;
    // console.log(formValue)
    let arr = this.list.sportsList.filter(x => x._id == formValue.sports);
    let updateCompData = {
      competitionId: this.competitionDetObj.competitionId,
      competitionName: formValue.compName,
      venue: formValue.venue,
      division: formValue.division,
      period: formValue.period,
      sports: arr[0].sportName,
      sportType: arr[0].sportType,
      startDate: formValue.startDate.formatted,
      endDate: formValue.endDate.formatted,
      status: formValue.status,
      club: formValue.club,
      imageURL: this.competitionDetObj.compImage
    };
    // console.log(JSON.stringify(updateCompData))
    this.service
      .postApi(`organizer/competition/configureCompetition`, updateCompData, 1)
      .subscribe(response => {
        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage);
          window.history.back();
        }
      });
  }
  // ******** End Update Competition Detail Api (Configure) ********* //

  /**
   * ************************************************************************** PRIZE LIST ADD/EDIT/DELETE/UPDATE **************************************************************************
   */
  initializeAddPrizeForm() {
    this.addPrizeForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      value: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,4})?$/)
        ])
      ],
      description: ['', Validators.compose([Validators.required])]
    });
  }

  addPrizeModal() {
    this.addPrizeForm.reset();
    this.updPrizeData.isAddPrize = true;
    $('#compConfAddPrize').modal({ backdrop: 'static' });
  }

  get prizeF() {
    return this.addPrizeForm.controls;
  }

  onAddPrize(isAdd) {
    let formData = this.addPrizeForm.value;
    let data = {
      competitionId: this.competitionDetObj.competitionId,
      prizeDetails: {
        name: formData.name,
        value: formData.value,
        description: formData.description
      }
    };
    let currUrl = '';
    if (isAdd === 1) {
      currUrl = 'organizer/competition/addPrize';
    } else if (isAdd === 2) {
      currUrl = 'organizer/competition/editPrize';
      data.prizeDetails['_id'] = this.updPrizeData.currId;
    }
    this.service.postApi(currUrl, data, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        $('#compConfAddPrize').modal('hide');
        this.prizeListApi();
      }
    });
  }

  prizeListApi() {
    let data = {
      page: this.prizePage.currPage,
      limit: this.prizePage.limit,
      search: this.prizePage.search
    };
    this.service
      .postApi(
        `organizer/competition/getPrizeList?competitionId=${
          this.competitionDetObj.competitionId
        }`,
        data,
        1
      )
      .subscribe(response => {
        if (response.responseCode == 200 || response.responseCode == 201) {
          this.prizeDet = response.result;
        }
      });
  }

  editPrizeModal(id) {
    this.updPrizeData = Object.assign({}, { isAddPrize: false, currId: id });
    this.service
      .getApi(
        `organizer/competition/getAPrize?competitionId=${
          this.competitionDetObj.competitionId
        }&prizeId=${this.updPrizeData.currId}`,
        1
      )
      .subscribe(response => {
        if (response.responseCode == 200) {
          let prizeDetail = response.result.prize[0];
          this.addPrizeForm.patchValue({
            name: prizeDetail.name,
            value: prizeDetail.value,
            description: prizeDetail.description
          });
          $('#compConfAddPrize').modal({ backdrop: 'static' });
        }
      });
  }

  onPrizePageChange(page) {
    this.prizePage.currPage = page;
    this.prizeListApi();
  }

  onPrizeSearch(val, event) {
    this.prizePage.currPage = 1;
    if (val === 1) {
      if (!this.prizePage.search || event.keyCode == 13) this.prizeListApi();
    } else if (val === 2) this.prizeListApi();
  }

  onPrizeLimitChange() {
    this.prizePage.currPage = 1;
    this.prizePage.limit = Number(this.prizePage.entryLimit);
    this.prizeListApi();
  }

  deletePrizeModal(id) {
    this.updPrizeData.currId = id;
    $(`#compConfDelPrize`).modal({ backdrop: 'static' });
  }

  onDeletePrize() {
    let data = {
      competitionId: this.competitionDetObj.competitionId,
      prizeDetails: {
        _id: this.updPrizeData.currId
      }
    };
    this.service
      .postApi(`organizer/competition/deletePrize`, data, 1)
      .subscribe(response => {
        if (response.responseCode == 204) {
          this.service.toastrSucc(response.responseMessage);
          $(`#compConfDelPrize`).modal('hide');
          this.prizeListApi();
        }
      });
  }

  /**
   * ************************************************************************** END PRIZE **************************************************************************
   */

  /**
   * ************************************************************************** FILE LIST ADD/EDIT/DELETE/UPDATE **************************************************************************
   */

  addStandingModal() {
    this.addStandingData = Object.assign({}, { name: '', sports: '' });
  }

  addFileModal() {
    this.updFileData = Object.assign({}, { isAdd: true, currId: '' });
    this.addFileData = Object.assign(
      {},
      { name: '', file: '', size: 0, ext: '' }
    );
    // console.log(this.myInputVariable.nativeElement.files)
    this.myInputVariable.nativeElement.value = '';
    // console.log(this.myInputVariable.nativeElement.files)
    $(`#compConfAddFile`).modal({ backdrop: 'static' });
  }

  async onfileChangeEvent(fileInput: any) {
    // console.log(fileInput)
    let fileData = await this.service.fileChangeEvent(fileInput);
    // console.log(fileData)
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    this.addFileData.size = fileData['total'];
    // this.addFileData.file = fileData['target']['result']
    if (this.addFileData.size == 0) this.addFileData.size = '0 Byte';
    var i = Number(
      Math.floor(Math.log(this.addFileData.size) / Math.log(1024))
    );
    let size =
      Math.round(this.addFileData.size / Math.pow(1024, i)) + ' ' + sizes[i];
    // console.log(fileData['target'])
    this.addFileData = Object.assign(
      {},
      {
        name: this.addFileData.name,
        file: fileData['target']['result'],
        size: size,
        ext: fileInput.target.files[0].name.split(/\.(?=[^\.]+$)/)[1]
      }
    );
  }

  onAddFile(isAdd) {
    let currUrl = '';
    let data = {
      competitionId: this.competitionDetObj.competitionId,
      fileDetails: {
        name: this.addFileData.name + '.' + this.addFileData.ext,
        size: this.addFileData.size,
        file: this.addFileData.file
      }
    };
    if (isAdd === 1) {
      currUrl = 'organizer/competition/addFile';
    } else if (isAdd === 2) {
      currUrl = 'organizer/competition/editFile';
      data.fileDetails['_id'] = this.updFileData.currId;
    }
    this.service.postApi(currUrl, data, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage);
        $(`#compConfAddFile`).modal('hide');
        this.fileListApi();
      }
    });
  }

  fileListApi() {
    let data = {
      page: this.filePage.currPage,
      limit: this.filePage.limit,
      search: this.filePage.search
    };
    this.service
      .postApi(
        `organizer/competition/getFileList?competitionId=${
          this.competitionDetObj.competitionId
        }`,
        data,
        1
      )
      .subscribe(response => {
        if (response.responseCode == 200) {
          this.fileDet = response.result;
        }
      });
  }

  onFileLimitChange() {
    this.filePage.currPage = 1;
    this.filePage.limit = Number(this.filePage.entryLimit);
    this.fileListApi();
  }

  onFileSearch(val, event) {
    this.filePage.currPage = 1;
    if (val === 1) {
      if (!this.filePage.search || event.keyCode == 13) this.fileListApi();
    } else if (val === 2) this.fileListApi();
  }

  onFilePageChange(page) {
    this.filePage.currPage = page;
    this.fileListApi();
  }

  deleteFileModal(id) {
    this.updFileData.currId = id;
    $(`#compConfDelFile`).modal({ backdrop: 'static' });
  }

  onDeleteFile() {
    let data = {
      competitionId: this.competitionDetObj.competitionId,
      fileDetails: {
        _id: this.updFileData.currId
      }
    };
    this.service
      .postApi(`organizer/competition/deleteFile`, data, 1)
      .subscribe(response => {
        if (response.responseCode == 204) {
          this.service.toastrSucc(response.responseMessage);
          $(`#compConfDelFile`).modal('hide');
          this.fileListApi();
        }
      });
  }

  editFileModal(id) {
    this.updFileData = Object.assign({}, { isAdd: false, currId: id });
    this.addFileData = Object.assign(
      {},
      { name: '', file: '', size: 0, ext: '' }
    );
    // console.log(this.myInputVariable.nativeElement.files)
    this.myInputVariable.nativeElement.value = '';
    this.service
      .getApi(
        `organizer/competition/getAFile?competitionId=${
          this.competitionDetObj.competitionId
        }&fileId=${this.updFileData.currId}`,
        1
      )
      .subscribe(response => {
        if (response.responseCode == 200) {
          let fileData = response.result.file[0];
          this.addFileData = Object.assign(
            {},
            {
              name: fileData.name.split(/\.(?=[^\.]+$)/)[0],
              file: fileData.file,
              size: fileData.size,
              ext: fileData.name.split(/\.(?=[^\.]+$)/)[1]
            }
          );
          $(`#compConfAddFile`).modal({ backdrop: 'static' });
        }
      });
  }
  /**
   * ************************************************************************** END FILE **************************************************************************
   */

  changeTab(val) {
    if (val == 3) {
      this.getStandingList();
    }

    if (val == 4) {
      this.getMatchList();
    }
    this.router.navigate([
      '/organizer/compConfigure',
      this.competitionDetObj.competitionId,
      val
    ]);
  }

  // Option Tab
  onSavecompOption() {
    let data = {
      clubRegistration: this.competitionDetObj.competitionDetail
        .clubRegistration,
      allowComment: this.competitionDetObj.competitionDetail.allowComment,
      allowPublicToFollow: this.competitionDetObj.competitionDetail
        .allowPublicToFollow
    };
    this.service
      .postApi(
        `organizer/competition/optionCompetition?competitionId=${
          this.competitionDetObj.competitionId
        }`,
        data,
        1
      )
      .subscribe(response => {
        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage);
          this.getCompetitionDetailApi();
        }
      });
  }

  /**
   * ************************************************************************** STANDING LIST ADD/EDIT/DELETE/UPDATE **************************************************************************
   */
  createStandingFunc() {
    let data = {
      userId: this.userDetails._id,
      standingName: this.addStandingData.name,
      sport: this.addStandingData.sports
    };
    this.service
      .postApi(`organizer/config/standing/addStanding`, data, 1)
      .subscribe(response => {
        $('#add_standing').modal('hide');
        if (response.responseCode == 201) {
          this.service.toastrSucc(response.responseMessage);
          this.getStandingList();
        }
      });
  }

  getStandingList() {
    let data = {
      userId: this.userDetails._id,
      page: this.page.currPage,
      limit: this.page.limit,
      search: this.page.search
    };
    this.service
      .postApi(`organizer/config/standing/getAllStanding`, data, 1)
      .subscribe(response => {
        if (response.responseCode == 200) {
          this.standingList = response.result;
        }
      });
  }

  onStandingSearch(val, event) {
    this.page.currPage = 1;
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13) this.getStandingList();
    } else if (val === 2) this.getStandingList();
  }

  editStandingModal(standing) {
    this.standinId = standing._id;
    $('#edit_standing').modal('show');
    this.editStandingForm.patchValue({
      standingName: standing.standingName,
      sport: standing.sport,
      visibleColumns: standing.visibleColumns
    });
    this.criteriaArr = standing.criterias;
  }

  visibleFunc() {
    this.visibleColumns = [
      { item_id: 1, item_text: 'Points' },
      { item_id: 2, item_text: 'Played matches' },
      { item_id: 3, item_text: 'Won matches' },
      { item_id: 4, item_text: 'Lost matches' },
      { item_id: 5, item_text: 'For' },
      { item_id: 6, item_text: 'Against' },
      { item_id: 7, item_text: 'Difference' },
      { item_id: 8, item_text: 'Periods won' },
      { item_id: 9, item_text: 'Periods lost' },
      { item_id: 10, item_text: 'Difference of partials' }
    ];
    if (this.editStandingData.visibleColumns.length) {
      this.visibleColumnsData = this.editStandingData.visibleColumns;
    }
    // console.log('visibleColumnsData =>' + JSON.stringify(this.visibleColumnsData))
    // console.log('visibleColumns =>' + JSON.stringify(this.visibleColumns))
  }

  updateStandingFunc(standing) {
    $('#edit_standing').modal('show');
    let standingFormData = this.editStandingForm.value;
    let data = {
      userId: this.userDetails._id,
      standingDetails: {
        _id: this.standinId,
        standingName: standingFormData.standingName,
        sport: standingFormData.sport,
        visibleColumns: standingFormData.visibleColumns,
        criterias: this.criteriaArr
      }
    };
    this.service
      .postApi(`organizer/config/standing/editStanding`, data, 1)
      .subscribe(response => {
        $('#edit_standing').modal('hide');
        if (response.responseCode == 201) {
          this.service.toastrSucc(response.responseMessage);
          this.getStandingList();
        }
      });
  }

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getStandingList();
  }

  onLimitChange() {
    this.page.currPage = 1;
    this.page.limit = Number(this.page.entryLimit);
    this.getStandingList();
  }

  addOtherCriteria() {
    var dataFills = false;
    for (var i = 0; i < this.criteriaArr.length; i++) {
      if (this.criteriaArr[i].criteria == '') {
        this.service.toastrErr('Please enter Criteria Field.');
        dataFills = false;
        break;
      } else {
        dataFills = true;
      }
    }
    if (dataFills == true) {
      this.criteriaArr.push({ criteria: 'Points', order: 'highToLow' });
    }
  }

  removeCriteria = function(index) {
    this.criteriaArr.splice(index, 1);
  };
  /**
   * ************************************************************************** END STANDING **************************************************************************
   */

  /**
   * ************************************************************************** MATCHES LIST ADD/EDIT/DELETE/UPDATE **************************************************************************
   */
  createMatchFunc() {
    let data = {
      organizerId: this.userDetails._id,
      name: this.addMatchData.name,
      sports: this.addMatchData.sportName,
      competitionId: this.competitionDetObj.competitionId
    };
    this.service.postApi(`matches/createMatch`, data, 1).subscribe(response => {
      if (response.responseCode === 201) {
        $('#add_Match').modal('hide');
        this.service.toastrSucc(response.responseMessage);
        this.getMatchList();
      }
    });
  }

  getMatchList() {
    let data = {
      organizerId: this.userDetails._id,
      page: this.page.currPage,
      limit: this.page.limit,
      search: this.page.search,
      competitionId: this.competitionDetObj.competitionId
    };
    this.service.postApi(`matches/matchList`, data, 1).subscribe(response => {
      if (response.responseCode == 201) {
        this.matchList = response.result;
      }
    });
  }

  editMatchModal(matchData) {
    console.log('matchdata ==>>', matchData);
    this.editMatchData = matchData;
    if (matchData.sports === 'Basketball') {
      this.basketball = {
        basketballName : matchData.name ? matchData.name : '',
        sports : matchData.sports ? matchData.sports : '',
        basketballDuration : matchData.duration ? matchData.duration : 0,
        basketballwin : matchData.pointsPerMatch.win ? matchData.pointsPerMatch.win : 0,
        basketballtie : matchData.pointsPerMatch.tie ? matchData.pointsPerMatch.tie : 0,
        basketballloss : matchData.pointsPerMatch.loss ? matchData.pointsPerMatch.loss : 0,
        basketballbasketsInput : matchData.baskets ? matchData.baskets : 0,
        basketballfoulsInput : matchData.fouls ? matchData.fouls : 0
      };
      $('#edit_matches_basketball').modal({backdrop: 'static', keyboard: false});
    } else if (matchData.sports === 'Cricket') {
      this.cricket = {
        cricketName: matchData.name ? matchData.name : '',
        sports: matchData.sports ? matchData.sports : '',
        duration: matchData.duration ? matchData.duration : 0,
        win: matchData.pointsPerMatch.win ? matchData.pointsPerMatch.win : 0,
        cricketloss: matchData.pointsPerMatch.loss ? matchData.pointsPerMatch.loss : 0,
        tie: matchData.pointsPerMatch.tie ? matchData.pointsPerMatch.tie : 0,
        ballFacedInput: matchData.ballFaced ? matchData.ballFaced : 0,
        runsInput: matchData.runs ? matchData.runs : 0,
        foursInput: matchData.fours ? matchData.fours : 0,
        sixInput: matchData.sixes ? matchData.sixes : 0,
      };
      $('#edit_matches_cricket').modal({ backdrop: 'static', keyboard: false });
    } else if (matchData.sports === 'Soccer') {
      this.soccer = {
        soccerName: matchData.name ? matchData.name : '',
        soccerSport: matchData.sports ? matchData.sports : '',
        soccerDuration: matchData.duration ? matchData.duration : 0,
        soccerwin: matchData.pointsPerMatch.win ? matchData.pointsPerMatch.win : 0,
        soccerTie: matchData.pointsPerMatch.tie ? matchData.pointsPerMatch.tie : 0,
        soccerLoss: matchData.pointsPerMatch.loss ? matchData.pointsPerMatch.loss : 0,
        soccerGoalsInput: matchData.goals ? matchData.goals : 0,
        soccerShotsInput: matchData.shots ? matchData.shots : 0,
        soccerYellowCardInput: matchData.yellowCards ? matchData.yellowCards : 0,
        soccerRedCardInput: matchData.redCards ? matchData.redCards : 0,
        soccerOffSideInput: matchData.offside ? matchData.offside : 0,
        soccerCornerKicksInput: matchData.cornerKicks ? matchData.cornerKicks : 0,
        soccerGoalKeeperSavesInput: matchData.goalkeeperSave ? matchData.goalkeeperSave : 0,
        soccerMVPInput: matchData.MVP ? matchData.MVP : 0
      };
      $('#edit_matches_soccer').modal({ backdrop: 'static', keyboard: false });
    } else if (matchData.sports === 'Volleyball') {
      this.volleyball = {
        volleyballName: matchData.name ? matchData.name : '',
        volleyballSports: matchData.sports ? matchData.sports : '',
        volleyballDuration: matchData.duration ? matchData.duration : 0,
        volleyballwin: matchData.pointsPerMatch.win ? matchData.pointsPerMatch.win : 0,
        volleyballTie: matchData.pointsPerMatch.tie ? matchData.pointsPerMatch.tie : 0,
        volleyballLoss: matchData.pointsPerMatch.loss ? matchData.pointsPerMatch.loss : 0,
        set1ScoreInput: matchData.score[0] ? matchData.score[0].setScore : 0,
        volleyballset1TimeoutInput: matchData.score[0] ? matchData.score[0].timeouts : 0,
        volleyballSet2ScoreInput: matchData.score[1] ? matchData.score[1].setScore : 0,
        volleyballSet2TimeoutInput: matchData.score[1] ? matchData.score[1].timeouts : 0,
        volleyballset3ScoreInput: matchData.score[2] ? matchData.score[2].setScore : 0,
        volleyballset3TimeoutInput: matchData.score[2] ? matchData.score[2].timeouts : 0,
        volleyballset4ScoreInput: matchData.score[3] ? matchData.score[3].setScore : 0,
        volleyballset4TimeoutInput: matchData.score[3] ? matchData.score[3].timeouts : 0,
        volleyballset5ScoreInput: matchData.score[4] ? matchData.score[4].setScore : 0,
        volleyballset5TimeoutInput: matchData.score[4] ? matchData.score[4].timeouts : 0,
      };
      $('#edit_matches_volleyball').modal({ backdrop: 'static', keyboard: false });
    } else if (matchData.sports === 'Swimming') {
      this.swimming = {
        swimmingName : matchData.name ? matchData.name : '',
        swimmingSports : matchData.sports ? matchData.sports : '',
        swimmingDuration : matchData.duration ? matchData.duration : 0,
        swimmingwin : matchData.pointsPerMatch.win ? matchData.pointsPerMatch.win : 0,
        swimmingTie : matchData.pointsPerMatch.tie ? matchData.pointsPerMatch.tie : 0,
        swimmingLoss : matchData.pointsPerMatch.loss ? matchData.pointsPerMatch.loss : 0,
        swimmingLaneInput : matchData.lane ? matchData.lane : 0,
        swimmingPlaceInput : matchData.place ? matchData.place : 0,
        swimmingTimeInput : matchData.time ? matchData.time : 0,
      };
      $('#edit_matches_swimming').modal({ backdrop: 'static', keyboard: false });
    } else {
        this.other = {
          otherName : matchData.name ? matchData.name : '',
          otherSports : matchData.sports ? matchData.sports : '',
          otherDuration : matchData.duration ? matchData.duration : 0,
          otherwin : matchData.pointsPerMatch.win ? matchData.pointsPerMatch.win : 0,
          otherTie : matchData.pointsPerMatch.tie ? matchData.pointsPerMatch.tie : 0,
          otherLoss : matchData.pointsPerMatch.loss ? matchData.pointsPerMatch.loss : 0,
          otherset1ScoreInput : matchData.score[0] ? matchData.score[0].setScore : 0,
          otherset1TimeoutInput : matchData.score[0] ? matchData.score[0].timeouts : 0,
          otherSet2ScoreInput : matchData.score[1] ? matchData.score[1].setScore : 0,
          otherSet2TimeoutInput : matchData.score[1] ? matchData.score[1].timeouts : 0,
          otherset3ScoreInput : matchData.score[2] ? matchData.score[2].setScore : 0,
          otherset3TimeoutInput : matchData.score[2] ? matchData.score[2].timeouts : 0,
          otherset4ScoreInput : matchData.score[3] ? matchData.score[3].setScore : 0,
          otherset4TimeoutInput : matchData.score[3] ? matchData.score[3].timeouts : 0,
          otherset5ScoreInput : matchData.score[4] ? matchData.score[4].setScore : 0,
          otherset5TimeoutInput : matchData.score[4] ? matchData.score[4].timeouts : 0,
          otherset6ScoreInput : matchData.score[5] ? matchData.score[5].setScore : 0,
          otherset6TimeoutInput : matchData.score[5] ? matchData.score[5].timeouts : 0,
          otherset7ScoreInput : matchData.score[6] ? matchData.score[6].setScore : 0,
          otherset7TimeoutInput : matchData.score[6] ? matchData.score[6].timeouts : 0,
        };
        $('#edit_matches_other').modal({backdrop: 'static', keyboard: false});
    }
  }

  updateMatchFunc() {
    var data;
    if (this.editMatchData.sports === 'Basketball') {
      data = {
        matchId: this.editMatchData._id,
        organizerId: this.userDetails._id,
        name: this.basketball.basketballName,
        competitionId: this.competitionDetObj.competitionId,
        pointsPerMatch: {
          win: this.basketball.basketballwin,
          tie: this.basketball.basketballtie,
          loss: this.basketball.basketballloss
        },
        duration: this.basketball.basketballDuration,
        baskets: this.basketball.basketballbasketsInput,
        fouls: this.basketball.basketballfoulsInput
      };
    } else if (this.editMatchData.sports === 'Cricket') {
      data = {
        matchId: this.editMatchData._id,
        organizerId: this.userDetails._id,
        name: this.cricket.cricketName,
        pointsPerMatch: {
          win: this.cricket.win,
          tie: this.cricket.tie,
          loss: this.cricket.cricketloss
        },
        fours: this.cricket.foursInput,
        sixes: this.cricket.sixInput,
        runs: this.cricket.runsInput,
        ballFaced: this.cricket.ballFacedInput,
        duration: this.cricket.duration,
        competitionId: this.competitionDetObj.competitionId
      };
    } else if (this.editMatchData.sports === 'Soccer') {
      data = {
        matchId: this.editMatchData._id,
        organizerId: this.userDetails._id,
        name: this.soccer.soccerName,
        competitionId: this.competitionDetObj.competitionId,
        duration: this.soccer.soccerDuration,
        pointsPerMatch: {
          win: this.soccer.soccerwin,
          tie: this.soccer.soccerTie,
          loss: this.soccer.soccerLoss
        },
        goals: this.soccer.soccerGoalsInput,
        yellowCards: this.soccer.soccerYellowCardInput,
        redCards: this.soccer.soccerRedCardInput,
        MVP: this.soccer.soccerMVPInput,
        shots: this.soccer.soccerShotsInput,
        offside: this.soccer.soccerOffSideInput,
        cornerKicks: this.soccer.soccerCornerKicksInput,
        goalkeeperSave: this.soccer.soccerGoalKeeperSavesInput
      };
    } else if (this.editMatchData.sports === 'Volleyball') {
      data = {
        matchId: this.editMatchData._id,
        organizerId: this.userDetails._id,
        name: this.volleyball.volleyballName,
        competitionId: this.competitionDetObj.competitionId,
        duration: this.volleyball.volleyballDuration,
        pointsPerMatch: {
          win: this.volleyball.volleyballwin,
          tie: this.volleyball.volleyballTie,
          loss: this.volleyball.volleyballLoss
        },
        score: [
          { setScore: this.volleyball.set1ScoreInput , timeouts: this.volleyball.volleyballset1TimeoutInput },
          { setScore: this.volleyball.volleyballSet2ScoreInput , timeouts: this.volleyball.volleyballSet2TimeoutInput },
          { setScore: this.volleyball.volleyballset3ScoreInput , timeouts: this.volleyball.volleyballset3TimeoutInput },
          { setScore: this.volleyball.volleyballset4ScoreInput , timeouts: this.volleyball.volleyballset4TimeoutInput },
          { setScore: this.volleyball.volleyballset5ScoreInput , timeouts: this.volleyball.volleyballset5TimeoutInput }
        ]
      };
    } else if (this.editMatchData.sports === 'Swimming') {
      data = {
        matchId: this.editMatchData._id,
        organizerId: this.userDetails._id,
        name: this.swimming.swimmingName,
        competitionId: this.competitionDetObj.competitionId,
        duration: this.swimming.swimmingDuration,
        pointsPerMatch: {
          win: this.swimming.swimmingwin,
          tie: this.swimming.swimmingTie,
          loss: this.swimming.swimmingLoss
        },
        lane : this.swimming.swimmingLaneInput,
        place : this.swimming.swimmingPlaceInput,
        time : this.swimming.swimmingTimeInput,
      };
    } else {
        data = {
          matchId: this.editMatchData._id,
          organizerId: this.userDetails._id,
          name: this.other.otherName,
          competitionId: this.competitionDetObj.competitionId,
          pointsPerMatch: {
            win: this.other.otherwin,
            tie: this.other.othertie,
            loss: this.other.otherloss
          },
          duration: this.other.otherDuration,
          score: [
            { setScore: this.other.otherset1ScoreInput , timeouts: this.other.otherset1TimeoutInput },
            { setScore: this.other.otherSet2ScoreInput , timeouts: this.other.otherSet2TimeoutInput },
            { setScore: this.other.otherset3ScoreInput , timeouts: this.other.otherset3TimeoutInput },
            { setScore: this.other.otherset4ScoreInput , timeouts: this.other.otherset4TimeoutInput },
            { setScore: this.other.otherset5ScoreInput , timeouts: this.other.otherset5TimeoutInput },
            { setScore: this.other.otherset6ScoreInput , timeouts: this.other.otherset6TimeoutInput },
            { setScore: this.other.otherset7ScoreInput , timeouts: this.other.otherset7TimeoutInput }
          ]
        };
    }
    console.log('data ==>>', data);
    this.service.postApi(`matches/editMatch`, data, 1).subscribe(response => {
      if (response.responseCode === 201) {
        $('#edit_matches_cricket').modal('hide');
        $('#edit_matches_soccer').modal('hide');
        $('#edit_matches_volleyball').modal('hide');
        $('#edit_matches_swimming').modal('hide');
        $('#edit_matches_basketball').modal('hide');
        $('#edit_matches_other').modal('hide');
        this.service.toastrSucc(response.responseMessage);
        this.getMatchList();
      }
    });
  }

  onPageChangeMatch(pageNo) {
    this.page.currPage = pageNo;
    this.getMatchList();
  }

  onLimitChangeMatch() {
    this.page.currPage = 1;
    this.page.limit = Number(this.page.entryLimit);
    this.getMatchList();
  }

  onMatchSearch(val, event) {
    this.page.currPage = 1;
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13) this.getMatchList();
    } else if (val === 2) this.getMatchList();
  }
  /**
   * ************************************************************************** END MATCHES **************************************************************************
   */

  deleteMatchStandingModal(data) {
    this.MatchStandingId = data._id;
    $(`#deleteMatchStanding`).modal({ backdrop: 'static' });
  }

  onDeleteMatchStanding(val) {
    if (val === '3') {
      let data = {
        userId: this.userDetails._id,
        standingId: this.MatchStandingId
      };
      this.service
        .postApi('organizer/config/standing/deleteStanding', data, 1)
        .subscribe(response => {
          if (
            response.responseCode == 201 ||
            response.responseCode == 200 ||
            response.responseCode == 204
          ) {
            $('#deleteMatchStanding').modal('hide');
            this.service.toastrSucc(response.responseMessage);
            this.getStandingList();
          }
        });
    } else if (val === '4') {
      let data = {
        matchId: this.MatchStandingId,
        organizerId: this.userDetails._id
      };
      this.service
        .postApi('matches/deleteMatch', data, 1)
        .subscribe(response => {
          if (response.responseCode == 201 || response.responseCode == 200) {
            $('#deleteMatchStanding').modal('hide');
            this.service.toastrSucc(response.responseMessage);
            this.getMatchList();
          }
        });
    }
  }
}
