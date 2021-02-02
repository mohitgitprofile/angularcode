import { Component, OnInit, MainService } from '../../../index';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  userDetails: any = {};
  profileData: any = {};
  ImageBase64 = "assets/images/user-img.png";

  constructor(private service: MainService) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getProfileApi();
  }

  //****************************************************  Api to get profile details ***************************************************//
  getProfileApi() {
    this.service.getApi(`users/getDetail?_id=${this.userDetails._id}`, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.profileData = response.result;
        if (this.profileData.image) {
          this.ImageBase64 = this.profileData.image;
        }
      }
    })
    this.service.getApi(`player/competition/numberOfPendingApproveComp?userId=${this.userDetails._id}`, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.profileData.following = response.result.approvedRequest;
        this.profileData.pending = response.result.pendingRequest;
      }
    })
  }
  //****************************************** End **********************************************************************************//

}