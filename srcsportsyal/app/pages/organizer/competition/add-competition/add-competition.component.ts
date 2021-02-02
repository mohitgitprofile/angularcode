import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators  } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant'
@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.css']
})
export class AddCompetitionComponent implements OnInit {
  userDetails: any = {};
  addCompForm: FormGroup;
  list: any = {periodList: [], divisionList: [], sportsList: [], clubList: [], venueList: [], statusList: GlobalConstant.statusArr};

  constructor(private service: MainService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.addCompForm = this.fb.group({
      compName: ['', Validators.compose([ Validators.required ]) ],
      venue: ['', Validators.required],
      division: ['', Validators.required],
      period: ['', Validators.required],
      sports: ['', Validators.required],
      club: ['', Validators.required],
      status: ['', Validators.required],
      allowPublic: false
    })
    // this.multPostApiCall();
    this.multGetApiCall();
    
  }
  // ************ Get Division, Period Api ********* //
  /* multPostApiCall() {
    let data = {userId: this.userDetails._id}
    this.service.multiplePostApi({url: 'organizer/selectPeriod', data: data}, {url: `organizer/selectDivision`, data: data}).subscribe(responseList => {
      // console.log(JSON.stringify(responseList))
      let [periodResponse, divisionResponse] = responseList
      if(periodResponse['responseCode'] == 200 && divisionResponse['responseCode'] == 200) {
        this.list.periodList = periodResponse['result']
        this.list.divisionList  = divisionResponse['result']
      }
    })
  } */
  // ************ End Get Division, Period Api ********* //
  // ************ Get Venue, Sports, Clubs Api ********* //
  multGetApiCall() {
    // console.log(this.userDetails._id)
    this.service.multipleGetApi(`data/selectClub?userId=${this.userDetails._id}`, `data/selectVenue?userId=${this.userDetails._id}`, `organizer/selectSport?userId=${this.userDetails._id}`, `organizer/selectPeriod?userId=${this.userDetails._id}`, `organizer/selectDivision?userId=${this.userDetails._id}`).subscribe(responseList => {
      // console.log(JSON.stringify(responseList))
      let [clubResponse, venueResponse, sportResponse, periodResponse, divisionResponse] = responseList
      let msgArr = []
      if(clubResponse['responseCode'] == 200)
        this.list.clubList = clubResponse['result']
      else if(clubResponse['responseCode'] == 404)
        msgArr.push('Club')
      if(venueResponse['responseCode'] == 200)
        this.list.venueList = venueResponse['result']
      else if(venueResponse['responseCode'] == 404)
        msgArr.push('Venue')
      if(sportResponse['responseCode'] == 200)
        this.list.sportsList = sportResponse['result']
      else if(sportResponse['responseCode'] == 404)
        msgArr.push('Sport')
      if(periodResponse['responseCode'] == 200 )
        this.list.periodList = periodResponse['result']
      else if(periodResponse['responseCode'] == 404)
        msgArr.push('Period')
      if(divisionResponse['responseCode'] == 200)
        this.list.divisionList  = divisionResponse['result']
      else if(divisionResponse['responseCode'] == 404)
        msgArr.push('Division')
      if(msgArr.length)
        this.service.toastrErr(`Please add ${msgArr}`)
    })
  }
  // ************ End Get Venue, Sports, Clubs Api ********* //
  get form() {
    return this.addCompForm.controls;
  }

  goBack() {
    window.history.back()
  }

  addCompetition() {
    // console.log('add compeition value => '+ JSON.stringify(this.addCompForm.value))
    let formValue = this.addCompForm.value
    let arr = this.list.sportsList.filter(x => x._id == formValue.sports )
    // console.log(arr)
    let competitionData = {
      "userId": this.userDetails._id,
      "competitionDetails": {
        "competitionName": formValue.compName,
        "venue": formValue.venue,
        "division": formValue.division,
        "period": formValue.period,
        "sports": arr[0].sportName,
        "sportType": arr[0].sportType,
        "club": formValue.club,
        "status": formValue.status,
        "allowPublicToFollow": formValue.allowPublic
      }
    }
    this.service.postApi(`organizer/competition/addNewCompetition`, competitionData, 1).subscribe(response => {
      if(response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        window.history.back()
      }
    })
  }
  

}
