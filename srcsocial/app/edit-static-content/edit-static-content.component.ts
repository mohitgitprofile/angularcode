import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-static-content',
  templateUrl: './edit-static-content.component.html',
  styleUrls: ['./edit-static-content.component.css']
})
export class EditStaticContentComponent implements OnInit {

  editstaticContentForm: FormGroup;
  paramData: any;
  editUrl: any;
  apireq: any;
  permission: any = [];
  data: any;
  staticId: any;
  title: any;
  description: any;
  Title: any;
  Description: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private service: ServiceService,
    private router: Router
  ) {
    // this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : []) : [];
    // if (!this.permission.includes('editStaticContent')) {
    //   this.router.navigate(['/pageNotFound']);
    // }

      // this.activatedRoute.queryParams.subscribe(success => {
        this.activatedRoute.queryParams.subscribe((params)=>{
      this.data = JSON.parse(params.value)
      this.staticId = this.data._id;
      this.title = this.data.title;
      this.description = this.data.description;
      console.log("8888",this.title);
    })
   
  }

  ngOnInit() {
    this.form();
    this.editStatic()
    // this.getParamData();
  }

  form() {
    this.editstaticContentForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  // getParamData() {
  //   let editUrl = 'static/editStaticPage';
  //   this.editStatic(editUrl);
  // }
  editStatic() {
    if(this.title=='faqs'){
      this.router.navigate(['/faqs'])
    }
    else{
    let apireq = {
      staticId: this.staticId,
      title: this.title,
      description: this.description
    }
    console.log("gm",apireq);
    
    this.spinner.show();
    this.service.postApii('static/editStaticPage', apireq, 1).subscribe((success: any) => {
      console.log("ffgfg", success);

      if (success.response_code == 200) {
        this.data = success.result;
        this.Title=success.result.title,
        this.Description=success.result.description
        // this.service.success(success.response_message)
        this.editstaticContentForm.patchValue({
          title:this.Title,
          description:this.Description
        })
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();

    });
  }
  }

  updateStatic(){
    let apireq = {
      staticId: this.staticId,
      title: this.editstaticContentForm.value.title,
      description: this.editstaticContentForm.value.description
    }
    console.log("gm",apireq);
    
    this.spinner.show();
    this.service.postApii('static/editStaticPage', apireq, 1).subscribe((success: any) => {
      console.log("ffgfg", success);

      if (success.response_code == 200) {
        this.data = success.result;
        this.router.navigate(['/static-content-management'])
        // this.Title=success.result.title,
        // this.Description=success.result.description
        // this.service.success(success.response_message)
        // this.editstaticContentForm.patchValue({
        //   title:this.Title,
        //   description:this.Description
        // })
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();

    });
  }


  // getData(url) {
  //   const apireq = {
  //     id: 1
  //   };
  //   this.spinner.show();
  //   this.service.postApi(url, apireq).subscribe((success: any) => {
  //     if (success.statusCode === 200) {
  //       this.editstaticContentForm.patchValue({
  //         title: this.paramData.type,
  //         description: success.body[0].content
  //       });
  //     }
  //     this.spinner.hide();
  //   }, error => {
  //     this.spinner.hide();
  //   });
  // }

  // edit() {
  //   if (this.editstaticContentForm.invalid) {
  //     return;
  //   }
  //   this.spinner.show();
  //   if (this.paramData.type === 'Privacy Policy') {
  //     this.apireq = {
  //       p_id: 1,
  //       'content-type': this.editstaticContentForm.value.description
  //     };
  //   } else {
  //     if (this.paramData.type === 'Contact Us') {
  //       this.apireq = {
  //         c_id: 1,
  //         'content-type': this.editstaticContentForm.value.description
  //       };
  //     } else {
  //       if (this.paramData.type === 'Term & Condition') {
  //         this.apireq = {
  //           t_id: 1,
  //           'content-type': this.editstaticContentForm.value.description
  //         };
  //       } else {
  //         if (this.paramData.type === 'About Us') {
  //           this.apireq = {
  //             a_id: 1,
  //             'content-type': this.editstaticContentForm.value.description
  //           };
  //         }
  //       }
  //     }
  //   }
  //   this.service.postApi(this.editUrl, this.apireq).subscribe((success: any) => {
  //     const res = success.body ? JSON.parse(success.body) : {};
  //     if (res.statusCode === 200) {
  //       this.router.navigate(['/static-content-management']);
  //       this.service.success(res.message);
  //     } else {
  //       this.service.error(res.message);
  //     }
  //     this.spinner.hide();
  //   }, error => {
  //     this.service.error('Oops ! Something went wrong please try again.');
  //     this.spinner.hide();
  //   });
  // }

}
