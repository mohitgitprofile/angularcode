import { NgModule } from '@angular/core';
import { LetterCasePipe } from '../pipes/letterCase.pipe';
import { SafePipe } from '../pipes/safe.pipe';
import { LimitToPipe } from '../pipes/limitTo.pipe';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { OnlyNumberDirective } from '../directives/only-number.directive';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow';

// import { TermsConditionComponent } from  '../pages/landing/terms-condition/terms-condition.component'
import { HeaderComponent } from '../pages/landing/header/header.component';
import { FooterComponent } from  '../pages/landing/footer/footer.component'
import { RouterModule } from '../../../node_modules/@angular/router';
import { TermsConditionComponent } from '../pages/landing/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from '../pages/landing/privacy-policy/privacy-policy.component';



@NgModule({
    declarations: [
        LetterCasePipe,
        SafePipe,
        LimitToPipe,
        OnlyNumberDirective,
        FooterComponent,
        HeaderComponent,
        TermsConditionComponent,
        PrivacyPolicyComponent,
    ],
    imports: [
        NgxMyDatePickerModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
        NgxPaginationModule,
        Ng4GeoautocompleteModule,
        CommonModule,
        RouterModule,
        SlideshowModule
    ],
    exports: [
        LetterCasePipe,
        SafePipe,
        LimitToPipe,
        NgxMyDatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule,
        NgxPaginationModule,
        OnlyNumberDirective,
        Ng4GeoautocompleteModule,
        FooterComponent,
        HeaderComponent,
        CommonModule,
        TermsConditionComponent,
        PrivacyPolicyComponent,
        SlideshowModule
    ]
})

export class SharedModule {
    constructor() {}
}