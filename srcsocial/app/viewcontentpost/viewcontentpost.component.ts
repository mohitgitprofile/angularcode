import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewcontentpost',
  templateUrl: './viewcontentpost.component.html',
  styleUrls: ['./viewcontentpost.component.css']
})
export class ViewcontentpostComponent implements OnInit {
  paramData: any;
  addSubadminForm: FormGroup;
  id: any;
  name: any;
  title: any;
  content: any;
  image: any=[];
  postedBy: any;

  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public active:ActivatedRoute
  ) { 
    this.active.queryParams.subscribe((params)=>{
      this.paramData=params.id
      console.log("hgfhgfhgdhdfghd",this.paramData);
      
      // this.name=params.Name
    })

  }

  ngOnInit() {
    this.form();
    this.getContentData();

    // this.active.params.subscribe((id) => {
    //   this.paramData = id;
    //   console.log("jghfghft",id);
    //   this.getContentData();
    // }, (err) => {
    //   console.log("Error in getting data : ", err);
    // });

  }

  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      imagee: new FormControl('', [Validators.required]),
      postedby : new FormControl('', [Validators.required])
    });
  }
    gotonext()  {
      this.router.navigate(['/community-management'])
    }
  
    getContentData(){
      this.spinner.show();
    this.service.postApii('admin/listOfContent',{contentId:this.paramData},1).subscribe(success=>{
      if(success.response_code == 200){
        this.spinner.hide();
        console.log("success",success);
        this.name = success.result[0].categoryName;
        this.title = success.result[0].title;
        this.content = success.result[0].content;
        this.image = success.result[0].contentImage;
        this.postedBy = success.result[0].postedBy;
        this.addSubadminForm.patchValue({
          name : this.title,
          category : this.name,
          postedby : this.postedBy,
          description : this.content
        })
        
        // this.router.navigate(['/contentpost']);
      }
      else {
        this.spinner.hide();
      }
    },(error=>{
      this.spinner.hide();
      console.log("dfghdfghdfh",error);
      
    }))
    }

}
