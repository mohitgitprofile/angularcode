import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CanActivePlayerRouteGuard } from '../../providers/can-active-player-route.guard';
import { ProfileComponent } from '../player/profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { FollowingComponent } from './following/following.component';
import { SearchCompetitionComponent } from './searchCompetition/search-competition/search-competition.component';
import { SummaryComponent } from './searchCompetition/summary/summary.component';
import { StandingAndFixtureComponent } from './searchCompetition/standing-and-fixture/standing-and-fixture.component';
import { MediaComponent } from './searchCompetition/media/media.component';
import { ProductComponent } from './searchCompetition/product/product.component';
import { RegistrationComponent } from './searchCompetition/registration/registration.component';
import { MessageComponent } from './searchCompetition/message/message.component';
import { MembershipComponent } from './membership/membership/membership.component';
import { VenuesComponent } from './venue/venues/venues.component';
import { PlayerMediaDetailComponent } from './searchCompetition/player-media-detail/player-media-detail.component';
import { MembershipDetailComponent } from './membership/membership-detail/membership-detail.component';
import { BookServiceComponent } from './membership/book-service/book-service.component';
import { ServiceDetailsComponent } from './membership/service-details/service-details.component';
import { VenueDetailComponent } from './venue/venue-detail/venue-detail.component';
import { VenueCalenderComponent } from './venue/venue-calender/venue-calender.component';
import { VenueSlotsComponent } from './venue/venue-slots/venue-slots.component';
import { VenueBookingFormComponent } from './venue/venue-booking-form/venue-booking-form.component';
import { VenuemedialistComponent } from './venue/venue-media/venuemedialist/venuemedialist.component';
import { VenuemediaDetailComponent } from './venue/venue-media/venuemedia-detail/venuemedia-detail.component';
import { PlayerSponsorComponent } from './player-sponsor/player-sponsor.component';
import { PlayerVenueSponsorComponent } from './player-venue-sponsor/player-venue-sponsor.component';
import { PlayerMembersSponsorComponent } from './player-members-sponsor/player-members-sponsor.component';
import { FinancialCompComponent } from './searchCompetition/financial-comp/financial-comp.component';
import { FinancialMemComponent } from './membership/financial-mem/financial-mem.component';
import { VenueSponsorComponent } from './venue/venue-sponsor/venue-sponsor.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'notification', component: NotificationComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'following/:id', component: FollowingComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'searchCompetition', component: SearchCompetitionComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'summary/:compId/:orgId', component: SummaryComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'standingAndFixture/:compId/:orgId', component: StandingAndFixtureComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'media/:compId/:orgId/:num', component: MediaComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'product/:compId/:orgId/:num', component: ProductComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'registration/:compId/:orgId', component: RegistrationComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'message/:compId/:orgId', component: MessageComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'membership', component: MembershipComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'venues', component: VenuesComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'venueDetail/:id', component: VenueDetailComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'venueCalender/:id', component: VenueCalenderComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'venueSlots/:date/:sport/:id', component: VenueSlotsComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'venueBookingForm/:id', component: VenueBookingFormComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'venuemedialist', component: VenuemedialistComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'venuemediadetail', component: VenuemediaDetailComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'media/PlayerMediaDetails/:compId/:orgId/:mediaId', component: PlayerMediaDetailComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'membershipDetail/:compId/:orgId', component: MembershipDetailComponent, canActivate: [CanActivePlayerRouteGuard] },
    { path: 'book-service/:serId/:id', component: BookServiceComponent, canActivate: [CanActivePlayerRouteGuard]},
    { path: 'service-details/:compId/:orgId/:serId', component: ServiceDetailsComponent, canActivate: [CanActivePlayerRouteGuard]},
    { path: 'playerSponsor/:compId/:orgId', component: PlayerSponsorComponent, canActivate: [CanActivePlayerRouteGuard]},
    { path: 'playerVenueSponsor/:venId', component: PlayerVenueSponsorComponent, canActivate: [CanActivePlayerRouteGuard]},
    { path: 'playerMemberSponsor/:memId', component: PlayerMembersSponsorComponent, canActivate: [CanActivePlayerRouteGuard]},
    { path: 'playerCompFinancial/:compId/:orgId', component: FinancialCompComponent, canActivate: [CanActivePlayerRouteGuard]},
    { path: 'playerMemFinancial/:compId', component: FinancialMemComponent, canActivate: [CanActivePlayerRouteGuard]},
    { path: 'venueSponsor/:id', component: VenueSponsorComponent, canActivate: [CanActivePlayerRouteGuard] },

]