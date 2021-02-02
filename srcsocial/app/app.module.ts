import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import {NgxPaginationModule} from 'ngx-pagination';
// import { CKEditorModule } from 'ngx-ckeditor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// import { SelectDropDownModule } from 'ngx-select-dropdown';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FilterDataPipe } from './filter-data.pipe';
import { UserManagementComponent } from './user-management/user-management.component';
import { ViewAdminprofileComponent } from './view-adminprofile/view-adminprofile.component';
// import { EditSubAdminComponent } from './edit-sub-admin/edit-sub-admin.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SettingComponent } from './setting/setting.component';
import { StaticContentManagementComponent } from './static-content-management/static-content-management.component';
import { EditStaticContentComponent } from './edit-static-content/edit-static-content.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewStaticContentComponent } from './view-static-content/view-static-content.component';
import { HttpModifierInterceptor } from './service.service';
import { SidebarDemoComponent } from './sidebar-demo/sidebar-demo.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';
import { ReportManagementComponent } from './report-management/report-management.component';
import { CommunityManagementComponent } from './community-management/community-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
// import { AddCategoryComponent } from './add-category/add-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { ViewReportComponent } from './view-report/view-report.component';
// import { AboutUsComponent } from './about-us/about-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ViewcommunityComponent } from './viewcommunity/viewcommunity.component';
import { EditcommunityComponent } from './editcommunity/editcommunity.component';
import { AddcommunityComponent } from './addcommunity/addcommunity.component';
import { EventmanagementComponent } from './eventmanagement/eventmanagement.component';
import { AddeventComponent } from './addevent/addevent.component';
import { VieweventComponent } from './viewevent/viewevent.component';
import { EditeventComponent } from './editevent/editevent.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditAboutUsComponent } from './edit-about-us/edit-about-us.component';
import { GenralSettingManagementComponent } from './genral-setting-management/genral-setting-management.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ViewAboutUsComponent } from './view-about-us/view-about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AddFaqsComponent } from './add-faqs/add-faqs.component';
import { EditFaqsComponent } from './edit-faqs/edit-faqs.component';
import { EditAdminprofileComponent } from './edit-adminprofile/edit-adminprofile.component';
import { ContentpostComponent } from './contentpost/contentpost.component';
import { AddcontentpostComponent } from './addcontentpost/addcontentpost.component';
import { EditcontentpostComponent } from './editcontentpost/editcontentpost.component';
import { ViewcontentpostComponent } from './viewcontentpost/viewcontentpost.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { ViewSubadminComponent } from './view-subadmin/view-subadmin.component';
import { EditSubadminComponent } from './edit-subadmin/edit-subadmin.component';
import { AddSubadminComponent } from './add-subadmin/add-subadmin.component';
import { RewardManagementComponent } from './reward-management/reward-management.component';
import { GoalsManagementComponent } from './goals-management/goals-management.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NewprivacyComponent } from './newprivacy/newprivacy.component';
import { NewtermsComponent } from './newterms/newterms.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    SidebarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FilterDataPipe,
    UserManagementComponent,
    ViewAdminprofileComponent,
    // EditSubAdminComponent,
    SettingComponent,
    StaticContentManagementComponent,
    EditStaticContentComponent,
    PageNotFoundComponent,
    ViewStaticContentComponent,
    SidebarDemoComponent,
    MainFooterComponent,
    CategoryManagementComponent,
    TransactionManagementComponent,
    ReportManagementComponent,
    CommunityManagementComponent,
    EventManagementComponent,
    // AddCategoryComponent,
    ViewCategoryComponent,
    EditCategoryComponent,
    ViewTransactionComponent,
    ViewReportComponent,
    // AboutUsComponent,
    DashboardComponent,
    ViewuserComponent,
    EdituserComponent,
    AdduserComponent,
    ViewcommunityComponent,
    EditcommunityComponent,
    AddcommunityComponent,
    EventmanagementComponent,
    AddeventComponent,
    VieweventComponent,
    EditeventComponent,
    AboutUsComponent,
    AddCategoryComponent,
    EditAboutUsComponent,
    GenralSettingManagementComponent,
    PrivacyPolicyComponent,
    ViewAboutUsComponent,
    FaqsComponent,
    AddFaqsComponent,
    EditFaqsComponent,
    EditAdminprofileComponent,
    ContentpostComponent,
    AddcontentpostComponent,
    EditcontentpostComponent,
    ViewcontentpostComponent,
    SubAdminComponent,
    ViewSubadminComponent,
    EditSubadminComponent,
    AddSubadminComponent,
    RewardManagementComponent,
    GoalsManagementComponent,
    NewprivacyComponent,
    NewtermsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    // CKEditorModule,
    NgOtpInputModule,
    SelectDropDownModule,
    // SelectDropDownModule
    // MyDatePickerModule
  ],
  providers: [
    AmplifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpModifierInterceptor,
      multi: true
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
