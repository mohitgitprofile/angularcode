import { Component, OnInit, Router } from '../../../../index';

@Component({
  selector: 'app-menu-comp-conf-header',
  templateUrl: './menu-comp-conf-header.component.html',
  styleUrls: ['./menu-comp-conf-header.component.css']
})
export class MenuCompConfHeaderComponent implements OnInit {
  userManagment: any;

  constructor(private router: Router) { }

  ngOnInit() {
    var subscriptionAccess = JSON.parse(localStorage.getItem('subscriptionAccess'));
    this.userManagment = (subscriptionAccess.userManagement == true)?true:false;
  }

}
