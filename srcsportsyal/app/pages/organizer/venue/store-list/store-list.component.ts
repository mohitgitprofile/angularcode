import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  storeId: any;
  venueId: any;
  venueList: any = [];
  storeList: any = { docs: [] };
  constructor(private fb: FormBuilder, private service: MainService, private route: ActivatedRoute, private router: Router) { }
  userDetails: any = {};
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  addStoreForm: FormGroup
  editStoreForm: FormGroup
  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.addStoreForm = this.fb.group({
      storeName: ['', Validators.required],
      // quantity: ['', Validators.required],
      venueData: ['', Validators.required]
    });
    this.editStoreForm = this.fb.group({
      storeName: ['', Validators.required],
      // quantity: ['', Validators.required],
      venueData: ['', Validators.required]
    })
    this.getVenueListApi()
  }

  get gStoreForm() {
    return this.addStoreForm.controls;
  }

  get eStoreForm() {
    return this.editStoreForm.controls;
  }

  /*********************************************** API INTEGRATION TO GET VENUE LIST ********************************************/
  getVenueListApi() {
    this.service.getApi('venue/getVenueWithoutPagination?organizerId=' + this.userDetails._id, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueList = response.result
        if (this.venueList.length) {
          this.venueId = this.venueList[0]._id;
          this.getStoreListApi();
        }
      }
    })
  }
  /**************************************************************** END *********************************************************/

  onVenueSelect() {
    this.page.currPage = 1
    this.getStoreListApi();
  }

  /*********************************************** API INTEGRATION TO GET STORE LIST ********************************************/
  getStoreListApi() {
    let storeData = {
      "organizerId": this.userDetails._id,
      "venueId": this.venueId,
      "page": this.page.currPage,
      "limit": this.page.limit,
      "search": this.page.search
    }
    this.service.postApi('organizer/searchStoreWithPagination', storeData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.storeList = response.result
      }
    })
  }
  /**************************************************************** END *********************************************************/

  addStoreModal() {
    this.addStoreForm = this.fb.group({
      storeName: ['', Validators.required],
      // quantity: ['', Validators.required],
      venueData: ['', Validators.required]
    });
    $(`#add_venue`).modal('show')
  }

  /*********************************************** API INTEGRATION TO ADD STORE LIST ********************************************/
  addStore() {
    let addStoreData = {
      "organizerId": this.userDetails._id,
      "venueId": this.addStoreForm.value.venueData,
      "storeName": this.addStoreForm.value.storeName,
      // "quantity": this.addStoreForm.value.quantity
    }
    this.service.postApi('organizer/addStore', addStoreData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#add_venue`).modal('hide')
        this.getStoreListApi()
      }
    })
  }
  /**************************************************************** END *********************************************************/

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getStoreListApi()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getStoreListApi()
  }

  onSearch(val, event) {
    this.page.currPage = 1
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13)
        this.getStoreListApi()
    } else if (val === 2)
      this.getStoreListApi()
  }

  deleteStoreModal(currId) {
    this.storeId = currId
    $(`#delete-modal`).modal({ backdrop: 'static' })
  }

  // ********************************* Delete Store on modal******************************************************* //
  onDeleteStore() {
    let sportsData = {
      "storeId": this.storeId
    }
    this.service.postApi('organizer/deleteStore', sportsData, 1).subscribe(response => {
      if (response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        $(`#delete-modal`).modal('hide')
        this.getStoreListApi()
      }
    })
  }
  // *************************************************** END ******************************************************** //

  // ********************************** Get a particular Store detail for edit on modal ***************************** //
  editStoreModal(id) {
    this.storeId = id
    $(`#edit_store`).modal({ backdrop: 'static' })

    this.service.getApi('organizer/getStore/' + this.storeId, 1).subscribe(response => {
      if (response.responseCode == 201) {
        let storeData = response.result
        this.editStoreForm.patchValue({
          storeName: storeData.storeName,
          // quantity: storeData.quantity,
          venueData: storeData.venueId,
        })
        // $(`#edit_store`).modal({ backdrop: 'static' })
      }
    })
  }
  // **************************************** END ******************************************************** //

  // ********************************* Update Store on modal******************************************************* //
  updateStoreModal() {
    let editStoreData = {
      "storeId": this.storeId,
      "venueId": this.editStoreForm.value.venueData,
      "storeName": this.editStoreForm.value.storeName,
      // "quantity": this.editStoreForm.value.quantity
    }
    this.service.postApi('organizer/editStore', editStoreData, 1).subscribe(response => {
      if (response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        $(`#edit_store`).modal('hide')
        this.getStoreListApi()
      }
    })
  }
  // **************************************** END ******************************************************** //

}
