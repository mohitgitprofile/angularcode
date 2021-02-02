import { Component, OnInit, MainService } from '../../../index';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
  termsDet: any = '';
  constructor(private service: MainService) { }

  ngOnInit() {
    if(this.service.getStorage('userDetailYala') != null) {
      let userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
      if(userDetail.role == 'ORGANIZER')
        this.getTermsApi('ORGANIZER')
      else if(userDetail.role == 'PLAYER')
        this.getTermsApi('PLAYER')
    } else {
      this.getTermsApi('NONE')
    } 
    
  }
  getTermsApi(val) {
    let data = {
      role: val || 'NONE'
    }
    this.service.postApi(`terms/getTermsAndConditions`, data, 0).subscribe(response => {
      if(response.responseCode == 200) {
        this.termsDet = response.result.termsAndConditions
      }
    })
  }

}
