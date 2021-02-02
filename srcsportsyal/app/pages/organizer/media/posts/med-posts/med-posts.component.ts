import { Component, OnInit, MainService } from '../../../../../index';
import { GlobalConstant } from '../../../../../global/global.constant';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-med-posts',
  templateUrl: './med-posts.component.html',
  styleUrls: ['./med-posts.component.css']
})
export class MedPostsComponent implements OnInit {
  userDetails: any = {};
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit };
  postData: any = {docs: []};
  currData: any = {};
  constructor(private service: MainService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.postsApi()
  }

  postsApi() {
    let data = {
      page: this.filter.currPage,
      limit: this.filter.limit
    }
    this.service.postApi(`media/getListofMedia?userId=${this.userDetails._id}`, data, 1).subscribe(response => {
      if(response['responseCode'] == 200) {
        this.postData = response.result
        this.postData.docs.forEach(element => {
          if(element.typeOfMedia == 'VIDEO') {
            // var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            // var match = element.youtubeUrls.match(regExp);
            element.youtubeUrls = this.sanitizer.bypassSecurityTrustResourceUrl(element.youtubeUrls)
          }
        });
      }
    })
  }

  onPageChange(page) {
    this.filter.currPage = page;
    this.postsApi()
  }

  deleteModal(_id, mediaType) {
    this.currData = Object.assign({}, { id: _id, typeOfMedia: mediaType })
    $(`#media_org_delete`).modal({backdrop: 'static'});
  }

  onDeletePost() {
    this.service.getApi(`media/mediaDelete?mediaId=${this.currData.id}&userId=${this.userDetails._id}`, 1).subscribe(response => {
      if(response.responseCode == 204) {
        $(`#media_org_delete`).modal('hide');
        this.service.toastrSucc(response.responseMessage)
        this.postsApi()
      }
    })
  }

  onLike(id) {
    this.service.getApi(`media/likeMedia?userId=${this.userDetails._id}&mediaId=${id}`, 1).subscribe(response => {
      if(response.responseCode == 200 || response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        this.postsApi()
      }
    })
  }
}
