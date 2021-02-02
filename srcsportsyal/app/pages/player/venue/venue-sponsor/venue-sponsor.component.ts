import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router, ActivatedRoute } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $: any;

@Component({
  selector: 'app-venue-sponsor',
  templateUrl: './venue-sponsor.component.html',
  styleUrls: ['./venue-sponsor.component.css']
})
export class VenueSponsorComponent implements OnInit {

  
  venueId: any;
  sponsorList: any = { docs: [] };
  currency: any;
  constructor(private fb: FormBuilder, private service: MainService, private router: Router, private route: ActivatedRoute) { }
  userDetails: any = {};
  page: any = { currPage: 1, limit: GlobalConstant.paginationLimit, search: '', limitChangeArr: GlobalConstant.limitChangeArr, entryLimit: GlobalConstant.limitChangeArr[0] };
  ngOnInit() {
    this.currency = this.service.currencyLogo
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.venueId = params['id']
    })
    this.getSponsorListApi()
  }

  /*********************************************** API INTEGRATION TO GET SLOT LIST ********************************************/
  getSponsorListApi() {
    let sponsorData = {
      "venueId": this.venueId,
      "page": this.page.currPage,
      "limit": this.page.limit,
    }

    this.service.postApi('data/listOfSponsor', sponsorData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.sponsorList = response.result
      }
    })
  }
  /********************************************************** END ******************************************************************/

  onPageChange(pageNo) {
    this.page.currPage = pageNo;
    this.getSponsorListApi()
  }

  onLimitChange() {
    this.page.currPage = 1
    this.page.limit = Number(this.page.entryLimit);
    this.getSponsorListApi()
  }

}
