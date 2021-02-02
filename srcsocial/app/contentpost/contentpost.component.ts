import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
declare var $: any;
@Component({
  selector: 'app-contentpost',
  templateUrl: './contentpost.component.html',
  styleUrls: ['./contentpost.component.css']
})
export class ContentpostComponent implements OnInit {
  searchForm: FormGroup;
  pagination: any = { limit: 10, currPage: 1, total: 0 };
  categoryList: any = [];
  search: any;
  whichmodal: string;
  particularUserData: any;

  constructor(
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit() {
    this.listOfCategory();
    this.form();
  }
  form() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  reset() {
    this.searchForm.reset();
    this.listOfCategory();
  }

  goToEdit(id) {
    console.log("hjfghjfjhfjh",id);
    
    this.router.navigate(['/editcontentpost'], { queryParams: { id: id} })
    // this.router.navigate(['/editcontentpost'], { queryParams: { id: id, Name: name } })
  }

  goToView(id) {
    console.log("hjfghjfjhfjh",id);

    this.router.navigate(['/viewcontentpost'], { queryParams: { id: id} })
  }

  listOfCategory() {
    this.spinner.show();
    let data = {

    }
    this.service.postApii('admin/listOfContent', data, 1).subscribe(success => {
      console.log("success", success);
      if (success.response_code == 200) {
        // this.service.success(success.response_message)
        this.categoryList = success.result[0].docs;
        this.spinner.hide();
        console.log("sdfgasd", this.categoryList)
      }
      else {
        this.service.error('something went wrong');
        this.spinner.hide();
      }
    })

  }

  searchData(value) {
    this.search = value;
    console.log("hgfhgf", this.search);

    this.searchByName()
  }
  searchByName() {
    // this.spinner.show()
    this.service.postApii('admin/listOfContent', { search: this.search }, 1).subscribe((success) => {
      console.log("success");

      if (success.response_code == 200) {
        // this.service.success(success.response_message);
        this.categoryList = success.result[0].docs;
        this.spinner.hide()
      }
      else {
        // this.service.error(success.response_message)
        this.categoryList = [];
        this.categoryList = success.result[0].docs;
      }
    })
  }

  goTOAddCategory() {
    this.router.navigate(['/addcontentpost'])
  }


  enableDisableOrDeleteOpenModal (data, whichModal) {
    console.log("Data >>>>> ",data)
    if (whichModal === 'enable') {
      this.whichmodal = 'enable';
    } else {
      if (whichModal === 'disable') {
        this.whichmodal = 'disable';
      } else {
        this.whichmodal = 'delete';
      }
    }
    this.particularUserData = data;
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }

  anableDisable(enableorDisable) {
    if (enableorDisable === 'disable') {
      console.log("Inside Disable Block")
      this.disableCategory(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.listOfCategory();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableCategory(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.listOfCategory();
      } else {
        console.log("Inside Delete Block")
        this.deleteCategory(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.listOfCategory();
      }
    }
    // this.getUserList();
  }

  disableCategory(data) {
    // let dataa={
    //   categoryId:data,
    //   status: 'BLOCK'
    // }
    // this.spinner.show();
    // this.service.postApii('admin/deleteAndBlockCategory', dataa,  1).subscribe(success => {
    //   if(success.response_code == 200) {
    //     this.service.success("Successfully deactivated.")
    //     this.spinner.hide();
    //   }
    //   else {
    //     this.spinner.hide();
    //   }
    // })
  }
  enableCategory(data) {
    // let dataa={
    //   categoryId:data,
    //   status: 'ACTIVE'
    // }
    // this.spinner.show();
    // this.service.postApii('admin/deleteAndBlockCategory', dataa,  1).subscribe(success => {
    //   if(success.response_code == 200) {
    //     this.service.success("Successfully activated.")
    //     this.spinner.hide();
    //   }
    //   else {
    //     this.spinner.hide();
    //   }
    // })
  }

  // disableCategory(data) {
  //   this.spinner.show();
  //   this.service.postApii('admin/deleteAndBlockCategory', {categoryId:data._id},  1).subscribe(success => {
  //     if(success.response_code == 200) {
  //       // this.service.success(success.response_message)
  //       this.spinner.hide();
  //     }
  //     else {
  //       this.spinner.hide();
  //     }
  //   })
  // }
  // enableCategory(data) {
  //   this.spinner.show();
  //   this.service.postApii('admin/deleteAndBlockCategory', {categoryId:data._id},  1).subscribe(success => {
  //     if(success.response_code == 200) {
  //       // this.service.success(success.response_message)
  //       this.spinner.hide();
  //     }
  //     else {
  //       this.spinner.hide();
  //     }
  //   })
  // }
  deleteCategory(data) {
    this.spinner.show();
    console.log("hgdghdgh",this.particularUserData)
    this.service.postApii('admin/deleteContent', {contentId:this.particularUserData},  1).subscribe(success => {
      if(success.response_code == 200) {
        // this.service.success("Successfully deleted.");
        this.spinner.hide();
        $('#enableDisableDeleteModal').modal('hide');
        this.listOfCategory()
      }
      else {
        this.spinner.hide();
      }
    })
  }



}
