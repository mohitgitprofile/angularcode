import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SelectRoleComponent } from './select-role/select-role.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { CanActiveLandingRouteGuard } from '../../providers/can-active-landing-route.guard';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    { path: '', redirectTo: 'landingPage', pathMatch: 'full' },
    { path: 'landingPage', component: LandingPageComponent, canActivate: [CanActiveLandingRouteGuard] },
    { path: 'login', component: LoginComponent, canActivate: [CanActiveLandingRouteGuard] },
    { path: 'signup/:type', component: SignupComponent, canActivate: [CanActiveLandingRouteGuard] },
    { path: 'selectRole', component: SelectRoleComponent, canActivate: [CanActiveLandingRouteGuard] },
    { path: 'forgotPassword', component: ForgotPasswordComponent, canActivate: [CanActiveLandingRouteGuard] },
    { path: 'choosePlan', component: ChoosePlanComponent, canActivate: [CanActiveLandingRouteGuard] },
    { path: 'terms', component: TermsConditionComponent },
    { path: 'privacy', component: PrivacyPolicyComponent },
    { path: 'aboutUs', component: AboutUsComponent }
]