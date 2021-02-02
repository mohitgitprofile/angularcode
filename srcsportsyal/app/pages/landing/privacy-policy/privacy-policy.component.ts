import { Component, OnInit, MainService } from '../../../index';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyDet: any = ''
  constructor(private service: MainService) { }

  ngOnInit() {
    if(this.service.getStorage('userDetailYala') != null) {
      let userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
      if(userDetail.role == 'ORGANIZER')
        this.getPrivacyApi('ORGANIZER')
      else if(userDetail.role == 'PLAYER')
        this.getPrivacyApi('PLAYER')
    } else {
      this.getPrivacyApi('NONE')
    } 
    
  }

  getPrivacyApi(val) {
    let data = {
      role: val || 'NONE'
    }
    this.service.postApi(`terms/getTermsAndConditions`, data, 0).subscribe(response => {
      if(response.responseCode == 200) {
        this.privacyDet = response.result.privacyPolicy
      }
    })
  }

}
