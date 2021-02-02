import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-genral-setting-management',
  templateUrl: './genral-setting-management.component.html',
  styleUrls: ['./genral-setting-management.component.css']
})
export class GenralSettingManagementComponent implements OnInit {
  resetForm :FormGroup;
  constructor() { }

  ngOnInit() {
    this.resetFormValidation()
  }
  

  resetFormValidation(){
    this.resetForm = new  FormGroup({
      old :new FormControl('',[Validators.required]),
      new: new FormControl('',[Validators.required,Validators.pattern(/^(?=^.{8,16}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?!.*\s).*$/)]),
      confirm: new FormControl('',[Validators.required]),
    }, passwordMatchValidator);

    /** Function to validate password and confirm password */

    function passwordMatchValidator(g:FormGroup){
      let pass=g.get('new').value;
      let cpass=g.get('confirm').value
      if(pass!=cpass){
        g.get('confirm').setErrors({mismatch:true});
      }
      else{
        g.get('confirm').setErrors(null)
        return null
      }
    }
    
  }

}
