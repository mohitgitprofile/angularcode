import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticketId: any;
  ticketDetails: any
  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: ServiceService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      console.log(res);
      if (res.id) {
        this.ticketId = res.id
        this.getTicketDetails()
      }
    })
  }

  getTicketDetails() {
    this.service.showSpinner();
    this.service.get(`static/view-ticket-detail?ticketId=${this.ticketId}`).subscribe((res) => {
      console.log(res);
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.ticketDetails = res['data']
        this.service.toasterSucc(res['message']);
      } else {
        this.service.toasterErr(res['message'])
      }
    }, err => {
      console.log(err);
      this.service.hideSpinner();
      this.service.toasterErr(err['message'])
    })
  }

  back() {
    this.router.navigate(['/ticket-management'])
  }
  
}
