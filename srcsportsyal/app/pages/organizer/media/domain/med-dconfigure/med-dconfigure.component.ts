import { Component, OnInit, MainService, ActivatedRoute, Router,FormGroup, FormBuilder, Validators  } from '../../../../../index';
import { FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-med-dconfigure',
  templateUrl: './med-dconfigure.component.html',
  styleUrls: ['./med-dconfigure.component.css']
})
export class MedDconfigureComponent implements OnInit {
  currUrl: string = '';
  // searchobj: any = { usersearch: "" }
  // searchData: any = { search: '', sort: '' }; 
  searchData: any =''; 
  searchForm: FormGroup;
  userList = [];
  seacrhdata: any;
  show = "10";
  editAccess: boolean;
  p: number = 1;
  total: any;
  httpOptions: { headers: any; };
  userDetails: any = {};
  paginationData: any = { limit: 10, page: 1, total: 0 };
  copyuserList: any=[];
  datas: {  sectionId: any; };
  pages: any=[];
  editValueData: any=[];

 

  constructor(private route: ActivatedRoute,private router: Router,private service: MainService) { }

  ngOnInit() {
    
    this.currUrl = this.router.url.split('/').splice(1,2).join('/')
    console.log(this.currUrl)
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    // this.getUserList(this.p);
    this.getUserList(this.p);

    this.searchForm = new FormGroup({
      'search': new FormControl(''),
    })


  }
  pagination(page) {
    this.p = page;
   this.getUserList(this.p);
}
viewUser(val) {
  // this.service.pageUser = this.p;
  this.router.navigate(['/header/userDetail/' + val])
}
// searchAPI() {
//   if (this.searchobj.usersearch == "") {
//    this.getUserList(this.p)
//   }
// }
search(data) {
  this.searchData = data   //   initialise   searchData: any = { search: '', sort: '' }; 
  this.p = 1;   

 this.getUserList(this.p);
}
getUserList(p) {
 
  let data = {
      pageNumber: this.p,
      limit: 10,
      search:this.searchData,
      // status: this.searchData.sort
  }
  this.service.postApi('configuration_domain/getAllSection ',data,1).subscribe((res) => {
      if (res.responseCode == 200) {
          this.userList = res.success.docs.sort((a,b)=> a.createdAt > b.createdAt?-1 : b.createdAt >a.createdAt? 1 : 0);
          this.copyuserList =   this.userList
        
        this.total = res.success.total;
        // this.pages =res.success.pages
        this.pages=[]
        for(let i=1;i<=res.success.pages;i++){
          this.pages.push(i)
        }
      }
  }, (err) => {
     
  })
}
reset() {
  
  // this.searchobj.usersearch = '';
  // this.getUserList(this.p);
}
pageChange(event){
  console.log(event)
    this.paginationData.page = event;
  this.p = event;
   this.getUserList(this.p);
}
delete(){
  this.service.postApi('configuration_domain/deleteSection ',this.datas,1).subscribe((res) => {
      if (res.responseCode == 200) {
      this.service.toastrSucc(res.responseMsg);
      this.getUserList(this.p);
      $('#delete-modal').modal('hide');
      }
  }, (err) => {
     
  })
  
}

DeleteModalOpen(userId) {
 
  this.datas = {
    
    sectionId:userId
    };

  $('#delete-modal').modal({ backdrop: 'static', keyboard: false });
}

editConfigSection(editData){
 this.editValueData = editData
   this.router.navigate(['/organizer/dConfigEditSection'],{queryParams: this.editValueData}  )
 
//  this.router.navigate(['/organizer/dConfigEditSection'] )
}

Med_D_ConfigSection(){
 
   this.router.navigate(['/organizer/dConfigSection'] )
 }
  doCheck(evt){
  console.log('docheck==>',evt)

  //  this.paginationData.page = event;
  // this.p = event;
  //  this.getUserList(this.p);
}
// onDo(event){
//   // window.scroll(0,0);
//   let scrollToTop = window.setInterval(() => {
//     let pos = window.pageYOffset;
//     if (pos > 0) {
//         window.scrollTo(0, pos - 20); 
//     } else {
//         window.clearInterval(scrollToTop);
//     }
// }, 16);}
}
