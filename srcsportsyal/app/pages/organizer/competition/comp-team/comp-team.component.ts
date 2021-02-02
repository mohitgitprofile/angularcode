import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators, ActivatedRoute, Router  } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $:any

@Component({
  selector: 'app-comp-team',
  templateUrl: './comp-team.component.html',
  styleUrls: ['./comp-team.component.css']
})
export class CompTeamComponent implements OnInit {
  teamList: any = [];
  teamDataVal: any = {};
  competitionDetail: any = {};
  countryList: any = [];
  playerId: any;
  dynamicFormPlayer: any = [];
  getPlayerList: any = {docs: []};
  teamId: any;
  dynamicForm: any = [];
  getTeamList: any = {docs: []};
  teamData: any = {
    status: " "
  };
  playerData: any = {
    gender: " ",
    status: " ",
    countryCode:"",
    nationality:"",
    teamVal: {}
  };
  competitionId: any;
  userDetails: any;
  tab = 'team'
  addTeamForm: FormGroup;
  addPlayerForm: FormGroup;
  list: any = {statusList: GlobalConstant.statusArr, limitChangeArr: GlobalConstant.limitChangeArr };
  listPlayer: any = {statusList: GlobalConstant.statusArr, limitChangeArrPlayer: GlobalConstant.limitChangeArr };

  filter: any = { search: "", currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };
  filterPlayer: any = { search: "", currPagePlayer: 1, limitPlayer: GlobalConstant.paginationLimit, limitChangePlayer: GlobalConstant.paginationLimit };
  constructor(private route: ActivatedRoute, private service: MainService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.getCountryList ();

    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ['', Validators.compose([ Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i) ])],
      teamStatus:['', Validators.compose([Validators.required])],
    })

    this.addPlayerForm = this.fb.group({
      playerName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      email: ['', Validators.compose([ Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i) ])],
      teamStatus:['', Validators.compose([Validators.required])],
      mobile:['', Validators.compose([Validators.required])],
      countryCode:['', Validators.compose([Validators.required])],
      dob:['', Validators.compose([Validators.required])],
      gender:['', Validators.compose([Validators.required])],
      nationality:['', Validators.compose([Validators.required])],
      team:['', Validators.compose([Validators.required])]
    })

    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe( async params => {
      this.competitionId = params['id']
      this.getCompetitionDetailApi()
    })
    this.getTeamListFun ();
    this.getTeamFields ();
  }

  tabChange (tabType) {
    this.tab = tabType;
    this.getCompetitionDetailApi();
    if(this.tab == 'player') {
      this.getPlayerListFun ();
      this.getPlayerFields ();
      this.getTeamDropdown ();
    } else {
      this.getTeamListFun ();
      this.getTeamFields ();
    }


  }

 //************************************************************************ TEAM LIST TAB FUNCTIONALITY ************************************************************************//
  getTeamListFun () {
    //************** Get Team List Api Integration *************//
    let getTeamData = {
      'page': this.filter.currPage,
      'limit': this.filter.limit,
      'search': this.filter.search
    }

    this.service.postApi(`organizer/competition/getTeamInCompetition?userId=` + this.userDetails._id + `&competitionId=` + this.competitionId, getTeamData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.getTeamList = []
        this.getTeamList = response.result
      }
    })
    //******************* End ******************//
  }

  fileChangeEvent(event) {
    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = ((e: any) => {
        console.log(e.target.result)
        this.teamData.imageURL = e.target.result
      })
      reader.readAsDataURL(event.target.files[0])
    }
  }

  getTeamFields () {
    //************** Get Dynamic Team fields Api Integration *************//
    let dynamicFieldsData = {
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
    }

    this.service.postApi(`organizer/competition/getTeamFields`, dynamicFieldsData,1).subscribe(response => {
      if(response.responseCode == 200) {
        // this.dynamicForm = response.result
        this.dynamicForm = (response.result).reverse()
        // console.log('configureTeamList ==>' + JSON.stringify(this.dynamicForm))
      } else {
        this.dynamicForm = []
      }
    })
    //******************* End ******************//
  }

  openTeamModal(data, type) {
    if (type == 'editTeam') {
      this.teamId = data._id
      this.teamData = data
      if(this.dynamicForm.length) {
        for(let i = 0;i<this.dynamicForm.length;i++) {
          if(data.teamDynamicDetail.length) {
           this.dynamicForm[i].itemValue = data.teamDynamicDetail[i].itemValue;
          }
        }
      }
      $(`#create_team`).modal('show')
    } else {
      this.addTeamForm.reset()
      this.addTeamForm.patchValue({teamStatus: ' '})
      // this.teamData.status = ' '
      $(`#create_team`).modal('show')
    }
  }

  closeTeamModal ()  {
    // this.teamData = {};
    this.teamData = {
      status: " "
    };
    this.getTeamFields ()
    $(`#create_team`).modal('hide')
  }


  createTeamFun(type) {
    var errCount = 0;
    if(this.dynamicForm.length > 0){
      for (let i = 0; i < this.dynamicForm.length; i++) {
        if (this.dynamicForm[i].importance == "mandatory" && (!this.dynamicForm[i].itemValue || this.dynamicForm[i].itemValue == '')) {
          errCount++;
          this.service.toastrErr(this.dynamicForm[i].field+' is mandatory!')
        }
        if(errCount == 1){
          break;
        }
      }
    }
    if(errCount == 0){
      this.sendTeamData(type);
    }
  }


  sendTeamData (type) {
    let currentUrl = ''
    //************** Add team Api Integration *************//
      let teamData = {
        "organizer": this.userDetails._id,
        "competitionId": this.competitionId,
        "teamName": this.teamData.teamName,
        'email': this.teamData.email,
        'status': this.teamData.status,
        'image': this.teamData.imageURL,
        'teamDynamicDetail': this.dynamicForm,
      }

      if(type === 'addTeam') {
        currentUrl = 'organizer/competition/createTeamInCompetition'
      } if(type === 'editTeam') {
        currentUrl = 'organizer/competition/editTeamInCompetition?userId=' + this.userDetails._id + `&competitionId=` + this.competitionId + `&teamId=` + this.teamId
      }

      this.service.postApi(currentUrl,teamData,1).subscribe(response => {
        if(response.responseCode == 200) {
          $('#create_team').modal('hide');
          this.teamData = {
            status: " "
          };
          this.getTeamFields ()
          this.service.toastrSucc(response.responseMessage)
          this.getTeamListFun ();
        }
      })
    //************** End *************//
  }

  deleteTeam (id) {
    this.teamId = id
  }

  deleteTeamFun (teamId) {
    //************** Delete team Api Integration *************//
    this.service.getApi(`organizer/competition/deleteTeam?userId=` + this.userDetails._id + `&competitionId=` + this.competitionId + `&teamId=` + this.teamId,1).subscribe(response => {
      if(response.responseCode == 204) {
        $('#team-delete').modal('hide')
        this.service.toastrSucc(response.responseMessage)
        this.getTeamListFun ();
      }
    })
    //************** End *************//
  }

   //************************************************************************ END TEAM LIST TAB FUNCTIONALITY ************************************************************************//


  onPageChange(pageNo) {
    this.filter.currPage = pageNo
    this.getTeamListFun()
  }
  onChangeLimit() {
    this.filter.limit = Number(this.filter.limitChange)
    this.filter.currPage = 1
    this.getTeamListFun()
  }

  searchFun () {
    if(this.tab == 'player') {
      this.getPlayerListFun()
    } else {
      this.getTeamListFun()
    }
  }

  onSearch(event) {
    if( (event.keyCode == 13) || (!this.filter.search) )
    if(this.tab == 'player') {
      this.getPlayerListFun()
    } else {
      this.getTeamListFun()
    }
  }


  //************************************************************************ PLAYER LIST TAB FUNCTIONALITY ************************************************************************//

   // **************** Get Competition Detail Api *********** //
    getCompetitionDetailApi() {
      let compData = {
        userId: this.userDetails._id,
        competitionId: this.competitionId
      }

      this.service.postApi(`organizer/competition/getACompetition`, compData, 1).subscribe(response => {
        if(response.responseCode == 200) {
          this.competitionDetail = response.result

          // if (this.competitionDetail.registrationForm == true) {
          // }
        }
      })
    }
   // **************** End Get Competition Detail Api *********** //

   // ******************** Get Country List API *********************** //
    getCountryList() {
      this.service.getApi(`users/code`, 0).subscribe(response => {
        // console.log('response => ' + JSON.stringify(response))
        if(response.responseCode == 200) {
          this.countryList = response.result
        }
      })
    }
   // ***************** End Get Country List API ************************ //


    //************** select team API *************//
    check () {
      for (let i = 0; i < this.teamList.length; i++) {
        if(this.teamList[i].teamName == this.playerData.teamVal) {
          this.playerData.teamId = this.teamList[i]._id
        }
      }
    }

    getTeamDropdown() {
      this.service.getApi(`data/selectTeam?userId=` + this.userDetails._id + `&competitionId=` + this.competitionId, 1).subscribe(response => {
        // console.log('response => ' + JSON.stringify(response))
        if(response.responseCode == 200) {
          this.teamList = response.result
          // console.log('teamList => ' + JSON.stringify(this.teamList))
        }
      })
    }
    //************** End *************//


   getPlayerListFun () {
    //************** Get Team List Api Integration *************//
    let getPlayerData = {
      'userId': this.userDetails._id,
      'competitionId': this.competitionId,
      'page': this.filterPlayer.currPagePlayer,
      'limit': this.filterPlayer.limitPlayer,
      'search': this.filter.search
    }

    this.service.postApi(`organizer/competition/getListOfPlayerInTeam`, getPlayerData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.getPlayerList = []
        this.getPlayerList = response.result
        // console.log('getPlayerList ==>' + JSON.stringify(this.getPlayerList))
      }
    })
    //******************* End ******************//

  }

  fileChangeEventPlayer(event) {
    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = ((e: any) => {
        console.log(e.target.result)
        this.playerData.imageURL = e.target.result
      })
      reader.readAsDataURL(event.target.files[0])
    }
  }

  getPlayerFields () {
    //************** Get Dynamic Team fields Api Integration *************//
    let dynamicFieldsData = {
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
    }

    this.service.postApi(`organizer/competition/getPlayerFields`, dynamicFieldsData,1).subscribe(response => {
      if(response.responseCode == 200) {
        // this.dynamicForm = response.result
        this.dynamicFormPlayer = (response.result).reverse()
        // console.log('dynamicFormPlayer ==>' + JSON.stringify(this.dynamicFormPlayer))
      }
    })
    //******************* End ******************//
  }

  openPlayerModal(data, type) {
    if (type == 'editPlayer') {
      console.log('data ==>' + JSON.stringify(data))
      this.playerData = data
      this.playerData.teamVal = data.teamName
      this.playerData.email = data.Player.email
      this.playerData.countryCode = data.Player.countryCode
      this.playerData.mobileNumber = data.Player.mobileNumber
      this.playerData.nationality = data.Player.nationality

      // this.playerData.dob = data.Player.dob
      let date = new Date(data.Player.dob);

      this.addPlayerForm.patchValue({dob: {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          }
        }})
      this.playerData.imageURL = data.Player.image

      this.playerData.gender = data.Player.gender
      this.playerData.status = data.status

      this.playerData.playerName = data.Player.firstName + ' ' +  data.Player.lastName
      // this.playerData = data.Player
      console.log('dynamicFormPlayer ==>' + JSON.stringify(this.dynamicFormPlayer))
      if(this.dynamicFormPlayer.length) {
        for(let i = 0;i<this.dynamicFormPlayer.length;i++) {
          this.dynamicFormPlayer[i].itemValue = data.Player.playerDynamicDetails[i].itemValue;
        }
      }


      $(`#edit_Player`).modal('show')
    } else {
      $(`#edit_Player`).modal('show')
    }
  }

  closePlayerModal ()  {
    this.playerData = {
      gender: " ",
      status: " ",
      countryCode:"",
      nationality:"",
      teamVal: {},
      dob: ''
    };
    this.getPlayerFields ()
    $(`#edit_Player`).modal('hide')
  }

  createPlayerFun(type) {
    var errCount = 0;
    if(this.dynamicFormPlayer.length > 0){
      for (let i = 0; i < this.dynamicFormPlayer.length; i++) {
        if (this.dynamicFormPlayer[i].importance == "mandatory" && (!this.dynamicFormPlayer[i].itemValue || this.dynamicFormPlayer[i].itemValue == '')) {
          errCount++;
          this.service.toastrErr(this.dynamicFormPlayer[i].field+' is mandatory!')
        }
        if(errCount == 1){
          break;
        }
      }
    }
    if(errCount == 0){
      this.sendPlayerData(type);
    }
  }


  sendPlayerData (type) {
    let currentUrl = ''
    let fullName =  this.playerData.playerName.split(" ");
    if(fullName[1] == undefined) {
      fullName[1] = ''
    }
    //************** Add Player Api Integration *************//
      let playerData = {
        "playerDetail":{
          "firstName": fullName[0],
          "lastName": fullName[1],
          "dob": this.playerData.dob.formatted,
          'email': this.playerData.email,
          "countryCode": this.playerData.countryCode,
          "mobileNumber": this.playerData.mobileNumber,
          "gender": this.playerData.gender,
          "nationality": this.playerData.nationality,
          'image': this.playerData.imageURL,
          'playerDynamicDetails': this.dynamicFormPlayer,
        },
          "competitionId": this.competitionId,
          "competitionName": this.competitionDetail.competitionName,
          'status': this.playerData.status,
          "teamName":this.playerData.teamVal,
          "teamId": this.playerData.teamId
      }

      console.log('playerData =>' + JSON.stringify(playerData))

      if(type === 'addPlayer') {
        currentUrl = 'data/addPlayer?userId=' + this.userDetails._id
      } if(type === 'editPlayer') {
        currentUrl = 'organizer/competition/editPlayerInComp?userId=' + this.userDetails._id + `&playerId=` + this.playerData.playerId + `&_id=` + this.playerData._id
      }

      this.service.postApi(currentUrl,playerData,1).subscribe(response => {
        if(response.responseCode == 201) {
          $('#edit_Player').modal('hide');
          this.addPlayerForm.reset();// new
          this.playerData = {
            gender: " ",
            status: " ",
            countryCode:"",
            nationality:"",
            teamVal: {}
          };
          // this.getPlayerFields ()
          this.service.toastrSucc(response.responseMessage)
          this.tabChange ('player');
        }
      })
    //************** End *************//
  }

  deletePlayer (id) {
    this.playerId = id
  }

  deletePlayerFun (teamId) {
    //************** Delete team Api Integration *************//
    this.service.getApi(`organizer/competition/deletePlayer?userId=` + this.userDetails._id + `&playerId=` + this.playerId + `&competitionId=` + this.competitionId,1).subscribe(response => {
      if(response.responseCode == 204) {
        $('#player-delete').modal('hide')
        this.service.toastrSucc(response.responseMessage)
        this.tabChange('player');
      }
    })
    //************** End *************//
  }

  onPageChangePlayer(pageNo) {
    this.filterPlayer.currPagePlayer = pageNo
    this.getPlayerListFun()
  }
  onChangeLimitPlayer() {
    this.filterPlayer.limitPlayer = Number(this.filterPlayer.limitChangePlayer)
    this.filterPlayer.currPagePlayer = 1
    this.getPlayerListFun()
  }

}
