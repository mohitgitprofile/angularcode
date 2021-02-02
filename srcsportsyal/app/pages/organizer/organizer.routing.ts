import { MatchReportGenericTeamComponent } from './competition/match-report-generic-team/match-report-generic-team.component';
import { MatchReportGenericComponent } from './competition/match-report-generic/match-report-generic.component';
import { MatchReportSoccerComponent } from './competition/match-report-soccer/match-report-soccer.component';
import { MatchReportTableTennisComponent } from './competition/match-report-table-tennis/match-report-table-tennis.component';
import { MatchReportVoleyBallComponent } from './competition/match-report-voley-ball/match-report-voley-ball.component';
import { MatchReportSwimmingComponent } from './competition/match-report-swimming/match-report-swimming.component';
import { MatchReportBasketBallComponent } from './competition/match-report-basket-ball/match-report-basket-ball.component';
import { MatchReportBadmintonComponent } from './competition/match-report-badminton/match-report-badminton.component';
import { MatchReportObservationComponent } from './competition/match-report-observation/match-report-observation.component';
import { MatchReportCricketComponent } from './competition/match-report-cricket/match-report-cricket.component';
import { MatchReportComponent } from './competition/match-report/match-report.component';
import { Routes } from '@angular/router';
import { DataTeamsComponent } from './data/data-teams/data-teams.component';
import { DataPlayersComponent } from './data/data-players/data-players.component';
import { DataMatchesComponent } from './data/data-matches/data-matches.component';
import { DataClubsComponent } from './data/data-clubs/data-clubs.component';
import { DataVenuesComponent } from './data/data-venues/data-venues.component';
import { DataSponsorsComponent } from './data/data-sponsors/data-sponsors.component';
import { DataActivityLogComponent } from './data/data-activity-log/data-activity-log.component';
import { DataRefereeComponent } from './data/data-referee/data-referee.component';
import { CompetitionsComponent } from './competition/competitions/competitions.component';
import { AddCompetitionComponent } from './competition/add-competition/add-competition.component';
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
import { CompConfigureComponent } from './competition/comp-configure/comp-configure.component';
import { CompSectionComponent } from './competition/comp-section/comp-section.component';
import { MenuCompConfPlanComponent } from './competition/menu-comp-conf-plan/menu-comp-conf-plan.component';
import { MenuCompConfPeriodComponent } from './competition/menu-comp-conf-period/menu-comp-conf-period.component';
import { MenuCompConfDivisionComponent } from './competition/menu-comp-conf-division/menu-comp-conf-division.component';
import { MenuCompConfSportsComponent } from './competition/menu-comp-conf-sports/menu-comp-conf-sports.component';
import { SettingComponent } from './setting/setting.component';
import { CompMessageDetailComponent } from './competition/comp-message-detail/comp-message-detail.component';
import { CanActiveOrganizerRouteGuard } from '../../providers/can-active-organizer-route.guard';
import { CompRegistrationComponent } from './competition/comp-registration/comp-registration.component';
import { ProfileComponent } from './profile/profile.component';
import { CompTeamComponent } from './competition/comp-team/comp-team.component';
import { MedPostDetailComponent } from './media/posts/med-post-detail/med-post-detail.component';
import { ProductComponent } from './product/product.component';
import { ServicesComponent } from './membership/services/services.component';
import { ProfessionalComponent } from './membership/professional/professional.component';
import { ApprovalComponent } from './membership/approval/approval.component';
import { BookingComponent } from './membership/booking/booking.component';
import { OptionComponent } from './membership/option/option.component';
import { MembercardComponent } from './membership/membercard/membercard.component';
import { ReportComponent } from './membership/report/report.component';
import { MembersettingComponent } from './membership/membersetting/membersetting.component';
import { NewslatterComponent } from './data/newslatter/newslatter.component';
import { ServicedetailComponent } from './membership/servicedetail/servicedetail.component';
import { LeaderComponent } from './membership/leader/leader.component';
import { EvaluationComponent } from './membership/evaluation/evaluation.component';
import { AttendanceComponent } from './membership/attendance/attendance.component';
import { MenuCompConfUserComponent } from './competition/menu-comp-conf-user/menu-comp-conf-user.component';
import { RoleMatrixComponent } from './competition/role-matrix/role-matrix.component';
import { VenConfigurationComponent } from './venue/ven-configuration/ven-configuration.component';
import { AddVenueComponent } from './venue/add-venue/add-venue.component';
import { VenListComponent } from './venue/ven-list/ven-list.component';
import { AddSportsComponent } from './venue/add-sports/add-sports.component';
import { EditVenueComponent } from './venue/edit-venue/edit-venue.component';
import { StoreListComponent } from './venue/store-list/store-list.component';
import { VenueSectionComponent } from './venue/venue-section/venue-section.component';
import { ConfigureBookingComponent } from './venue/configure-booking/configure-booking.component';
import { VenueBookingComponent } from './venue/venue-booking/venue-booking.component';
import { VenueNotificationComponent } from './venue/venue-notification/venue-notification.component';
import { VenueSlotsComponent } from './venue/venue-slots/venue-slots.component';
import { VenueDetailsComponent } from './venue/venue-detail/venue-detail.component';
import { StoreItemListComponent } from './venue/store-item-list/store-item-list.component';
import { StandingComponent } from './competition/standing/standing.component';
import { MedDconfigureComponent } from './media/domain/med-dconfigure/med-dconfigure.component';
import { MedDwebsiteComponent } from './media/domain/med-dwebsite/med-dwebsite.component';
import { MedDcustomComponent } from './media/domain/med-dcustom/med-dcustom.component';
import { MedDConfigSectionComponent } from './media/domain/med-d-config-section/med-d-config-section.component';
import { MedDEditConfigSectionComponent } from './media/domain/med-d-edit-config-section/med-d-edit-config-section.component';





export const routes: Routes = [
    { path: '', redirectTo: 'dataTeams', pathMatch: 'full' },
    { path: 'dataTeams', component: DataTeamsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dataPlayers', component: DataPlayersComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dataMatches', component: DataMatchesComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dataClubs', component: DataClubsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dataVenues', component: DataVenuesComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dataSponsors', component: DataSponsorsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dataActivityLog', component: DataActivityLogComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dataReferee', component: DataRefereeComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'competitions', component: CompetitionsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'addCompetition', component: AddCompetitionComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'compConfigure/:id/:tab', component: CompConfigureComponent, canActivate: [CanActiveOrganizerRouteGuard] }, // Organizer > My Competition > Competition > Configure
    { path: 'compMessages', component: CompMessagesComponent, canActivate: [CanActiveOrganizerRouteGuard] }, // Organizer > My Competition > Message
    { path: 'compMessagesdetail/:id', component: CompMessageDetailComponent, canActivate: [CanActiveOrganizerRouteGuard] }, // Organizer > My Competition > Messages > Particular Message
    { path: 'compSection/:id', component: CompSectionComponent, canActivate: [CanActiveOrganizerRouteGuard] },// Organizer > My Competition > Competition > Confiure > Sections
    { path: 'compRegistration/:id', component: CompRegistrationComponent, canActivate: [CanActiveOrganizerRouteGuard] },// Organizer > My Competition > Competition > Configure > Registration
    { path: 'compTeam/:id', component: CompTeamComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'compProducts', component: CompProductsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'compConfirm', component: CompConfirmComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'membership', component: MembershipComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'membRegistration', component: MembRegistrationComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'venDashboard', component: VenDashboardComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'venConfiguration', component: VenConfigurationComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'venList', component: VenListComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'addVenue', component: AddVenueComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'addSports', component: AddSportsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'editVenue/:id', component: EditVenueComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'storeList', component: StoreListComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'configureBooking/:tab', component: ConfigureBookingComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'venueSection', component: VenueSectionComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'venueBooking', component: VenueBookingComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'venueNotification', component: VenueNotificationComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'venueDetails/:id', component: VenueDetailsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'venueSlots/:id', component: VenueSlotsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'medPosts', component: MedPostsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'medPCreateAlbum/:id', component: MedPcreateAlbumComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'medPCreateVideo/:id', component: MedPcreateVideoComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'medPCreateNews/:id', component: MedPcreateNewsComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'medPostDetail/:id', component: MedPostDetailComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'menuCompConfPlan', component: MenuCompConfPlanComponent, canActivate: [CanActiveOrganizerRouteGuard] }, /** Organizer => Menu => Configuration (Plan Page) */
    { path: 'menuCompConfPeriod', component: MenuCompConfPeriodComponent, canActivate: [CanActiveOrganizerRouteGuard] }, /** Organizer => Menu => Configuration => Period */
    { path: 'menuCompConfDivision', component: MenuCompConfDivisionComponent, canActivate: [CanActiveOrganizerRouteGuard] }, /** Organizer => Menu => Configuration => Division */
    { path: 'menuCompConfRoleMatrix', component:RoleMatrixComponent, canActivate: [CanActiveOrganizerRouteGuard] }, /** Organizer => Menu => Configuration => RoleMatrix */
    { path: 'menuCompConfUser', component: MenuCompConfUserComponent, canActivate: [CanActiveOrganizerRouteGuard] }, /** Organizer => Menu => Configuration => Division */
    { path: 'menuCompConfSports', component: MenuCompConfSportsComponent, canActivate: [CanActiveOrganizerRouteGuard] }, /** Organizer => Menu => Configuration => User */
    { path: 'settings', component: SettingComponent, canActivate: [CanActiveOrganizerRouteGuard] }, /** Organizer => Menu => Setting */
    { path: 'profile', component: ProfileComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'product', component: ProductComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'service', component: ServicesComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'professional', component: ProfessionalComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'approval', component: ApprovalComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'booking', component: BookingComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'option', component: OptionComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'membercard', component: MembercardComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'report', component: ReportComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'membersetting', component: MembersettingComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'newsletter', component: NewslatterComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'servicedetail/:id', component:ServicedetailComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'leader', component:LeaderComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'evaluation', component:EvaluationComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'attendance', component:AttendanceComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'storeItemList/:id/:storeId', component:StoreItemListComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'standing/:id', component: StandingComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'matchReport/:compId/:gameId/:team1Id/:team2Id', component: MatchReportComponent, canActivate: [CanActiveOrganizerRouteGuard] ,
    children : [
      { path: 'matchReportCricket/:compId/:gameId/:team1Id/:team2Id', component: MatchReportCricketComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportObservation/:compId/:gameId/:team1Id/:team2Id', component: MatchReportObservationComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportBadminton/:compId/:gameId/:team1Id/:team2Id', component: MatchReportBadmintonComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportBasketBall/:compId/:gameId/:team1Id/:team2Id', component: MatchReportBasketBallComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportSwimming/:compId/:gameId/:team1Id/:team2Id', component: MatchReportSwimmingComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportVoleyball/:compId/:gameId/:team1Id/:team2Id', component: MatchReportVoleyBallComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportTableTennis/:compId/:gameId/:team1Id/:team2Id', component: MatchReportTableTennisComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportSoccer/:compId/:gameId/:team1Id/:team2Id', component: MatchReportSoccerComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportGeneric/:compId/:gameId/:team1Id/:team2Id', component: MatchReportGenericComponent, canActivate: [CanActiveOrganizerRouteGuard] },
      { path: 'matchReportGenericTeam/:compId/:gameId/:team1Id/:team2Id', component: MatchReportGenericTeamComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    ]},
    { path:'domainWebConfiguration',component:MedDconfigureComponent, canActivate: [CanActiveOrganizerRouteGuard] },
    { path:'dWebConfiguration', component:MedDwebsiteComponent,canActivate: [CanActiveOrganizerRouteGuard] },
    { path:'domainCustomization', component:MedDcustomComponent,canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dConfigSection',component:MedDConfigSectionComponent,canActivate: [CanActiveOrganizerRouteGuard] },
    { path: 'dConfigEditSection',component:MedDEditConfigSectionComponent,canActivate: [CanActiveOrganizerRouteGuard] },
];
