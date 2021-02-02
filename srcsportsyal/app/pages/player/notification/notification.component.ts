import { Component, OnInit, MainService} from '../../../index';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  userDetail:any
  bodyData = {
    "competitionNotify": {
      "email": [],
      "mobile": []
    },
    "membershipNotify":{
      "email": [],
      "mobile": []
    },
    "venueNotify":{
      "email": [],
      "mobile": []
    }
  }
  modalData:any={"competitionNotify":{}, "membershipNotify":{}, "venueNotify":{}}
  registrationEmail: any;
  registrationMobile: any;
  myTeamEmail: any;
  myTeamMobile: any;
  resultEmail: any;
  resultMobile: any;
  mediaEmail: any;
  mediaMobile: any;
  messageEmail: any;
  messageMobile: any;
  constructor(private service: MainService) {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
   }

  ngOnInit() {
    this.getList();
  }

  getList() {
    //************** get list of notification *************//
    this.service.getApi(`users/getControlNotification?userId=${this.userDetail._id}`, 1).subscribe(responseList => {
      console.log("Response---->>>>",JSON.stringify(responseList));
      if (responseList.responseCode != 200) {
        this.service.toastrErr(responseList.responseMessage)
      } else {
        this.bodyData.competitionNotify = responseList.result.competitionNotify;
        console.log("Competition--->>> ",JSON.stringify(this.bodyData.competitionNotify))
        this.bodyData.membershipNotify = responseList.result.membershipNotify;
        console.log("Competition--->>> ",JSON.stringify(this.bodyData.membershipNotify))
        this.bodyData.venueNotify = responseList.result.venueNotify;
        console.log("Competition--->>> ",JSON.stringify(this.bodyData.venueNotify))
        for (let i = 0; i < this.bodyData.competitionNotify.email.length; i++) {
          if (this.bodyData.competitionNotify.email[i] == 'registration') {
            this.modalData.competitionNotify.registrationEmail = true;
          } else if (this.bodyData.competitionNotify.email[i] == 'myTeam') {
            this.modalData.competitionNotify.myTeamEmail = true;
          } else if (this.bodyData.competitionNotify.email[i] == 'result') {
            this.modalData.competitionNotify.resultEmail = true;
          } else if (this.bodyData.competitionNotify.email[i] == 'media') {
            this.modalData.competitionNotify.mediaEmail = true;
          } else if (this.bodyData.competitionNotify.email[i] == 'message') {
            this.modalData.competitionNotify.messageEmail = true;
          }
        }
        for (let i = 0; i < this.bodyData.competitionNotify.mobile.length; i++) {
          if (this.bodyData.competitionNotify.mobile[i] == 'registration') {
            this.modalData.competitionNotify.registrationMobile = true;
          } else if (this.bodyData.competitionNotify.mobile[i] == 'myTeam') {
            this.modalData.competitionNotify.myTeamMobile = true;
          } else if (this.bodyData.competitionNotify.mobile[i] == 'result') {
            this.modalData.competitionNotify.resultMobile = true;
          } else if (this.bodyData.competitionNotify.mobile[i] == 'media') {
            this.modalData.competitionNotify.mediaMobile = true;
          } else if (this.bodyData.competitionNotify.mobile[i] == 'message') {
            this.modalData.competitionNotify.messageMobile = true;
          }
        }
        for (let i = 0; i < this.bodyData.membershipNotify.email.length; i++) {
          if (this.bodyData.membershipNotify.email[i] == 'evaluationEmail') {
            this.modalData.membershipNotify.evaluationEmail = true;
          } else if (this.bodyData.membershipNotify.email[i] == 'leaderboardEmail') {
            this.modalData.membershipNotify.leaderboardEmail = true;
          } else if (this.bodyData.membershipNotify.email[i] == 'certificateEmail') {
            this.modalData.membershipNotify.certificateEmail = true;
          }
          else if (this.bodyData.membershipNotify.email[i] == 'serviceEmail') {
            this.modalData.membershipNotify.serviceEmail = true;
          }
          else if (this.bodyData.membershipNotify.email[i] == 'message') {
            this.modalData.membershipNotify.messageEmail = true;
          }
          else if (this.bodyData.membershipNotify.email[i] == 'media') {
            this.modalData.membershipNotify.mediaEmail = true;
          }
        }
        for (let i = 0; i < this.bodyData.membershipNotify.mobile.length; i++) {
          if (this.bodyData.membershipNotify.mobile[i] == 'evaluationMobile') {
            this.modalData.membershipNotify.evaluationMobile = true;
          } else  if (this.bodyData.membershipNotify.mobile[i] == 'leaderboardMobile') {
            this.modalData.membershipNotify.leaderboardMobile = true;
          } 
          else  if (this.bodyData.membershipNotify.mobile[i] == 'certificateMobile') {
            this.modalData.membershipNotify.certificateMobile = true;
          } 
          else  if (this.bodyData.membershipNotify.mobile[i] == 'serviceMobile') {
            this.modalData.membershipNotify.serviceMobile = true;
          } 
          else if (this.bodyData.membershipNotify.mobile[i] == 'media') {
            this.modalData.membershipNotify.mediaMobile = true;
          } else if (this.bodyData.membershipNotify.mobile[i] == 'message') {
            this.modalData.membershipNotify.messageMobile = true;
          }
        }
        for (let i = 0; i < this.bodyData.venueNotify.email.length; i++) {
          if (this.bodyData.venueNotify.email[i] == 'venueEmail') {
            this.modalData.venueNotify.venueEmail = true;
          } else if (this.bodyData.venueNotify.email[i] == 'bookingConfirmation') {
            this.modalData.venueNotify.bookingConfirmationEmail = true;
          } else if (this.bodyData.venueNotify.email[i] == 'paymentConfirmation') {
            this.modalData.venueNotify.paymentConfirmationEmail = true;
          } else if (this.bodyData.venueNotify.email[i] == 'bookingReminder') {
            this.modalData.venueNotify.bookingReminderEmail = true;
          } else if (this.bodyData.venueNotify.email[i] == 'mediaEmail') {
            this.modalData.venueNotify.mediaEmail = true;
          }
        }
        for (let i = 0; i < this.bodyData.venueNotify.mobile.length; i++) {
          if (this.bodyData.venueNotify.mobile[i] == 'venueMobile') {
            this.modalData.venueNotify.venueMobile = true;
          } else if (this.bodyData.venueNotify.mobile[i] == 'bookingConfirmation') {
            this.modalData.venueNotify.bookingConfirmationMobile = true;
          } else if (this.bodyData.venueNotify.mobile[i] == 'paymentConfirmation') {
            this.modalData.venueNotify.paymentConfirmationMobile = true;
          } else if (this.bodyData.venueNotify.mobile[i] == 'bookingReminder') {
            this.modalData.venueNotify.bookingReminderMobile = true;
          } else if (this.bodyData.venueNotify.mobile[i] == 'mediaMobile') {
            this.modalData.venueNotify.mediaMobile = true;
          }
        }
      }
    })
    //************** End *************//
  }
  notify(type, email_mobile, status) {
    if (status == true) {
      if (email_mobile == 'email') {
        if(!this.bodyData.competitionNotify.email.includes(type))
        this.bodyData.competitionNotify.email.push(type)
      } else {
        if(!this.bodyData.competitionNotify.mobile.includes(type))
        this.bodyData.competitionNotify.mobile.push(type)
      }
    } else if (status == false) {
      if (email_mobile == 'email') {
        if(this.bodyData.competitionNotify.email.includes(type)){
        var indexOfTypeInEmail = this.bodyData.competitionNotify.email.indexOf(type);
        this.bodyData.competitionNotify.email.splice(indexOfTypeInEmail, 1);
      }
      } else {
        if(this.bodyData.competitionNotify.mobile.includes(type)){
        var indexOfTypeInMobile = this.bodyData.competitionNotify.mobile.indexOf(type);
        this.bodyData.competitionNotify.mobile.splice(indexOfTypeInMobile, 1);
      }
      }
    }   
    console.log('COMP TO POST--',JSON.stringify(this.bodyData));
    this.service.postApi(`users/controlNotification?userId=${this.userDetail._id}`, this.bodyData,1).subscribe(responseList => {
      let Response = responseList;
      if (Response['responseCode'] == 200) {
        console.log('post resp-->',Response)      
      }
    }) 
  }
  membershipNotify(type, email_mobile, status){console.log(`MEMBERSHIP--->  \n TYPE :${type}  \n MAIL-MOB :${email_mobile}  \n STATUS :${status}`)
    if (status == true) {
      if (email_mobile == 'email') {
        if(!this.bodyData.membershipNotify.email.includes(type))
        this.bodyData.membershipNotify.email.push(type)
      } else {
        if(!this.bodyData.membershipNotify.mobile.includes(type))
        this.bodyData.membershipNotify.mobile.push(type)
      }
    } else if (status == false) {
      if (email_mobile == 'email') {
        var indexOfTypeInEmail = this.bodyData.membershipNotify.email.indexOf(type);
        this.bodyData.membershipNotify.email.splice(indexOfTypeInEmail, 1);
      } else {
        var indexOfTypeInMobile = this.bodyData.membershipNotify.mobile.indexOf(type);
        this.bodyData.membershipNotify.mobile.splice(indexOfTypeInMobile, 1);
      }
    }  
    console.log('MEMB TO POST--',JSON.stringify(this.bodyData));
    this.service.postApi(`users/controlNotification?userId=${this.userDetail._id}`, this.bodyData,1).subscribe(responseList => {
      let Response = responseList;
      if (Response['responseCode'] == 200) {
        console.log('post resp-->',Response)      
      }
    }) 
  }

  venueNotify(type, email_mobile, status){
    console.log(`VENUE--->  \n TYPE :${type}  \n MAIL-MOB :${email_mobile}  \n STATUS :${status}`)
    if (status == true) {
      if (email_mobile == 'email') {
        if(!this.bodyData.venueNotify.email.includes(type))
        this.bodyData.venueNotify.email.push(type)
      } else {
        if(!this.bodyData.venueNotify.mobile.includes(type))
        this.bodyData.venueNotify.mobile.push(type)
      }
    } else if (status == false) {
      if (email_mobile == 'email') {
        var indexOfTypeInEmail = this.bodyData.venueNotify.email.indexOf(type);
        this.bodyData.venueNotify.email.splice(indexOfTypeInEmail, 1);
      } else {
        var indexOfTypeInMobile = this.bodyData.venueNotify.mobile.indexOf(type);
        this.bodyData.venueNotify.mobile.splice(indexOfTypeInMobile, 1);
      }
    }

    console.log('VENUE TO POST--',this.bodyData);
    this.service.postApi(`users/controlNotification?userId=${this.userDetail._id}`, this.bodyData,1).subscribe(responseList => {
      let Response = responseList;
      if (Response['responseCode'] == 200) {
        console.log('post resp-->',Response)      
      }
    }) 
  }

}
