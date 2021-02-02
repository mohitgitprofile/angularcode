import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-create-subadmin',
  templateUrl: './create-subadmin.component.html',
  styleUrls: ['./create-subadmin.component.css']
})
export class CreateSubadminComponent implements OnInit {
  again: any;
  minAge: Date;
  subadminform: FormGroup
  image: any;
  pageArr = [];
  reqPrevilageArr = [];
  countryData: any;
  newArr = []
  constructor(private router : Router, public service:ServiceService) { }

  public pageArry = [
    {
        pageName: 'User Management',
        pageId: 'USER_MANAGEMENT'
       
    } ,
    {
        pageName: 'Static Content',
        pageId: 'STATIC_CONTENT'
    } ,
    {
        pageName: 'Fee Management',
        pageId: 'FEE_MANAGEMENT'
    } ,
    {
        pageName: 'KYC Management',
        pageId: 'KYC_MANAGEMENT'
    } ,
  
    {
        pageName: 'Hot And Cold Management',
        pageId: 'HOT_COLD_LIMIT_MANAGEMENT'
    }

  
]
  ngOnInit() {
    this.subadminvalidation();
    var today = new Date();
    var minAge = 0;
    this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  }




  subadminvalidation() {
    this.subadminform = new FormGroup({
        name: new FormControl('', [Validators.pattern(/^[a-z,.'-]+$/i), Validators.maxLength(40), Validators.required]),
        lastname: new FormControl('', [Validators.pattern(/^[a-z ,.'-]+$/i), Validators.maxLength(40), Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/i)]),
        contact: new FormControl('', [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
        DOB: new FormControl('', []),
        address: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.pattern(/^[a-z ,.'-]+$/i),Validators.required]),
        gender: new FormControl('', [Validators.required]),
        imageUrl: new FormControl(''),
        password: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]),
        confirmPassword: new FormControl('', [])
    }, passwordMatchValidator)

    /** Function for password match and mismatch */
    function passwordMatchValidator(g: FormGroup) {
        let pass = g.get('password').value;
        let confPass = g.get('confirmPassword').value;
        if (pass != confPass) {
            g.get('confirmPassword').setErrors({ mismatch: true });
        } else {
            g.get('confirmPassword').setErrors(null)
            return null
        }
    }
};

get name(): any {
    return this.subadminform.get('name')
}
get lastname(): any {
    return this.subadminform.get('lastname')
    
}
get password(): any {
    return this.subadminform.get('password');
}
get confirmPassword(): any {
    return this.subadminform.get('confirmPassword');
}
get email(): any {
    return this.subadminform.get('email')
}
get contact(): any {
    return this.subadminform.get('contact')
}
get DOB(): any {
    return this.subadminform.get('DOB')
}
get address(): any {
    return this.subadminform.get('address')
}
get country(): any {
    return this.subadminform.get('country')
}

get gender(): any {
    return this.subadminform.get('gender')
}
get imageUrl(): any {
    return this.subadminform.get('imageUrl')
}


fileSelect($event): void {
  var self = this;
  if ($event.target.files && $event.target.files[0]) {
      var fileType = $event.target.files[0].type
      var fileSize = $event.target.files[0].size;
      if (fileSize < 10000000) {
          if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
              this.image = $event.target.files[0]
            
              this.picphoto()
              var reader = new FileReader()
              reader.onload = (e) => {
                  self.subadminform.value.photo = e.target['result']
              }
          } else {
             
              this.image = ''
              this.subadminform.value.photo = '';
              this.service.toasterErr("Please select only jpeg,png,jpg");
          }
      } else {
          this.image = '';
          this.subadminform.value.photo = '';
          this.service.toasterErr("Please select file less than 10 MB.");
          $event.target.value = ''
          return;
      }
  }
}

picphoto() {

  let formData = new FormData();
  formData.append('file', this.image)

  this.service.showSpinner();
  this.service.post('account/upload-file', formData).subscribe((res) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
          this.again = res['data'];
        

      }
      else {
          this.service.toasterErr(res['message']);
          this.service.hideSpinner();
      }

  }, (err) => {
      this.service.hideSpinner();
  })
}

createsubadmin() {
  let data = {
      "address": this.subadminform.value.address,
      "country" : this.subadminform.value.country,
      "email": this.subadminform.value.email,
      "gender": this.subadminform.value.gender,
      "firstName": this.subadminform.value.name,
      "lastName": this.subadminform.value.lastname,
      "phoneNo":  this.subadminform.value.contact,
      "previlage": this.newArr,
      "roleStatus": "SUBADMIN",
      "webUrl": this.service.websiteURL + "reset-password",
      "imageUrl":this.again,
  }
  this.service.showSpinner();
  this.service.post('account/admin/user-management/create-sub-admin', data).subscribe((res) => {
      this.service.hideSpinner();
      if (res['status'] == 200) {
          this.router.navigate(['/sub-admin-management']);
          
          this.service.toasterSucc("An email has been send to sub admin's mail id. ")
          this.service.toasterSucc("Sub Admin Created Successfully");
      }
      if (res['status'] == 205) {
        // this.service.toasterErr(res.message);
        this.service.toasterErr("You don't have permission to create subadmin");
    }
    
  }, (err) => {
      this.service.hideSpinner();

  })
}

 /** Function for checkbox click */
 checkboxClick(id, type) {
  if (type) {
      let ind = this.newArr.findIndex((x) => x == id);
      if (ind == -1) {
          this.newArr.push(id);
          if(id == 'USER_MANAGEMENT'){
           this.newArr.push('WALLET_MANAGEMENT');
           this.newArr.push('TRADE_MANAGEMENT');
          }
      }
  }
  else {
      let ind = this.newArr.findIndex((x) => x == id);
      if (ind != -1) {
          this.newArr.splice(ind, 1);
          if(id == 'USER_MANAGEMENT'){
              let i  = this.newArr.findIndex((x) => x == 'WALLET_MANAGEMENT');
              let j =  this.newArr.findIndex((x) => x == 'TRADE_MANAGEMENT');
              this.newArr.splice(i, 1);
              this.newArr.splice(j-1, 1);
             
          }
         
      }
  }
 
}

preventSpace(event) {
    if (event.charCode == 32 && !event.target.value) {
    event.preventDefault()
    } else {
    }
    }
}
