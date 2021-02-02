import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-edit-venue',
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.css']
})
export class EditVenueComponent implements OnInit {

  weekOffArr: any = [];
  sportsArr: any = [];
  venueData: any = {};
  venueSports: any = []
  venueId: any;
  endtime: any;
  locationLong: any;
  locationLat: any;
  venueLocation: any;
  list: any = { sportsList: [] };
  editVenueForm: FormGroup;
  updateData: any = { isAddSport: true, currId: '' }
  userDetails: any = {};
  eachVenueData: any = {};
  eachShareableData: any = {};
  ImageBase64 = "assets/images/user-img.png";
  filter: any = { teamStatus: '', team: '', club: '', compStatus: '', sports: [], gender: '', division: [], search: '', currPage: 1 };
  dropdownSettings: any = GlobalConstant.multidropDownSettings
  imgArr: any = [];
  weekOff: any = [{ item_id: 1, item_text: "Sunday" },
  { item_id: 2, item_text: "Monday" },
  { item_id: 3, item_text: "Tuseday" },
  { item_id: 4, item_text: "Wednesday" },
  { item_id: 5, item_text: "Thursday" },
  { item_id: 6, item_text: "Friday" },
  { item_id: 7, item_text: "Saturday" },]
  timeslot: any = [{ 'time': '9:00', id: 1 }, { 'time': '10:00', id: 2 }, { 'time': '11:00', id: 3 }, { 'time': '12:00', id: 4 }, { 'time': '13:00', id: 5 }, { 'time': '14:00', id: 6 }, { 'time': '15:00', id: 7 }, { 'time': '16:00', id: 8 }, { 'time': '17:00', id: 9 }, { 'time': '18:00', id: 10 }];

  constructor(private fb: FormBuilder, private service: MainService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.editVenueForm = this.fb.group({
      venueName: ['', Validators.required],
      venueLocationData: ['', Validators.required],
      sportData: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      duration: ['', Validators.required],
      weekoff: ['', Validators.required],
      description: ['', Validators.required],
      venueImages: ['', Validators.required],
      allowPublic: false,
      allowShareable: false
    })
    let self = this
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
    })
    this.getSportsList()
    this.getVenueDetail()
  }

  get gVenueF() {
    return this.editVenueForm.controls;
  }

  // *************************************** API TO GET SPORTS LIST ********************************************** //
  getSportsList() {
    let sportsData = {
      "organizerId": this.userDetails._id
    }
    this.service.postApi('organizer/getVenueSportWithoutPagination', sportsData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.list.sportsList = response.result.map(item => {
          return { item_id: item._id, item_text: item.sportName }
        })
      }
    })
  }
  // ************************************************ END ********************************************************* //

  // *************************************** API TO GET VENUE DETAIL ********************************************** //
  getVenueDetail() {
    let venueData = {
      "playerId": this.userDetails._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueData = response.result
        this.ontime(event)
        this.venueLocation = this.venueData.locationName
        this.imgArr = this.venueData.images
        this.eachVenueData = this.venueData.allowPublicToFollow
        this.eachShareableData = this.venueData.isShared
        let Response = response;
        this.editVenueForm.setValue({
          venueName: Response[`result`].venueName,
          venueLocationData: Response[`result`].locationName,
          sportData: Response[`result`].sport,
          startTime: Response[`result`].startTime,
          endTime: Response[`result`].endTime,
          duration: Response[`result`].duration,
          weekoff: Response[`result`].weekOffArray,
          description: Response[`result`].description,
          venueImages: Response[`result`].venueName,
          allowPublic: Response[`result`].allowPublicToFollow,
          allowShareable: Response[`result`].isShared
        })

        this.weekOffArr = [];
        Response[`result`].weekOffArray.forEach((ele, index) => {
          this.weekOffArr.push({ 'item_id': '', 'item_text': ele })
        })
        this.weekFun()
        this.venueSports = [];
        Response[`result`].sportId.forEach(ele => {
          this.venueSports.push({ 'item_id': ele, 'item_text': '' })
        })
        Response[`result`].sport.forEach((ele, index) => {
          this.venueSports[index].item_text = ele;
        })
        this.locationLong = Response[`result`].location.coordinates[0]
        this.locationLat = Response[`result`].location.coordinates[1]
      }
    })
  }
  // *********************************************** END ***************************************************** //

  weekFun() {
    for (let i = 0; i < this.weekOffArr.length; i++) {
      for (let j = 0; j < this.weekOff.length; j++) {
        if (this.weekOffArr[i].item_text == this.weekOff[j].item_text) {
          this.weekOffArr[i].item_id = this.weekOff[j].item_id
        }
      }
    }
  }

  // ***************************************  API TO UPDATE VENUE ********************************************** //
  updateVenue() {
    let sportsArr: any = []
    let sportsIdArr: any = []
    let WeekoffArr: any = []
    for (let i = 0; i < this.venueSports.length; i++) {
      sportsArr.push(this.venueSports[i].item_text)
    }
    for (let i = 0; i < this.venueSports.length; i++) {
      sportsIdArr.push(this.venueSports[i].item_id)
    }
    for (var i = 0; i < this.editVenueForm.value.weekoff.length; i++) {
      WeekoffArr.push(this.editVenueForm.value.weekoff[i].item_text);
    }
    let currUrl = ''
    let addData = {
      "isShared": JSON.stringify(this.editVenueForm.value.allowShareable),
      "venueId": this.venueData._id,
      "organizerId": this.userDetails._id,
      "venueName": this.editVenueForm.value.venueName,
      "sport": sportsArr,
      "sportId": sportsIdArr,
      "locationName": this.venueLocation,
      "coordinates": [this.locationLong, this.locationLat], // [long,latt]
      "description": this.editVenueForm.value.description,
      "imagesArray": this.imgArr,
      "startTime": this.editVenueForm.value.startTime,
      "endTime": this.editVenueForm.value.endTime,
      "allowPublicToFollow": JSON.stringify(this.editVenueForm.value.allowPublic),
      "weekOffArray": WeekoffArr,
      "duration": this.editVenueForm.value.duration

    }
    if (!this.imgArr.length) {
      this.service.toastrErr('Please upload Image of venue')
    } else {
      this.service.postApi('venue/editVenue', addData, 1).subscribe(response => {
        if (response.responseCode == 201 || response.responseCode == 200) {
          this.service.toastrSucc(response.responseMessage)
          this.router.navigate(['organizer/venList']);
        }
      })
    }
  }
  // ************************************************ END ********************************************************* //


  // ****************************************** GOOGLE AUTOCOMPLETE ADDRESS ********************************************** //
  autoCompleteCallback1(selectedData: any) {
    if (selectedData.response == true) {
      this.venueLocation = selectedData.data.formatted_address;
      this.locationLat = selectedData.data.geometry.location.lat;
      this.locationLong = selectedData.data.geometry.location.lng;
    } else {
      this.locationLat = null;
      this.locationLong = null;
    }
  }
  // ************************************************ END ********************************************************* //


  // ************************************************ File upload ********************************************************* //
  fileChange(event) {
    this.service.fileChangeEvent(event).then((res: any) => {
      this.imgArr.push(res.target.result)
    })
  }
  // *****************************************88*** End File upload ****************************************************** //


  onDeleteImg(index) {
    this.imgArr.splice(index, 1)
  }

  ontime(event) {
    var start = event.target.value
    var index = this.timeslot.findIndex(x => x.time == start)
    this.endtime = this.timeslot.filter(x => x.id > index)
  }

}
