import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { IoTThingsGraph } from 'aws-sdk/clients/all';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  id: any;
  name: any;
  editData: any;
  editSubadminForm:FormGroup
  categoryName: any;
  file: any = [];
  imageType: any;
  imageUrl: any;
  constructor( 
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public active:ActivatedRoute) { 
      this.active.queryParams.subscribe((params)=>{
        this.id=params.id,
        this.name=params.Name
      })
    }

  ngOnInit() {
    this.form()
    this.editCategory()
  }

  form(){
    this.editSubadminForm= new FormGroup({
      name:new FormControl('', Validators.required)
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

  editCategoryy()  {
    this.spinner.show();
    let data={
     categoryId:this.id,
     categoryName:this.editSubadminForm.value.name,
     image : this.imageUrl
    }
     this.service.postApii('admin/editCategory', data,  1).subscribe(success => {
      console.log("success",success);
      if(success.response_code == 200) {
        // this.service.success(success.response_message)
        this.editData = success.result[0]
        this.categoryName=success.result[0].categoryName
        this.router.navigate(['/category-management'])
      //  console.log("sdfgasd",this.editData)
      this.editSubadminForm.patchValue({
        name:this.categoryName
      })
      this.spinner.hide();
      }
      else {
        this.service.error('something went wrong')
        this.spinner.hide();
      }
    })
  }

 editCategory(){
   this.spinner.show();
   let data={
    categoryId:this.id,
    categoryName:this.editSubadminForm.value.name
   }
   this.service.postApii('admin/editCategory', data,  1).subscribe(success => {
    console.log("success",success);
    if(success.response_code == 200) {
      // this.service.success(success.response_message)
      this.editData = success.result[0]
      this.categoryName=success.result[0].categoryName
     
    //  console.log("sdfgasd",this.editData)
    this.editSubadminForm.patchValue({
      name:this.categoryName
    })
    // this.router.navigate(['/category-management'])
    this.spinner.hide();
    }
    else {
      this.service.error('something went wrong');
      this.spinner.hide();
    }
  })
 }



}
