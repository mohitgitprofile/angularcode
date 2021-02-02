import { Component, OnInit, MainService, ActivatedRoute, Router,FormGroup, FormBuilder, Validators  } from '../../../../../index';
import { convertToParamMap } from '@angular/router';
@Component({
  selector: 'app-med-d-config-section',
  templateUrl: './med-d-config-section.component.html',
  styleUrls: ['./med-d-config-section.component.css']
})
export class MedDConfigSectionComponent implements OnInit {
  currUrl: string = '';
  postData: any =[]
  userDetails: any = {};
  constructor(private route: ActivatedRoute,private router: Router,private fb: FormBuilder,private service: MainService) { }
  
  addMediaSectionForm: FormGroup;
  order: string;
  param: any =[];
  radioItems: Array<string>;
  data: string;


  ngOnInit() {
    

    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
  this.currUrl = this.router.url.split('/').splice(1,2).join('/')
   console.log(this.currUrl)
    this.addMediaSectionForm = this.fb.group({
      'sectionName': ['', Validators.compose([Validators.required,])],
      'priority': ['', Validators.compose([Validators.required, ])],
      'status': ['', Validators.compose([Validators.required, ])],
      'menu': ['',Validators.compose([])],
      'selectContentLink': ['content', Validators.compose([])],
      'content': ['', Validators.compose([])],
      'link':  ['', Validators.compose([])],
      'fileUpload':['', Validators.compose([Validators.required, ])],
    })

   
    this.addMediaSectionForm.controls['menu'].disable();
     
  }

  postsApi() {
    if(this.addMediaSectionForm.controls['status'].value ==""){
      this.service.toastrErr('Please select status of this section.');    
      return;
    }
    if(this.addMediaSectionForm.invalid){
      this.service.toastrErr('Please enter valid field.');    
      return;
    }
        let data = {
          userId:  this.userDetails,
          sectionName: this.addMediaSectionForm.controls['sectionName'].value,
          priority: this.addMediaSectionForm.controls['priority'].value,
          status: this.addMediaSectionForm.controls['status'].value,
          menu : this.addMediaSectionForm.controls['menu'].value,
         content: this.addMediaSectionForm.controls['content'].value,
          link : this.addMediaSectionForm.controls['link'].value,
          // image:this.addMediaSectionForm.controls['fileUpload'].value,
          image:  this.data
      }
      console.log(data)
      this.save(data);
      this.router.navigate(['/organizer/domainWebConfiguration'])
    }

    save(data){
      this.service.postApi(`configuration_domain/addSection`, data, 1).subscribe(response => {
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
                console.log(e)
                this.data= e.target.result
                console.log('Convert==>',this.data)
              }
              reader.readAsDataURL(fileInput.target.files[0])
            
        // this.data= btoa(fileInput.target.files[0])
           
         
            }

    }
   
}
