import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  faqList: any = [];
  whichmodal: string;
  particularUserData: any;

  constructor(public router: Router, public service: ServiceService, public spinner: NgxSpinnerService) { }

  ngOnInit() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
    this.listOfFaqs();
  }
  toggle(index) {
    $('#aa' + index).toggle(500);
  }

  listOfFaqs() {
    console.log("fgh", 3313212420);

    let data = {}

    // this.spinner.show();
    this.service.postApii('faq/faqList', data, 1).subscribe((success) => {
      console.log("fg", success);

      if (success.response_code == 200) {
        this.faqList = success.result.docs
      }
    })
  }
  goToEditfaqs(id) {
    this.router.navigate(['/edit-faqs'], { queryParams: { id: id } })

  }
  deletefaqs(id) {
    // let data = {
    //   faqId: id,
    // }
    this.service.deleteApi('faq/deleteFaq',{faqId:id},1).subscribe((success)=>{
      console.log("success",success);
      this.listOfFaqs();
    })
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
      this.disableSubadmin(this.particularUserData);
      $('#enableDisableDeleteModal').modal('hide');
      this.listOfFaqs();
    } else {
      if (enableorDisable === 'enable') {
        console.log("Inside Enable Block")
        this.enableSubadmin(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.listOfFaqs();
      } else {
        console.log("Inside Delete Block")
        this.deletefaqs(this.particularUserData);
        $('#enableDisableDeleteModal').modal('hide');
        this.listOfFaqs();
      }
    }
  }

  disableSubadmin(data) {
    console.log("disableSubadmin",data);
    
    let dataa ={
      userId:data,
      status: 'BLOCK'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteEvent', dataa,  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully blocked.")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  enableSubadmin(data) {
    console.log("enableSubadmin",data);
    let dataa ={
      userId:data,
      status: 'ACTIVE'
    }
    this.spinner.show();
    this.service.postApii('admin/deleteEvent', dataa,  1).subscribe(success => {
      if(success.response_code == 200) {
        this.service.success("Successfully activated.")
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    })
  }
  // deletefaqs(data) {
  //   this.spinner.show();
  //   this.service.postApii('admin/deleteEvent', {eventId:data._id},  1).subscribe(success => {
  //     if(success.response_code == 200) {
  //       // this.service.success(success.response_message)
  //       this.spinner.hide();
  //     }
  //     else {
  //       this.spinner.hide();
  //     }
  //   })
  // }

}
