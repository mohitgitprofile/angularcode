// Import Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { SharedModule } from './../../shared/shared.module';
// Import Components
import { routes } from './landing.routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { SelectRoleComponent } from './select-role/select-role.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
// import { TermsConditionComponent } from './terms-condition/terms-condition.component';




@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        LandingPageComponent,
        // HeaderComponent,
        // FooterComponent,
        SelectRoleComponent,
        ForgotPasswordComponent,
        ChoosePlanComponent,
        AboutUsComponent,
        // PrivacyPolicyComponent,
        
        // TermsConditionComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule
    ],
    exports: [
        
    ]
})

export class LandingModule {
    

}