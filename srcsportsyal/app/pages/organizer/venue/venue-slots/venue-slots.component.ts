import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-venue-slots',
  templateUrl: './venue-slots.component.html',
  styleUrls: ['./venue-slots.component.css']
})
export class VenueSlotsComponent implements OnInit {
  slotDetail: any;
  sportsList: any = [];
  slotList: any = { docs: [] };
  venueDetail: any;
  slotId: any;
  venueId: any;
  currency: any;
  constructor(private fb: FormBuilder, private service: MainService, private router: Router, private route: ActivatedRoute) { }
  userDetails: any = {};
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  addSlotForm: FormGroup
  editSlotForm: FormGroup
  ngOnInit() {
    this.currency = this.service.currencyLogo
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.addSlotForm = this.fb.group({
      sportData: ['', Validators.required],
      numOfSlot: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.editSlotForm = this.fb.group({
      sportData: ['', Validators.required],
      numOfSlot: ['', Validators.required],
      price: ['', Validators.required]
    })
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
    })
    this.getVenueDetailApi()
    this.getSlotListApi()
  }

  get gSlotForm() {
    return this.addSlotForm.controls;
  }

  get eStoreForm() {
    return this.editSlotForm.controls;
  }

  /*********************************************** API INTEGRATION TO GET VENUE DETAIL ********************************************/
  getVenueDetailApi() {
    let venueData = {
      "playerId": this.userDetails._id
    }
    this.service.postApi('venue/getDetailOfAVenue?venueId=' + this.venueId, venueData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueDetail = response.result
        this.sportsList = response.result.sport
      }
    })
  }
  /********************************************************** END ******************************************************************/

  /*********************************************** API INTEGRATION TO GET SLOT LIST ********************************************/
  getSlotListApi() {
    let slotData = {
      "venueId": this.venueId,
      "page": this.page.currPage,
      "limit": this.page.limit,
      "search": this.page.search
    }
    this.service.postApi('venue/getSlotOfAVenue', slotData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.slotList = response.result
      }
    })
  }
  /********************************************************** END ******************************************************************/

  addSlotModal() {
    this.addSlotForm = this.fb.group({
      sportData: ['', Validators.required],
      numOfSlot: ['', Validators.required],
      price: ['', Validators.required]
    });
    $(`#add_slot`).modal('show')
  }

  /*********************************************** API INTEGRATION TO ADD SLOT  ********************************************/
  addSlotFun() {

    let addSlotData = {
      "duration": this.venueDetail.duration,
      "venueId": this.venueId,
      "startTime": this.venueDetail.startTime,
      "endTime": this.venueDetail.endTime,
      "sport": this.addSlotForm.value.sportData,
      "noOfSlot": this.addSlotForm.value.numOfSlot,
      "price": this.addSlotForm.value.price,
    }
    this.service.postApi('venue/addSlotToVenue', addSlotData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#add_slot`).modal('hide')
        this.getSlotListApi()
      }
    })
  }
  /**************************************************************** END *********************************************************/

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getSlotListApi()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getSlotListApi()
  }

  onSearch(val, event) {
    this.page.currPage = 1
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13)
        this.getSlotListApi()
    } else if (val === 2)
      this.getSlotListApi()
  }

  deleteStoreModal(currId) {
    this.slotId = currId
    $(`#delete-slot`).modal({ backdrop: 'static' })
  }

  // ********************************* Delete Store on modal******************************************************* //
  onDeleteSlot() {
    let sportsData = {
      "storeId": this.slotId
    }
    this.service.postApi('organizer/deleteStore', sportsData, 1).subscribe(response => {
      if (response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        $(`#delete-slot`).modal('hide')
        this.getSlotListApi()
      }
    })
  }
  /******************************************************* END **********************************************************/


  // ************************************** Get a particular Slot detail for edit on modal ********************************* //
  editSlotModal(id) {
    this.slotId = id
    $(`#edit_slot`).modal({ backdrop: 'static' })
    this.slotList.docs.forEach((obj) => {
      if (obj.slots._id == this.slotId) {
        this.slotDetail = obj
        this.editSlotForm.patchValue({
          sportData: this.slotDetail.slots.sport,
          numOfSlot: this.slotDetail.slots.noOfSlot,
          price: this.slotDetail.slots.price,
        })
      }
    });
  }
  // **************************************** END ******************************************************** //

  // ********************************* Update Store on modal******************************************************* //
  updateSlotFun() {
    let editSlotData = {
      "venueId": this.venueId,
      "slotId": this.slotId,
      "sport": this.editSlotForm.value.sportData,
      "noOfSlot": this.editSlotForm.value.numOfSlot,
      "price": this.editSlotForm.value.price
    }

    this.service.postApi('venue/editSlotToVenue', editSlotData, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#edit_slot`).modal('hide')
        this.getSlotListApi()
      } else {
        this.service.toastrErr(response.responseMessage)
        $(`#edit_slot`).modal('hide')
      }
    })
  }
  // **************************************** END ******************************************************** //



}
