import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-data-activity-log',
    templateUrl: './data-activity-log.component.html',
    styleUrls: ['./data-activity-log.component.css']
})
export class DataActivityLogComponent implements OnInit {
    loginTypeArr: any=[];
   

    constructor() {
        window.scrollTo(0, 0)
    }

    ngOnInit() {
        this.loginTypeArr = localStorage.getItem('LoginWith').split(',');  
    }

}
