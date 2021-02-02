import { Component, OnInit, MainService, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';

declare var $: any;
@Component({
  selector: 'app-comp-section',
  templateUrl: './comp-section.component.html',
  styleUrls: ['./comp-section.component.css']
})
export class CompSectionComponent implements OnInit {
  approvalListData: any = {};
  approveRequestData: any = {};
  userDetails: any = {};
  competitionId: any;
  list: any = { approvalListData: [], limitChangeArr: GlobalConstant.limitChangeArr, limit: GlobalConstant.paginationLimit };
  deleteData: {};
  statusValue: any = "";
  limitChange: any = GlobalConstant.limitChangeArr[0];

  constructor(private service: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.competitionId = params['id']
    })
    this.approvalListData = {
      'userId': this.userDetails._id,
      'competitionId': this.competitionId,
      'page': 1,
      'search': '',
      'followStatus': '',
      'limit': this.list.limit
    }
    this.getApprovalList();
  }

  // ************ Get All approval Api **************************************************************************************** // 
  getApprovalList() {
    this.list.approvalListData = [];
    this.service.postApi("organizer/competition/searchAndFilterPlayerList", this.approvalListData, 0).subscribe(responseList => {
      // console.log(responseList)
      let approvalListData = responseList;
      if (approvalListData.responseCode == 200) {
        this.list.approvalListData = approvalListData.result;
      }
    })
  }
  // ************ End Get All approval Api **************************************************************************************** //

  // ************ Approve request Api **************************************************************************************** //
  approveFun(data) {
    /* this.approveRequestData = {
      'approvalId': data._id,
      'userId': this.userDetails._id,
      'competitionId': data.competitionId._id,
      'playerId': data.playerId._id,
      'followStatus': 'APPROVED'
    } */
    this.approveRequestData = {
      'approvalId': data._id,
      'userId': this.userDetails._id,
      'competitionId': data.Comp._id,
      'playerId': data.Player._id,
      'followStatus': 'APPROVED'
      }
    this.service.postApi("organizer/competition/approveCompetition", this.approveRequestData, 0).subscribe(responseList => {
      // console.log(responseList)
      let approvalListData = responseList;
      if (approvalListData.responseCode == 200) {
        this.service.toastrSucc(responseList.responseMessage)
        this.list.approvalListData = approvalListData.result;
        this.getApprovalList();
      } else {
        this.service.toastrErr(responseList.responseMessage)
      }
    })
  }
  // ************ End approve request Api **************************************************************************************** //

  // ************ Delete approval Api **************************************************************************************** //
  deleteApproval(data) {
    // console.log(data)
    this.deleteData = {
      "userId": data.Player._id,
      "competitionId": data.Comp._id
    }
  }

  confirmDelete() {
    // console.log(this.deleteData)
    this.service.postApi("player/competition/unFollowCompetition", this.deleteData, 1).subscribe(responseList => {
      let message = responseList;
      if (message.responseCode == 204) {
        this.service.toastrSucc(responseList.responseMessage)
        this.getApprovalList();
        $("#delete-modal").modal(`hide`);
      } else {
        $("#delete-modal").modal(`hide`);
        this.service.toastrErr(responseList.responseMessage)
      }
    })
  }
  // ************ End delete approval Api **************************************************************************************** //

  filterStatus() {
    this.list.approvalListData = [];
    this.approvalListData.followStatus = this.statusValue;
    this.service.postApi("organizer/competition/searchAndFilterPlayerList", this.approvalListData, 0).subscribe(responseList => {
      // console.log(responseList)
      let approvalListData = responseList;
      if (approvalListData.responseCode == 200) {
        if(approvalListData) {
          this.list.approvalListData = approvalListData.result;
        } 
      }
    })
  }

  changePage(data) {
    this.approvalListData.page = data;
    this.getApprovalList();
  }

  changeLimit() {
    this.approvalListData.limit = Math.floor(this.limitChange);
    this.getApprovalList();
  }

  onSearch(val, event) {
    this.approvalListData.page = 1
    if(val === 1) {
      if(!this.approvalListData.search || event.keyCode == 13)
        this.getApprovalList()
    } else if(val === 2)
      this.getApprovalList()
  }

}
