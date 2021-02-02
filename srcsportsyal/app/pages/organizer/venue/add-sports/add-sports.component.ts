import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router } from '../../../../index';
declare var $: any;
@Component({
  selector: 'app-add-sports',
  templateUrl: './add-sports.component.html',
  styleUrls: ['./add-sports.component.css']
})
export class AddSportsComponent implements OnInit {
  addSportForm: FormGroup;
  updateData: any = { isAddSport: true, currId: '' }
  userDetails: any = {};
  ImageBase64 = "assets/images/addCard.png";
  constructor(private fb: FormBuilder, private service: MainService, private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.addSportForm = this.fb.group({
      sportsName: ['', Validators.required],
      sportsType: ['', Validators.required],
      sportsIcon: []
    })
  }

  get gSportF() {
    return this.addSportForm.controls;
  }

  onAddSport(isAdd) {
    let currUrl = ''
    let addData = {
      organizerId: this.userDetails._id,
      sportIcon: this.ImageBase64,
      sportName: this.addSportForm.value.sportsName,
      status: this.addSportForm.value.sportsType
    }

    if (isAdd === 1)
      currUrl = 'organizer/addSports'
    if (isAdd === 2) {
      addData['sportId'] = this.updateData.currId
      currUrl = 'organizer/editSport'
    }
    this.service.postApi(currUrl, addData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        this.router.navigate(['organizer/venConfiguration']);
      }
    })
  }

  // ************ File upload **************************************************************************************** //
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      let self = this
      reader.onload = function (e: any) {
        $('#preview').attr('src', e.target.result);
        self.ImageBase64 = e.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  // ************ End File upload **************************************************************************************** //

  onDeleteImg() {
    this.ImageBase64 = "assets/images/addCard.png";
  }

  goBack() {
    this.router.navigate(['organizer/venConfiguration']);
  }

}
