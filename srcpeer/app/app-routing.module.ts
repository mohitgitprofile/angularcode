import { StaticContentEditComponent } from './static-content-edit/static-content-edit.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { HeaderComponent } from './header/header.component';
import { SubadminComponent } from './subadmin/subadmin.component';
import { StaticContentManagementComponent } from './static-content-management/static-content-management.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FaqComponent } from './faq/faq.component';
import { AddSubAdminComponent } from './add-sub-admin/add-sub-admin.component';
import { AuthGuard } from './auth.guard';
import { AdminLoginGuard } from './admin-login.guard';
import { ViewStaticContentComponent } from './view-static-content/view-static-content.component';
import { ViewSubAdminProfileComponent } from './view-sub-admin-profile/view-sub-admin-profile.component';
import { EditSubAdminComponent } from './edit-sub-admin/edit-sub-admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NewUserManagementComponent } from './user-management/new-user-management.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';
import { MasterSetupComponent } from './master-setup/master-setup.component';
import { StorageFeatureComponent } from './storage-feature/storage-feature.component';
import { AccessiblityOptionComponent } from './accessiblity-option/accessiblity-option.component';
import { BannerManagementComponent } from './banner-management/banner-management.component';
import { BlockingProxy } from 'blocking-proxy';
import { BlogManagementComponent } from './blog-management/blog-management.component';
import { storingPlanComponent } from './storing/storing.component';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { PriceCityStorageComponent } from './price-city-storage/price-city-storage.component';
import { AddStorageComponent } from './add-storage/add-storage.component';
import { AddStoragefeaturesComponent } from './add-storagefeatures/add-storagefeatures.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AddAccessiblityComponent } from './add-accessiblity/add-accessiblity.component';

const routes: Routes = [
  { path : '' , component : LoginComponent },
  { path : 'forgotPassword' , component : ForgotPasswordComponent },
  { path : 'securityQuestion/:email' , component : SecurityQuestionComponent, canActivate: [AdminLoginGuard] },
  { path : 'dashboard' , component : DashboardComponent },
  { path : 'resetPassword/:email' , component : ResetPasswordComponent },
  { path : 'header' , component : HeaderComponent ,
    children : [
      { path : 'dashboard' , component : DashboardComponent, canActivate: [AuthGuard] },
      { path : 'subadmin' , component : SubadminComponent, canActivate: [AuthGuard] },
      { path : 'editSubadmin/:id' , component : EditSubAdminComponent, canActivate: [AuthGuard] },
      { path  : 'master-setup',component:MasterSetupComponent,canActivate:[AuthGuard]},
      { path  : 'add-storage',component: AddStorageComponent,canActivate:[AuthGuard]},
      { path  : 'add-storagefeatures',component: AddStoragefeaturesComponent,canActivate:[AuthGuard]},
      { path : 'staticContentManagement' , component : StaticContentManagementComponent, canActivate: [AuthGuard] },
      { path : 'editStaticContent/:contentType' , component : StaticContentEditComponent, canActivate: [AuthGuard] },
      { path : 'faq' , component : FaqComponent, canActivate: [AuthGuard]},
      { path : 'addSubAdmin' , component : AddSubAdminComponent, canActivate: [AuthGuard] },
      { path : 'viewSubAdmin/:data' , component : ViewSubAdminProfileComponent, canActivate: [AuthGuard] },
      { path : 'viewUserData/:data' , component : ViewUserProfileComponent, canActivate: [AuthGuard] },
      { path : 'viewStaticContent/:contentId' , component : ViewStaticContentComponent, canActivate: [AuthGuard] },
      // { path : 'changePassword/:userName' , component : ChangePasswordComponent, canActivate: [AuthGuard] },
      { path : 'changePassword' , component : ChangePasswordComponent, canActivate: [AuthGuard] },
      { path : 'userManagement', component : NewUserManagementComponent, canActivate:[AuthGuard]},
      {path  : 'storage-feature',component:StorageFeatureComponent,canActivate:[AuthGuard]},
      {path  : 'accessiblity-option',component:AccessiblityOptionComponent,canActivate:[AuthGuard]},
      {path  : 'banner-management',component:BannerManagementComponent,canActivate:[AuthGuard]},
      {path  : 'blog-management',component:BlogManagementComponent,canActivate:[AuthGuard]},
      {path  : 'storing',component:storingPlanComponent,canActivate:[AuthGuard]},
      {path  : 'fee-management',component:FeeManagementComponent,canActivate:[AuthGuard]},
      {path  : 'price-city-storage',component:PriceCityStorageComponent,canActivate:[AuthGuard]},
      {path  : 'add-banner',component:AddBannerComponent,canActivate:[AuthGuard]},
      {path  : 'add-blog',component:AddBlogComponent,canActivate:[AuthGuard]},
      {path  : 'add-accessiblity',component:AddAccessiblityComponent,canActivate:[AuthGuard]}
  ]},
  { path : 'pageNotFound' , component : PageNotFoundComponent },
  { path : '**' , component : PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
