import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators, ActivatedRoute, Router  } from '../../../../index';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { FormControl } from '@angular/forms';
import { FacebookService, UIParams, UIResponse, InitParams } from 'ngx-facebook';

declare var $:any
@Component({
  selector: 'app-comp-registration',
  templateUrl: './comp-registration.component.html',
  styleUrls: ['./comp-registration.component.css']
})
export class CompRegistrationComponent implements OnInit {
  configurePlayerList: any = [];
  configureTeamList: any = [];
  configurePlayerArr : any= [{field:"",fieldType:"text",importance:"optional"}];
  configureTeamArr : any= [{field:"",fieldType:"text",importance:"optional"}];
  competitionDetail: any = {};
  payStaus = "free"
  isDisabled = true
  userDetails: any;
  competitionId: string;
  registerForm: FormGroup;
  registration : any = {
    freeOrPaid : "free",
    published: false
  };
  startDateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  endDateOptions: INgxMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };
  date: any = {startDate: '', endDate: ''}
  dateErr: boolean;
  constructor(private fbook: FacebookService,private route: ActivatedRoute, private service: MainService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
 
    let initParams: InitParams = {
      appId: '264266127525377',
      xfbml: true,
      version: 'v2.8'
    };
 
    this.fbook.init(initParams);

    this.route.params.subscribe( async params => {
      this.competitionId = params['id']
    })
    /** Disable date for start date  */
    let currDate = new Date()
    currDate.setDate(currDate.getDate() - 1)
    this.startDateOptions = JSON.parse(JSON.stringify(this.startDateOptions))
    this.startDateOptions.disableUntil = { year: new Date().getFullYear(), month: (new Date().getMonth() + 1), day: currDate.getDate() }
    this.endDateOptions.disableUntil = { year: new Date().getFullYear(), month: (new Date().getMonth() + 1), day: currDate.getDate() }
    this.registerForm = this.fb.group({
      freeOrPaid: ['', Validators.required,],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description : ['', Validators.required]
    })
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.getCompetitionDetailApi();
    this.getTeamFields();
    this.getplayerFields()
  }
  
  share(url: string,title) {
 
    let params: UIParams = {
      href: 'http://162.222.32.20:1403/',
      method: 'share'
    };
  
    this.fbook.ui(params)
      .then((res: UIResponse) => console.log('res =>' + JSON.stringify(res)))
      .catch((e: any) => console.error('err =>' + JSON.stringify(e)));
  
  }

  addOtherTeamField(){
    var dataFill = false;
    for(var i=0; i<this.configureTeamArr.length; i++){
        if(this.configureTeamArr[i].field=="" ){
            this.service.toastrErr('Please enter Team Field.')
            dataFill = false;
            break;
        }else{ 
            dataFill = true;
        }
    }      
    if(dataFill == true){
        this.configureTeamArr.push({field:"",fieldType:"",importance:"optional"});
    }        
  }

  addOtherPlayerField(){
    var dataFills = false;
    for(var i=0; i<this.configurePlayerArr.length; i++){
        if(this.configurePlayerArr[i].field=="" ){
            this.service.toastrErr('Please enter Player Field.')
            dataFills = false;
            break;
        }else{ 
          dataFills = true;
        }
    }      
    if(dataFills == true){
        this.configurePlayerArr.push({field:"",fieldType:"",importance:"optional"});
    }        
  }

  onStartDateChanged(event) {
    setTimeout(() => {
      // console.log('start date value change => ', this.registration)
      if(this.registration.startDate && this.registration.endDate) {
        if(this.registration.startDate.epoc > this.registration.endDate.epoc) {
          this.dateErr = true
        } else {
          this.dateErr = false
        }
      }
    }, 300)
  }
  onEndDateChanged(event) {
    
    setTimeout(() => {
      // console.log('end date value change => ', this.registration)
      if(this.registration.startDate && this.registration.endDate) {
        if(this.registration.startDate.epoc > this.registration.endDate.epoc) {
          this.dateErr = true
        } else {
          this.dateErr = false
        }
      }
    }, 300)
  }

  // **************** Get Competition Detail Api *********** //
  getCompetitionDetailApi() {
    let compData = {
      userId: this.userDetails._id,
      competitionId: this.competitionId
    }

    this.service.postApi(`organizer/competition/getACompetition`, compData, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.competitionDetail = response.result
        if (this.competitionDetail.registrationForm == true) {
          this.getRegistrationFormDetail ()
        }
      }
    })
  }
  // **************** End Get Competition Detail Api *********** //

  handleChange(evt) {
    this.payStaus = evt
    if (this.payStaus== 'free') {
      this.registerForm =  this.fb.group({
        freeOrPaid: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        description : ['', Validators.required]
      })
    } else {
      this.registerForm =  this.fb.group({
        freeOrPaid: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        registrationFee: ['', Validators.compose([Validators.required, Validators.pattern(/[1-9]{1}[0-9]*/)])],
        payInhand: ['', Validators.required],
        description : ['', Validators.required]
      })
    }
  }

  getRegistrationFormDetail () {
    //************** Get Registration Form Detail Api Integration *************//
    let registerData = {
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
    }

    this.service.postApi(`organizer/competition/getRegistrationDetail`, registerData, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.registration = response.result
        if (this.registration.freeOrPaid == 'paid') {
          this.handleChange (this.registration.freeOrPaid)
        }if(this.registration.startDate && this.registration.endDate) {
          let date = new Date(this.registration.startDate);
          let date1 = new Date(this.registration.endDate);
          this.registration.startDate = {
            date: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            },
            formatted: date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate(),
            epoc: date.getTime()/1000
          }
          this.registration.endDate = {
            date: {
              year: date1.getFullYear(),
              month: date1.getMonth() + 1,
              day: date1.getDate()
            },
            formatted: date1.getFullYear()+'-'+(date1.getMonth() + 1)+'-'+date1.getDate(),
            epoc: date1.getTime()/1000
          }
        //   this.registerForm.patchValue({startDate: {
        //   date: {
        //       year: date.getFullYear(),
        //       month: date.getMonth() + 1,
        //       day: date.getDate()
        //     },
        //     formatted: this.registration.startDate
        //   },
        //   endDate: {
        //     date: {
        //       year: date1.getFullYear(),
        //       month: date1.getMonth() + 1,
        //       day: date1.getDate()
        //     },
        //     formatted: this.registration.endDate
        //   }
        // });
        }
      }
    })
    //************** End *************//
  }

  save(){
    //************** Organizer Register competition Api Integration *************//
    let registerData = {
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
      "freeOrPaid": this.registration.freeOrPaid,
      "registrationFee": this.registration.registrationFee,
      "paymentInHandDetails": this.registration.paymentInHandDetails,
      "description":  this.registration.description,
      "startDate": this.registration.startDate.formatted,
      "endDate": this.registration.endDate.formatted
    }
    this.service.postApi(`organizer/competition/competitionRegistration`, registerData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        window.history.back()
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
    //******************* End ******************//
  }

  saveConfigTeamFields (type) {
    let dynamicTeamArr = []
    if (type == "modal") {
      dynamicTeamArr = this.configureTeamArr.concat(this.configureTeamList) 	
    } else {
      dynamicTeamArr = this.configureTeamList	
    }
    //************** Configure Dynamic Team fields Api Integration *************//
    let dynamicFieldsData = {	
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
      "teamFields": dynamicTeamArr					
    } 
    // console.log('configureTeamList Api dynamicTeamArr =>> ' + JSON.stringify(dynamicTeamArr))
    this.service.postApi(`organizer/competition/configTeamFields`, dynamicFieldsData,1).subscribe(response => {
      this.configureTeamList = [];
      // console.log('configureTeamList Api hit =>> ' + JSON.stringify(this.configureTeamList))
      if(response.responseCode == 200) {
        this.configureTeamList = [];
        // console.log('configureTeamList200 =>> ' + JSON.stringify(this.configureTeamList))
        this.service.toastrSucc(response.responseMessage)
        $('#add_venue').modal('hide');
        if (type == "modal") {
          this.configureTeamArr = [{field:"", importance:"optional"}];
        }
        this.getTeamFields();
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
    //******************* End ******************//
  }

  getTeamFields () {
    //************** Get Dynamic Team fields Api Integration *************//
    let dynamicFieldsData = {	
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
    } 

    this.service.postApi(`organizer/competition/getTeamFields`, dynamicFieldsData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.configureTeamList = response.result
        // this.configureTeamList = (response.result).reverse()
      }
    })
    //******************* End ******************//
  }

  saveConfigPlayerFields (type) {
    let dynamicPlayerArr = []
    if (type == "modal") {
      dynamicPlayerArr = this.configurePlayerArr.concat(this.configurePlayerList) 	
    } else {
      dynamicPlayerArr = this.configurePlayerList	
    }
    //************** Configure Dynamic Player fields fields Api Integration *************//
    let dynamicFieldsData = {	
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
      "playerFields": dynamicPlayerArr					
    } 
  
    this.service.postApi(`organizer/competition/configPlayerFields`, dynamicFieldsData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage)
        $('#add_player').modal('hide');
        if (type == "modal") {
          this.configurePlayerArr = [{field:"", importance:"optional"}];
        }
        this.getplayerFields();
      } else {
        this.service.toastrErr(response.responseMessage)
      }
    })
    //******************* End ******************//
  }

  getplayerFields () {
    //**************Get Dynamic Player fields Api Integration *************//
    let dynamicFieldsData = {	
      "userId": this.userDetails._id,
      "competitionId": this.competitionId,
    } 

    this.service.postApi(`organizer/competition/getPlayerFields`, dynamicFieldsData,1).subscribe(response => {
      if(response.responseCode == 200) {
        this.configurePlayerList = (response.result).reverse()
      }
    })
    //******************* End ******************//
  }

  


}
