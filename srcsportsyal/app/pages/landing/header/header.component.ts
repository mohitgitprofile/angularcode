import { Component, OnInit } from '@angular/core';
import { Router, MainService } from '../../../index'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  header: any = ''
  currentUrl = ''
  currHeader: any = '';
  userDetail: any = {};
  profileData: any = {}
  mainUrl: any = ''
  num: any = ''
  loginTypeArr: any = [];
  subscriptionAccess: any = {};
  subscriptionAccessCompetition: any = [];
  subscriptionAccessMembership: any = [];
  subscriptionAccessVenue: any = [];
  subscriptionAccessDataBaseCompetition: any = [];
  subscriptionAccessDataBaseMembership: any = [];
  subscriptionAccessDataBaseVenue: any = [];
  subscriptionAccessDataBase: any = [];
  media: any;
  product: any;
  userManagment: any;
  currUrl: string;
  constructor(private router: Router, private service: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe(async params => {
    //   this.num = params['num']
    // })
    // this.service.headerObs.subscribe(response => {
    //   if (response == 1) this.getProfileApi()
    // })

    // this.currentUrl = this.router.url
    // this.mainUrl = this.currentUrl.split('/').slice(1, 3).join('/')
    // let this.currUrl = (this.router.url).split('/')[2]
    // if (this.router.url.split('/')[1] == 'organizer') {
  
    //   if (this.currUrl == `dataTeams` || this.currUrl == `dataPlayers` || this.currUrl == `dataMatches` || this.currUrl == `dataClubs` || this.currUrl == `dataVenues` || this.currUrl == `dataSponsors` || this.currUrl == `dataActivityLog` || this.currUrl == `dataReferee` || this.currUrl == `newsletter`) {
    //     this.currHeader = 1
    //   } else if (this.currUrl == `competitions` || this.currUrl == `compMessages` || this.currUrl == `compProducts` || this.currUrl == `compConfirm` || this.currUrl == `addCompetition` || this.currUrl == 'compConfigure' || this.currUrl == 'compSection' || this.currUrl == 'compRegistration' || this.currUrl == 'compTeam' || this.currUrl == 'standing' || this.currUrl == 'matchReport') {
    //     this.currHeader = 2
    //   } else if (this.currUrl == `membership` || this.currUrl == `membRegistration` || this.currUrl == `service` || this.currUrl == `professional` || this.currUrl == `approval` || this.currUrl == `booking` || this.currUrl == `option` || this.currUrl == `membercard` || this.currUrl == `report` || this.currUrl == `membersetting` || this.currUrl == `servicedetail` || this.currUrl == `leader` || this.currUrl == `evaluation` || this.currUrl == `attendance`) {
    //     this.currHeader = 3
    //   } else if (this.currUrl == `venueSlots` || this.currUrl == `venDashboard` || this.currUrl == `venConfiguration` || this.currUrl == `configureBooking` || this.currUrl == `venueNotification` || this.currUrl == `venueSection` || this.currUrl == `venueBooking` || this.currUrl == `venList` || this.currUrl == `addSports` || this.currUrl == `venueDetails` || this.currUrl == `addVenue` || this.currUrl == `editVenue` || this.currUrl == `storeList` || this.currUrl == `storeItemList`) {
    //     this.currHeader = 4
      
    //   } else if (this.currUrl == `medPosts` || this.currUrl == `medPCreateAlbum` || this.currUrl == `medPCreateVideo` || this.currUrl == `medPCreateNews` || this.currUrl == `medPostDetail`|| this.currUrl == 'domainCustomization' || this.currUrl == 'domainWebConfiguration' || this.currUrl == 'dWebConfiguration' || this.currUrl == 'dConfigSection') {
    //     this.currHeader = 5
    //   } else if (this.currUrl == `product`){
    //     this.currHeader = 6
    //   }
    this.route.params.subscribe(async params => {
      this.num = params['num']
    })
    this.service.headerObs.subscribe(response => {
      if (response == 1) this.getProfileApi()
    })

    this.currentUrl = this.router.url
    console.log(this.currentUrl)
    this.mainUrl = this.currentUrl.split('/').slice(1, 3).join('/')
    this.currUrl = (this.router.url).split('/')[2]

   // this.currUrl = 'organizer/dConfigSection'
    console.log(this.currUrl)
    if(window.location.pathname == '/organizer/dConfigEditSection'){
    
      this.mainUrl = 'organizer/dConfigSection'
      this.currUrl = 'dConfigSection'
    }
    console.log(this.currUrl)
    
    if (this.router.url.split('/')[1] == 'organizer') {
      // organizer main header active manage
      if (this.currUrl == `dataTeams` || this.currUrl == `dataPlayers` || this.currUrl == `dataMatches` || this.currUrl == `dataClubs` || this.currUrl == `dataVenues` || this.currUrl == `dataSponsors` || this.currUrl == `dataActivityLog` || this.currUrl == `dataReferee` || this.currUrl == `newsletter`) {
        this.currHeader = 1
      } else if (this.currUrl == `competitions` || this.currUrl == `compMessages` || this.currUrl == `compProducts` || this.currUrl == `compConfirm` || this.currUrl == `addCompetition` || this.currUrl == 'compConfigure' || this.currUrl == 'compSection' || this.currUrl == 'compRegistration' || this.currUrl == 'compTeam' || this.currUrl == 'standing' || this.currUrl == 'matchReport') {
        this.currHeader = 2
      } else if (this.currUrl == `membership` || this.currUrl == `membRegistration` || this.currUrl == `service` || this.currUrl == `professional` || this.currUrl == `approval` || this.currUrl == `booking` || this.currUrl == `option` || this.currUrl == `membercard` || this.currUrl == `report` || this.currUrl == `membersetting` || this.currUrl == `servicedetail` || this.currUrl == `leader` || this.currUrl == `evaluation` || this.currUrl == `attendance`) {
        this.currHeader = 3
      } else if (this.currUrl == `venueSlots` || this.currUrl == `venDashboard` || this.currUrl == `venConfiguration` || this.currUrl == `configureBooking` || this.currUrl == `venueNotification` || this.currUrl == `venueSection` || this.currUrl == `venueBooking` || this.currUrl == `venList` || this.currUrl == `addSports` || this.currUrl == `venueDetails` || this.currUrl == `addVenue` || this.currUrl == `editVenue` || this.currUrl == `storeList` || this.currUrl == `storeItemList`) {
        this.currHeader = 4
      } else if (this.currUrl == `medPosts` || this.currUrl == `medPCreateAlbum` || this.currUrl == `medPCreateVideo` || this.currUrl == `medPCreateNews` || this.currUrl == `medPostDetail`|| this.currUrl == 'domainCustomization' || this.currUrl == 'domainWebConfiguration' || this.currUrl == 'dWebConfiguration' || this.currUrl == 'dConfigSection' ) {
        this.currHeader = 5
      } else if (this.currUrl == `product`){
        this.currHeader = 6
      }


      // Changes Done
      this.loginTypeArr = localStorage.getItem('LoginWith').split(',');
      this.subscriptionAccess = JSON.parse(localStorage.getItem('subscriptionAccess'));
      // console.log("subscriptionAccess ---->>>> ", this.subscriptionAccess);
      this.media = (this.subscriptionAccess.Media == true) ? true : false;
      this.product = ((this.subscriptionAccess.Product == true) && ((this.loginTypeArr.includes('COMPETITION')) || (this.loginTypeArr.includes('MEMBERSHIP')))) ? true : false
      this.userManagment = ((this.subscriptionAccess.userManagment == true) || (this.subscriptionAccess.userManagemnt == true)) ? true : false;
      //  console.log("Media-->>> ",this.media);
      if (this.loginTypeArr.includes("COMPETITION")) {
        this.subscriptionAccess.competition.database.map(x => {
          if (!this.subscriptionAccessDataBase.includes(x)) this.subscriptionAccessDataBase.push(x)
        })
        this.subscriptionAccess.competition.competition.map(x => {
          if (!this.subscriptionAccessCompetition.includes(x)) this.subscriptionAccessCompetition.push(x)
        })

      }
      if (this.loginTypeArr.includes("MEMBERSHIP")) {
        this.subscriptionAccess.membership.database.map(x => {
          if (!this.subscriptionAccessDataBase.includes(x)) this.subscriptionAccessDataBase.push(x)
        })
        this.subscriptionAccess.membership.membership.map(x => {
          if (!this.subscriptionAccessMembership.includes(x)) this.subscriptionAccessMembership.push(x)
        })
      }
      if (this.loginTypeArr.includes("VENUE")) {
        this.subscriptionAccess.venue.database.map(x => {
          if (!this.subscriptionAccessDataBase.includes(x)) this.subscriptionAccessDataBase.push(x)
        })
        this.subscriptionAccess.venue.venue.map(x => {
          if (!this.subscriptionAccessVenue.includes(x)) this.subscriptionAccessVenue.push(x)
        })
      }
    } else if (this.router.url.split('/')[1] == 'player') {
      // player main header active manage
      if (this.currUrl == 'searchCompetition' || this.currUrl == 'summary' || this.currUrl == 'standingAndFixture' || (this.currUrl == 'media' && this.num == 1) || (this.currUrl == 'product' && this.num == 1) || this.currUrl == 'registration' || this.currUrl == 'message') this.currHeader = 10
      else if (this.currUrl == 'membership' || this.currUrl == 'membershipDetail' || this.currUrl == 'service-details' || this.currUrl == 'book-service' || (this.currUrl == 'product' && this.num == 2) || (this.currUrl == 'media' && this.num == 2)) this.currHeader = 11
      else if (this.currUrl == 'venues' || this.currUrl == 'venueDetail' || this.currUrl == 'venueSponsor' || this.currUrl == 'venueSlots' || this.currUrl == 'venueBookingForm') this.currHeader = 12
    }

    if (this.service.getStorage('userDetailYala') != null) {
      this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
      if (this.userDetail.role == 'ORGANIZER') {
        this.header = 2
        this.getProfileApi()
      } else if (this.userDetail.role == 'PLAYER') {
        this.header = 3
        this.getProfileApi()
      }
    } else {
      this.header = 1
    }
    // if(this.router.url == `/landing/landingPage`) {
    //   this.header = ``
    // }
  }


  getRole(val, type) {
    if (type === 1)
      return this.userDetail.userType[0].includes('COMPETITION')
    else if (type === 2)
      return this.userDetail.userType[0].includes('MEMBERSHIP')
    else if (type === 3)
      return this.userDetail.userType[0].includes('VENUE')
  }

  logout() {
    this.service.removeStorage('userDetailYala')
    localStorage.removeItem('LoginWith');
    localStorage.removeItem('subscriptionAccess');
    this.router.navigate(['/landing/login'])
  }

  getProfileApi() {
    this.service.getApi(`users/getDetail?_id=${this.userDetail._id}`, 1).subscribe(response => {
      if (response.responseCode == 200) {
        this.profileData = response.result
      }
    })
  }

}
