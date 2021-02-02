import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators, ActivatedRoute } from '../../../../../index';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-med-pcreate-album',
  templateUrl: './med-pcreate-album.component.html',
  styleUrls: ['./med-pcreate-album.component.css']
})
export class MedPcreateAlbumComponent implements OnInit {
  
  list: any = { orgList: [] };
  userDetails: any = {};
  albumForm: FormGroup;
  imgArr: any = []
  currId: string = '';
  albumData: any = {};
  memberlist: any;
  mediaForm: FormGroup;
  competitionDetail: any= {};
  membershipDetail: any= {};
  venueDetail: any= {};
  venueList: any=[];
  loginTypeArr: any=[];
  loginRole: any;
  organizerId: any='';
  organizerName: any;
 
  constructor(private service: MainService, private fb: FormBuilder, private route: ActivatedRoute) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    //     this.route.params.subscribe(async (params) => {
    //   await this.getCompetitionListApi()
    //   if(params['id'] != 'add') {
    //     this.currId = JSON.stringify(params['id'])
        
        
        
    //   }
    // })
    this.route.params.subscribe(params => {
      console.log('params=>' + params[`id`]);
      this.currId = params[`id`]
      if(this.currId != 'add'){
        console.log("CurrID--->>> ",this.currId);
        this.getMediaDetail(this.currId);
      }
    });
    this.getCompetitionListApi()
    
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');
    if(this.loginTypeArr.length == 1){
      this.loginRole = this.loginTypeArr[0];
    }
    this.formValidation();
    this.memberList();
    this.getVenueFunc();
  }
  formValidation(){
    this.mediaForm = new FormGroup({
     'title': new FormControl('',[Validators.required, Validators.pattern(/^\s*\S+.*/)]),
     'description': new FormControl('',Validators.required),
     'competition': new FormControl('')
    })
  }
  // Get Role 
  getRole(event){
  console.log('Event ---->>>>',event.target.value);
  this.loginRole = event.target.value;
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
  
  // Get Membership List 
  memberList(){
    var url = `membership/selectMembership?organizerId=`+this.userDetails._id;
    this.service.getApi(url,1).subscribe(response => {
    if(response.responseCode == 200) {
      // console.log(JSON.stringify(response));
      this.memberlist = response.result;
      // console.log("member list--> ",this.memberlist);
    } else if(response.responseCode == 402) {
      
    }
  });
  }

  // Get Venue List Functionality
  getVenueFunc(){
    var url = `venue/getVenueWithoutPagination?organizerId=`+this.userDetails._id;
    this.service.getApi(url,1).subscribe(response => {
    if(response.responseCode == 200) {
      // console.log(JSON.stringify(response));
      this.venueList = response.result;
      console.log("Venue list--> ",this.venueList);
    } else if(response.responseCode == 402) {
      
    }
  });
  }

// Get CompetitionId Functionality
getCompetitionId(event){
  // console.log("CompetitonID--->>> ",event.target.value);
  this.competitionDetail= this.list.orgList.filter(x => x._id === event.target.value);
  // console.log("this.competitionDetail---->>>> ",this.competitionDetail);
}

// Get MembershipId Functionality
getMembershipId(event){
  // console.log("MembershipID--->>> ",event.target.value);
  this.membershipDetail= this.memberlist.filter(x => x._id === event.target.value);
  // console.log("this.memvershipDetail---->>>> ",this.membershipDetail);
}

// Get VenueId Functionality
getVenueId(event){
  // console.log("VenueId--->>> ",event.target.value);
  this.venueDetail= this.venueList.filter(x => x._id === event.target.value);
  // console.log("this.VenueDetail---->>>> ",this.venueDetail);
}



get form() {
    return this.albumForm.controls;
  }
  fileChange(event) {
    // console.log(`fileChange`)
    this.service.fileChangeEvent(event).then((res: any) => {
      // console.log(res.target.result)
      this.imgArr.push(res.target.result)
    })
  }

  onPublish(val) {
  
    var date = new Date();
    var data = {};
    let todayDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let formVal = this.mediaForm.value
    // let comp = this.list.orgList.filter(x => x._id == formVal.competition)[0].competitionName
   if(this.loginRole == 'COMPETITION'){
       data = {
        typeOfMedia: "ALBUM",
        competitionName:this.competitionDetail[0]?this.competitionDetail[0].competitionName:this.organizerName,
        competitionId: this.competitionDetail[0]?this.competitionDetail[0]._id:this.organizerId,     
        title: formVal.title?formVal.title:this.albumData.title,
        description: formVal.title?formVal.description:this.albumData.description,
        time: time,
        date: todayDate
      }
    }
    else if(this.loginRole == 'MEMBERSHIP'){
     data = {
        typeOfMedia: "ALBUM",
        membershipName:this.membershipDetail[0]?this.membershipDetail[0].membershipName:this.organizerName,
        membershipId:this.membershipDetail[0]?this.membershipDetail[0]._id:this.organizerId,
        title: formVal.title?formVal.title:this.albumData.title,
        description: formVal.title?formVal.description:this.albumData.description,
        time: time,
        date: todayDate
      }
    }
    else if(this.loginRole == 'VENUE'){
      data = {
        typeOfMedia: "ALBUM",
        venueName:this.venueDetail[0]?this.venueDetail[0].venueName:this.organizerName,
        venueId:this.venueDetail[0]?this.venueDetail[0]._id:this.organizerId,
        title: formVal.title?formVal.title:this.albumData.title,
        description: formVal.title?formVal.description:this.albumData.description,
        time: time,
        date: todayDate
      }
    }
    
    let url = '';
    if(val == 1) {
      url = `media/createAlbum?userId=${this.userDetails._id}`
      data['image'] = this.imgArr
    } else if(val == 2) {
      url = `media/editMedia?userId=${this.userDetails._id}&mediaId=${this.currId}`
      // for(var i=0;i<this.albumData.mediaUrls.length;i++){
      //   this.imgArr.push(this.albumData.mediaUrls[i]);
      // }
      // this.albumData.mediaUrls.map(x => {
      //   if (!this.imgArr.includes(x)) this.imgArr.push(x)
      // })  
      data['image'] = this.imgArr.filter(x => {
        return (x.indexOf(';base64,') != -1) ? true : false
      })
      data['mediaUrls'] = this.albumData.mediaUrls
    }
    //  console.log(data)
    this.service.postApi(url, data, 1).subscribe(response => {
      if(response['responseCode'] == 201 || response['responseCode'] == 200) {
        this.service.toastrSucc(response.responseMessage)
        window.history.back()
      }
    })
  }
  onDeleteImg(index) {
    // console.log(index)
    let i = this.albumData.mediaUrls.findIndex(x => x.url == this.imgArr[index])
    if(i != -1) this.albumData.mediaUrls.splice(i, 1)
    this.imgArr.splice(index, 1)
  }

  goBack() {
    window.history.back()
  }

  getMediaDetail(mediaId) {
    this.service.getApi(`media/getDetailOfMedia?userId=${this.userDetails._id}&mediaId=${mediaId}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        console.log("Media Detail ---->>> ",JSON.stringify(response.result));
        this.albumData = response.result;
        this.loginRole = this.albumData.competitionId?'COMPETITION':(this.albumData.membershipId?'MEMBERSHIP':(this.albumData.venueId?'VENUE':''))
        this.organizerName = this.albumData.competitionId?this.albumData.competitionName:(this.albumData.membershipId?this.albumData.membershipName:(this.albumData.venueId?this.albumData.venueName:''))
        if(this.loginRole == 'COMPETITION'){
          this.organizerId = this.albumData.competitionId._id
        }
        else if(this.loginRole == 'MEMBERSHIP'){
          this.organizerId = this.albumData.membershipId._id
        }
        else {
          this.organizerId = this.albumData.venueId
        }
        console.log("organizerId ---->>> ",this.organizerId);
         // if(this.loginTypeArr.includes('COMPETITION')){
          // this.mediaForm.patchValue({
          //   title: this.albumData.title,
          //   description: this.albumData.description,
          //   competition:this.loginTypeArr.includes('COMPETITION')?this.albumData.competitionId:(this.loginTypeArr.includes('MEMBERSHIP')?this.albumData.membershipId:(this.loginTypeArr.includes('VENUE')?this.albumData.venueId:''))
          // })     
          // console.log("Media Detail3 ---->>> ",JSON.stringify(this.mediaForm));    
      //   }
      //   else if(this.loginTypeArr.includes('MEMBERSHIP')){
      //     this.mediaForm.patchValue({
      //       title: this.albumData.title,
      //       description: this.albumData.description,
      //       membership: this.albumData.membershipId
      //     })
         
      //   }
      //  else if(this.loginTypeArr.includes('VENUE')){
      //     this.mediaForm.patchValue({
      //       title: this.albumData.title,
      //       description: this.albumData.description,
      //       venue: this.albumData.venueId
      //     })
      //     // 
      //   }        
     
        this.imgArr = this.albumData.mediaUrls.map(x => x.url)
        console.log("Image Detail ---->>> ",JSON.stringify(this.imgArr));
      }
    })
  }

}
