import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
declare var $ : any;
@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  userKycId: any;
  kycData: any={};
  kycDocList: any=[];
  rejectionReason:string='';
  documentId: any;
  username: any;
  userId: any;
  constructor( public routes: ActivatedRoute, public service :ServiceService,private router : Router) { }

  ngOnInit() {
   
  }


  
}
