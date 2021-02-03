import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public router: Router) {
    window.scrollTo(0, 0);
   }

  ngOnInit() {
  }

  goBack() {
    if (localStorage.getItem('email') == null) {
      console.log('hello');
      this.router.navigate(['/']);
    } else {
      console.log('hii');
      this.router.navigate(['/header/dashboard']);
    }
  }

}
