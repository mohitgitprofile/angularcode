import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { routes } from './organizer.routing';

import { DataTeamsComponent } from './data/data-teams/data-teams.component';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
import { DataPlayersComponent } from './data/data-players/data-players.component';
import { DataMatchesComponent } from './data/data-matches/data-matches.component';
import { DataClubsComponent } from './data/data-clubs/data-clubs.component';
import { DataVenuesComponent } from './data/data-venues/data-venues.component';
import { DataSponsorsComponent } from './data/data-sponsors/data-sponsors.component';
import { DataActivityLogComponent } from './data/data-activity-log/data-activity-log.component';
import { DataRefereeComponent } from './data/data-referee/data-referee.component';
import { CompetitionsComponent } from './competition/competitions/competitions.component';
import { CompMessagesComponent } from './competition/comp-messages/comp-messages.component';
import { CompProductsComponent } from './competition/comp-products/comp-products.component';
import { CompConfirmComponent } from './competition/comp-confirm/comp-confirm.component';
import { MembershipComponent } from './membership/membership/membership.component';
import { MembRegistrationComponent } from './membership/memb-registration/memb-registration.component';
import { VenDashboardComponent } from './venue/ven-dashboard/ven-dashboard.component';
import { MedPostsComponent } from './media/posts/med-posts/med-posts.component';
import { MedPcreateAlbumComponent } from './media/posts/med-pcreate-album/med-pcreate-album.component';
import { MedPcreateVideoComponent } from './media/posts/med-pcreate-video/med-pcreate-video.component';
import { MedPcreateNewsComponent } from './media/posts/med-pcreate-news/med-pcreate-news.component';
import { MedDcustomComponent } from './media/domain/med-dcustom/med-dcustom.component';
import { MedDconfigureComponent } from './media/domain/med-dconfigure/med-dconfigure.component';
import { MedDwebsiteComponent } from './media/domain/med-dwebsite/med-dwebsite.component';
import { AddCompetitionComponent } from './competition/add-competition/add-competition.component';
import { CompConfigureComponent } from './competition/comp-configure/comp-configure.component';
import { CompConfigureHeaderComponent } from './competition/comp-configure-header/comp-configure-header.component';
import { CompSectionComponent } from './competition/comp-section/comp-section.component';
// import { MenuCompConfigurationComponent } from './competition/menu-comp-configuration/menu-comp-configuration.component';
import { MenuCompConfPlanComponent } from './competition/menu-comp-conf-plan/menu-comp-conf-plan.component';
import { MenuCompConfUserComponent } from './competition/menu-comp-conf-user/menu-comp-conf-user.component';
import { MenuCompConfPeriodComponent } from './competition/menu-comp-conf-period/menu-comp-conf-period.component';
import { MenuCompConfDivisionComponent } from './competition/menu-comp-conf-division/menu-comp-conf-division.component';
import { MenuCompConfHeaderComponent } from './competition/menu-comp-conf-header/menu-comp-conf-header.component';
import { MenuCompConfSportsComponent } from './competition/menu-comp-conf-sports/menu-comp-conf-sports.component';
import { SettingComponent } from './setting/setting.component';
import { CompMessageDetailComponent } from './competition/comp-message-detail/comp-message-detail.component';
import { CompRegistrationComponent } from './competition/comp-registration/comp-registration.component';
import { ProfileComponent } from './profile/profile.component';
import { CompTeamComponent } from './competition/comp-team/comp-team.component';
import { MedPostDetailComponent } from './media/posts/med-post-detail/med-post-detail.component';
import { ProductComponent } from './product/product.component';
import { ServicesComponent } from './membership/services/services.component';
import { ProfessionalComponent } from './membership/professional/professional.component';
import { ApprovalComponent } from './membership/approval/approval.component';
import { MyDatePickerModule } from 'mydatepicker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { BookingComponent } from './membership/booking/booking.component';
import { OptionComponent } from './membership/option/option.component';
import { MembercardComponent } from './membership/membercard/membercard.component';
import { ReportComponent } from './membership/report/report.component';
import { MembersettingComponent } from './membership/membersetting/membersetting.component';
import { ChartsModule } from 'ng2-charts';
import { NewslatterComponent } from './data/newslatter/newslatter.component';
import { ServicedetailComponent } from './membership/servicedetail/servicedetail.component';
import { EvaluationComponent } from './membership/evaluation/evaluation.component';
import { LeaderComponent } from './membership/leader/leader.component';
import { AttendanceComponent } from './membership/attendance/attendance.component';
import { RoleMatrixComponent } from './competition/role-matrix/role-matrix.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { VenConfigurationComponent } from './venue/ven-configuration/ven-configuration.component';
import { VenListComponent } from './venue/ven-list/ven-list.component';
import { AddVenueComponent } from './venue/add-venue/add-venue.component';
import { VenueConfigureHeaderComponent } from './venue/venue-configure-header/venue-configure-header.component';
import { AddSportsComponent } from './venue/add-sports/add-sports.component';
import { EditVenueComponent } from './venue/edit-venue/edit-venue.component';
import { StoreListComponent } from './venue/store-list/store-list.component';
import { ConfigureBookingComponent } from './venue/configure-booking/configure-booking.component';
import { VenueSectionComponent } from './venue/venue-section/venue-section.component';
import { VenueBookingComponent } from './venue/venue-booking/venue-booking.component';
import { VenueNotificationComponent } from './venue/venue-notification/venue-notification.component';
import { VenueDetailsComponent } from './venue/venue-detail/venue-detail.component';
import { VenueSlotsComponent } from './venue/venue-slots/venue-slots.component';
import { StoreItemListComponent } from './venue/store-item-list/store-item-list.component';
import { StandingsComponent } from './venue/standings/standings.component';
import { PlayerDetailComponent } from './data/player-detail/player-detail.component';
import { StandingComponent } from './competition/standing/standing.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {DndModule} from 'ng2-dnd';
import { MatchReportComponent } from './competition/match-report/match-report.component';
import { MatchReportCricketComponent } from './competition/match-report-cricket/match-report-cricket.component';
import { MatchReportObservationComponent } from './competition/match-report-observation/match-report-observation.component';
import { MatchReportBadmintonComponent } from './competition/match-report-badminton/match-report-badminton.component';
import { MatchReportBasketBallComponent } from './competition/match-report-basket-ball/match-report-basket-ball.component';
import { MatchReportSwimmingComponent } from './competition/match-report-swimming/match-report-swimming.component';
import { MatchReportVoleyBallComponent } from './competition/match-report-voley-ball/match-report-voley-ball.component';
import { MatchReportTableTennisComponent } from './competition/match-report-table-tennis/match-report-table-tennis.component';
import { MatchReportSoccerComponent } from './competition/match-report-soccer/match-report-soccer.component';
import { MatchReportGenericComponent } from './competition/match-report-generic/match-report-generic.component';
import { MatchReportGenericTeamComponent } from './competition/match-report-generic-team/match-report-generic-team.component';

import { CeiboShare } from 'ng2-social-share'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MedDConfigSectionComponent } from './media/domain/med-d-config-section/med-d-config-section.component';
import { MedDEditConfigSectionComponent } from './media/domain/med-d-edit-config-section/med-d-edit-config-section.component';
// import { DomainComponent } from './media/domain/domain.component';
// import { MedDEditConfigSectionComponent } from './media/domain/med-d-config-section/med-d-config-section.component';

@NgModule({
    declarations: [
        DataTeamsComponent,
        // HeaderComponent,
        // FooterComponent,
        DataPlayersComponent,
        DataMatchesComponent,
        DataClubsComponent,
        DataVenuesComponent,
        DataSponsorsComponent,
        DataActivityLogComponent,
        DataRefereeComponent,
        CompetitionsComponent,
        CompMessagesComponent,
        CompProductsComponent,
        CompConfirmComponent,
        MembershipComponent,
        MembRegistrationComponent,
        VenDashboardComponent,
        MedPostsComponent,
        MedPcreateAlbumComponent,
        MedPcreateVideoComponent,
        MedPcreateNewsComponent,
        MedDcustomComponent,
        MedDconfigureComponent,
        MedDwebsiteComponent,
        AddCompetitionComponent,
        CompConfigureComponent,
        CompConfigureHeaderComponent,
        CompSectionComponent,
        // MenuCompConfigurationComponent,
        MenuCompConfPlanComponent,
        MenuCompConfUserComponent,
        MenuCompConfPeriodComponent,
        MenuCompConfDivisionComponent,
        MenuCompConfHeaderComponent,
        MenuCompConfSportsComponent,
        SettingComponent,
        CompMessageDetailComponent,
        CompRegistrationComponent,
        ProfileComponent,
        CompTeamComponent,
        MedPostDetailComponent,
        ProductComponent,
        ServicesComponent,
        ProfessionalComponent,
        ApprovalComponent,
        BookingComponent,
        OptionComponent,
        MembercardComponent,
        ReportComponent,
        MembersettingComponent,
        NewslatterComponent,
        ServicedetailComponent,
        EvaluationComponent,
        LeaderComponent,
        AttendanceComponent,
        RoleMatrixComponent,
        VenConfigurationComponent,
        VenListComponent,
        AddVenueComponent,
        VenueConfigureHeaderComponent,
        AddSportsComponent,
        EditVenueComponent,
        StoreListComponent,
        ConfigureBookingComponent,
        VenueSectionComponent,
        VenueBookingComponent,
        VenueNotificationComponent,
        VenueDetailsComponent,
        VenueSlotsComponent,
        StoreItemListComponent,
        StandingsComponent,
        PlayerDetailComponent,
        StandingComponent,
        MatchReportComponent,
        MatchReportCricketComponent,
        MatchReportObservationComponent,
        MatchReportBadmintonComponent,
        MatchReportBasketBallComponent,
        MatchReportSwimmingComponent,
        MatchReportVoleyBallComponent,
        MatchReportTableTennisComponent,
        MatchReportSoccerComponent,
        MatchReportGenericComponent,
        MatchReportGenericTeamComponent,

        CeiboShare,

        MedDConfigSectionComponent,

        MedDEditConfigSectionComponent,

        // DomainComponent,

        // MedDEditConfigSectionComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        MyDatePickerModule,
        ChartsModule,
        GooglePlaceModule,
        AngularMultiSelectModule,
        JwSocialButtonsModule,
        NgxPaginationModule,
        DndModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        DigitOnlyModule
    ]
})

export class OrganizerModule {

}
