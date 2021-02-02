import { Component, OnInit, MainService, ActivatedRoute, DomSanitizer, FormGroup, FormBuilder, Validators } from '../../../../index';
import { GlobalConstant } from '../../../../global/global.constant';
declare var $:any
declare var TCO:any
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {  
  userDetail: any = { userType: [] };
  filterProdType: string = '';
  productList:any={}
  filter: any = { limit: GlobalConstant.paginationLimit, productType: '', currPage: 1 }
  competitionId: any;
  organizerId: any;
  pagination:any = { itemPP: '', currPage: '', total:''}
  currPage: any;
  productId:any;
  productDetails:any={}
  selected_size:any=''
  selected_price:any=0
  stockAvailable:any;
  currencyLogo:any;
  profileDet:any={}
  list:any= { cardList: [] };
  addonArr: any =[]
  cardForm: FormGroup
  size: any;
  price: any;
  membershipId: any;
  num: any;
  constructor(private service: MainService, private route: ActivatedRoute, public sanitizer: DomSanitizer, private fb : FormBuilder) {    
    this.currencyLogo= service.currencyLogo
this.cardForm = this.fb.group({
  'expiryDate' : ['', Validators.compose([Validators.required, Validators.pattern(/^[2][0][1-9][0-9][-]0[1-9]|1[012]$/)])],
  'card':['',Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]{7,15}$/)])],
  'cvv':['',Validators.compose([Validators.required, Validators.pattern(/^[0-9]{3}$/)])]
})
   }

  async ngOnInit() {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    this.route.params.subscribe(async params => {
      console.log(`TO C PARAM-->`, params)
      this.competitionId = params['compId']
      this.organizerId = params['orgId']
      this.num = params['num']
    })
    await this.productListApi()

  }
  get cf() {
    return this.cardForm.controls;
  }
  productListApi() {
    var url:any =''
    console.log(`competitionId${this.competitionId} this.num ${ this.num}`)
    if(this.num == "2"){url = `product/showProductList?organizerId=${this.organizerId}&membershipId=${this.competitionId}&userId=${this.userDetail._id}` } 
    else if(this.num == "1" ){url = `product/showProductList?organizerId=${this.organizerId}&competitionId${this.competitionId}&userId=${this.userDetail._id}`}
    let data = {
      productType: this.filterProdType,
      page: this.filter.currPage,
      limit:  5//this.filter.limit
    }
    this.service.postApi(url, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.productList = response.result
        this.pagination.itemPP = this.productList.limit
        this.pagination.currPage = this.productList.page
        this.pagination.total = this.productList.total
        for(let i=0; i<this.productList.docs.length; i++){
          this.productList.docs[i].productImage.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.productList.docs[i].productImage.url)
        }
      }
    })
  }
  onPageChange(page) {
    this.filter.currPage = page
    this.productListApi()
  }
  onChangeProduct() {
    this.filter.currPage = 1; 
    this.productListApi()
  }

  prodDetailModal(id){
    this.productId = id
  $('#shop_view_modal').modal('show')
  this.service.getApi(`product/getProductDetail?userId=${this.userDetail._id}&productId=${id}`, 1).subscribe(response => {
    if(response.responseCode == 200) {        
      this.productDetails = response['result']
    }
  })
  }
  goPay(id,selected_price,selected_size){ 
    this.size = selected_size
    this.price= selected_price
    this.getProfileApi()
  }

  getProfileApi() {
    this.service.getApi(`users/getDetail?_id=${this.userDetail._id}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.profileDet = response.result
        this.list.cardList = this.profileDet.cardDetails
        this.addonArr=[]
      }
    })
  }
  pay() {
    var self = this;
    TCO.loadPubKey('sandbox', function() {
      self.service.spinnerShow()
      var tokenData = {
        sellerId: GlobalConstant.paymentCredential.sellerId,//901386003
        publishableKey: GlobalConstant.paymentCredential.publishableKey,//4769A4CA-5488-4585-B1DF-B8AB85753020
        ccNo: self.cardForm.value.card,//"4111111111111111"
        cvv: self.cardForm.value.cvv,
        expMonth: self.cardForm.value.expiryDate.split('-')[1],
        expYear: self.cardForm.value.expiryDate.split('-')[0]
      }
      TCO.requestToken(succToken, errToken, tokenData)
      });​
      var succToken = function(data) {
        let newArr = self.addonArr.filter(x => x.checked).map(x => x.name)
        self.service.spinnerHide()
        let tokenData = Object.assign({data}, { size: self.size, price: self.price} )
        self.service.postApi(`product/buyProduct?userId=${self.userDetail._id}&productId=${self.productId}`, tokenData, 1).subscribe(response => {
          if(response.responseCode == 200) {
            self.addonArr.map(x => {
              return Object.assign(x, {checked: false})
            })
            self.getProfileApi()
            $('#paymentPlanChange').modal('hide')
            self.service.toastrSucc(response.responseMessage)
          }
        })
      }
      var errToken = function(err) {
        self.service.spinnerHide()
        self.service.toastrErr(`Payment failed`)
      }
  }

}
