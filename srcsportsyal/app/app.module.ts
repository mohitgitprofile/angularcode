import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FacebookModule } from 'ngx-facebook';
import {RatingModule} from "ngx-rating";

// import {SlideshowModule} from 'ng-simple-slideshow';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { routes } from './app.routing';
import { AppComponent } from './app.component';


// Service Import
import { MainService } from './providers/mainService.service';
import { CanActiveLandingRouteGuard } from  './providers/can-active-landing-route.guard';
import { CanActiveOrganizerRouteGuard } from  './providers/can-active-organizer-route.guard';
// Interceptor Import
import { MainInterceptor } from './interceptors/main.interceptor';
import { CanActivePlayerRouteGuard } from './providers/can-active-player-route.guard';
// import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
// import { SliceUpTo4Pipe } from './pipes/slice-up-to4.pipe';
// import { SlicePipePipe } from './pipes/slice.pipe';

// /Users/anshulkumarverma/Desktop/yala/yala main/src/app/pipes/slice-up-to4.pipe.ts

// Pipe Import
// import { LetterCasePipe } from './pipes/letterCase.pipe';
import { DigitOnlyModule } from '@uiowa/digit-only';
// import { DomainComponent } from './app/pages/organizer/media/domain/domain.component';


@NgModule({
  declarations: [
    AppComponent,
    // DomainComponent,
    // SliceUpTo4Pipe,
    // SlicePipePipe
    // SlicePipe,
    // LetterCasePipe,
    // HeaderComponent,
    // FooterComponent
  

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    RatingModule,
    FacebookModule.forRoot(),
    OwlDateTimeModule, OwlNativeDateTimeModule,
    DigitOnlyModule
   
  ],
  providers: [
    MainService,
    CanActiveLandingRouteGuard,
    CanActiveOrganizerRouteGuard,
    CanActivePlayerRouteGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [ ]
})
export class AppModule { }
