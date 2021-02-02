import { Component, OnInit, MainService, ActivatedRoute, Router   } from '../../../../index';

declare var $: any;
@Component({
  selector: 'app-comp-header',
  templateUrl: './comp-header.component.html',
  styleUrls: ['./comp-header.component.css']
})
export class CompHeaderComponent implements OnInit {
  chatList: any = [];
  competitionId: any;
  organizerId: any;
  competitionDetail: any = {};
  playerFollowStatus: any = [];
  userDetails: any = {};
  pageName: string;
  msg
  profileData:any

  constructor(private service: MainService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.competitionId = params['compId']
      this.organizerId = params['orgId'];
      console.log("competitionId Header-->",this.competitionId);
      console.log("organizerId Header-->",this.organizerId);
    })
   
    var url = this.router.url.split('/');
    this.pageName = url[2];
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getCompetitionDetailApi();
    this.getChatList();
    // 
    this.getProfileApi()
  }

  // ************ get competition detail Api **************************************************************************************** //
  getCompetitionDetailApi() {
   
    var bodyData = {
      'userId': this.organizerId,
      'competitionId': this.competitionId
    }
    return new Promise((resolve, reject) => {
      this.service.postApi('organizer/competition/getACompetition', bodyData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.competitionDetail = Response[`result`]
          this.playerFollowStatus = this.competitionDetail.playerFollowStatus;
          resolve(true)
        }
      })
    })
  }
  // ************ End get competition detail Api **************************************************************************************** //

    // ************ Unfollow competition Api **************************************************************************************** //
    unfollowModal() {
      $("#unfollow_modal").modal(`show`);
    }
    
    unfollow() {
      let unfollowData = {
        "userId": this.userDetails._id,
        "competitionId": this.competitionId
      }
      return new Promise((resolve, reject) => {
        this.service.postApi('player/competition/unFollowCompetition', unfollowData, 1).subscribe(responseList => {
          let Response = responseList;
          if (Response['responseCode'] == 204) {
            this.service.toastrSucc(responseList.responseMessage)
            $("#unfollow_modal").modal(`hide`);
            this.router.navigate(['/player/searchCompetition'])
            resolve(true)
          }
        })
      })
    }
    // ************ End unfollow competition Api **************************************************************************************** //

    getProfileApi() {
      this.service.getApi(`users/getDetail?_id=${this.userDetails._id}`, 1).subscribe(response => {
        if(response.responseCode == 200) {
          this.profileData = response.result         
          console.log('profile-->', this.profileData)
        }
      })
    }


    messageModal() {
      $("#send_message").modal(`show`);
    }
    

    getChatList () {
      let chatData = {
        "playerId":  this.userDetails._id ,
        "organizerId": this.competitionDetail.organizer
      }
      //************** Get Chat List Api Integration *************//
      this.service.postApi("chat/getMessages", chatData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          if(Response.result.docs.length){
            this.chatList = Response.result.docs[0].message
          }
         
        }
   
      })
      //************** End *************//
    }

     // ************ Send Message to organizer Api **************************************************************************************** //

     closeModal () {
      $("#send_message").modal(`hide`);
      this.msg = ''
     }
    
    sendMessage() {
      let chatData = {
        "playerId":  this.userDetails._id,
        "organizerId": this.competitionDetail.organizer,
        "message":{
          "message": this.msg,
          "senderId":  this.userDetails._id,
        }
      }
      return new Promise((resolve, reject) => {
        this.service.postApi('chat/sendMessage', chatData, 1).subscribe(responseList => {
          let Response = responseList;
          if (Response['responseCode'] == 200) {
            this.getChatList();
            this.msg = ''
            this.service.toastrSucc(responseList.responseMessage)
            // $("#unfollow_modal").modal(`hide`);
            // this.router.navigate(['/player/searchCompetition'])
            resolve(true)
          }
        })
      })


      

     
      
        //************** Send Message Api Integration *************//
        // this.presentLoading();
        // this.httpService.postAuthMethod(chatData, "chat/sendMessage").then(succ => {
        //   this.httpService.serData = succ;
        //   this.loading.dismiss();
        //   if (this.httpService.serData.responseCode == 200) {
        //     this.msg = ''
        //     this.content.scrollToBottom();
        //     this.getChatList();
        //   } else {
        //     let alert = this.alertCtrl.create({
        //       title: 'Yala App',
        //       subTitle: this.httpService.serData.responseMessage,
        //       buttons: [{
        //         text: 'OK',
        //         handler: () => {
        //         }
        //       }]
        //     });
        //     alert.present();
        //   }
        // }).catch(err => {
        //   this.loading.dismiss();
        //   console.log(err)
        // })
        //************** End *************//
    }
    // ************ End unfollow competition Api **************************************************************************************** //

}
