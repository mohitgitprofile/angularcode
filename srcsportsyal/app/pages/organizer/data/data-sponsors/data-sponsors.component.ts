import { Component, OnInit, FormGroup, FormBuilder, MainService, Validators, INgxMyDpOptions } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
import { FormControl } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-data-sponsors',
  templateUrl: './data-sponsors.component.html',
  styleUrls: ['./data-sponsors.component.css']
})
export class DataSponsorsComponent implements OnInit {
  addSponsorForm: FormGroup
  ImageBase64: any;
  modalType: string;
  userDetails: any = {};
  bodyData: any = {};
  list: any = { sponsorList: {}, competitionList: [], limitChangeArr: GlobalConstant.limitChangeArr, limit: GlobalConstant.paginationLimit, statusList: GlobalConstant.teamStatusArr, orgCompetitionList: [] };
  SponsorId: any;
  limitChange: any = GlobalConstant.limitChangeArr[0];
  editSponsorForm: FormGroup;
  filter: any = {visibleIn: []};
  filters: any = { currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };
  
  loginType: string;
  membersponserForm: FormGroup;
  membersponsorList: any =[];
  pageLimit: any;
  pageTotal: any;
  addSponsorphoto: any=["assets/images/user-img.png"];
  addphoto: string;
  editSponsorphoto: any[];
  editphoto: string;
  addmemberSponsorForm: FormGroup;
  sponsorId: any;
  viewSponsorDetail:any= { link: '', sponsorName: '', description: '', image: '', visibleIn: [], position: '',status: '' };
  editmemberSponsorForm: FormGroup;
  memberlist: any=[];
  membershipArr: any=[];
  addvenueSponsorForm: FormGroup;
  addVenuephoto: string;
  editVenueSponsorForm: FormGroup;
  editVenuephoto: string;
  viewVenueSponsorDetail: any={ link: '', sponsorName: '', description: '', image: '', visibleIn: [], position: '',status: '' };
  venueList: any=[];
  venueSponsorList: any=[];
  venueSearch:string='';
  loginTypeArr: any=[];
  loginRole: any='';
  userId: any;
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  constructor(private service: MainService, private fb: FormBuilder) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.addSponsorForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^[^\s][a-zA-Z ]*$/)])],
      'link': ['', Validators.compose([Validators.required, Validators.pattern("https://.*")])],
      'description': ['', Validators.compose([Validators.required])],
    })
    this.editSponsorForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^[^\s][a-zA-Z ]*$/)])],
      'link': ['', Validators.compose([Validators.required, Validators.pattern("https://.*")])],
      'description': ['', Validators.compose([Validators.required])],
      'status': ['', Validators.compose([Validators.required])],
      'position': ['', Validators.compose([Validators.required])],
      //'visibleIn': ['', Validators.compose([Validators.required])],
    })
    this.formValidation();
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'));
   
    this.userId = this.userDetails._id;    
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');  
    this.bodyData = { 'page': 1, 'limit': this.list.limit }
    
    // if(this.loginTypeArr.includes('COMPETITION')){
    //   this.getSponsorListApi();
    //   //this.getCompetitionListApi();
    // }
    // if(this.loginTypeArr.includes('MEMBERSHIP')){
      this.getSponserList('',this.filters.currPage);
      //this.memberList();
    // }
    // if(this.loginTypeArr.includes('COMPETITION')){
    //   this.getVenueFunc();
    //   //this.getVenueSponserList('',1);
    // }
  }

  // Get Role 
  getRole(event){
    console.log('Event ---->>>>',event.target.value);
    this.loginRole = event.target.value;
    
    this.memberList();
    }
    
  // Form Validation 
  formValidation(){ 
    // Membership Section 
    this.membersponserForm = new FormGroup({
      'search': new FormControl('')
    })
    this.addmemberSponsorForm = new FormGroup({
      'image': new FormControl('',Validators.required),
      'sponsorname' :new FormControl('',[Validators.required,Validators.pattern(/^[^\s][a-zA-Z ]*$/)]),
      'link': new FormControl('',[Validators.required]),
      'description' : new FormControl('',Validators.required)
    }) 
    this.editmemberSponsorForm = new FormGroup({
      'image': new FormControl('',),
      'sponsorname' :new FormControl('',[Validators.pattern(/^[^\s][a-zA-Z ]*$/)]),
     'visibleIn': new FormControl('',Validators.required),
     'position' : new FormControl ('',[Validators.required,Validators.pattern(/^[^\s][0-9]*$/)]),
      'link': new FormControl('',[]),
      'status':new FormControl ('',Validators.required),
      'description' : new FormControl('',)
    })
    // Venue Section Validation 
    this.addvenueSponsorForm = new FormGroup({
      'image': new FormControl('',Validators.required),
      'sponsorname' :new FormControl('',[Validators.required,Validators.pattern(/^[^\s][a-zA-Z ]*$/)]),
      'link': new FormControl('',[Validators.required , Validators.pattern("https://.*")]),
      'description' : new FormControl('',Validators.required)
    }) ;
    this.editVenueSponsorForm = new FormGroup({
      'image': new FormControl('',Validators.required),
      'sponsorname' :new FormControl('',[Validators.required,Validators.pattern(/^[^\s][a-zA-Z ]*$/)]),
     'visibleIn': new FormControl('',Validators.required),
     'position' : new FormControl ('',[Validators.required,Validators.pattern(/^[^\s][0-9]*$/)]),
      'link': new FormControl('',[Validators.required , Validators.pattern("https://.*")]),
      'status':new FormControl ('',Validators.required),
      'description' : new FormControl('',Validators.required)
    })

  }
  // ************ File upload **************************************************************************************** //
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();
      let self = this
      reader.onload = function (e: any) {
        $('#preview').attr('src', e.target.result);
        self.ImageBase64 = e.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  // ************ End File upload **************************************************************************************** //

  
  // ************ get Sponsor list Api **************************************************************************************** //
  getSponsorListApi() {
      this.service.postApi('data/getListOfSponsor?userId=' + this.userId, this.bodyData, 1).subscribe(responseList => {
        let Response = responseList;
        if (Response['responseCode'] == 200) {
          this.list.sponsorList = Response[`result`]
        }
      })
  }
  // ************ End get Sponsor list Api **************************************************************************************** //

  // ************ Add Sponsor Api **************************************************************************************** //
  addSponsorModal() {
    this.modalType = 'addSponsorModal';
    this.addSponsorForm.reset();
    this.addSponsorForm.setValue({ name: '', link: '', description: '' })
    this.ImageBase64 = "assets/images/user-img.png";
    $("#add_sponsor").modal(`show`);
  }
  addSponsor() {
    let sponsorData = {};
    if (this.ImageBase64 != 'assets/images/user-img.png') {
      sponsorData = { 'link': this.addSponsorForm.value.link, 'sponsorName': this.addSponsorForm.value.name, 'description': this.addSponsorForm.value.description, 'image': this.ImageBase64, 'visibleIn': [], 'position': '', 'status': '' }
    } else {
      sponsorData = { 'link': this.addSponsorForm.value.link, 'sponsorName': this.addSponsorForm.value.name, 'description': this.addSponsorForm.value.description, 'visibleIn': [], 'position': '', 'status': '' }
    }
    this.service.postApi(`data/addSponsors?userId=` + this.userId, sponsorData, 1).subscribe(response => {
      if (response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
         $("#add_sponsor").modal(`hide`);
        this.bodyData = { 'page': 1, 'limit': this.list.limit }
        this.getSponsorListApi();
      }
    })
  }
  // ************ End Add Sponsor Api **************************************************************************************** //

  // ************ Edit Sponsor Api **************************************************************************************** //
  // editSponsorModal(data) {
  //   this.modalType = 'editSponsorModal';
  //   this.SponsorId = data._id;
  //   if(data.visibleIn.length) {
  //     this.editSponsorForm.patchValue({ name: data.sponsorName, link: data.link, description: data.description, position: data.position, status: data.status })
  //     this.filter.visibleIn = data.visibleIn.map(x => {
  //       return {item_id: x._id, item_text: x.competitionName}
  //     })
  //   } else {
  //     this.editSponsorForm.patchValue({ name: data.sponsorName, link: data.link, description: data.description, position: '', status: '' })
  //     this.filter.visibleIn = ''
  //   }
  //   if(data.image) {
  //     this.ImageBase64 = data.image;
  //   } else {
  //     this.ImageBase64 = 'assets/images/user-img.png'
  //   }
  //   $("#edit_sponsor").modal({backdrop: 'static'});
  // }
  // editSponsor() {
  //   let arr = this.filter.visibleIn.map(x => x.item_id)
  //   let newArr = arr.map(item =>  this.list.orgCompetitionList.filter(x =>  x._id == item )[0] )
  //   // console.log(newArr)
  //   let editSponsorData = {};
  //   if (this.ImageBase64 != 'assets/images/user-img.png') {
  //     editSponsorData = { 'link': this.editSponsorForm.value.link, 'sponsorName': this.editSponsorForm.value.name, 'description': this.editSponsorForm.value.description, 'image': this.ImageBase64, 'visibleIn': newArr, 'position': this.editSponsorForm.value.position, 'status': this.editSponsorForm.value.status }
  //   } else {
  //     editSponsorData = { 'link': this.editSponsorForm.value.link, 'sponsorName': this.editSponsorForm.value.name, 'description': this.editSponsorForm.value.description, 'visibleIn': newArr, 'position': this.editSponsorForm.value.position, 'status': this.editSponsorForm.value.status }
  //   }
  //   this.service.postApi(`data/editSponsor?userId=` + this.userId + `&sponsorId=` + this.SponsorId, editSponsorData, 1).subscribe(response => {
  //     if (response.responseCode == 200) {
  //       this.service.toastrSucc(response.responseMessage)
  //       this.editSponsorForm.reset();
  //       $("#edit_sponsor").modal(`hide`);
  //       this.bodyData = { 'page': 1, 'limit': this.list.limit }
  //       this.getSponsorListApi();
  //     }
  //   })
  // }
  // ************ End edit Sponsor Api **************************************************************************************** //

  changePage(data) {
    this.bodyData = { "page": data, "limit": this.list.limit }
    this.getSponsorListApi();
  }

  changeLimit() {
    this.bodyData = { "page": 1, "limit": Math.floor(this.limitChange) }
    this.getSponsorListApi();
  }

  onSearch(val, event) {
    this.bodyData.page = 1
    if(val === 1) {
      if(!this.bodyData.search || event.keyCode == 13)
        this.getSponsorListApi()
    } else if(val === 2)
      this.getSponsorListApi()
  }
  /**************************************** Membership Api Function *********************/
  /**************** GetSponsor List Function ***********/
  getSponserList(formval,page){
    // console.log("Form Value---> ",formval);
    this.filters.currPage = page;
    var apiDoc ={
       "page":this.filters.currPage,
       "limit":4,
       "search":formval?formval.search:''
   }
//  console.log("ApiDoc--> ",apiDoc);
    this.service.postApi('data/getListOfSponsor?userId=' + this.userId,apiDoc, 1).subscribe(responseList => {
      let Response = responseList;
      // console.log("Response--> ",JSON.stringify(Response));
      if (Response['responseCode'] == 200) {
       var sponsorDetail = Response.result;
       this.membersponsorList = sponsorDetail.docs;
       this.pageLimit = sponsorDetail.limit;
       this.pageTotal = sponsorDetail.total;
      }
    })
  }
    /*********************** Image Conversion/***********************/
onUploadChange(evt: any) {
  this.addSponsorphoto = [] 
  
  const file = evt.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    
  }
}

handleReaderLoaded(e) {
  this.addSponsorphoto.push('data:image/png;base64,' + btoa(e.target.result)); 
  this.addphoto = 'data:image/png;base64,' + btoa(e.target.result) ;
  this.addVenuephoto = 'data:image/png;base64,' + btoa(e.target.result) ;
}
/*********************** Image Conversion/***********************/
 /***********************Edit Image Conversion/***********************/
 oneditChange(evt: any) {
  this.editSponsorphoto = [] 
  
  const file = evt.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = this.editReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    
  }
}

editReaderLoaded(e) {
  this.editSponsorphoto.push('data:image/png;base64,' + btoa(e.target.result)); 
  this.editphoto = 'data:image/png;base64,' + btoa(e.target.result) ;
  this.editVenuephoto = 'data:image/png;base64,' + btoa(e.target.result) ;
}
/*********************** Image Conversion/***********************/
/******************** Add Sponsor Function **********************/
addMemberSponsor(formval){
// console.log("Add Member Sponsor Form---> ",formval);

var apiDoc = { 'link':formval.link, 'sponsorName':formval.sponsorname, 'description':formval.description, 'image': this.addphoto, 'visibleIn': [], 'position': '', 'status': '' }

// console.log("ApiDoc--> ",apiDoc);
    this.service.postApi('data/addSponsors?userId=' + this.userId,apiDoc, 1).subscribe(responseList => {
      let Response = responseList;
      // console.log("Response--> ",JSON.stringify(Response));
      if (Response['responseCode'] == 201) {
        $('#addSponsor').modal('hide');
      this.addSponsorphoto =["assets/images/user-img.png"];
      this.addmemberSponsorForm.reset();
        this.getSponserList('',this.filters.currPage);
      }
    })
}

/*********** Get Membership List ****************/
memberList(){
   if(this.loginRole == 'COMPETITION'){
    this. dropdownSettings =  {
      singleSelection: false,
      idField: '_id',
      textField: 'competitionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
  };
    this.service.getApi('data/selectCompition?userId=' + this.userId, 1).subscribe(responseList => {
      let Response = responseList;
      if (Response['responseCode'] == 200) {
        this.list.orgCompetitionList = Response[`result`]
        this.list.competitionList = Response[`result`].map(item => {
          return { _id: item._id, competitionName: item.competitionName }
        })
        console.log("Value1--->>",this.list.competitionList)
      }
    })
   }
   else if(this.loginRole == 'MEMBERSHIP'){
    this. dropdownSettings =  {
      singleSelection: false,
      idField: '_id',
      textField: 'membershipName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
  };
    this.service.getApi('membership/selectMembership?organizerId=' + this.userId, 1).subscribe(responseList => {
      let Response = responseList;
      if (Response['responseCode'] == 200) {
        this.list.orgCompetitionList = Response[`result`]
        this.list.competitionList = Response[`result`].map(item => {
          return { _id: item._id, membershipName: item.membershipName }
        })
        console.log("Value2--->>",this.list.competitionList)
      }
    })
    }
   else {
    this. dropdownSettings =  {
      singleSelection: false,
      idField: '_id',
      textField: 'venueName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
  };
    this.service.getApi('venue/getVenueWithoutPagination?organizerId=' + this.userId, 1).subscribe(responseList => {
      let Response = responseList;
      if (Response['responseCode'] == 200) {
        this.list.orgCompetitionList = Response[`result`]
        this.list.competitionList = Response[`result`].map(item => {
          return { _id: item._id, venueName: item.venueName }
        })
        console.log("Value3--->>",JSON.stringify(Response[`result`]));
        console.log("Value3--->>",this.list.competitionList);
      }
    })
   }
 
}
/*********************** Multiple Selection **************/
public onMouseDown(name:MouseEvent,id) {
  // console.log("Multiple select===>  ",id," NAme--> "+name.target['label']);
  event.preventDefault();
  event.target['selected'] = !event.target['selected'];
 this.membershipArr.push({
  "membershipId":id,
  "membershipName":name.target['label']
}
);
//  console.log("membershipArr===>  ",this.membershipArr);
}

/******************* Edit Sponsor Function *************/
editMemberSponsorModal(id){
  this.sponsorId = id;
  // console.log("Sponsor Id--> ",this.sponsorId);
var url = `data/getEditDetailOfSponsor?userId=`+this.userId+`&sponsorId=`+this.sponsorId;
// console.log("Url--> ",url);
    this.service.getApi(url,1).subscribe(responseList => {
      let Response = responseList;
      // console.log("Response--> ",JSON.stringify(Response));
      if (Response['responseCode'] == 200) {
        this.viewSponsorDetail = Response.result;
        if(this.loginTypeArr.length == 1){
          this.loginRole = this.loginTypeArr[0];

          this.memberList();
        }
        // this.loginRole = this.viewSponsorDetail.loginRole;
        // if(this.loginRole == 'COMPETITION' && (this.viewSponsorDetail.visibleIn[0].competitionId !='')){
        //   this.list.competitionList = this.viewSponsorDetail.visibleIn[0].competitionId
        //   console.log("COMPETITION--> ",JSON.stringify(this.list.competitionList));
        // } 
        // if(this.loginRole == 'MEMBERSHIP' && (this.viewSponsorDetail.visibleIn[0].membershipId !='')){
        //   this.list.competitionList = this.viewSponsorDetail.visibleIn[0].membershipId
        //   console.log("MEMBERSHIP--> ",JSON.stringify(this.list.competitionList));
        // }
        // if(this.loginRole == 'VENUE'&& (this.viewSponsorDetail.visibleIn[0].venueId !='')){
        //   this.list.competitionList = this.viewSponsorDetail.visibleIn[0].venueId
        //   console.log("VENUE--> ",JSON.stringify(this.list.competitionList));
        // }        
        console.log("Organizer List--->>>",JSON.stringify(Response.result))
        this.editSponsorphoto = [this.viewSponsorDetail.image];
        //this.memberList();
        $('#editSponsor').modal({backdrop:'static'});
       
      }
    })

}
editMemberSponsor(val){
 console.log("Edit Form Value ---> ",val);
    var apiDoc ={
       "sponsorName": val.sponsorname?val.sponsorname:this.viewSponsorDetail.sponsorName,
        "link":val.link?val.link:this.viewSponsorDetail.link,
        'position':val.position?val.position:1,
        'visibleIn':val.visibleIn,
        'status':val.status?val.status:null,
        "description":val.description?val.description:this.viewSponsorDetail.description,
       "image":this.editphoto?this.editphoto:this.viewSponsorDetail.image,
       "loginRole":this.loginRole
}
      console.log("Api Doc---> ",JSON.stringify(apiDoc));
var url = `data/editSponsor?userId=`+this.userId+`&sponsorId=`+this.sponsorId;
// console.log("Url--> ",url);
this.service.postApi(url,apiDoc,1).subscribe(responseList => {
let Response = responseList;
this.loginRole = '';
this.list.competitionList = [];

// console.log("Response--> ",JSON.stringify(Response));
if (Response['responseCode'] == 200) {
  $('#editSponsor').modal('hide'); 
  this.editmemberSponsorForm.reset();      
  this.getSponserList('',this.filters.currPage);
}
})
}
/******************** Delete Sponsor ***********************/
deletememberSponsor(id){
  console.log("SponsorID to be deleted-=-->> ",id);
  this.SponsorId = id;
  $('#deleteSponsor').modal('show');
}
deletesponsorApi(){
  var url = `data/deleteSponsor?userId=`+this.userId+`&sponsorId=`+this.SponsorId;
     console.log("Url--> ",url);
    this.service.getApi(url,1).subscribe(responseList => {
      let Response = responseList;
      // console.log("Response--> ",JSON.stringify(Response));
      if (Response['responseCode'] == 204) {     
       
          this.getSponserList('',this.filters.currPage);
          $('#deleteSponsor').modal('hide');
           
      }
    })

}

// Venue Based Functionality Starts Here 

// Add Venue Functionality 
addVenueSponsor(formValue){
  console.log("FormValue====>> >",JSON.stringify(formValue));
  var apiDoc = { 'link':formValue.link, 
               'sponsorName':formValue.sponsorname, 
               'description':formValue.description,
               'image': this.addVenuephoto,
                'visibleIn': [], 'position': '', 'status': '' }

console.log("ApiDoc---->>> ",JSON.stringify(apiDoc));
this.service.postApi('data/addSponsors?userId=' + this.userId,apiDoc, 1).subscribe(responseList => {
  let Response = responseList;
  console.log("Response--> ",JSON.stringify(Response));
  if (Response['responseCode'] == 201) {
    $('#addVenueSponsor').modal('hide');
    this.addSponsorphoto =["assets/images/user-img.png"];
    this.addvenueSponsorForm.reset();
    this.getVenueSponserList('',this.filters.currPage);
  }
})
}

// Venue List Functionality
getVenueFunc(){
  var url = `venue/getVenueWithoutPagination?organizerId=`+this.userId;
  this.service.getApi(url,1).subscribe(response => {
   if(response.responseCode == 200) {
    // console.log(JSON.stringify(response));
    var venueList = response.result;
    for(var i=0;i<venueList.length;i++){
      this.venueList.push({
        item_id:venueList[i]._id,
        item_text: venueList[i].venueName
      })
    }
    // console.log("Venue list--> ",this.venueList);
   } else if(response.responseCode == 402) {
     
   }
 });
}

// Get Venue List Functionality
getVenueSponserList(venueSearch,page){
  console.log("Form Value---> ",venueSearch,"------page====??? ",page);
  this.filters.currPage = page;
  var apiDoc ={
     "page":this.filters.currPage,
     "limit":4,
     "search":venueSearch?venueSearch:''
 }
console.log("ApiDoc--> ",apiDoc);
  this.service.postApi('data/getListOfSponsor?userId=' + this.userId,apiDoc, 1).subscribe(responseList => {
    let Response = responseList;
    console.log("Response--> ",JSON.stringify(Response));
    if (Response['responseCode'] == 200) {
     var venueSponsorDetail = Response.result;
     this.venueSponsorList = venueSponsorDetail.docs;
     this.pageLimit = venueSponsorDetail.limit;
     this.pageTotal = venueSponsorDetail.total;
    }
  })
}
// Edit Venue Functionality
editVenueSponsorModal(id){
  this.sponsorId = id;
  console.log("Sponsor Id--> ",this.sponsorId);
var url = `data/getEditDetailOfSponsor?userId=`+this.userId+`&sponsorId=`+this.sponsorId;
console.log("Url--> ",url);
    this.service.getApi(url,1).subscribe(responseList => {
      let Response = responseList;
      console.log("Response--> ",JSON.stringify(Response));
      if (Response['responseCode'] == 200) {
        this.viewVenueSponsorDetail = Response.result;
        this.editSponsorphoto = [this.viewVenueSponsorDetail.image];
        console.log("Image___>>>> ",this.editSponsorphoto);
        this.getVenueFunc();
        $('#editVenueSponsor').modal('show');
       
      }
    })

}
editVenueSponsor(val){
  console.log("Edit Venue Sponsor Form Value ---> ",JSON.stringify(val));
    var apiDoc ={
       "sponsorName": val.sponsorname?val.sponsorname:this.viewVenueSponsorDetail.sponsorName,
        "link":val.link?val.link:this.viewVenueSponsorDetail.link,
        'position':val.position?val.position:1,
        'visibleIn':val.visibleIn?val.visibleIn:'',
        'status':val.status?val.status:null,
        "descriptition":val.description?val.description:this.viewVenueSponsorDetail.description,
       "image":this.editVenuephoto?this.editVenuephoto:this.viewVenueSponsorDetail.image
}
console.log("Api Doc---> ",JSON.stringify(apiDoc));
var url = `data/editSponsor?userId=`+this.userId+`&sponsorId=`+this.sponsorId;
console.log("Url--> ",url);
this.service.postApi(url,apiDoc,1).subscribe(responseList => {
let Response = responseList;
console.log("Response--> ",JSON.stringify(Response));
if (Response['responseCode'] == 200) {
  $('#editVenueSponsor').modal('hide'); 
  this.editVenueSponsorForm.reset();      
  this.getVenueSponserList('',this.filters.currPage);
}
})
}
}
