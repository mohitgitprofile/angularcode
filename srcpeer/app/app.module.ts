import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SubadminComponent } from './subadmin/subadmin.component';
import { HeaderComponent } from './header/header.component';
import { StaticContentManagementComponent } from './static-content-management/static-content-management.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StaticContentEditComponent } from './static-content-edit/static-content-edit.component';
import { validationMessage } from './validationMessage';
import { forms } from './forms';
import { FaqComponent } from './faq/faq.component';
import { AddSubAdminComponent } from './add-sub-admin/add-sub-admin.component';
import { apiurls } from './apiUrls';
import { ViewStaticContentComponent } from './view-static-content/view-static-content.component';
import { AmplifyService } from 'aws-amplify-angular';
import { ViewSubAdminProfileComponent } from './view-sub-admin-profile/view-sub-admin-profile.component';
import { EditSubAdminComponent } from './edit-sub-admin/edit-sub-admin.component';
import { FilterUserAttributesPipe } from './pipe/filter-user-attributes.pipe';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NewCmpComponent } from './new-cmp/new-cmp.component';
import { NewUserManagementComponent } from './user-management/new-user-management.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';
import { MasterSetupComponent } from './master-setup/master-setup.component';
import { StorageFeatureComponent } from './storage-feature/storage-feature.component';
import { EditStorageComponent } from './edit-storage/edit-storage.component';
import { AccessiblityOptionComponent } from './accessiblity-option/accessiblity-option.component';
import { BannerManagementComponent } from './banner-management/banner-management.component';
import { BlogManagementComponent } from './blog-management/blog-management.component';
import { storingPlanComponent } from './storing/storing.component';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { PriceCityStorageComponent } from './price-city-storage/price-city-storage.component';
import { AddStorageComponent } from './add-storage/add-storage.component';
import { AddStoragefeaturesComponent } from './add-storagefeatures/add-storagefeatures.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AddAccessiblityComponent } from './add-accessiblity/add-accessiblity.component';
import { PercentageMaskDirective } from './percentage-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SecurityQuestionComponent,
    DashboardComponent,
    ResetPasswordComponent,
    SubadminComponent,
    HeaderComponent,
    StaticContentManagementComponent,
    PageNotFoundComponent,
    StaticContentEditComponent,
    FaqComponent,
    AddSubAdminComponent,
    ViewStaticContentComponent,
    ViewSubAdminProfileComponent,
    EditSubAdminComponent,
    FilterUserAttributesPipe,
    ChangePasswordComponent,
    NewCmpComponent,
    NewUserManagementComponent,
    ViewUserProfileComponent,
    MasterSetupComponent,
    StorageFeatureComponent,
    EditStorageComponent,
    AccessiblityOptionComponent,
    BannerManagementComponent,
    BlogManagementComponent,
    storingPlanComponent,
    FeeManagementComponent,
    PriceCityStorageComponent,
    AddStorageComponent,
    AddStoragefeaturesComponent,
    AddBannerComponent,
    AddBlogComponent,
    AddAccessiblityComponent,
    PercentageMaskDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [
    validationMessage,
    forms,
    apiurls,
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
