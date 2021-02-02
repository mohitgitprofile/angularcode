import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editcontentpost',
  templateUrl: './editcontentpost.component.html',
  styleUrls: ['./editcontentpost.component.css']
})
export class EditcontentpostComponent implements OnInit {
  addSubadminForm: FormGroup;
  paramData: any;
  dataloop: any=[];
  loopdata: any=[];
  image: any;
  file: any;
  imageType: any;
  imageUrl: any;
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

      this.service.getApi('admin/listOfPublistCategory').subscribe(success=>{
        console.log("hgfhgf",success)
        this.dataloop = success.result[0];
        this.dataloop.forEach(element => {
          this.loopdata.push(element.categoryName);
        });
        console.log("fdgghdfghdfgh",this.loopdata)
      })


    this.getUserData();
  }
  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      image: new FormControl('', [Validators.required]),
      postedby : new FormControl('', [Validators.required])
    });
  }



  getUserData() {
    this.spinner.show();
    console.log("jhgfjgjhgfhjk", this.paramData);
    this.service.postApii('admin/listOfContent', { contentId: this.paramData }, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("userdataghdfjhg", success)
        // this.name = success.result[0].categoryName;
        // this.title = success.result[0].title;
        // this.content = success.result[0].content;
        this.imageUrl = success.result[0].contentImage[0];
        this.addSubadminForm.patchValue({
          name : success.result[0].title,
          category : success.result[0].categoryName,
          postedby : success.result[0].postedBy,
          description : success.result[0].content,
        })
        console.log("userdata")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  updateContentpost() {
    let data = {
      contentId: this.paramData,
      title: this.addSubadminForm.value.name,
      categoryName : this.addSubadminForm.value.category,
      content : this.addSubadminForm.value.description,
      postedBy : this.addSubadminForm.value.postedby,
      image : this.imageUrl
    }
    this.spinner.show();
    console.log("jhgfjgjhgfhjk", this.paramData);
    this.service.postApii('admin/editContent', data, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("userdataghdfjhg", success)
        // this.name = success.result[0].categoryName;
        // this.title = success.result[0].title;
        // this.content = success.result[0].content;
        this.image = success.result[0].contentImage;
        this.addSubadminForm.patchValue({
          name : success.result[0].title,
          category : success.result[0].categoryName,
          postedby : success.result[0].postedBy,
          description : success.result[0].content,
        })
        this.router.navigate(['/contentpost'])
        console.log("userdata")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })

  }


  ValidateFileUpload(event) {
    this.file = event.target.files;
    if (this.file[0]) {
      this.imageType = this.file[0].type;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file[0]);
    }
  }

}
