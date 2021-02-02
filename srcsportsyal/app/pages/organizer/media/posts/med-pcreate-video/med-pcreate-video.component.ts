import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators, ActivatedRoute } from '../../../../../index';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-med-pcreate-video',
  templateUrl: './med-pcreate-video.component.html',
  styleUrls: ['./med-pcreate-video.component.css']
})
export class MedPcreateVideoComponent implements OnInit {
  addVideoForm: FormGroup;
  userDetails: any = {};
  list: any = { orgList: [] }
  currId: any = '';
  memberlist: any=[];
  competitionDetail: any=[];
  membershipDetail: any=[];
  venueDetail: any=[];
  venueList: any=[];
  loginTypeArr: any=[];
  loginRole: any;
  constructor(private service: MainService, private fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    
    this.memberList();
    this.getVenueFunc();
    this.route.params.subscribe(async (params) => {
      await this.getCompetitionListApi()
      if(params['id'] != 'add') {
        this.currId = params['id']
        this.getMediaDetail();
       
      }
    })
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');
    if(this.loginTypeArr.length == 1){
      this.loginRole = this.loginTypeArr[0];
    }
    this.formValidation();
    
  }
  
  formValidation(){
    this.addVideoForm = new FormGroup({
     'title': new FormControl('',[Validators.required, Validators.pattern(/^\s*\S+.*/)]),
     'description': new FormControl('',Validators.required),
     'url':new FormControl('',Validators.required)
    })
  } 
// Get Competition List  
  getCompetitionListApi() {
    return new Promise((resolve, reject) => {
      this.service.getApi('data/selectCompition?userId=' + this.userDetails._id, 1).subscribe(response => {
        if (response['responseCode'] == 200) {
          this.list.orgList = response[`result`]
          resolve(true)
        }
      })
    })
  }

  // Get Role 
getRole(event){
  console.log('Event ---->>>>',event.target.value);
  this.loginRole = event.target.value;
}

  // Get Membership List  Functionality
memberList(){
  var url = `membership/selectMembership?organizerId=`+this.userDetails._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.memberlist = response.result;
    console.log("member list--> ",this.memberlist);
   } else if(response.responseCode == 402) {
     
   }
 });
}
// Get Venue List Functionality
getVenueFunc(){
  var url = `venue/getVenueWithoutPagination?organizerId=`+this.userDetails._id;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    console.log(JSON.stringify(response));
    this.venueList = response.result;
    console.log("Venue list--> ",this.venueList);
   } else if(response.responseCode == 402) {
     
   }
 });
}

// Get CompetitionId Functionality
getCompetitionId(event){
  console.log("CompetitonID--->>> ",event.target.value);
  this.competitionDetail= this.list.orgList.filter(x => x._id === event.target.value);
  console.log("this.competitionDetail---->>>> ",this.competitionDetail);
}

// Get MembershipId Functionality
getMembershipId(event){
  console.log("MembershipID--->>> ",event.target.value);
  this.membershipDetail= this.memberlist.filter(x => x._id === event.target.value);
  console.log("this.memvershipDetail---->>>> ",this.membershipDetail);
}

// Get VenueId Functionality
getVenueId(event){
  console.log("VenueId--->>> ",event.target.value);
  this.venueDetail= this.venueList.filter(x => x._id === event.target.value);
  console.log("this.VenueDetail---->>>> ",this.venueDetail);
}

  get form() {
    return this.addVideoForm.controls;
  }
  goBack() {
    window.history.back()
  }
  onPublish(val) {
    var date = new Date();
    var data = {};
    let todayDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let formVal = this.addVideoForm.value
    // let comp = this.list.orgList.filter(x => x._id == formVal.competition)[0].competitionName
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = formVal.url.match(regExp);
    var url = '';
    url = (val == 1 ) ? `media/createAlbum?userId=${this.userDetails._id}` : `media/editMedia?userId=${this.userDetails._id}&mediaId=${this.currId}`
    
    
    if(this.loginRole == 'COMPETITION'){
      data = {
        typeOfMedia: "VIDEO",
        competitionName: this.competitionDetail[0].competitionName,
        competitionId: this.competitionDetail[0]._id,
        title: formVal.title,
        description: formVal.description,
        time: time,
        date: todayDate,
        youtubeUrls: `https://www.youtube.com/embed/`
        // youtubeUrls: `https://www.youtube.com/embed/${match[2]}`
      }
   }
   else if(this.loginRole == 'MEMBERSHIP'){
    data = {
      typeOfMedia: "VIDEO",
      membershipName: this.membershipDetail[0].membershipName,
      membershipId: this.membershipDetail[0]._id,
      title: formVal.title,
      description: formVal.description,
      time: time,
      date: todayDate,
      youtubeUrls: `https://www.youtube.com/embed/`
      // youtubeUrls: `https://www.youtube.com/embed/${match[2]}`    }
   }
  }
   else {
    data = {
      typeOfMedia: "VIDEO",
      venueName: this.venueDetail[0].venueName,
      venueId: this.venueDetail[0]._id,
      title: formVal.title,
      description: formVal.description,
      time: time,
      date: todayDate,
      youtubeUrls: `https://www.youtube.com/embed/`
      // youtubeUrls: `https://www.youtube.com/embed/${match[2]}`    }
   }
  }
    
    console.log("Vedio Data--->>>  ",data)
    this.service.postApi(url, data, 1).subscribe(response => {
      if(response['responseCode'] == 201 || response['responseCode'] == 200) {
        this.service.toastrSucc(response.responseMessage)
        window.history.back()
      }
    })
  }

  getMediaDetail() {
    this.service.getApi(`media/getDetailOfMedia?userId=${this.userDetails._id}&mediaId=${this.currId}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        let videoData = response.result;
        this.addVideoForm.patchValue({
          title: videoData.title,
          description: videoData.description,
          url: videoData.youtubeUrls,
          competition: videoData.competitionId._id
        })

      }
    })
  }

}
