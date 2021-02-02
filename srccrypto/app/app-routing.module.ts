import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
 import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MarketManagementComponent } from './market-management/market-management.component';
import { SettingComponent } from './setting/setting.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { WalletManagementComponent } from './wallet-management/wallet-management.component';
import { StaticsContentComponent } from './statics-content/statics-content.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermAndServiceComponent } from './term-and-service/term-and-service.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ExchangeManagementComponent } from './exchange-management/exchange-management.component';
import { PaymentAndTransactionComponent } from './payment-and-transaction/payment-and-transaction.component';
import { KycManagementComponent } from './kyc-management/kyc-management.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { AddWalletAddressComponent } from './add-wallet-address/add-wallet-address.component';
import { WithdrawlFeeComponent } from './withdrawl-fee/withdrawl-fee.component';
import { DailyLimitComponent } from './daily-limit/daily-limit.component';
import { WithdrawlLimitComponent } from './withdrawl-limit/withdrawl-limit.component';
import { PrevilageSettingComponent } from './previlage-setting/previlage-setting.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BannerSettingComponent } from './banner-setting/banner-setting.component';
import { WebsiteContentSettingComponent } from './website-content-setting/website-content-setting.component';
import { KycActionPageComponent } from './kyc-action-page/kyc-action-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FiatManagementComponent } from './fiat-management/fiat-management.component';
import { FeeManagementComponent } from './fee-management/fee-management.component';
import { HotcoldwalletManagementComponent } from './hotcoldwallet-management/hotcoldwallet-management.component';
import { ViewtransactionComponent } from './viewtransaction/viewtransaction.component';
import { TradeManagementComponent } from './trade-management/trade-management.component';
import { DisputeManagementComponent } from './dispute-management/dispute-management.component';
import { TradeDetailsComponent } from './trade-details/trade-details.component';
import { DisputeTradeDetailsComponent } from './dispute-trade-details/dispute-trade-details.component';
import { CreateSubadminComponent } from './create-subadmin/create-subadmin.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { EnquireManagementComponent } from './enquire-management/enquire-management.component';
import { WalletdetailsComponent } from './walletdetails/walletdetails.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { AddNewStaffComponent } from './add-new-staff/add-new-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { FooterComponent } from './footer/footer.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { UserManagementExchangeComponent } from './user-management-exchange/user-management-exchange.component';
import { ViewUserManagementExchangeComponent } from './view-user-management-exchange/view-user-management-exchange.component';
import { ViewUserManagementExchangeOfFeedbackComponent } from './view-user-management-exchange-of-feedback/view-user-management-exchange-of-feedback.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TakerMakerFeeComponent } from './taker-maker-fee/taker-maker-fee.component';
import { BankManagementComponent } from './bank-management/bank-management.component';
import { LogsManagementComponent } from './logs-management/logs-management.component';
import { AdvertisementManagementComponent } from './advertisement-management/advertisement-management.component';
import { AdvertisementDetailsComponent } from './advertisement-details/advertisement-details.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketReplyComponent } from './ticket-reply/ticket-reply.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: "/login",
    pathMatch :"full"
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path: 'forgot-password',
    component : ForgotPasswordComponent
  },
  {
    path : 'dashboard',
    component: DashboardComponent,
  },
  {
    path : 'user-management',
    component : UserManagementComponent
  },
 
  {
    path : 'market-management/:action',
    component : MarketManagementComponent
  },
  {
    path : 'setting',
    component : SettingComponent
  },
  {
    path : 'sub-admin-management',
    component : SubAdminManagementComponent
  },
  {
    path : 'wallet-management',
    component : WalletManagementComponent
  },
  {
    path : 'statics-content',
    component : StaticsContentComponent
  },
  {
    path : 'about-us/:id',
    component : AboutUsComponent
  },
  {
    path : 'term-and-service/:id',
    component : TermAndServiceComponent
  },
  {
    path : 'privacy/:id',
    component : PrivacyComponent
   },
   {
     path : 'exchange-management',
     component : ExchangeManagementComponent
   },
   {
     path : 'payment-and-transaction',
     component : PaymentAndTransactionComponent
   },
   {
     path : 'kyc-management',
     component : KycManagementComponent ,
   },
   {
     path : 'ticket-management',
     component : TicketManagementComponent
   },
   {
     path:'ticket-details/:id',
     component: TicketDetailsComponent
   },
   {
     path:'ticket-reply/:id',
     component: TicketReplyComponent
   },
   {
     path : 'add-wallet-address',
     component : AddWalletAddressComponent
   },
   {
     path : 'withdrawl-fee',
     component :WithdrawlFeeComponent
   },
   {
     path : 'daily-limit',
     component : DailyLimitComponent
   },
   {
     path : 'withdrawl-limit',
     component : WithdrawlLimitComponent
   },
   {
     path : 'previlage-setting',
     component : PrevilageSettingComponent
   },
   {
     path : 'reset-password',
     component :  ResetPasswordComponent
   },
   {
     path : 'my-profile',
     component : MyProfileComponent 
   },
   {
     path : 'edit-profile',
     component : EditProfileComponent
   },
   {
     path : 'banner-setting',
     component : BannerSettingComponent
   },
   {
     path : 'website-content-setting/:id',
     component : WebsiteContentSettingComponent
    },
    {
      path : 'kyc-action/:id',
      component : KycActionPageComponent
     },
     {
      path : 'fiat-management',
      component: FiatManagementComponent
     },
     {
      path : 'fee-management',
      component: FeeManagementComponent
     },
     {
      path : 'hotcoldwallet-management',
      component: HotcoldwalletManagementComponent
     },
     {
      path : 'viewtransaction/:id',
      component: ViewtransactionComponent
     },
     {
       path : 'user-details',
       component: UserDetailsComponent
     },
     {
      path : 'document-details/:id',
      component: DocumentDetailsComponent
    },
     {
       path : 'trade-management',
       component: TradeManagementComponent
     },
     {
      path : 'dispute-management',
      component: DisputeManagementComponent
    },
    {
      path : 'trade-details/:id',
      component: TradeDetailsComponent
    },
    {
      path : 'dispute-trade-details/:id',
      component: DisputeTradeDetailsComponent
    },
    {
      path : 'create-subadmin',
      component: CreateSubadminComponent
    },
    {
      path : 'profit-loss',
      component: ProfitLossComponent
    },
    {
      path: 'enquiry-management',
      component: EnquireManagementComponent
    },
    {
      path: 'walletdetails/:id',
      component: WalletdetailsComponent
    },
    {
      path:'staff-management',
      component: StaffManagementComponent
    },
    {
      path:'add-new-staff',
      component: AddNewStaffComponent
    },
    {
      path:'edit-staff',
      component: EditStaffComponent
    },
    {
      path:'view-staff',
      component: ViewStaffComponent
    },
    {
      path:'footer',
      component: FooterComponent
    },
    {
      path:'admin-management',
      component: AdminManagementComponent
    },
    {
      path:'add-admin',
      component: AddAdminComponent
    },
    {
      path:'edit-admin',
      component: EditAdminComponent
    },
    {
      path:'view-admin/:id',
      component: ViewAdminComponent
    },
    {
      path:'user-management-exchange',
      component: UserManagementExchangeComponent
    },
    {
      path:'view-user-management-exchange',
      component: ViewUserManagementExchangeComponent
    },
    {
      path:'view-user-management-exchange-of-feedback',
      component: ViewUserManagementExchangeOfFeedbackComponent
    },
    {
      path:'change-password',
      component: ChangePasswordComponent
    },
    {
      path:'taker-maker-fee',
      component: TakerMakerFeeComponent
    },
    { 
      path:'logs-management',
      component: LogsManagementComponent
    },
    {
      path: 'advertisement-management',
      component: AdvertisementManagementComponent
    },
    {
      path:'advertisement-details/:id',
      component: AdvertisementDetailsComponent
    },
    {
      path:'bank-management',
      component: BankManagementComponent
    },
    
  {
    path : '**',
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
