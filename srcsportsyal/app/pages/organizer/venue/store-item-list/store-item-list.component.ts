import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-store-item-list',
  templateUrl: './store-item-list.component.html',
  styleUrls: ['./store-item-list.component.css']
})
export class StoreItemListComponent implements OnInit {
  itemId: any;
  storeId: any;
  venueId: any;
  venueList: any = [];
  itemList: any = { docs: [] };
  constructor(private fb: FormBuilder, private service: MainService, private route: ActivatedRoute, private router: Router) { }
  userDetails: any = {};
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  addStoreItemForm: FormGroup
  editStoreItemForm: FormGroup
  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
      this.storeId = params['storeId']
    })
    this.addStoreItemForm = this.fb.group({
      StoreItemName: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    this.editStoreItemForm = this.fb.group({
      StoreItemName: ['', Validators.required],
      quantity: ['', Validators.required],
    })
    this.getStoreItemListApi();
  }

  get gStoreItemForm() {
    return this.addStoreItemForm.controls;
  }

  get eStoreItemForm() {
    return this.editStoreItemForm.controls;
  }

  /********************************************** API INTEGRATION TO GET STORE ITEM LIST ******************************************/
  getStoreItemListApi() {
    let storeData = {
      "organizerId": this.userDetails._id,
      "venueId": this.venueId,
      "page": this.page.currPage,
      "limit": this.page.limit,
      "search": this.page.search,
      "storeId": this.storeId
    }
    this.service.postApi('organizer/searchItemWithPagination', storeData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.itemList = response.result
      }
    })
  }
  /**************************************************************** END *********************************************************/

  addStoreItemModal() {
    this.addStoreItemForm = this.fb.group({
      StoreItemName: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    $(`#add_storeItem`).modal('show')
  }

  /********************************************* API INTEGRATION TO ADD STORE ITEM LIST ******************************************/
  addStoreItem() {
    let addStoreItemData = {
      "organizerId": this.userDetails._id,
      "venueId": this.venueId,
      "itemName": this.addStoreItemForm.value.StoreItemName,
      "quantity": this.addStoreItemForm.value.quantity,
      "storeId": this.storeId
    }

    this.service.postApi('organizer/addItem', addStoreItemData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $(`#add_storeItem`).modal('hide')
        this.getStoreItemListApi()
      }
    })
  }
  /**************************************************************** END *********************************************************/

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getStoreItemListApi()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getStoreItemListApi()
  }

  onSearch(val, event) {
    this.page.currPage = 1
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13)
        this.getStoreItemListApi()
    } else if (val === 2)
      this.getStoreItemListApi()
  }

  deleteStoreItemModal(currId) {
    this.itemId = currId
    $(`#deleteItem-modal`).modal({ backdrop: 'static' })
  }

  // ********************************* Delete Store ITEM on modal******************************************************* //
  onDeleteStoreItem() {
    let sportsData = {
      "itemId": this.itemId
    }
    this.service.postApi('organizer/deleteItem', sportsData, 1).subscribe(response => {
      if (response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        $(`#deleteItem-modal`).modal('hide')
        this.getStoreItemListApi()
      }
    })
  }
  // ******************************************************** END ******************************************************** //

  // ********************************** Get a particular Store ITEM detail for edit on modal ***************************** //
  editStoreItemModal(id) {
    this.itemId = id
    $(`#edit_StoreItem`).modal({ backdrop: 'static' })

    this.service.getApi('organizer/getItem/' + this.itemId, 1).subscribe(response => {
      if (response.responseCode == 201) {
        let StoreItemData = response.result
        this.editStoreItemForm.patchValue({
          StoreItemName: StoreItemData.itemName,
          quantity: StoreItemData.quantity,
        })
      }
    })
  }
  // ****************************************************** END ******************************************************** //

  // ************************************* Update Store ITEM on modal *************************************************** //
  updateStoreItemModal() {
    let editStoreData = {
      "itemId": this.itemId,
      "itemName": this.editStoreItemForm.value.StoreItemName,
      "quantity": this.editStoreItemForm.value.quantity
    }
    this.service.postApi('organizer/editItem', editStoreData, 1).subscribe(response => {
      if (response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        $(`#edit_StoreItem`).modal('hide')
        this.getStoreItemListApi()
      }
    })
  }
  // ******************************************************** END ******************************************************** //

}
