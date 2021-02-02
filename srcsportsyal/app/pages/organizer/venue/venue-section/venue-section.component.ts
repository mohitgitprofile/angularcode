import { Component, OnInit, MainService, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-venue-section',
  templateUrl: './venue-section.component.html',
  styleUrls: ['./venue-section.component.css']
})
export class VenueSectionComponent implements OnInit {
  approvalListData: any = { docs: [] };
  approveRequestData: any = {};
  userDetails: any = {};
  venueId: any = '';
  venueList: any = [];
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  deleteData: {};
  statusValue: any = "";
  limitChange: any = GlobalConstant.limitChangeArr[0];

  constructor(private service: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getVenueListApi();
  }

  /*********************************************** API INTEGRATION TO GET VENUE LIST ********************************************/
  getVenueListApi() {
    this.service.getApi('venue/getVenueWithoutPagination?organizerId=' + this.userDetails._id, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.venueList = response.result
        if (this.venueList.length) {
          // this.venueId = this.venueList[0].venueName;
          this.getApprovalList();
        }
      }
    })
  }
  /**************************************************************** END *********************************************************/

  // ***************************************************** Get All approval Api ************************************************ // 
  getApprovalList() {
    let approvalData = {
      'organizerId': this.userDetails._id,
      'venueName': this.venueId,
      'status': this.statusValue,
      "page": this.page.currPage,
      "limit": this.page.limit,
      "search": this.page.search,
      "playerId": ""
    }
    this.approvalListData = [];
    this.service.postApi("venue/getApprovalList", approvalData, 0).subscribe(responseList => {
      let approvalListData = responseList;
      if (approvalListData.responseCode == 200) {
        this.approvalListData = approvalListData.result;
      }
    })
  }
  // ******************************************** End Get All approval Api **************************************************** //


  onVenueSelect() {
    this.page.currPage = 1
    this.getApprovalList();
  }

  // ************************************* Approve request Api *************************************************************** //
  approveFun(data) {
    this.approveRequestData = {
      'organizerId': this.userDetails._id,
      'venueId': data._id,
      'playerId': data.playerFollowStatus.playerId[0]._id,
      'followStatus': 'APPROVED'
    }

    this.service.postApi("venue/approveVenue", this.approveRequestData, 0).subscribe(responseList => {
      let approvalListData = responseList;
      if (approvalListData.responseCode == 200) {
        this.service.toastrSucc(responseList.responseMessage)
        this.approvalListData = approvalListData.result;
        this.getApprovalList();
      } else {
        this.service.toastrErr(responseList.responseMessage)
      }
    })
  }
  // *********************************************** End approve request Api ***************************************************** //

  // *********************************************** Delete approval Api ********************************************************* //
  deleteApproval(data) {
    this.deleteData = {
      'playerId': data.playerFollowStatus.playerId[0]._id,
      'venueId': data._id
    }
  }

  confirmDelete() {
    this.service.postApi("venue/unFollowVenue", this.deleteData, 1).subscribe(responseList => {
      let message = responseList;
      if (message.responseCode == 200) {
        this.service.toastrSucc(responseList.responseMessage)
        this.getApprovalList();
        $("#delete-section-modal").modal(`hide`);
      } else {
        $("#delete-section-modal").modal(`hide`);
        this.service.toastrErr(responseList.responseMessage)
      }
    })
  }
  // ******************************************** End delete approval Api ******************************************************** //

  filterStatus() {
    this.page.currPage = 1;
    this.getApprovalList()
  }

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getApprovalList()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getApprovalList()
  }

  onSearch(val, event) {
    this.page.currPage = 1
    if (val === 1) {
      if (!this.page.search || event.keyCode == 13)
        this.getApprovalList()
    } else if (val === 2)
      this.getApprovalList()
  }

}