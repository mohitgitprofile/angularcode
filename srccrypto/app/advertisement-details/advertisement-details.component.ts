import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.css']
})
export class AdvertisementDetailsComponent implements OnInit {
  peerToPeerExchangeId: any;
  advertisementData: any;
  countryList: any = [];
  editAdvertisementForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public service: ServiceService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      console.log(res);
      if (res.id) {
        this.peerToPeerExchangeId = res.id
      }
    })
    this.editAdvertisementFormValidation()
    this.getCountryList()
    this.getAdvertisementDetails()
  }

  // edit advertisement form validation
  editAdvertisementFormValidation() {
    this.editAdvertisementForm = new FormGroup({
      'paymentType': new FormControl(''),
      'country': new FormControl(''),
      'fiatCoin': new FormControl(''),
      'margin': new FormControl(''),
      'termsOfTrade': new FormControl(''),
      'isIdentifiedPeople': new FormControl(''),
      'twpfaType': new FormControl('')
    })
  }

  // get country list
  getCountryList() {
    this.service.showSpinner()
    this.service.get('account/get-country-list').subscribe((res) => {
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.countryList = res['data']
      }
    }, err=>{
      this.service.hideSpinner()
    })
  }

  // get advertsement details
  getAdvertisementDetails() {
    this.service.showSpinner()
    this.service.get(`p2p-exchange/admin/search-and-filters-advertisement?page=0&pageSize=5&peerToPeerExchangeId=${this.peerToPeerExchangeId}`).subscribe((res) => {
      console.log(res);
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
        this.advertisementData = res['data'].list[0]
        this.editAdvertisementForm.patchValue({
          'paymentType': res['data'].list[0].paymentType ? res['data'].list[0].paymentType : '',
          'country': res['data'].list[0].country ? res['data'].list[0].country : '',
          'fiatCoin': res['data'].list[0].fiatCoin ? res['data'].list[0].fiatCoin : '',
          'margin': res['data'].list[0].margin ? res['data'].list[0].margin : '',
          'termsOfTrade': res['data'].list[0].termsOfTrade ? res['data'].list[0].termsOfTrade : '',
          'isIdentifiedPeople': res['data'].list[0].isIdentifiedPeople ? res['data'].list[0].isIdentifiedPeople : '',
          'twpfaType': res['data'].list[0].twpfaType == 'SMS' ? true : false
        })
      } else {
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.hideSpinner()
      this.service.toasterErr(err['message'])
      console.log(err)
    })
  }

  // update advertisement details
  updateAdvertisement() {
    let data = {
      // "addTags": "string",
      "country": this.editAdvertisementForm.value.country ? this.editAdvertisementForm.value.country : this.advertisementData.country,
      // "cryptoCoin": "string",
      "fiatCoin": this.editAdvertisementForm.value.fiatCoin ? this.editAdvertisementForm.value.fiatCoin : this.advertisementData.fiatCoin,
      // "isIdentifiedPeople": true,
      "margin": this.editAdvertisementForm.value.margin ? this.editAdvertisementForm.value.margin : this.advertisementData.margin,
      // "maxValue": 0,
      // "minValue": 0,
      // "orderStatus": "ENABLE",
      // "orderType": "BUY",
      "paymentType": this.editAdvertisementForm.value.paymentType ? this.editAdvertisementForm.value.paymentType : this.advertisementData.paymentType,
      // "paymentWindow": 0,
      // "restrictAmount": 0,
      // "role": "DEVELOPER",
      // "roleId": 0,
      "termsOfTrade": this.editAdvertisementForm.value.termsOfTrade ? this.editAdvertisementForm.value.termsOfTrade : this.advertisementData.termsOfTrade,
      "twpfaType": "SMS",
      // "username": "string"
    }
    console.log(data)
    this.service.showSpinner()
    this.service.post(`p2p-exchange/edit-advertisment?peerToPeerExchangeId=${this.peerToPeerExchangeId}`, data).subscribe((res) => {
      console.log(res);
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
      } else {
        this.service.toasterErr(res['message'])
      }
    }, err => {
      this.service.hideSpinner()
      this.service.toasterErr(err['message'])
      console.log(err)
    })
  }

  // delete advertisement
  deleteAdvertisement() {
    this.service.showSpinner()
    this.service.get(`p2p-exchange/admin/delete-addvertisement?peerToPeerExchangeId=${this.peerToPeerExchangeId}`).subscribe((res) => {
      console.log(res);
      this.service.hideSpinner()
      if (res['status'] == 200) {
        this.service.toasterSucc(res['message'])
        this.router.navigate(['/advertisement-management'])
      } else {
        this.service.toasterErr(res['message'])
      }
    }, err => {
      console.log(err)
      this.service.hideSpinner()
      this.service.toasterErr(err['message'])
    })
  }

  // navigate back to advertisement management page
  cancel() {
    this.router.navigate(['/advertisement-management'])
  }
  
}
