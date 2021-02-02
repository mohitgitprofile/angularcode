import { Component, OnInit, MainService ,ActivatedRoute } from '../../../../index';
import { IMyDpOptions } from 'mydatepicker';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],

})
export class ServiceDetailsComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = { 
    dateFormat: 'yyyy-mm-dd',
    showInputField:true,
    showTodayBtn:false,
    editableDateField: false,
    markCurrentYear: true,
    openSelectorOnInputClick: true,
  };
  date:any;
  data:any;
  currentMonth:any = new Date().getMonth()+1
  typeOfMedia:any = 'Services'
  orgId: any;
  serId: any;
  serviceDetails: any={}
  leaderboardList:any=[]
  compId: any;
  today:any = new Date()
  currentList:any=[]
  currentYear:any= new Date().getFullYear()
  arrayOfKeys: string[];
  evaluationList:any[]
  evaluationListCopy: any=[]
  currentMonthObj:any={}
  constructor(public service:MainService, private route:ActivatedRoute) { }

  ngOnInit() {

    console.log(`current month ${this.currentMonth} and current year ${this.currentYear}`)
    this.route.params.subscribe(async params => {
      console.log('PARAMS-->', params)
    this.orgId = params['orgId']
    this.serId =  params['serId'] 
    this.compId = params['compId']
     
  })
  this.data = {
    "date": this.today,
    "membershipId":this.compId,
    "serviceId":this.serId
  }
  this.getServicesDetails()
  this.getLeaderboard();
  }

  getServicesDetails(){        
    this.service.getApi(`membership/getAService?organizerId=${this.orgId}&serviceId=${this.serId}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.serviceDetails = response.result
        this.onDateChange()
      }       
    })    
  }
  getLeaderboard(){          
    this.service.postApi(`membership/getListOfPlayersLeaderboard`, this.data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        console.log('LEADERBOARD RESPONSE', response)
        this.leaderboardList = response.result
        // this.currentList = this.leaderboardList.filter(x => x.leaderBoard.hasOwnProperty(this.currentYear)) 
        this.currentList = this.leaderboardList.filter(x => (x.leaderBoard && x.leaderBoard.hasOwnProperty(this.currentYear)));
        // this.evaluationList =   this.leaderboardList.filter(x => x.evaluation.hasOwnProperty(this.currentYear))
        this.evaluationList = this.leaderboardList.filter(x => (x.evaluation && x.evaluation.hasOwnProperty(this.currentYear)));
        for(var i=0; i<this.evaluationList.length; i++){
          if(this.evaluationList[i].evaluation[this.currentYear]){
             this.currentMonthObj = this.evaluationList[i].evaluation[this.currentYear][this.currentMonth]   
          }
        }
        for (var prop in this.currentMonthObj) {
          if (this.currentMonthObj.hasOwnProperty(prop)) {
            var innerObj = {};
            innerObj[prop] = this.currentMonthObj[prop];
            this.evaluationListCopy.push(innerObj)
          }
        }
      }
    })
  }
  onDateSelect(e){
    console.log(`e -->${JSON.stringify(e)}`)
    if(e.epoc){
      this.data = {
        "date": e.jsdate.toISOString(),
        "membershipId":this.compId,
        "serviceId":this.serId
      }      
      this.getLeaderboard()
      console.log(`EPOC IS NOT 0`)
    }  
    else {
      this.data = {
        "date": this.today,
        "membershipId":this.compId,
        "serviceId":this.serId
      }      
      this.getLeaderboard()
    } 
    
  }

  Services() {
    this.typeOfMedia = 'Services';
    

  }
  Leadership() {
    this.typeOfMedia = 'Leadership';
        
     
  }
  Evaluation() {
    this.typeOfMedia = 'Evaluation';   
     
    // this.getServicesDetails();
  }
  onDateChange() {
    let startD = new Date(this.serviceDetails.startDate);
    let endD = new Date(this.serviceDetails.endDate)
    startD.setDate(startD.getDate() -1 );
    let copy1 = this.getCopyOfOptions();
    copy1.disableUntil = {
      year: startD.getFullYear(),
      month: startD.getMonth() + 1,
      day: startD.getDate()
    };
    this.myDatePickerOptions = copy1       
    endD.setDate(endD.getDate() +1);
    let copy2 = this.getCopyOfOptions();
    copy2.disableSince = {
      year: endD.getFullYear(),
      month: endD.getMonth() + 1,
      day: endD.getDate()
    };
    this.myDatePickerOptions = copy2
  }
  getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }

}
