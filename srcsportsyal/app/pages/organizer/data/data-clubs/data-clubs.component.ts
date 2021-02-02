import { GlobalConstant } from "../../../../global/global.constant";
import { Component, OnInit, MainService,ViewChild } from '../../../../index';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
declare var $:any

@Component({
  selector: 'app-data-clubs',
  templateUrl: './data-clubs.component.html',
  styleUrls: ['./data-clubs.component.css']
})
export class DataClubsComponent implements OnInit {
  clubId: any;
  ClubsList: any = {docs: []};
  userDetails: any;
  searchKey: any;
  ImageBase64: any = "assets/images/user-img.png";
  CreateClubForm: FormGroup;
  list: any = { limitChangeArr: GlobalConstant.limitChangeArr, statusList: GlobalConstant.teamStatusArr };
  filter: any = { currPage: 1, limit: GlobalConstant.paginationLimit, limitChange: GlobalConstant.paginationLimit };
  printData: any = [];
  addClubForm: FormGroup;
  addClubphoto: any=["assets/images/user-img.png"];
  addphoto: string;
  searchForm: FormGroup;
  clubList: any =[];
  pageLimit: any;
  pageTotal: any;
  editClubForm: FormGroup;
  editClubphoto: any=[];
  editphoto: string;
  memberclubid: any;
  editclubList: any={status:'',clubName:'',phone:'',email:'',headquaters:''};
  clublist: any=[];
  loginTypeArr: any=[];
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  userId: any;
  constructor(private service: MainService, public fb: FormBuilder) {
    this.buildForm();
  }
 
  buildForm() {
    this.CreateClubForm = this.fb.group({
		  'clubName' : [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^\d+$/)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/)])],
      'headquaters': [null, Validators.compose([Validators.required])],
      'status': ['', Validators.compose([Validators.required])],
    });
    this.addClubForm = new FormGroup({
      'image': new FormControl('',Validators.required),
      'clubname':new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      'mobile':new FormControl('',[Validators.required,Validators.pattern(/^[0-9\s]*$/)]),
      'email':new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)]),
      'headquater':new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      'status': new FormControl('',Validators.required)
    })
    this.editClubForm = new FormGroup({
      'image': new FormControl('',),
      'clubname':new FormControl('',[,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      'mobile':new FormControl('',[,Validators.pattern(/^[0-9\s]*$/)]),
      'email':new FormControl('',[,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/)]),
      'headquater':new FormControl('',[,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      'status': new FormControl('',)
    })
    this.searchForm = new FormGroup({
      'search':new FormControl('',),
       })
  }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))    
    this.userId = this.userDetails._id;   
    this.loginTypeArr = localStorage.getItem('LoginWith').split(',');  
    this.getClubsListApi();
    this.getClubApi('',this.filter.currPage);
  }

  public handleAddressChange(address: Address) {
    console.log("address---->>>>",address)
}

  getClubsListApi() {
    return new Promise((resolve, reject) => {
      let data;
      if(this.searchKey){
        data = {page:this.filter.currPage, limit: this.filter.limit, search: this.searchKey}
      } else {
        data = {page:this.filter.currPage, limit: this.filter.limit, search: ''}
      }
      
      this.service.postApi('data/getListOfClub?userId='+this.userId, data, 1).subscribe(responseList => {
        let Response = responseList;
        if(Response['responseCode'] == 200) {
          this.ClubsList = Response[`result`]
          resolve(true)
        } else if(Response['responseCode'] == 404) {
          this.ClubsList = Object.assign({}, {docs: []})
        }
      })
    })
  }

  onPageChange(pageNo) {
    this.filter.currPage = pageNo
    this.getClubsListApi()
  }
  onChangeLimit() {
    this.filter.limit = Number(this.filter.limitChange)
    this.filter.currPage = 1
    this.getClubsListApi()
  }

  addclub() {
    this.ImageBase64 = "assets/images/user-img.png";
    $('#create_club').modal({backdrop: 'static'});
    this.buildForm();
  }

  createClubApi() {
    return new Promise((resolve, reject) => {
      let data = this.CreateClubForm.value
      if(this.ImageBase64 != "assets/images/user-img.png") {
        data.image = this.ImageBase64
      }
      this.service.postApi('data/addClub?userId='+this.userId, data, 1).subscribe(responseList => {
        let Response = responseList;
        if(Response['responseCode'] == 201) {
          this.service.toastrSucc(Response.responseMessage)
          this.getClubsListApi();
          $('#create_club').modal('hide');
          resolve(true)
        }
      })
    })
  }

  get(clubId) {
    return new Promise((resolve, reject) => {
      this.service.getApi('data/findClub?userId='+this.userId+'&clubId='+clubId, 1).subscribe(responseList => {
        this.clubId = clubId;
        let Response = responseList;
        if(Response['responseCode'] == 200) {
          this.CreateClubForm.setValue({
            clubName: Response[`result`].clubName, 
            phone: Response[`result`].phone, 
            email: Response[`result`].email, 
            headquaters: Response[`result`].headquaters, 
            status: Response[`result`].status});
          this.ImageBase64 = Response[`result`].image?Response[`result`].image:'assets/images/user-img.png';
          $('#edit_club').modal('show');
          resolve(true)
        }
      })
    })
  }

  save() {
    return new Promise((resolve, reject) => {
      let data = this.CreateClubForm.value;
      if(this.ImageBase64 != "assets/images/user-img.png") {
        data.image = this.ImageBase64
      }
      this.service.postApi('data/editClub?userId='+this.userId+'&clubId='+this.clubId, data, 1).subscribe(responseList => {
        let Response = responseList;
        if(Response['responseCode'] == 201) {
          this.service.toastrSucc(Response.responseMessage)
          this.getClubsListApi();
          $('#edit_club').modal('hide');
          resolve(true)
        }
      })
    })
  }

  onSearch(val, event) {
    if(val === 1) {
      if(!this.searchKey || event.keyCode == 13)
      this.getClubsListApi();
    } 
    else if(val === 2)
      this.getClubsListApi();
  }

  searchApi() {
    return new Promise((resolve, reject) => {
      let data = {search:this.searchKey}
      this.service.postApi('data/searchClub?userId='+this.userId, data, 1).subscribe(responseList => {
        let Response = responseList;
        if(Response['responseCode'] == 200) {
          this.ClubsList = Response[`result`]
          resolve(true)
        }
      })
    })
  }

  // print(): void {
  //   let printContents, popupWin;
  //   printContents = document.getElementById('print-section').innerHTML;
  //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //   popupWin.document.open();
  //   popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>Print tab</title>
  //         <style>
  //         //........Customized style.......
  //         </style>
  //       </head>
  //   <body onload="window.print();window.close()">${printContents}</body>
  //     </html>`
  //   );
  //   popupWin.document.close();
  // }

  // async exportToCSV() {
  //    var exportData = [
  //   {
  //     name: "NAME",
  //     phone: "PHONE",
  //     email: "EMAIL",
  //     headquaters: "HEADQUARTERS",
  //     status: "STATUS"
  //   }];
  //   await this.addlistItems(exportData);

  // }
  
  // addlistItems(exportData) {
  //   return new Promise((resolve, reject) => {
  //     this.service.getApi('data/selectClub?userId='+this.userId, 1).subscribe(responseList => {
  //       let Response = responseList;
  //       if(Response['responseCode'] == 200) {
  //         let exportClubList = Response[`result`]
  //         for(let i=0;i<exportClubList.length;i++) {
  //           exportData.push({
  //             name: exportClubList[i].clubName,
  //             phone: exportClubList[i].phone,
  //             email: exportClubList[i].email,
  //             headquaters: exportClubList[i].headquaters,
  //             status: exportClubList[i].status
  //         })
  //         }
  //         resolve(true)
  //         new Angular5Csv(exportData, 'Club List');
  //       }
  //     })
  //   })
  // }

  delete(club_id) {
    this.clubId = club_id;
    $('#delete_club').modal('show');
  }

  onDeleteClub() {
    return new Promise((resolve, reject) => {
      this.service.getApi('data/deleteClub?userId='+this.userId+'&clubId='+this.clubId, 1).subscribe(responseList => {
        let Response = responseList;
        if(Response['responseCode'] == 204) {
          this.service.toastrSucc(Response.responseMessage)
          this.getClubsListApi();
          $('#delete_club').modal('hide');
          resolve(true)
        }
      })
    })
  }

  fileChangeEvent(fileInput: any){
    var imageValue;
      if (fileInput.target.files && fileInput.target.files[0]) {
        var reader = new FileReader();
        let self = this
        reader.onload = function (e : any) {
            $('#preview').attr('src', e.target.result);
            imageValue = e.target.result
            self.ImageBase64 = e.target.result;
        }

        reader.readAsDataURL(fileInput.target.files[0]);
    }
    
  }

  printTeam(val) {
    let data = {
      search: this.searchKey
    }
    console.log("Data---> ",data.search);
    this.service.postApi('data/listOfClub?userId='+this.userId, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.printData = response.result
        if(val === 1) {
          setTimeout(() => {
            this.service.printFun('table_dataClubs')
          }, 500)
        } else {
          var data = [
            {
              name: 'Name',
              phone: 'Phone',
              email: 'Email',
              headquarter: 'Headquarter',
              status: 'Status' 
            }
          ];
          for(let i=0; i < this.printData.length; i++) {
            data.push({
              name: this.printData[i].clubName,
              phone: this.printData[i].phone || '- - -',
              email: this.printData[i].email,
              headquarter: this.printData[i].headquaters,
              status: this.printData[i].status
            })
            if(i+1 == this.printData.length) 
              new Angular5Csv(data, 'My Report');
          }
        }
        
      }
    })
    
    
  }
  /******************************* Work On Membership Club Section Start Here ********************/
  /*********************** Image Conversion/***********************/
onUploadChange(evt: any) {
  this.addClubphoto = [] 
  // this.service.spinnerShow();
  const file = evt.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    // this.service.spinnerHide();
  }
}

handleReaderLoaded(e) {
  this.addClubphoto.push('data:image/png;base64,' + btoa(e.target.result)); 
  this.addphoto = 'data:image/png;base64,' + btoa(e.target.result) ;
}
/*********************** Image Conversion/***********************/
 /***********************Edit Image Conversion/***********************/
 oneditChange(evt: any) {
  this.editClubphoto = [] 
  // this.service.spinnerShow();
  const file = evt.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = this.editReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    // this.service.spinnerHide();
  }
}

editReaderLoaded(e) {
  this.editClubphoto.push('data:image/png;base64,' + btoa(e.target.result)); 
  this.editphoto = 'data:image/png;base64,' + btoa(e.target.result) ;
}
/*********************** Image Conversion/***********************/
  /***************** Add Club Function ***********/
  addClubFunc(formval){
    var apiDoc = formval;
    console.log("Form Value ---> ",JSON.stringify(formval));
    //console.log("Image Value ---> ",this.addphoto);
    var addClubData = {      
      "status" : apiDoc.status,
      "clubName" :apiDoc.clubname,
      "phone" : apiDoc.mobile,
      "email" : apiDoc.email,
      "headquaters" :apiDoc.headquater,
      "image":this.addphoto,
    }
    console.log("Api Doc----> ",JSON.stringify(addClubData));
    var url= `data/addClub?userId=`+this.userId;
    this.service.postApi(url, addClubData, 1).subscribe(response => {
      if(response.responseCode == 201) {
       console.log("Message---> ",response.responseMessage);
       this.addClubphoto =["assets/images/user-img.png"];
       this.addClubForm.reset();
       $('#addClub').modal('hide');
       this.getClubApi('',this.filter.currPage);
         } else if(response.responseCode == 402) {
        console.log("Message---> ",response.responseMessage);
      }
    })
  }
  /******************* Get Club List Api *****************/
  getClubApi(formvalue,page){
    console.log("FormValue --> ",formvalue+"  Page No;---> ",page);
    this.filter.currPage = page;
    var url =`data/getListOfClub?userId=`+this.userId;
    var apiDoc = {
      "page":this.filter.currPage,
      "Limit":10,
      "search":formvalue?formvalue.search:'',
   }
   console.log("ApiDoc---> ",JSON.stringify(apiDoc));
   var url= `data/getListOfClub?userId=`+this.userId;
   this.service.postApi(url, apiDoc, 1).subscribe(response => {
     console.log("Response---> ",JSON.stringify(response));
     if(response.responseCode == 200) {
      console.log("Message---> ",response.responseMessage);
      var clubDetail = response.result;
      this.clubList = clubDetail.docs;
      this.pageLimit = clubDetail.limit;
      this.pageTotal = clubDetail.total;
       } else if(response.responseCode == 402) {
       console.log("Message---> ",response.responseMessage);
     }
   })
  }
  /******************* View Particular Club Detail ******************/
  viewClubApi(id){
    this.memberclubid = id;
    console.log("MemberClubid---> ",this.memberclubid);    
    var url= `data/findClub?userId=`+this.userId+`&clubId=`+this.memberclubid;
    this.service.getApi(url, 1).subscribe(response => {
      console.log("Response---> ",JSON.stringify(response));
      if(response.responseCode == 200) {
       console.log("Message---> ",response.responseMessage);
       var editclubDetail = response;
       this.editclubList = editclubDetail.result;
       this.editClubphoto = [this.editclubList.image];
       console.log("Edit Detail---> ",this.editclubList);
       $('#editClub').modal('show');
      } 
      else if(response.responseCode == 402) {
        console.log("Message---> ",response.responseMessage);
      }
    })
  }
  /**************** Edit Particular Club Detail ****************/
  editClubFunc(formvalue){
    console.log("Form Value--> ",JSON.stringify(formvalue));
    
    var apiDoc = {
      "status":formvalue.status?formvalue.status: this.editclubList.status,
      "clubName" :formvalue.clubname?formvalue.clubname: this.editclubList.clubName,
     "phone" : formvalue.mobile?formvalue.mobile: this.editclubList.phone,
     "email" : formvalue.email?formvalue.email: this.editclubList.email,
     "headquaters" :formvalue.headquater?formvalue.headquater: this.editclubList.headquaters,
     "image":this.editphoto?this.editphoto:this.editclubList.image
   }
   console.log("ApiDoc---> ",JSON.stringify(apiDoc));
   var url= `data/editClub?userId=`+this.userId+`&clubId=`+this.memberclubid;
   this.service.postApi(url, apiDoc, 1).subscribe(response => {
     console.log("Response---> ",JSON.stringify(response));
     if(response.responseCode == 201) {
      console.log("Message---> ",response.responseMessage);
      this.editClubForm.reset();
      this.getClubApi('',this.filter.currPage);
      
      $('#editClub').modal('hide');     
       } else if(response.responseCode == 402) {
       console.log("Message---> ",response.responseMessage);
     }
   })
  }
  /********************* Delete Club From Club List ************************/
  deletememberClub(id){
   this.memberclubid= id ;
   $('#deleteClub').modal('show');
  }
  deleteclubApi(){
    var url= `data/deleteClub?userId=`+this.userId+`&clubId=`+this.memberclubid;
    this.service.getApi(url, 1).subscribe(response => {
      console.log("Response---> ",JSON.stringify(response));
      if(response.responseCode == 204) {
       console.log("Message---> ",response.responseMessage);
       this.getClubApi('',this.filter.currPage);
       $('#deleteClub').modal('hide');
      } 
      else if(response.responseCode == 402) {
        console.log("Message---> ",response.responseMessage);
      }
    })
  }
  /***************** Print Function ***********************/
  print(){
    window.print();
  }
  /***************** Export to CSV ********************/
exportToCSV(){
  var url = `data/selectClub?userId=`+this.userId;
   this.service.getApi(url,1).subscribe(response => {
    if(response.responseCode == 200) {
      this.clublist = response.result;
      console.log("Club list--> ",this.clublist);
     console.log(JSON.stringify(response));
     var data = [
            {
              name: 'ClubName',
              phone: 'Phone',
              email: 'Email',
              headquarter: 'Headquarter',
              status: 'Status' 
            }
          ];
          for(let i=0; i < this.clublist.length; i++) {
            data.push({
              name: this.clublist[i].clubName,
              phone: this.clublist[i].phone || '- - -',
              email: this.clublist[i].email,
              headquarter: this.clublist[i].headquaters,
              status: this.clublist[i].status
            })
            if(i+1 == this.clublist.length) 
              new Angular5Csv(data, 'My ClubList');
          }
          console.log("Data----->  ",data);
    
    } else if(response.responseCode == 402) {
      
    }
  });
}
  /******************************* work On Membership Club Section End Here **********************/
}