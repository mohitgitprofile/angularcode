import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editcommunity',
  templateUrl: './editcommunity.component.html',
  styleUrls: ['./editcommunity.component.css']
})
export class EditcommunityComponent implements OnInit {
  addSubadminForm: FormGroup
  paramData: any;
  userData: any;
  kycImage: any;
  typeInfo: any;
  file: any;
  imageType: any;
  imageUrl: any;
  communitytypee: any;
  imageTypee: any;
  imageUrll: any;
  dataloop: any=[];
  loopdata: any=[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form();
    this.route.params.subscribe((id) => {
      this.paramData = id.id;
      console.log("dfgdfg", this.paramData);
      this.getUserData();
    })
    this.categorylist();
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



  form() {
    this.addSubadminForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.minLength(2), Validators.maxLength(20)]),
      link: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(15)]),
      city: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.maxLength(15)]),
      kyc: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z][A-Za-z ]*$/), Validators.maxLength(15)]),
      category: new FormControl(''),
      typee: new FormControl(''),
      number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.minLength(8), Validators.maxLength(16)])
    });
  }
  getUserData() {
    this.spinner.show();
    console.log("jhgfjgjhgfhjk", this.paramData);
    this.service.postApii('admin/listOfCommunity', { communityId: this.paramData }, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("userdata", success)
        this.userData = success.result[0];
        this.imageUrl = this.userData.logo;
        this.imageUrll = this.userData.coverPage;
        this.typeInfo= this.userData.communityType;
        this.addSubadminForm.patchValue({
          name: this.userData.communityName,
          link: this.userData.link,
          description: this.userData.communityDescription,
          typee: this.userData.communityType,
          category: this.userData.categoryId
        })
        console.log("userdata", this.userData)
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }

  updateSubadmin() {
    this.spinner.show();
    let data = {
      communityId: this.paramData,
      communityName : this.addSubadminForm.value.name,
      communityType: this.communitytypee,
      link: this.addSubadminForm.value.link,
      image: this.imageUrl,
      communityDescription: this.addSubadminForm.value.description,
      coverPageImage: this.imageUrll
    }
    this.service.postApii('admin/editCommunity', data, 1).subscribe(success => {
      if (success.response_code == 200) {
        console.log("success", success)
        this.router.navigate(['/community-management'])
        this.spinner.hide();
      }
      else {
        console.log("else", success);
        this.spinner.hide();
      }
    }, (error) => {
      console.log("error", error)
      this.spinner.hide();
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
  typeVerify(data) {
   console.log("data",data);
   this.communitytypee = data;
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


}
