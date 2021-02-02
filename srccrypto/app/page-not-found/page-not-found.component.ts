import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }

  // Back  Function
  back(){
    if(localStorage.data)
    this.route.navigate(['/dashboard'])
    else
    this.route.navigate(['/login'])
  }

}
