import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
//import { HotWalletManagementComponent } from './hot-wallet-management/hot-wallet-management.component';
import { MarketManagementComponent } from './market-management/market-management.component';
import { SettingComponent } from './setting/setting.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { WalletManagementComponent } from './wallet-management/wallet-management.component';
import { StaticsContentComponent } from './statics-content/statics-content.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MyDatePickerModule } from 'mydatepicker';
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
import {NgxPaginationModule} from 'ngx-pagination';
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
import { DigitOnlyModule } from '@uiowa/digit-only';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { EnquireManagementComponent } from './enquire-management/enquire-management.component';
import { WithdrawLimitComponent } from './withdraw-limit/withdraw-limit.component';
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
import { ViewUserTradingComponent } from './view-user-trading/view-user-trading.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TakerMakerFeeComponent } from './taker-maker-fee/taker-maker-fee.component';
import { BankManagementComponent } from './bank-management/bank-management.component';
import { LogsManagementComponent } from './logs-management/logs-management.component';
import { DatePipe } from '@angular/common';
import { AdvertisementManagementComponent } from './advertisement-management/advertisement-management.component';
import { AdvertisementDetailsComponent } from './advertisement-details/advertisement-details.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketReplyComponent } from './ticket-reply/ticket-reply.component'
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    UserManagementComponent,
  //  HotWalletManagementComponent,
    MarketManagementComponent,
    SettingComponent,
    SubAdminManagementComponent,
    WalletManagementComponent,
    StaticsContentComponent,
    SidemenuComponent,
    AboutUsComponent,
    TermAndServiceComponent,
    PrivacyComponent,
    ExchangeManagementComponent,
    PaymentAndTransactionComponent,
    KycManagementComponent,
    TicketManagementComponent,
    AddWalletAddressComponent,
    WithdrawlFeeComponent,
    DailyLimitComponent,
    WithdrawlLimitComponent,
    PrevilageSettingComponent,
    ResetPasswordComponent,
    MyProfileComponent,
    EditProfileComponent,
    BannerSettingComponent,
    WebsiteContentSettingComponent,
    KycActionPageComponent,
    PageNotFoundComponent,
    FiatManagementComponent,
    FeeManagementComponent,
    HotcoldwalletManagementComponent,
    ViewtransactionComponent,
    TradeManagementComponent,
    DisputeManagementComponent,
    TradeDetailsComponent,
    DisputeTradeDetailsComponent,
    CreateSubadminComponent,
    UserDetailsComponent,
    DocumentDetailsComponent,
    ProfitLossComponent,
    EnquireManagementComponent,
    WithdrawLimitComponent,
    WalletdetailsComponent,
    StaffManagementComponent,
    AddNewStaffComponent,
    EditStaffComponent,
    ViewStaffComponent,
    FooterComponent,
    AdminManagementComponent,
    AddAdminComponent,
    EditAdminComponent,
    ViewAdminComponent,
    UserManagementExchangeComponent,
    ViewUserManagementExchangeComponent,
    ViewUserManagementExchangeOfFeedbackComponent,
    ViewUserTradingComponent,
    ChangePasswordComponent,
    TakerMakerFeeComponent,
    BankManagementComponent,
    LogsManagementComponent,
    AdvertisementManagementComponent,
    AdvertisementDetailsComponent,
    TicketDetailsComponent,
    TicketReplyComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule ,
    MyDatePickerModule,
    NgxPaginationModule,
    DigitOnlyModule,
    CKEditorModule
  ],
  providers: [ServiceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
