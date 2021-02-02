
import { Component, OnInit, MainService, ActivatedRoute, Router,FormGroup, FormBuilder, Validators  } from '../../../../../index';
import { PARAMETERS } from '@angular/core/src/util/decorators';
@Component({
  selector: 'app-med-d-edit-config-section',
  templateUrl: './med-d-edit-config-section.component.html',
  styleUrls: ['./med-d-edit-config-section.component.css']
})
export class MedDEditConfigSectionComponent implements OnInit {
  currUrl:string=''
  postData: any =[]
  userDetails: any = {};
  addMediaSectionForm: FormGroup;
  order: string;
  param: any =[];
  
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private service: MainService) { 
   
  }

  ngOnInit() {
    // this.currUrl = this.router.url.split('/').splice(1,2).join('/')
    // this.currUrl =  window.location.pathname.split('/').splice(1,2).join('/')
    this.currUrl = 'organizer/dConfigSection'
   
    console.log(this.currUrl)
    this.route.queryParams.subscribe(params => {
      console.log(params); 
      this.param =params
    let image = this.param.image
    // let image = atob(this.param.image)
    console.log(image)
      console.log(this.param)
      // {order: "popular"}
      // this.addMediaSectionForm.patchValue({
      //   sectionName: params.sectionName,
      //   priority: params.priority,
      //   status: params.status,
      //   menu: params.menu,
      //   content: params.content,
      //   link:  params.link,
      // })
       this.addMediaSectionForm = this.fb.group({
    'sectionName': [params.sectionName, Validators.compose([Validators.required,])],
    'priority': [params.priority, Validators.compose([Validators.required, ])],
    'status': [params.status, Validators.compose([Validators.required, ])],
    'addSectionOption': [],
    'menu': [params.menu, Validators.compose([])],
    'selectContentLink': [false, Validators.compose([])],  //static now
    'content': [params.content, Validators.compose([])],
    'link':  [params.link, Validators.compose([])],
    'fileUpload': [this.param.image, Validators.compose([])],
  })
  
    });
    if(!this.param.menu){
      this.addMediaSectionForm.controls['menu'].disable();
     
    }else{
      this.addMediaSectionForm.patchValue({
        'addSectionOption':true
      })
    }
   if(this.param.content){
    this.addMediaSectionForm.patchValue({
      'selectContentLink':'content'
    })
   }else if(this.param.link){
    this.addMediaSectionForm.patchValue({
      'selectContentLink':'link'
    })
   }

    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
   
    // this.addMediaSectionForm = this.fb.group({
    //   'sectionName': ['', Validators.compose([Validators.required,])],
    //   'priority': ['', Validators.compose([Validators.required, ])],
    //   'status': ['', Validators.compose([Validators.required, ])],
    //   'menu': ['', Validators.compose([Validators.required, ])],
    //   'content': ['', Validators.compose([Validators.required, ])],
    //   'link':  ['', Validators.compose([Validators.required, ])],
    // })

  }
  postsApi() {
   
    let data = {
      sectionId: this.param._id,
      userId:  this.userDetails,
      sectionName: this.addMediaSectionForm.controls['sectionName'].value,
      priority: this.addMediaSectionForm.controls['priority'].value,
      status: this.addMediaSectionForm.controls['status'].value,
      menu : this.addMediaSectionForm.controls['menu'].value,
      content: this.addMediaSectionForm.controls['content'].value,
      link : this.addMediaSectionForm.controls['link'].value,
    }
  
    this.service.postApi(`configuration_domain/editSection`, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.postData = response.success2
        this.service.toastrSucc(response.responseMsg);
        this.router.navigate(['/organizer/domainWebConfiguration'])
      } else {
        this.service.toastrErr(response.responseMsg);
      }
    })
  }




  selectChange(val){
    if('content' === val){
      // this.addMediaSectionForm.patchValue({
      //       'content':''
      //     })
      this.addMediaSectionForm.patchValue({
        'link':''
      })
    }else{
      this.addMediaSectionForm.patchValue({
        'content':''
      })
      // this.addMediaSectionForm.patchValue({
      //   'content':''
      // })
    }
  }
  addSectionMenu(val){
    console.log(val.target.checked)
    if(val.target.checked == true){
      this.addMediaSectionForm.controls['menu'].enable();
    }else{
      this.addMediaSectionForm.controls['menu'].disable();
      this.addMediaSectionForm.patchValue({
        'menu':''
      })
    }
    // this.addMediaSectionForm.controls['menu'].disable();
    // this.addMediaSectionForm.patchValue({
    //   'menu':
    // })
  }

  fileChangeEvent(fileInput: any) {
   console.log(fileInput)
        if(fileInput.target.files && fileInput.target.files[0]) {
            let reader = new FileReader();
            // let self = this;
            reader.onload = (e: any) =>  {
            
            //   self.addFileData.file = e.target.result
            }
            reader.readAsDataURL(fileInput.target.files[0])
            var data= fileInput.target.files[0]
          //  var data= btoa(fileInput.target.files[0])
           console.log('Convert==>',data)
       
          }

  }

}
