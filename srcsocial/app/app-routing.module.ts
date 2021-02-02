import { ViewStaticContentComponent } from './view-static-content/view-static-content.component';
import { SettingComponent } from './setting/setting.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ViewAdminprofileComponent } from './view-adminprofile/view-adminprofile.component';
// import { EditSubAdminComponent } from './edit-sub-admin/edit-sub-admin.component';
import { AuthGuard } from './auth.guard';
import { StaticContentManagementComponent } from './static-content-management/static-content-management.component';
import { EditStaticContentComponent } from './edit-static-content/edit-static-content.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ViewcommunityComponent } from './viewcommunity/viewcommunity.component';
import { EditcommunityComponent } from './editcommunity/editcommunity.component';
import { AddcommunityComponent } from './addcommunity/addcommunity.component';
import { AddeventComponent } from './addevent/addevent.component';
import { VieweventComponent } from './viewevent/viewevent.component';
import { EditeventComponent } from './editevent/editevent.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditAboutUsComponent } from './edit-about-us/edit-about-us.component';
import { ViewAboutUsComponent } from './view-about-us/view-about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AddFaqsComponent } from './add-faqs/add-faqs.component';
import { EditFaqsComponent } from './edit-faqs/edit-faqs.component';
import { EditAdminprofileComponent } from './edit-adminprofile/edit-adminprofile.component';
import { ContentpostComponent } from './contentpost/contentpost.component';
import { AddcontentpostComponent } from './addcontentpost/addcontentpost.component';
import { ViewcontentpostComponent } from './viewcontentpost/viewcontentpost.component';
import { EditcontentpostComponent } from './editcontentpost/editcontentpost.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { AddSubadminComponent } from './add-subadmin/add-subadmin.component';
import { ViewSubadminComponent } from './view-subadmin/view-subadmin.component';
import { EditSubadminComponent } from './edit-subadmin/edit-subadmin.component';
import { RewardManagementComponent } from './reward-management/reward-management.component';
import { GoalsManagementComponent } from './goals-management/goals-management.component';
import { NewprivacyComponent } from './newprivacy/newprivacy.component';
import { NewtermsComponent } from './newterms/newterms.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component:LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'user-management', component: UserManagementComponent},
  { path: 'view-adminprofile', component: ViewAdminprofileComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'static-content-management', component: StaticContentManagementComponent },
  { path: 'edit-static-content', component: EditStaticContentComponent },
  { path: 'view-static-content/:title/:id', component: ViewStaticContentComponent },
  { path: 'pageNotFound', component: PageNotFoundComponent},
  { path: 'category-management', component:CategoryManagementComponent},
  { path: 'transaction-management', component:TransactionManagementComponent},
  { path: 'report-management', component:ReportManagementComponent},
  { path: 'community-management', component:CommunityManagementComponent},
  { path: 'event-management', component:EventManagementComponent},
  { path: 'add-category', component:AddCategoryComponent},
  { path: 'view-category',component:ViewCategoryComponent},
  { path: 'edit-category', component:EditCategoryComponent},
  { path: 'view-transaction', component:ViewTransactionComponent},
  { path: 'view-report', component:ViewReportComponent},
  { path: 'dashboard', component:DashboardComponent },
  { path: 'viewuser/:id', component:ViewuserComponent },
  { path: 'edituser/:id', component:EdituserComponent },
  { path: 'adduser', component:AdduserComponent },
  { path: 'community', component:CommunityManagementComponent },
  { path: 'viewcommunity/:id', component:ViewcommunityComponent},
  { path: 'editcommunity/:id', component:EditcommunityComponent },
  { path: 'addcommunity', component:AddcommunityComponent },
  { path: 'eventmanagement', component:EventManagementComponent },
  { path: 'viewevent/:id', component:VieweventComponent },
  { path: 'addevent', component:AddeventComponent },
  { path: 'editevent/:id', component:EditeventComponent },
  { path: 'edit-about', component:EditAboutUsComponent},
  { path: 'view-about', component:ViewAboutUsComponent},
  { path: 'faqs', component:FaqsComponent},
  { path: 'add-faqs', component:AddFaqsComponent},
  { path: 'edit-faqs', component:EditFaqsComponent},
  { path: 'edit-profile', component:EditAdminprofileComponent},
  { path: 'contentpost', component:ContentpostComponent },
  { path: 'addcontentpost', component:AddcontentpostComponent },
  { path: 'viewcontentpost', component:ViewcontentpostComponent},
  { path: 'editcontentpost', component:EditcontentpostComponent },
  { path: 'sub-admin', component:SubAdminComponent},
  { path: 'add-subadmin', component:AddSubadminComponent},
  { path: 'view-subadmin/:id', component:ViewSubadminComponent},
  { path: 'edit-subadmin', component:EditSubadminComponent},
  { path: 'reward-management', component:RewardManagementComponent},
  { path: 'goals-management', component: GoalsManagementComponent},
  { path: 'privacy-policy', component: NewprivacyComponent},
  { path: 'terms-and-conditions', component: NewtermsComponent},
  { path: '**', component: PageNotFoundComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
