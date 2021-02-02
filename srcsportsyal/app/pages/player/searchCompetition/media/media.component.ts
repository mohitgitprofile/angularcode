import { Component, OnInit, MainService, ActivatedRoute, DomSanitizer } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant'


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  limitChange: any = GlobalConstant.limitChangeArr[0];
  userDetails: any = {};
  competitionId: any;
  organizerId: any;
  bodyData: any = {};
  list: any = { medialist: {}, limitChangeArr: GlobalConstant.limitChangeArr, limit: GlobalConstant.paginationLimit, statusList: GlobalConstant.statusArr };
  typeOfMedia: string = 'ALL';
  num: any;

  constructor(private service: MainService, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
    console.log("Params---->>>> ",JSON.stringify(params));
      this.competitionId = params['compId']
      this.organizerId = params['orgId']
      this.num = params['num']
    })
   
    this.bodyData = { 'page': 1, 'limit': 2 }
    if(this.num == 1){console.log(`FROM COMPETITION`)} else if(this.num == 2){console.log(`FROM MEMBERSHIP`)} else if(this.num == 3){console.log(`FROM Venue`)}
    this.getMediaApi();
  }

  // ************ get media list Api **************************************************************************************** //
  getMediaApi() {
    var url
    if(this.num == 2){url = `media/mediaList?userId=${this.userDetails._id}&membershipId=${this.competitionId}` } 
    else if(this.num == 1 ){url = `media/mediaList?userId=${this.userDetails._id}&competitionId=${this.competitionId}`}
    else if(this.num == 3 ){url = `media/mediaList?userId=${this.userDetails._id}&venueId=${this.competitionId}`}
    return new Promise((resolve, reject) => {
      this.service.spinnerShow();
      this.service.postApi(url, this.bodyData, 1).subscribe(responseList => {
        console.log(`responseList ${JSON.stringify(responseList)}`)
        let Response = responseList;
        this.service.spinnerHide();
        if (Response['responseCode'] == 200) {
          this.service.mediaList = Response[`result`]
          this.list.medialist = this.service.mediaList;
          for (let i = 0; i < this.list.medialist.docs.length; i++) {
            if (this.list.medialist.docs[i].typeOfMedia == "VIDEO") {
              this.list.medialist.docs[i].securedMediaURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.list.medialist.docs[i].youtubeUrls)
            }
            if (this.list.medialist.docs[i].typeOfMedia == "ALBUM") {
              var mediaUrls = this.list.medialist.docs[i].mediaUrls;
              if (mediaUrls.length > 4) {
                var newMediaUrls = []
                for (let i = 0; i < 4; i++) {
                  newMediaUrls.push(mediaUrls[i])
                }
                this.list.medialist.docs[i].newMediaUrls = newMediaUrls;
                this.list.medialist.docs[i].newMediaUrlsLength = mediaUrls.length - 4;
              } else {
                this.list.medialist.docs[i].newMediaUrls = mediaUrls;
                this.list.medialist.docs[i].newMediaUrlsLength = 0;
              }
            }
          }
          resolve(true)
        }
      })
    })
  }
  // ************ End get media list Api **************************************************************************************** //

  allMedia() {
    this.typeOfMedia = 'ALL';
    this.bodyData = {};
    this.list.medialist = {};
    this.bodyData = { 'page': 1, 'limit': this.list.limit }
    this.getMediaApi();
  }
  albumMedia() {
    this.typeOfMedia = 'ALBUM';
    this.list.medialist = {};
    this.bodyData.typeOfMedia = 'ALBUM';
    this.getMediaApi();
  }
  videoMedia() {
    this.typeOfMedia = 'VIDEO';
    this.list.medialist = {};
    this.bodyData.typeOfMedia = 'VIDEO';
    this.getMediaApi();
  }
  newsMedia() {
    this.typeOfMedia = 'NEWS';
    this.list.medialist = {};
    this.bodyData.typeOfMedia = 'NEWS';
    this.getMediaApi();
  }
  like(mediaData) {
    return new Promise((resolve, reject) => {
      this.service.getApi('media/likeMedia?userId=' + this.userDetails._id + '&mediaId=' + mediaData._id, 1).subscribe(responseList => {
        if (responseList.responseCode == 409) {
          return (mediaData.likeStatus = 'False', --mediaData.noOfLike)
        } else if (responseList.responseCode == 200) {
          return (mediaData.likeStatus = 'True', ++mediaData.noOfLike)
        }
      })
    })
  }
  share(mediaData) {
  }

  changeLimit() {
    this.bodyData.limit = Math.floor(this.limitChange)
    this.bodyData.page = 1
    this.getMediaApi();
  }

  changePage(data) {
    this.bodyData.page = data
    this.getMediaApi();
  }
}
