import { Component, OnInit, MainService } from '../../../../index';

declare var $: any;
@Component({
  selector: 'app-comp-products',
  templateUrl: './comp-products.component.html',
  styleUrls: ['./comp-products.component.css']
})
export class CompProductsComponent implements OnInit {
  userDetail: any = {};
  constructor(private service: MainService) {
  }

  ngOnInit() {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
  }

  addProductModal() {
    this.service.getApi(`product/selectProductType?organizerId=${this.userDetail._id}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        
        $('#org_add_product').modal({backdrop: 'static'})
      }
    })
    
  }

}
