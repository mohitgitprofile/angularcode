import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {

  endtime: any;
  locationLong: any;
  locationLat: any;
  venueLocation: any;
  list: any = { sportsList: [] };
  addVenueForm: FormGroup;
  updateData: any = { isAddSport: true, currId: '' }
  userDetails: any = {};
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
  timeslot: any = [{ 'time': '09:00', id: 1 }, { 'time': '10:00', id: 2 }, { 'time': '11:00', id: 3 }, { 'time': '12:00', id: 4 }, { 'time': '13:00', id: 5 }, { 'time': '14:00', id: 6 }, { 'time': '15:00', id: 7 }, { 'time': '16:00', id: 8 }, { 'time': '17:00', id: 9 }, { 'time': '18:00', id: 10 }];

  constructor(private fb: FormBuilder, private service: MainService, private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.addVenueForm = this.fb.group({
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
    this.getSportsList()
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

  get gVenueF() {
    return this.addVenueForm.controls;
  }

  // ****************************************** GOOGLE AUTOCOMPLETE ADDRESS ********************************************** //
  autoCompleteCallback1(selectedData: any) {
    if (selectedData.response == true) {
      this.venueLocation = selectedData.data.formatted_address;
      this.locationLat = selectedData.data.geometry.location.lat;
      this.locationLong = selectedData.data.geometry.location.lat;
    } else {
      this.venueLocation = "New Delhi, India"
      this.locationLat = 28.7041;
      this.locationLong = 77.1025;

    }
  }
  // ************************************************ END ********************************************************* //

  // *************************************** API TO ADD  VENUE ********************************************** //
  onAddVenue() {
    if (this.locationLat == null || this.locationLat == undefined) {
      this.venueLocation = "New Delhi, India"
      this.locationLat = 28.7041;
      this.locationLong = 77.1025;
    }
    let sportsArr: any = []
    let sportsIdArr: any = []
    let WeekoffArr: any = []
    for (let i = 0; i < this.addVenueForm.value.sportData.length; i++) {
      sportsArr.push(this.addVenueForm.value.sportData[i].item_text)
    }
    for (let i = 0; i < this.addVenueForm.value.sportData.length; i++) {
      sportsIdArr.push(this.addVenueForm.value.sportData[i].item_id)
    }
    for (var i = 0; i < this.addVenueForm.value.weekoff.length; i++) {
      WeekoffArr.push(this.addVenueForm.value.weekoff[i].item_text);
    }

    let currUrl = ''
    let addData = {
      "isShared": JSON.stringify(this.addVenueForm.value.allowShareable),
      "organizerId": this.userDetails._id,
      "venueName": this.addVenueForm.value.venueName,
      "sport": sportsArr,
      "sportId": sportsIdArr,
      "locationName": this.venueLocation,
      "coordinates": [this.locationLong, this.locationLat], // [long,latt]
      "description": this.addVenueForm.value.description,
      "imagesArray": this.imgArr,
      "startTime": this.addVenueForm.value.startTime,
      "endTime": this.addVenueForm.value.endTime,
      "allowPublicToFollow": JSON.stringify(this.addVenueForm.value.allowPublic),
      "weekOffArray": WeekoffArr,
      "duration": this.addVenueForm.value.duration
    }

    this.service.postApi('venue/addVenue', addData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        this.router.navigate(['organizer/venList']);
      }
    })
  }
  // ******************************************************** END ********************************************************* //


  // ************************************************ File upload ********************************************************* //
  fileChange(event) {
    this.service.fileChangeEvent(event).then((res: any) => {
      this.imgArr.push(res.target.result)
    })
  }
  // *****************************************88*** End File upload ****************************************************** //




  ontime(event) {
    var start = event.target.value
    var index = this.timeslot.findIndex(x => x.time == start)
    this.endtime = this.timeslot.filter(x => x.id > index)
  }

}

