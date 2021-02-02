import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators, FormArray, ViewChild, ElementRef } from '../../../index';
import { GlobalConstant } from '../../../global/global.constant';

declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('addProdFile')addProdFile: ElementRef

  userDetail: any = { userType: [] };
  productTypeArr: any = [];
  productForm: FormGroup;
  list: any = { orgList: [], replArr: GlobalConstant.productTypeArr, membList: [] }
  addProductImg: any = ''
  configureForm: FormGroup;
  filter: any = { limit: GlobalConstant.paginationLimit, productType: '', currPage: 1 }
  productList: any = { docs: [] };
  prodDetail: any = {};
  currId: string = '';
  isAdd: any = true;
  filterProdType: string = '';
  showComp: any ;
  bothCM: boolean;
  sellList: any =[];
  pageLimit: any;
  pageTotal: any;
  currency: any;
  constructor(private service: MainService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userDetail = JSON.parse(this.service.getStorage('userDetailYala'))
    console.log(this.userDetail)
    this.currency = this.service.currencyLogo
    this.productForm = this.fb.group({
      productType: ['', Validators.required],
      description: ['', Validators.required],
      competition: ['', Validators.required],
      size: this.fb.array([])
    })
    // this.addSize(1)
    this.configureForm = this.fb.group({
      productType: ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)])],
      replicateTo: ['', Validators.required]
    })
    this.productListApi()
    this.prodTypeListApi()
  }
  onSelectRole(event: any) {
    console.log(event.target.value)
    this.productForm.patchValue({competition: ''})
    if(event.target.value == 'competition') {
      this.showComp = 1
      this.getCompetitionListApi(1)
    } else if(event.target.value == 'membership') {
      this.showComp = 2
      this.getCompetitionListApi(2)
    } else {
      this.showComp = 3
    }
  }
  // ******************* Add Product Modal *************************** //
  async addProductModal(val) {
    let comp = this.userDetail.userType.includes('COMPETITION')
    let memb = this.userDetail.userType.includes('MEMBERSHIP')
    if(comp && !memb) {
      this.showComp = 1
      this.getCompetitionListApi(1)
    } else if(memb && !comp) {
      this.showComp = 2
      this.getCompetitionListApi(2)
    } else if(comp && memb) {
      this.bothCM = true
      this.getCompetitionListApi(1)
      this.getCompetitionListApi(2)
    }
    
    await this.prodTypeListApi()
    if(val != 1) {
      this.productForm.reset()
      this.productForm = this.fb.group({
        productType: ['', Validators.required],
        description: ['', Validators.required],
        competition: ['', Validators.required],
        size: this.fb.array([])
      })
      this.addProductImg = ''
      this.addProdFile.nativeElement.value = ''
      this.isAdd = true;
    } else {
      this.isAdd = false;
    }
    $('#org_add_product').modal({backdrop: 'static'})
  }

  prodTypeListApi() {
    return new Promise((resolve, reject) => {
      this.service.getApi(`product/selectProductType?organizerId=${this.userDetail._id}`, 1).subscribe(response => {
        if(response.responseCode == 200) {
          this.productTypeArr = response.result
          resolve(true)
        }
      })
    })
    
  }

  addSize(val) {
    this.productForm.setControl('size', this.fb.array([]))
    let item = this.productForm.get('size') as FormArray
    let arr = []
    if(val == 1) {
      arr = ['S', 'M', 'L', 'XL', 'XXL']
    } else if(val == 2) {
      arr = ['30', '32', '34', '36', '38']
    } else if(val == 3) {
      arr = ['quantity']
    }
    if(val == 1 || val == 2) {
      arr.map(x => {
        let frm = this.fb.group({
          size: x,
          checked: false,
          quantity: [{value: '', disabled: true}],
          price: [{value: '', disabled: true}]
        })
        item.push(frm)
        return x;
      })
    } else {
      let frm = this.fb.group({
        quantity: [ '', Validators.compose([Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]) ],
        price: [ '', Validators.compose([Validators.required, Validators.pattern(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/)]) ]
      })
      item.push(frm)
    }
    
    console.log(this.productForm.value)
    
  }
  // ***********************  Get competition list Api ******************************** //
  getCompetitionListApi(val) {
    
    let url = val == 2 ? `membership/selectMembership?organizerId=${this.userDetail._id}` : `data/selectCompition?userId=${this.userDetail._id}`
    // return new Promise((resolve, reject) => {
      this.service.getApi(url, 1).subscribe(response => {
        if (response['responseCode'] == 200) {
          if(val == 1) 
            this.list.orgList = response[`result`]
          else 
            this.list.membList = response['result']
          // resolve(true)
        }
      })
    // })
  }
  // *********************** End Get competition list Api ********************************** //
  onCheck(index, value) {
    let item = this.productForm.controls['size'] as FormArray
    if(value) {
      // item.controls[index]['controls']['price']
      item.controls[index].get('price').setValidators([Validators.required, Validators.pattern(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/)])
      item.controls[index].get('price').updateValueAndValidity()
      item.controls[index].get('quantity').setValidators([Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
      item.controls[index].get('quantity').updateValueAndValidity()
      item.controls[index].get('price').enable()
      item.controls[index].get('quantity').enable()
    } else {
      item.controls[index].patchValue({
        price:  '',
        quantity: ''
      })
      item.controls[index].get('price').disable()
      item.controls[index].get('quantity').disable()
      item.controls[index].get('price').clearValidators()
      item.controls[index].get('price').updateValueAndValidity()
      item.controls[index].get('quantity').clearValidators()
      item.controls[index].get('quantity').updateValueAndValidity()
    }
  }
  onSelectProdType(value) {
    if(value) {
      let replicateTo = this.productTypeArr.filter(x => x._id == value)[0].replicateTo
      if(replicateTo == 'Tshirt') this.addSize(1)
      else if(replicateTo == 'Trouser') this.addSize(2)
      else this.addSize(3)
    // else if()
    } else this.addSize(3)
    // console.log(this.productTypeArr.filter(x => x._id == value)[0].replicateTo)
 }
  get form() {
    return this.productForm.controls;
  }

  onFileSelect(event) {
    // console.log(event)
    this.service.fileChangeEvent(event).then((res: any) => {
      // console.log(res.target.result)
      this.addProductImg = res.target.result
    })
  }

  onAddProduct() {
    let arr = this.productForm.value.size.filter(x => x.checked == true)
    // console.log(this.productForm.value)
    if((this.productForm.value.size.length == 1) || arr.length) {
      let formVal = this.productForm.value
      let productData = this.productTypeArr.filter(x => x._id == formVal.productType)[0]
      
      let sizeArr = [];
      if(this.productForm.value.size.length == 1) {
        sizeArr = formVal.size
      } else {
         sizeArr = formVal.size.filter(x => x.checked).map(x => {
          delete x.checked
          return x
        })
      }
      
      let data = {
        productType: {
          productType: productData.productType,
          replicateTo: productData.replicateTo,
          _id: productData._id
        },
        description: formVal.description,
        productImage: this.addProductImg,
        price_size_qunatity: sizeArr
      }
      if(this.showComp == 1) {
        let compData = this.list.orgList.filter(x => x._id == formVal.competition)[0]
        data['competitionDetail'] =  {
          _id: compData._id,
          competitionName: compData.competitionName
        }
      } else {
        let compData = this.list.membList.filter(x => x._id == formVal.competition)[0]
        data['membershipDetail'] = {
          _id: compData._id,
          membershipName: compData.membershipName
        }
      }
      // console.log('add product => '+ JSON.stringify(formVal))
      console.log(JSON.stringify(data));
      this.service.postApi(`product/addProduct?organizerId=${this.userDetail._id}`, data, 1).subscribe(response => {
        if(response.responseCode == 201) {
          this.service.toastrSucc(response.responseMessage)
          $('#org_add_product').modal('hide')
          this.productListApi()
          this.prodTypeListApi()
        }
      })
    } else {
      this.service.toastrErr(`Please choose any size`)
    }
  }

  /**
   * Start Configure Product Section
   */
  configureModal() {
    this.configureForm.reset({replicateTo: '', productType: ''})
    $(`#config_pro`).modal({ backdrop: 'static' })
  }
  onConfigureProduct() {
    console.log('confogure data => ' + JSON.stringify(this.configureForm.value))
    let data = {
      productType: this.configureForm.value.productType,
      replicateTo: this.configureForm.value.replicateTo
    }
    this.service.postApi(`product/configureProductType?organizerId=${this.userDetail._id}`, data, 1).subscribe(response => {
      if(response.responseCode == 201) {
        this.service.toastrSucc(response.responseMessage)
        $(`#config_pro`).modal('hide')
      }
    })
  }
  get confForm() {
    return this.configureForm.controls;
  }
  /**
   * End Configure Product Section
   */

  /**
   * Start Product List Section
   */
  productListApi() {
    let data = {
      productType: this.filterProdType,
      page: this.filter.currPage,
      limit: this.filter.limit
    }
    this.service.postApi(`product/getListOfProduct?organizerId=${this.userDetail._id}`, data, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.productList = response.result
      }
    })
  }

  onPageChange(page) {
    this.filter.currPage = page
    this.productListApi()
  }

  prodDetailModal(id) {
    this.currId = id;
    this.service.getApi(`product/getProductDetail?userId=${this.userDetail._id}&productId=${this.currId}`, 1).subscribe(response => {
      if(response.responseCode == 200) {
        this.prodDetail = response.result
        $(`#addpro_detail`).modal({ backdrop: 'static' })
      }
    })

  }

  onChangeProduct() {
    this.filter.currPage = 1; 
    this.productListApi()
  }
  /**
   * End Product List Section
   */

   /**
    * Start Edit Product
    */
  editProductModal(item) {
    let replicateTo = item.productType.replicateTo
    this.productForm.reset()
    this.productForm = this.fb.group({
      productType: ['', Validators.required],
      description: ['', Validators.required],
      competition: ['', Validators.required],
      size: this.fb.array([])
    })
    this.addProdFile.nativeElement.value = ''
    if(replicateTo == 'Tshirt') this.addSize(1)
    else if(replicateTo == 'Trouser') this.addSize(2)
    else this.addSize(3)
    // this.addProductImg = item.productImage.
    this.productForm.patchValue({
      productType: this.prodDetail.productType._id,
      description: this.prodDetail.description,
      competition: this.prodDetail.competitionDetail._id
    })
    let item1 = this.productForm.controls['size'] as FormArray

    let i = 0
    if(replicateTo == 'Tshirt' || replicateTo == 'Trouser') {
      this.productForm.value.size.map( x => {
        console.log(x)
        let val = this.prodDetail.price_size_qunatity.filter(y => {
          console.log(JSON.stringify(y))
          return y.size == x.size
        })[0]
        if(val) {
          item1.controls[i].patchValue({
            price: val.price,
            quantity: val.quantity,
            checked: true
          })
          item1.controls[i+1].enable()
          return x;
        }
        i ++;
      })
    } else {
      item1.controls[i].patchValue({
        price: this.prodDetail.price_size_qunatity[0].price,
        quantity: this.prodDetail.price_size_qunatity[0].quantity
      })

    }
    
    console.log(this.productForm.value)
    this.addProductImg = this.prodDetail.productImage.url
    this.addProductModal(1)
    // $('#org_add_product').modal({backdrop: 'static'})
  }

  onUpdateProduct() {
    console.log(this.productForm.value)
    this.onAddProduct()
  }
  /**
   * End Edit Product
   */
/************* Product Sell History****************/
sellHistory(page){
  this.filter.currPage = page
  console.log("History");
  var sell = {      
    "page": this.filter.currPage,
    "limit":5,
  }
  console.log("Api Doc----> ",JSON.stringify(sell));
  var url= `product/productHistory?userId=`+this.userDetail._id;
  this.service.postApi(url, sell, 1).subscribe(response => {
    if(response.responseCode == 200) {
    console.log("Message---> ",JSON.stringify(response));
    var sellDetail = response.result;
    this.sellList = sellDetail.docs;
    this.pageLimit = sellDetail.limit;
    this.pageTotal = sellDetail.total;
    $('#sell').modal('show');
       } else if(response.responseCode == 402) {
      console.log("Message---> ",response.responseMessage);
    }
  })
}
}
