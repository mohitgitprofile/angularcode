import { Component, OnInit, MainService } from '../../../../../index';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-med-post-detail',
  templateUrl: './med-post-detail.component.html',
  styleUrls: ['./med-post-detail.component.css']
})
export class MedPostDetailComponent implements OnInit {
  userDetails: any = {}
  currId: string = '';
  mediaData: any = {};
  imgArr: any = [];
  comment: string = '';
  constructor(private service: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(params => {
      this.currId = params['id']
      this.getMediaDetail();
    })
 // this.getMembershipMediaDetail();
  }
// For Competiton  Functionality 
  getMediaDetail() {
    this.service.getApi(`media/getDetailOfMedia?userId=${this.userDetails._id}&mediaId=${this.currId}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.mediaData = response.result;
        console.log("Media Detail--->>> ",JSON.stringify(this.mediaData))
        this.imgArr = this.mediaData.mediaUrls.map(x => x.url)
      }
    })
  }
  onLike() {
    this.service.getApi(`media/likeMedia?userId=${this.userDetails._id}&mediaId=${this.mediaData._id}`, 1).subscribe(response => {
      if(response.responseCode == 200 || response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        this.getMediaDetail()
      }
    })
  }
  onComment() {
    if(this.comment) {
      console.log('commnet')
      let data = {text: this.comment.trim()}
      this.service.postApi(`media/commentMedia?userId=${this.userDetails._id}&mediaId=${this.mediaData._id}`, data, 1).subscribe(response => {
        if(response.responseCode == 200) {
          this.comment = ``;
          this.getMediaDetail()
        }
      })
    } 
  }

 
}
