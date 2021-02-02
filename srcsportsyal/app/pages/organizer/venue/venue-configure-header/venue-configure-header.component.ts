import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, MainService, Router } from '../../../../index';
@Component({
  selector: 'app-venue-configure-header',
  templateUrl: './venue-configure-header.component.html',
  styleUrls: ['./venue-configure-header.component.css']
})
export class VenueConfigureHeaderComponent implements OnInit {
  venueId: any;
  tab: any;
  mainUrl: any = ''
  currUrl = ''
  userDetails: any = {};
  constructor(private router: Router, private route: ActivatedRoute, private service: MainService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(this.service.getStorage('userDetailYala'))
    this.currUrl = this.router.url
    this.route.params.subscribe(async params => {
      this.tab = params['tab']
    })
  }
}
