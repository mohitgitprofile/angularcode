import { Component, OnInit, MainService ,ActivatedRoute , FormGroup, Validators, FormBuilder } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
declare var $:any
declare var TCO:any
@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.component.html',
  styleUrls: ['./book-service.component.css']
})
export class BookServiceComponent implements OnInit {
  currency:any;
  tokenData:any
  bookingData:any={}
  addonArr:any=[]
  list:any= { cardList: [] };
  cardForm: FormGroup
  userDetail:any;
serviceDetails:any=[]
orgId:any
serId:any
weekArray:any=[]
date:any={selectedDate:'', isDateSelected:false, isSlotSelected:false, selectedSlot:''}
public model: any = { date: { year: 2018, month: 10, day: 9 } };
  public myDatePickerOptions: IMyDpOptions = { 
    dateFormat: 'yyyy-mm-dd',
    inline:true,
    showInputField:false,
    showTodayBtn:false,
  };
  dateRange={"startDate":"", "endDate":""}
  slots: any=[]
  amount: number;
  regForm:any=[]
  paymenVal=''
  firstName:any=''
  lastName:any=''
  id: any;
 editDetail:any={};
  userid: any;
  update: boolean=false;
  editBookingData:any={};
  bookSlot: any=[];
  constructor(private service: MainService, private route: ActivatedRoute, private fb : FormBuilder, private router: Router) { 
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.cardForm = this.fb.group({
      'expiryDate' : ['', Validators.compose([Validators.required, Validators.pattern(/^[2][0][1-9][0-9][-]0[1-9]|1[012]$/)])],
      'card':['',Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
      'cvv':['',Validators.compose([Validators.required, Validators.pattern(/^[0-9]{3}$/)])]
    })
  }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    this.currency = this.service.currencyLogo
    this.route.params.subscribe(async params => {
    console.log('PARAMS-->', params);
    this.serId =  params['serId']  
    this.id = params['id'];  
  })   
    this.getServicesDetails() ;
    
  }
  getProfileApi() {
    this.service.getApi(`users/getDetail?_id=${this.userDetail._id}`, 1).subscribe(response => {
      if(response.responseCode == 200) {       
        this.list.cardList = response.result.cardDetails
      
        this.addonArr=[]
      }
    })
  }
  getServicesDetails(){ 
    
    this.service.getApi(`membership/getAService?organizerId=${this.userid._id}&serviceId=${this.serId}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.serviceDetails = response.result;
        console.log("Slots-->> ", this.serviceDetails.slots);
        this.getNew();   
        this.regForm = response.result.dynamicFormField
        console.log("REG FORM-->> ", this.regForm)
        for(var key in response.result){
          if(key == 'endDate'){
            console.log('GOT THE KET endDate', this.serviceDetails.endDate)
          }
        }      
        this.serviceDetails.offDays.forEach(element => {   
          this.weekArray.push(element.toLowerCase().substring(0,2))    
        });
        if(this.weekArray){
          this.onWeekOffDays(true)
        }
        this.onDateChange();
        
      }       
    })    
  }
  getNew(){   
    this.service.getApi(`membership/getDetailOfABooking?playerId=${this.userid._id}&serviceId=${this.serId}`, 1).subscribe(response => {
     if(response.responseCode == 200) {
      this.editDetail = response.result;
      this.bookSlot = response.result.timeSlots;
      var bookedSlot = response.result.timeSlots //["12:00" ,"13:00" , "15:00"];//
      console.log("bookedSlot----<>>> ",bookedSlot.length);
      var slot1 = this.serviceDetails.slots;// [{time:"11:00",noOfSeats:22},{time:"12:00",noOfSeats:22},{time:"13:00",noOfSeats:22},{time:"14:00",noOfSeats:22},{time:"15:00",noOfSeats:22},{time:"16:00",noOfSeats:22},{time:"17:00",noOfSeats:22}]    
   if(bookedSlot.length != 0 ){
     this.update = true;
   }
      for(var i = 0;i<slot1.length;i++){
      for(var j=0;j<bookedSlot.length;j++){
      
     if(slot1[i].time == bookedSlot[j])
     {
       slot1.splice(i, 1);
     }
   
   }
 }
 console.log("Neww AAraaaya----<>>> ",slot1);
 console.log("update---> ",this.update);
    this.serviceDetails.slots = slot1;   
    }       
    })    
  }
  onWeekOffDays(checked: boolean): void {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let copy1 = this.getCopyOfOptions();
    copy1.disableWeekdays = checked ? this.weekArray : [];
    this.myDatePickerOptions = copy1;  
  }
  getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }
  timeSelected(t, indx){   
    console.log('indx-->', indx)
    if(t.noOfSeats>0){
      
  if(this.slots.findIndex(x => x.startTime==t.time)<0){  
      var obj
      if((this.serviceDetails.slots.length-1)== indx){
          obj = {
         startTime:this.serviceDetails.slots[indx].time,
         endTime: this.serviceDetails.slots[indx].time,
         price: this.serviceDetails.amount,
         totalDuration: this.serviceDetails.duration
        }
      }
      else{
         obj = {
         startTime:this.serviceDetails.slots[indx].time,
         endTime: this.serviceDetails.slots[indx + 1 ].time,
         price: this.serviceDetails.amount,
         totalDuration: this.serviceDetails.duration
        }
      }
       this.slots.push(obj)    
    } else{
    for( var i = 0; i < this.slots.length; i++){ 
      if ( this.slots[i].startTime === t.time) {
        this.slots.splice(i, 1); 
      }
    }}
    if(this.slots.length){
      this.date.isSlotSelected = true 
    }
    else{
      this.date.isSlotSelected = false
    }
    }  
    console.log("SLOTSS",this.slots)
    $('#'+indx).toggleClass('active');    
    this.amount = (this.slots.length) * this.serviceDetails.amount   ;
    for(var i=0;i<this.slots.length;i++){
      this.bookSlot.push(this.slots[i].startTime);
      this.editDetail.duration.push(this.slots[i]);
    }
    console.log("Bookslot----> ",this.bookSlot)
    console.log("this.editDetail.duration----> ",this.editDetail.duration)
  }
  onDateChange() {
    let today = new Date().getTime()
    console.log("TODAY-->>",today) ;   
    var startD = new Date(this.serviceDetails.startDate);
    let startDate = startD.getTime()
    var endD = new Date(this.serviceDetails.endDate)
    if(today>startDate){
      let today = new Date()
      startD.setDate(today.getDate() -1 );
      let copy1 = this.getCopyOfOptions();
      copy1.disableUntil = {
        year: startD.getFullYear(),
        month: startD.getMonth() + 1,
        day: startD.getDate()
      };
      this.myDatePickerOptions = copy1 
    }
    else{
      startD.setDate(startD.getDate() -1 );
      let copy1 = this.getCopyOfOptions();
      copy1.disableUntil = {
        year: startD.getFullYear(),
        month: startD.getMonth() + 1,
        day: startD.getDate()
      };
      this.myDatePickerOptions = copy1  
    }    
    
         
    endD.setDate(endD.getDate() +1);
    let copy2 = this.getCopyOfOptions();
    copy2.disableSince = {
      year: endD.getFullYear(),
      month: endD.getMonth() + 1,
      day: endD.getDate()
    };
    this.myDatePickerOptions = copy2
  }
  onDateSelect(e){
    this.date.selectedDate = e 
    this.date.isDateSelected = true
  }
  saveRegister() {
    console.log("PROCEED CLICKED!")
    this.getProfileApi()
    var errCount = 0;
    if (this.regForm.length > 0) {
    for (let i = 0; i < this.regForm.length; i++) {
    if (this.regForm[i].importance == "mandatory" && (!this.regForm[i].itemValue || this.regForm[i].itemValue == '')) {
    errCount++;
    this.service.toastrErr(this.regForm[i].field+ ' is mandatory!')  
    if (errCount == 1) {
      console.log("ERR COUNT IS 1")
    break;
    }
    }
    }
    if (errCount == 0) {
      console.log("ERR COUNT IS 0")
    this.bookServiceFun();
    }
    }
    else{
      this.bookServiceFun()
    }

  }
    get cf() {
      return this.cardForm.controls;
    }
    bookServiceFun () {
      let dynObj = {};
      let dynArr = [];
      this.regForm.forEach((obj) => {
        dynObj = obj
        dynObj[obj.field] = obj.itemValue
        dynArr.push(dynObj);
      });
      let paymenType;
      if (this.paymenVal == 'Offline') {
         paymenType = 'Cash'
      } else if(this.paymenVal == 'Online'){
        paymenType = 'Card'
      } else if(this.serviceDetails.serviceType == 'free') {
        paymenType = 'Free'
      }
      
      var timeSlotsArr=[]
      for (let i = 0; i< this.slots.length; i++) {
        console.log(`SLOTS--> ${this.slots[i]}`)
        timeSlotsArr.push(this.slots[i].startTime)
      }
  if(this.update != true){
    this.bookingData ={
      "serviceId": this.serviceDetails._id,
      "serviceName": this.serviceDetails.serviceName,
      "membershipId": this.serviceDetails.membershipId._id,
      "membershipName": this.serviceDetails.membershipName,
      "playerId": this.userDetail._id,
      "timeSlots": timeSlotsArr,
      "organizerId": this.serviceDetails.organizerId,
      "startDate": this.date.selectedDate.formatted,
      "endDate": this.serviceDetails.endDate,
      "totalPrice": this.amount,
      "duration": this.slots,
      "regData":{
        "name": this.firstName + ' ' +this.lastName,
        "playerDynamicDetails": dynArr,
        "paymentMethod": paymenType
      },
    }
  console.log("ApiDoc----->  ",JSON.stringify(this.bookingData));
  }
  else{
 this.editBookingData = {
   "bookingId":this.editDetail._id,
   "serviceId":this.editDetail.serviceId,
   "serviceName":this.editDetail.serviceName,
   "membershipId":this.editDetail.membershipId,
   "membershipName":this.editDetail.membershipName,
   "leaderBoard":this.editDetail.leaderBoard,
   "evaluation":this.editDetail.evaluation,
   "playerId":this.userid._id,
   "timeSlots":this.bookSlot,
   "organizerId":this.editDetail.organizerId,
   "startDate":this.editDetail.startDate,
   "endDate":this.editDetail.endDate,
   "totalPrice":this.editDetail.totalPrice,
   "duration":this.editDetail.duration,
   "regData":{
    "name": this.firstName + ' ' +this.lastName,
    "playerDynamicDetails": dynArr,
    "paymentMethod": paymenType
  },
 }
  }
    console.log("ApiDoc----->  ",JSON.stringify(this.editBookingData));
      if (this.paymenVal == 'Online') {
        $('#preview_booking_info').modal('hide')
        $('#paymentPlanChange').modal('show')
        console.log('PAYMENT IS ONLINE DATA-->', this.bookingData)
      } else if(this.paymenVal == 'Offline'){
        $('#preview_booking_info').modal('hide')
        if(this.update != true){ 
          console.log("new");
          this.service.postApi(`membership/bookAservice`, this.bookingData, 1).subscribe(response => {
            if(response.responseCode == 200) { 
              this.router.navigate(['/player/membershipDetail', this.serviceDetails.membershipId._id, this.userid._id])   
              this.service.toastrSucc(response.responseMessage)      
              $('#paymentPlanChange').modal('hide')        
            }          
            $('#paymentPlanChange').modal('hide')
          })
        }
        else {
          console.log("Edit");
          this.service.postApi(`membership/editABookedService`, this.editBookingData, 1).subscribe(response => {
            if(response.responseCode == 200) { 
              this.router.navigate(['/player/membershipDetail', this.serviceDetails.membershipId._id, this.userid._id])   
              this.service.toastrSucc(response.responseMessage)      
              $('#paymentPlanChange').modal('hide')        
            }          
            $('#paymentPlanChange').modal('hide')
          })
        }
       
        console.log('PAYMENT IS OFFLINE DATA-->', this.bookingData)
      }
      else if(this.serviceDetails.serviceType == 'free'){
        $('#preview_booking_info').modal('hide')
        this.bookingData.totalPrice ="0";
        if(this.update != true){
          console.log("new");
          this.service.postApi(`membership/bookAservice`, this.bookingData, 1).subscribe(response => {
            if(response.responseCode == 200) {   
              this.router.navigate(['/player/membershipDetail', this.serviceDetails.membershipId._id, this.userid._id])  
              this.service.toastrSucc(response.responseMessage)   
              $('#paymentPlanChange').modal('hide')           
            }          
            $('#paymentPlanChange').modal('hide')
          })
        }
        else{
          console.log("Edit");
          this.service.postApi(`membership/editABookedService`, this.editBookingData, 1).subscribe(response => {
            if(response.responseCode == 200) { 
              this.router.navigate(['/player/membershipDetail', this.serviceDetails.membershipId._id, this.userid._id])   
              this.service.toastrSucc(response.responseMessage)      
              $('#paymentPlanChange').modal('hide')        
            }          
            $('#paymentPlanChange').modal('hide')
          })
        }
      }
      //************** End *************//
     }   
     selectCard(cardDet) {
      setTimeout(() => {
        this.cardForm.patchValue({
          card: cardDet.cardNumber.toString(),
          expiryDate: cardDet.expiryDate
        })
      }, 300)    
    }
    pay() {
      var self = this;
      TCO.loadPubKey('sandbox', function() {
        self.service.spinnerShow()
          var tokenData = {
          sellerId: GlobalConstant.paymentCredential.sellerId,//901386003
          publishableKey: GlobalConstant.paymentCredential.publishableKey,//4769A4CA-5488-4585-B1DF-B8AB85753020
          ccNo: self.cardForm.value.card,//"4111111111111111"
          cvv: self.cardForm.value.cvv,
          expMonth: self.cardForm.value.expiryDate.split('-')[1],
          expYear: self.cardForm.value.expiryDate.split('-')[0]
        }
        TCO.requestToken(succToken, errToken,tokenData)
        });​
        var succToken = function(data) {
          let newArr = self.addonArr.filter(x => x.checked).map(x => x.name)
          self.service.spinnerHide()            
          self.bookingData.data = data
          console.log("ONLINE PAYMENT DATA --->", JSON.stringify(self.bookingData) )
          if(self.update != true){
            console.log("new");
            self.service.postApi(`membership/bookAservice`, self.bookingData, 1).subscribe(response => {
              if(response.responseCode == 200) { 
                self.router.navigate(['/player/membershipDetail', self.serviceDetails.membershipId._id, self.userid._id])  
                self.service.toastrSucc(response.responseMessage)  
                $('#paymentPlanChange').modal('hide')            
              }
              $('#paymentPlanChange').modal('hide')
            })
          }
         else{
           console.log("Edit");
          self.service.postApi(`membership/editABookedService`, self.editBookingData, 1).subscribe(response => {
            if(response.responseCode == 200) { 
              self.router.navigate(['/player/membershipDetail', self.serviceDetails.membershipId._id, self.userid._id])   
              self.service.toastrSucc(response.responseMessage)      
              $('#paymentPlanChange').modal('hide')        
            }          
            $('#paymentPlanChange').modal('hide')
          })
         }
        }
        var errToken = function(err) {
          self.service.spinnerHide()
          self.service.toastrErr(`Payment failed`)
        }
    }
  
}
