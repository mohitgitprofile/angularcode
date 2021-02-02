import { Component, OnInit, MainService  ,ActivatedRoute} from '../../../../index';

declare var $: any

@Component({
  selector: 'app-player-media-detail',
  templateUrl: './player-media-detail.component.html',
  styleUrls: ['./player-media-detail.component.css']
})
export class PlayerMediaDetailComponent implements OnInit {
  userDetails: any;
  mediaId: any;
  list: any = { medialist: {} }
  bodyData: any={}
  profileData: any ={}
  constructor(private service: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      this.mediaId = params['mediaId']
    })
    this.getMediaDetail();
    this.getProfileApi()
  }

  getMediaDetail() {
      this.service.getApi('media/getDetailofMedia?userId='+this.userDetails._id+'&mediaId=' + this.mediaId, 1).subscribe(responseList => {
        this.list.mediaDetail = responseList[`result`];
        console.log("this.list.mediaDetail----->>> ",JSON.stringify(this.list.mediaDetail))
      })
  }
  comment(){
    this.bodyData = {
      "text":$('#comment').val()
    }
    this.service.postApi('media/commentMedia?userId=' + this.userDetails._id + '&mediaId=' + this.mediaId, this.bodyData, 1).subscribe(responseList => {
      let Response = responseList;
      this.service.spinnerHide();
      if (Response['responseCode'] == 200) {
        $('#comment').val("")
       console.log ('comment succ')  
       this.getMediaDetail()     
      }
      else {
        console.log(Response['responseMessage'])
      }
    })
    
  }

  like(mediaData) {
    console.log('mediaData ',mediaData)
    return new Promise((resolve, reject) => {
      this.service.getApi('media/likeMedia?userId=' + this.userDetails._id + '&mediaId=' + mediaData._id, 1).subscribe(responseList => {
        if (responseList.responseCode == 201) {
          return (mediaData.likeStatus = 'False', --mediaData.noOfLike)
        } else if (responseList.responseCode == 200) {
          return (mediaData.likeStatus = 'True', ++mediaData.noOfLike)
        }
      })
    })
  }

  getProfileApi() {
    this.service.getApi(`users/getDetail?_id=${this.userDetails._id}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.profileData = response.result
        console.log('profile-->', this.profileData)
      }
    })
  }

}
