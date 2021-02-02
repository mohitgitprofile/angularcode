import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, public fb: FormBuilder) {
    console.log('anshul');
    window.addEventListener('offline', function(event){
      console.log('You lost connection.');
  });

  window.addEventListener('online', function(event){
      console.log('You are now back online.');
  });
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  // myForm = this.fb.group({
  //   companies: this.fb.array([])
  // })


}