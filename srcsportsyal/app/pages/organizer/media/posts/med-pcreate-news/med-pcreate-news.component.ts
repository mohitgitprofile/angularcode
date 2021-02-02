import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators, ActivatedRoute } from '../../../../../index';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-med-pcreate-news',
  templateUrl: './med-pcreate-news.component.html',
  styleUrls: ['./med-pcreate-news.component.css']
})
export class MedPcreateNewsComponent implements OnInit {
  userDetails: any = {} ;
  list: any = { orgList: [] };
  newsForm: FormGroup;
  fileName: any = '';
  image: any = '';
  currId: any = ''
  newsData: any = {}
  memberlist: any;
  loginTypeArr:any=[];
  venueList: any=[];
  competitionDetail: any=[];
  membershipDetail: any=[];
  venueDetail: any=[];
  loginRole: any;
  constructor(private service: MainService, private fb: FormBuilder, private route: ActivatedRoute) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
   
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'));
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');
    if(this.loginTypeArr.length == 1){
      this.loginRole = this.loginTypeArr[0];
    }
    this.formValidation();
    this.memberList();
    this.getVenueFunc();
    this.route.params.subscribe(async (params) => {
      console.log('params => ', params['id'])
      await this.getCompetitionListApi()
      if(params['id'] != 'add') {
        this.currId = params['id']
        this.getMediaDetail();
       
      }
    })
  }

  // Form Validation Functionality
  formValidation(){
    this.newsForm = new FormGroup({
     'title': new FormControl('',[Validators.required, Validators.pattern(/^\s*\S+.*/)]),
     'description': new FormControl('',Validators.required),
     'image':new FormControl('',Validators.required)
    })
  }

  
  //  Get competition list Api
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


// Get Membership List 
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
    return this.newsForm.controls;
  }
  goBack() {
    window.history.back()
  }
  onFileChange(event) {
    // console.log(event.target.value.split('\\').splice(-1))
    this.fileName = event.target.value.split('\\').splice(-1)
    this.service.fileChangeEvent(event).then((res: any) => {
      // console.log('res => ', res)
      this.image = res.target.result
    })
  }
  onPublish(val) {
    var date = new Date();
    var data = {};
    let todayDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let formVal = this.newsForm.value
    // let comp = this.list.orgList.filter(x => x._id == formVal.competition)[0].competitionName
    
    if(this.loginRole == 'COMPETITION'){
      data = {
        typeOfMedia: "NEWS",
        competitionName: this.competitionDetail[0].competitionName,
        competitionId: this.competitionDetail[0]._id,
        title: formVal.title,
        description: formVal.description,
        time: time,
        date: todayDate
      }
   }
   else if(this.loginRole == 'MEMBERSHIP'){
    data = {
       typeOfMedia: "NEWS",
       membershipName: this.membershipDetail[0].membershipName,
       membershipId: this.membershipDetail[0]._id,
       title: formVal.title,
       description: formVal.description,
       time: time,
       date: todayDate
     }
   }
   else {
     data = {
       typeOfMedia: "NEWS",
       venueName: this.venueDetail[0].venueName,
       venueId: this.venueDetail[0]._id,
       title: formVal.title,
       description: formVal.description,
       time: time,
       date: todayDate
     }
   }     
    let url = '';
    if(val == 1) {
      data['image'] = [this.image]
      url = `media/createAlbum?userId=${this.userDetails._id}`
    } else if(val == 2) {
      if( (this.image.indexOf(';base64,') != -1) ) this.newsData.mediaUrls[0].url = this.image 
      data['mediaUrls'] = this.newsData.mediaUrls
      url = `media/editMediaNews?mediaId=${this.currId}&userId=${this.userDetails._id}`
    }
    
    console.log('data => ',data)
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
        this.newsData = response.result;
        this.newsForm.patchValue({
          title: this.newsData.title,
          description: this.newsData.description,
          competition: this.newsData.competitionId._id
          // this.list.orgList.filter(x => x.competitionName ==  newsData.competitionName)[0]._id
        })
        this.fileName = this.image = this.newsData.mediaUrls[0].url
      }
    })
  }

}
