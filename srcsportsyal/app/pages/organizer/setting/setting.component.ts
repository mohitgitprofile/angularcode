import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators } from '../../../index';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  currTab: any = 1;
  addSmtpForm: FormGroup;
  userDetails: any = {};
  smtpDetail: any = {};
  constructor(private fb: FormBuilder, private service: MainService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.addSmtpForm = this.fb.group({
      userName: [ '', Validators.compose([Validators.required, Validators.pattern(/^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,3})+$/i)]) ],
      password: [ '', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z\d$@$!%*#?&^\S]*$/)]) ]
    })
  }
  onTabChange(val) {
    this.currTab = val;
    if(val === 2)
      this.getSmtpDetailApi()
  }

  get smtpForm() {
    return this.addSmtpForm.controls;
  }

  onSaveSmtp() {
    let data = {
      userId: this.userDetails._id,
      smtpUsername: this.addSmtpForm.value.userName,
      smtpPassword: this.addSmtpForm.value.password
    }
    console.log('smptp value => ' + JSON.stringify(data))
    this.service.postApi(`organizer/addSMTPDetails`, data, 1).subscribe(response => {
      if(response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        this.getSmtpDetailApi()
      }
    })
  }

  getSmtpDetailApi() {
    let data = {
      userId: this.userDetails._id
    }
    this.service.postApi(`organizer/getMailMessageDetails`, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        let smtpDetail = response.result;
        this.addSmtpForm.patchValue({
          userName: smtpDetail.smtpUsername,
          password: smtpDetail.smtpPassword
        })
      }
    })
  }

}
