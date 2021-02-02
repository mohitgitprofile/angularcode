import { Component, OnInit, MainService } from '../../../index';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutUsDet: any = '';
  constructor(private service: MainService) { }

  ngOnInit() {
    if(this.service.getStorage('userDetailYala') != null) {
      let userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
      if(userDetail.role == 'ORGANIZER')
        this.getAboutUsApi('ORGANIZER')
      else if(userDetail.role == 'PLAYER')
        this.getAboutUsApi('PLAYER')
    } else {
      this.getAboutUsApi('NONE')
    } 
    
  }

  getAboutUsApi(val) {
    let data = {
      role: val || 'NONE'
    }
    this.service.postApi(`terms/getTermsAndConditions`, data, 0).subscribe(response => {
      if(response.responseCode == 200) {
        this.aboutUsDet = response.result.aboutUs
      }
    })
  }

}
