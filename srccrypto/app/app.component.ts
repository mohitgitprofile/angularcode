import { Component } from '@angular/core';
import { ServiceService } from './service.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bittradeAdminPanel';
constructor(public service: ServiceService){}
  ngOnInit() {
  //   $(".btn-toggle,.close_panel").click(function() {
  //     $("body").toggleClass("toggle-wrapper");
  // });
  this.service.initSocketSupportChat()
  }
  
}
