import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MyDatePickerModule } from 'mydatepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';   
import { NeutronRatingModule } from 'neutron-star-rating';
import {RatingModule} from "ngx-rating";

import { routes } from './player.routing';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { FollowingComponent } from './following/following.component';
import { SearchCompetitionComponent } from './searchCompetition/search-competition/search-competition.component';
import { SummaryComponent } from './searchCompetition/summary/summary.component';
import { StandingAndFixtureComponent } from './searchCompetition/standing-and-fixture/standing-and-fixture.component';
import { MediaComponent } from './searchCompetition/media/media.component';
import { ProductComponent } from './searchCompetition/product/product.component';
import { RegistrationComponent } from './searchCompetition/registration/registration.component';
import { MessageComponent } from './searchCompetition/message/message.component';
import { CompHeaderComponent } from './searchCompetition/comp-header/comp-header.component';
import { MembershipComponent } from './membership/membership/membership.component';
import { VenuesComponent } from './venue/venues/venues.component';
import { PlayerMediaDetailComponent } from './searchCompetition/player-media-detail/player-media-detail.component';
import { MembershipDetailComponent } from './membership/membership-detail/membership-detail.component';
import { MembHeaderComponent } from './membership/memb-header/memb-header.component';
import { BookServiceComponent } from './membership/book-service/book-service.component';
import { ServiceDetailsComponent } from './membership/service-details/service-details.component';
import { VenueDetailComponent } from './venue/venue-detail/venue-detail.component';
import { VenueCalenderComponent } from './venue/venue-calender/venue-calender.component';
import { VenueBookingFormComponent } from './venue/venue-booking-form/venue-booking-form.component';
import { VenueSlotsComponent } from './venue/venue-slots/venue-slots.component';
import { VenuemedialistComponent } from './venue/venue-media/venuemedialist/venuemedialist.component';
import { VenuemediaDetailComponent } from './venue/venue-media/venuemedia-detail/venuemedia-detail.component';
import { VenHeaderComponent } from './venue/ven-header/ven-header.component';
import { VenueSponsorComponent } from './venue/venue-sponsor/venue-sponsor.component';
import { VenuePlayerHeaderComponent } from './venue/venue-player-header/venue-player-header.component';
import { PlayerSponsorComponent } from './player-sponsor/player-sponsor.component';
import { PlayerVenueSponsorComponent } from './player-venue-sponsor/player-venue-sponsor.component';
import { PlayerMembersSponsorComponent } from './player-members-sponsor/player-members-sponsor.component';
import { FinancialCompComponent } from './searchCompetition/financial-comp/financial-comp.component';
import { FinancialMemComponent } from './membership/financial-mem/financial-mem.component';

// import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        HomeComponent,
        ProfileComponent,
        NotificationComponent,
        FollowingComponent,
        SearchCompetitionComponent,
        SummaryComponent,
        StandingAndFixtureComponent,
        MediaComponent,
        ProductComponent,
        RegistrationComponent,
        MessageComponent,
        CompHeaderComponent,
        MembershipComponent,
        VenuesComponent,
        PlayerMediaDetailComponent,
        MembershipDetailComponent,
        MembHeaderComponent,
        BookServiceComponent,
        ServiceDetailsComponent,
        VenueDetailComponent,
        VenueCalenderComponent,
        VenueBookingFormComponent,
        VenueSlotsComponent,
        VenuemedialistComponent,
        VenuemediaDetailComponent,
        VenHeaderComponent,
        VenueSponsorComponent,
        VenuePlayerHeaderComponent,
        PlayerSponsorComponent,
        PlayerVenueSponsorComponent,
        PlayerMembersSponsorComponent,
        FinancialCompComponent,
        FinancialMemComponent
        // HeaderComponent,
        
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        MyDatePickerModule,
        OwlDateTimeModule, OwlNativeDateTimeModule,
        NeutronRatingModule,
        RatingModule
    ]
})

export class PlayerModule {

}