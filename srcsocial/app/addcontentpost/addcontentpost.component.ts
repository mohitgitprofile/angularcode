import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcontentpost',
  templateUrl: './addcontentpost.component.html',
  styleUrls: ['./addcontentpost.component.css']
})
export class AddcontentpostComponent implements OnInit {
  config = {
    displayKey:"name", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    // height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    // placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
    // customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    // moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    // noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    // searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    // clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    // inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
  }
  addSubadminForm: FormGroup;
  dataloop: any=[];
  loopdata: any=[];
  file: any;
  imageTypee: any;
  imageUrll: any;
  type1: any;
  type2: any;
  type: any = [];
  urls: any = [];
  videoUrls: any = []
  newsData: any = []
  url: any=[];
  news1data = new Array<string>();
  news2data = new Array<string>();
  cloudinaryUrl: any =[];
  copyUserList: any=[];

  constructor(
    private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService

  ) {
    
   }

  ngOnInit() {
    this.form();
    this.categorylist();
    this.getUserList();
    // this.config = {
    //   displayKey:"name", //if objects array passed which key to be displayed defaults to description
    //   search:true, //true/false for the search functionlity defaults to false,
    //   height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    //   placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
    //   customComparator: ()=>{this.copyUserList}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    //   limitTo: this.copyUserList.length, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    //   moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    //   noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    //   searchPlaceholder:'Search', // label thats displayed in search input,
    //   searchOnKey: 'display', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    //   clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    //   inputDirection: 'ltr' // the direction of the search input can be rtl or ltr(default)
    // }
  }
  

  getUserList() {
    this.service.getApii('admin/postedByUsers', 1).subscribe(success => {
      console.log("success", success);
      if (success.response_code == 200) {
        // this.service.success(success.response_message)
        this.copyUserList = success.result[0].docs;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })

  }
  

  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/)]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      tag: new FormControl(''),
      selectData: new FormControl(''),
      postedby : new FormControl('', [Validators.required])
      // balance: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(15)]),
      // city: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.maxLength(15)]),
      // state: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.maxLength(15)]),
      // kyc: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      // pincode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.maxLength(10)]),
      // number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.minLength(8), Validators.maxLength(16)])
    });
  }

  addUser() {
    this.spinner.show();
    let data = {
      title: this.addSubadminForm.value.name,
      categoryName : this.addSubadminForm.value.category,
      content: this.addSubadminForm.value.description,
      postedBy: this.addSubadminForm.value.postedby.name,
      image: this.newsData,
    }
    console.log("gdfghfhjfhj",data);
    
    this.service.postApii('admin/addContent',data,1).subscribe(success=>{
      if(success.response_code == 200){
        this.spinner.hide();
        this.router.navigate(['/contentpost']);
      }
      else {
        this.spinner.hide();
      }
    },(error=>{
      this.spinner.hide();
      console.log("dfghdfghdfh",error);
      
    }))
  }

  categorylist() {
    this.service.getApi('admin/listOfPublistCategory').subscribe(success=>{
      console.log("hgfhgf",success)
      this.dataloop = success.result[0];
      this.dataloop.forEach(element => {
        this.loopdata.push(element.categoryName);
      });
      console.log("fdgghdfghdfgh",this.loopdata)
    })
  }
  getUser() {
    this.service.getApii('admin/postedByUsers', 1).subscribe(success => {
      console.log("success", success);
      if (success.response_code == 200) {
        // this.service.success(success.response_message)
        this.copyUserList = success.result[0].docs;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })

  }

  ValidateFileUploadd(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageTypee = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrll = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

  handleFileInput(event) {
    this.urls = [];
    this.videoUrls = [];
    let files = event.target.files;
    if(files.length>5){
      setTimeout(() => {
        this.service.error("Maximum 5 files allow only");
      }, 1000);
      return;
    }
    console.log(files.length)
    if (files) {
      for (let file of files) {
        console.log("file data===>",file.size,file)
        if(file.size>5242880){
          setTimeout(() => {
            this.service.error("File size should not be greater than 10MB.");
          }, 1000);
          return false;
        }

        else if(file.size<=5242880){
          if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
            this.type1 = file.type
            var reader = new FileReader();
            reader.onload = (e: any) => {
              let data = e.target
               this.urls.push(data.result);
               console.log(this.urls,"This is the urls")

            };

            reader.readAsDataURL(file);
          }

          // else if (file.type == "video/mp4" || file.type == 'video/mov' || file.type == 'video/flv') {
          //   // this.type2 = file.type
          //   // reader = new FileReader();
          //   // reader.onload = (e: any) => {
          //   //   this.videoUrls.push(e.target.result);
          //   //   console.log(this.videoUrls,"This is the Video urls")

          //   // }
          //   // reader.readAsDataURL(file);
          // }
          else {
            // this.service.error("Select only jpg,jpeg,png,mp4,mov or flv file.");
          }

        }
      }
        setTimeout(()=>{
      this.urls.map(x=>{
          this.newsData.push(x)
          console.log(this.newsData,"This is the urls")

        })
        this.videoUrls.map(x=>{
          this.newsData.push(x)
        })
        setTimeout(()=>{
          console.log(this.newsData,'this is the after set time out')
        },1000)
       },1000);

    }
  }


}
