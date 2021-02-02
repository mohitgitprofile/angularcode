import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
  }
  moveScroll() {
    // var top_offset=$(".lets_move_section").offset().top;
	  // var header_height=$("header").outerHeight();
    // var setlandingOffset=top_offset-header_height;
    // console.log(setlandingOffset)
    $("html, body").animate({ scrollTop: 632}, 600);
    // window.scrollTo(0, 632)
  }

}
