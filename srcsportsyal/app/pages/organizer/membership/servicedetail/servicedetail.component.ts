import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainInterceptor } from '../../../../interceptors/main.interceptor';
import { MainService } from '../../../../providers/mainService.service';

@Component({
  selector: 'app-servicedetail',
  templateUrl: './servicedetail.component.html',
  styleUrls: ['./servicedetail.component.css']
})
export class ServicedetailComponent implements OnInit {
  serviceid: any;
  userid: any;
  serviceDetail: any={};

  constructor(public route: ActivatedRoute,public service:MainService) { }

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('userDetailYala') );
    console.log("User Id--> ",this.userid._id);
    this.route.params.subscribe(params => {
     this.serviceid = params['id'];
     this.getServiceDetail();
        });
    console.log("ServiceId---> ",this.serviceid);
  }
/******************* Service Detail Api ***************/
getServiceDetail(){
  var url = `membership/getAService?organizerId=`+this.userid._id+`&serviceId=`+this.serviceid;
  this.service.getApi(url,1).subscribe(response => {
    console.log(JSON.stringify(response));
   if(response.responseCode == 200) {
     this.serviceDetail = response.result;
     console.log("Service Detail--> ",this.serviceDetail);
   } else if(response.responseCode == 402) {
     
   }
 });
}
}
