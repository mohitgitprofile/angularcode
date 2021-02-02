import { Component, OnInit, MainService, Router ,ActivatedRoute  } from '../../../../index';

@Component({
  selector: 'app-membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['./membership-detail.component.css']
})
export class MembershipDetailComponent implements OnInit {
 currency:any
 data={page: 1, limit:5, status:""}
 servicesList:any=[]
 userDetail:any
  compId: any;
  newArrrr: any =[];
  pagination:any={itemPP:'', total:'',currPage:''} 
  constructor(private service: MainService, private route: ActivatedRoute, private router: Router) {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
   }

  ngOnInit() {
    this.currency = this.service.currencyLogo
    this.data={
      page:1,
      limit:5,
      status:""
    }
    this.route.params.subscribe(async params => {
      this.compId = params['compId']
    })
    this.getServicesList()
  }

  getServicesList(){  
    console.log(`DATA B4 SEND-->${JSON.stringify(this.data)}`)      
    this.service.postApi(`membership/getServiceListInPlayer?userId=${this.userDetail._id}&membershipId=${this.compId}`, this.data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        console.log('SERVICE LIST --> ', response)
        this.servicesList = response.result.docs
        this.pagination.itemPP = response.result.limit
        this.pagination.currPage = response.result.page
        this.pagination.total = response.result.total
        this.servicesList = response['result'].docs.filter(value => {
          if (value.startDate) {
             var d = new Date(value.startDate.toString());
             var fDate = [d.getDate(),d.getMonth(),d.getFullYear()].join("/");
            return value.startDate = fDate
          } 
        }) 
        this.newArrrr = this.servicesList.professionals
        console.log("ProfessionalList--->> ",this.servicesList[0].professionals[1].professionalName);
        // for(var i=0;i<this.servicesList.length;i++){
        //   this
        // }
      }
    })
  }

  bookService(){   
    let bookData = {
      "page":1,
      "limit":5
    }
  this.service.postApi(`membership/bookAservice`, bookData, 1).subscribe(response => {
    if(response.responseCode == 200) {
      this.servicesList = response.result.docs
      this.pagination.itemPP = response.result.limit
      this.pagination.currPage = response.result.page
      this.pagination.total = response.result.total
      this.servicesList = response['result'].docs.filter(value => {
        if (value.startDate) {
           var d = new Date(value.startDate.toString());
           var fDate = [d.getDate(),d.getMonth(),d.getFullYear()].join("/");
          return value.startDate = fDate
        } 
      }) 
    }
  })
}
onPageChange(page){
  this.data['page'] = page
  this.pagination.currPage = page
  this.getServicesList()
}
onSearch(val, event) {
  this.data['page'] = 1
  if (val === 1) {
    if (!this.data['search'] || event.keyCode == 13)
      this.getServicesList()
  } else if (val === 2)
    this.getServicesList()
}
onChangeStatus(){ 
  this.getServicesList()
}

  book(e, num){ 
    // book-service/:orgId/:serId
    var serId = e._id;
    var orgId = e.organizerId;
    console.log(`service id--> ${serId} and orgId --> ${orgId}`);
    console.log("Booking Status---> ",e.bookingStatus);
    if(e.bookingStatus){
      this.router.navigate(['/player/book-service', serId,num])
    }
    console.log('book clicked!', num)
  }
  viewService(serv){
  console.log("SERVICE OBJ-->", serv)
    var serId = serv.id
    var orgId = serv.organizerId
    this.router.navigate(['/player/service-details',this.compId,orgId,serId])
  }
}
