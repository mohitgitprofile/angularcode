import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
declare var $:any
@Component({
  selector: 'app-fiat-management',
  templateUrl: './fiat-management.component.html',
  styleUrls: ['./fiat-management.component.css']
})
export class FiatManagementComponent implements OnInit {
  tab: any;
  pageNumber:number = 1
  basicTradingList: any=[];
  basicTradingDetail: any={};
  constructor( private router : Router, public route : ActivatedRoute, public service:ServiceService) { }

  ngOnInit() {
  }

 
}
