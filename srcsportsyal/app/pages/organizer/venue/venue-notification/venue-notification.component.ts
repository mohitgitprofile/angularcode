import { Component, OnInit, FormGroup, FormBuilder, Validators, MainService, Router } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';

@Component({
  selector: 'app-venue-notification',
  templateUrl: './venue-notification.component.html',
  styleUrls: ['./venue-notification.component.css']
})
export class VenueNotificationComponent implements OnInit {
  smsBody: any;
  addNotificationForm: FormGroup;
  tab: any = 'email';
  userDetails: any = {};

  constructor(private fb: FormBuilder, private service: MainService, private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.changeTabFunc('email');
    this.addNotificationForm = this.fb.group({
      subject: ['', Validators.required],
      body: ['', Validators.required],
    })
  }


  get gNotificationF() {
    return this.addNotificationForm.controls;
  }

  // *************************************** API TO GET NOTIFICATION ********************************************** //
  changeTabFunc(val) {
    this.tab = val
    this.smsBody = ''
    let notificationData = {
      "organizerId": this.userDetails._id,
      "type": this.tab
    }
    this.service.postApi('venue/getVenueNotificationForPlayers', notificationData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        if (this.tab == 'email') {
          this.addNotificationForm.setValue({
            body: response[`result`].body,
            subject: response[`result`].subject,
          })
        } else {
          this.smsBody = response[`result`].body
        }

      }
    })
  }
  // ************************************************ END ********************************************************* //

  // *************************************** API TO SAVE NOTIFICATION ********************************************** //
  saveFunc(val) {
    this.tab = val
    let saveNotificationData = {
      "organizerId": this.userDetails._id,
      "type": this.tab,
    }
    if (this.tab == 'email') {
      saveNotificationData["subject"] = this.addNotificationForm.value.subject,
      saveNotificationData["body"] =  this.addNotificationForm.value.body
    } else {
      saveNotificationData["body"] =  this.smsBody
    }

    this.service.postApi('venue/setVenueNotificationForPlayers', saveNotificationData, 1).subscribe(response => {
      if (response.responseCode == 201 || response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
      } else {
        this.smsBody = ''
        this.service.toastrErr(response.responseMessage)
      }
    })
  }
  // ************************************************ END ********************************************************* //
}
