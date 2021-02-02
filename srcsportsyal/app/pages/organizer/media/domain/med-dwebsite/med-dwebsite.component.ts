import { Component, OnInit, MainService, FormGroup, FormBuilder, Validators, ActivatedRoute, Router, FormArray } from '../../../../../index';
import { FormControl, AbstractControl } from '@angular/forms';
import { IfObservable } from 'rxjs/observable/IfObservable';
@Component({
  selector: 'app-med-dwebsite',
  templateUrl: './med-dwebsite.component.html',
  styleUrls: ['./med-dwebsite.component.css']
})
/***************PROBLEMS. */
/***************User Id, Form array image. */
export class MedDwebsiteComponent implements OnInit {
  public myForm: FormGroup;
  public myFormm: FormGroup;
  public mainForm: FormGroup;
  uploadFile: any;
  binsForm: FormGroup;
  footerForm: FormGroup;
  private imageSrc: string = '';
  private imageSrc1: string = '';
  private imageSrc2: string = '';
  private imageSrc3: string = '';
  private imageSrc4: string = '';
  private imageSrc5: string = '';
  private imageSrcFooter: string[] = [];
  private imageSrcImage: string[] = [];
  private imageSrcImage1: string = '';
  marked = false;
  theCheckbox = false;
  checkbox: boolean;
  currUrl: string = '';
  secondaryMenuData: FormArray;
  footerData: FormArray;
  order: any;
  name: any;
  secondaryMenuName: any;
  email: any;
  sliderArr: any = [];
  companies: any;
  id: any;
  dynamicData: any = [];
  responseCode: number;
  arrayy: any;
  sliderImage: any;
  getSliderData: any;
  deleteSliderData: any;
  editSliderData: any = [];
  addsliderData: any = [];
  firstImage: any;
  firstLink: any;
  secondLink: any;
  thirdLink: any;
  forthLink: any;
  fifthLink: any;
  sixthLink: any;
  Link1: any;
  Link2: any;
  Link3: any;
  Link4: any;
  Link5: any;
  Link6: any;
  image: any;
  image1: any;
  imageSrcOne: any = [];
  target: any;
  sliderId: any;
  sliderId1: any;
  sliderId2: any;
  sliderId3: any;
  sliderId4: any;
  sliderId5: any;
  sliderId6: any;
  delId: any;

  imagee: any;
  order1: any;
  secondaryMenuName1: any;
  link1: any;
  facebookLink: any;
  instagramLink: any;
  twitterLink: any;
  googleLink: any;
  bins: any[] = [];
  footerArray: any[] = [];
  anotherArray: any;
  indexvalue: any;
  indexOfImage: any;
  indexOfFooter: any;
  indexOfSecondary: any;
  footerArrayData: any;
  footerArrayLength: any;
  secondaryMenuLength: number;
  footerUserId: any;
  indexOfFooterImage: any;
  loopdata2: any[] = [];
  loopdata: any[] = [];
  userId: any;
  footerImage: any[] = [];
  constructor(private service: MainService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.userId = JSON.parse(this.service.getStorage('userDetailYala'))._id,
        console.log("userId===>>>",this.userId)

    this.getFooterMenuData();
    this.getSecondaryMenuData();
    this.getSlider();
    this.getSocialLink();

    this.currUrl = this.router.url.split('/').splice(1, 2).join('/');
    this.myForm = this.fb.group({
      secondaryMenuData: this.fb.array([this.createItemm()])
    }),
      this.myFormm = this.fb.group({
        footerData: this.fb.array([this.createItem()])
      })
    this.mainForm = new FormGroup({
      'checkbox1': new FormControl(''),
      'checkbox2': new FormControl(''),
      'checkbox3': new FormControl(''),
      'checkbox4': new FormControl(''),
      'checkbox5': new FormControl(''),
      'checkbox6': new FormControl(''),
      'facebook': new FormControl(''),
      'instagram': new FormControl(''),
      'twitter': new FormControl(''),
      'googleanalytics': new FormControl(''),
      'id': new FormControl(''),
      'order': new FormControl(''),
      'name': new FormControl(''),
      'footerMenuName': new FormControl(''),
      'link': new FormControl(''),
      'footerImage': new FormControl(''),
      'secondaryImage': new FormControl(''),
      'imagee': new FormControl(''),
      'image1': new FormControl(''),
      'secondaryMenuName': new FormControl(''),
      'Link1': new FormControl(''),
      'Link2': new FormControl(''),
      'Link3': new FormControl(''),
      'Link4': new FormControl(''),
      'Link5': new FormControl(''),
      'Link6': new FormControl(''),
    }),

      this.footerForm = new FormGroup({
        'order': new FormControl(''),
        'footerMenuName': new FormControl(''),
        'link': new FormControl(''),
        'footerImage': new FormControl(''),
        'footerArray': new FormControl('')
      }),

      this.binsForm = new FormGroup({
        'order': new FormControl(''),
        'secondaryMenuName': new FormControl(''),
        'link': new FormControl(''),
        'secondaryImage': new FormControl(''),
        'bins': new FormControl('')
      })

  }

  setUpForm(bins: any[]) {
    return new FormGroup({
      bins: new FormArray(bins.map((bin) => this.createBin(bin)))
    });
  }

  get binsFormArray() {
    return (this.binsForm.get('bins') as FormArray);
  }

  addBin() {
    let newBin = {};
    this.bins.push(newBin);
    this.binsFormArray.push(this.createBin(newBin));
  }

  deleteCompany(index) {
    console.log("index number===>>>>", index)
    let control = <FormArray>this.binsForm.controls.bins;
    control.removeAt(index)
  }

  save() {
    console.log(this.binsForm.value);
  }

  createBin(bin: any) {
    return new FormGroup({
      order: new FormControl(bin.order || ''),
      secondaryMenuName: new FormControl(bin.secondaryMenuName || ''),
      link: new FormControl(bin.link || ''),
      image: new FormControl(this.imageSrcImage[this.indexOfImage] || '')
    })
  }

  Indexxx(i) {
    this.indexOfSecondary = i;
    console.log("indexOfSecondary===>>>>>", i)
  }

  Indexx(i) {
    this.indexOfFooter = i;
    console.log("indexOfFooter====>>>>", i);
  }

  getSecondaryMenuData() {
    this.service.getApi(`configuration_domain/getSecondaryMenu`, 0).subscribe(response => {
      console.log("getSecondaryMenu======>>>>>>", response)
      if (response.responseCode == 200) {
        this.loopdata = response.result[0].secondaryMenu;
        this.secondaryMenuLength = this.loopdata.length;
        this.anotherArray = response.result[0];
        this.bins = this.loopdata;
        this.patchdata();
        for (let i = 0; i <= this.secondaryMenuLength; i++) {
          this.imageSrcImage[i] = response.result[0].secondaryMenu[i].image;
        }
        console.log("secondaryMenuLength====>>>>", this.secondaryMenuLength);
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });

  }

  editSecondaryMenuData() {
    let binsformValue = this.binsForm.value;
    let i = this.indexOfSecondary
    let apiReq = {
      secondaryMenuId: this.anotherArray._id,
      _id: this.loopdata[i]._id,
      order: binsformValue.bins[i].order,
      secondaryMenuName: binsformValue.bins[i].secondaryMenuName,
      link: binsformValue.bins[i].link,
      image: this.imageSrcImage[i]

    }
    console.log("apiReq===>>>>>", apiReq)
    console.log("binsformValue====>>>>>", binsformValue)
    this.service.postApi(`configuration_domain/editSecondaryMenu`, apiReq, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg);
      }
      else {
        this.service.toastrErr(response.responseMsg);
      }
    })
  }

  editFooterMenuData() {
    let footerFormValue = this.footerForm.value;
    let i = this.indexOfFooter
    let apiReq = {
      footerMenuId: this.footerArrayData._id,
      _id: this.footerArray[i]._id,
      order: footerFormValue.footerArray[i].order,
      footerMenuName: footerFormValue.footerArray[i].footerMenuName,
      link: footerFormValue.footerArray[i].link,
      image: this.imageSrcFooter[i]

    }
    console.log("apiReq===>>>>>", apiReq)
    console.log("footerFormValue====>>>>>", footerFormValue)
    this.service.postApi(`configuration_domain/editFooterMenu`, apiReq, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg);
      }
      else {
        this.service.toastrErr(response.responseMsg);
      }
    })
  }


  deleteCompanyy(index) {
    console.log("index number===>>>>", index)
    let control = <FormArray>this.footerForm.controls.footerArray;
    control.removeAt(index)
  }

  deleteSecondaryMenuData(i) {
    let apiReq = {
      menuId: this.anotherArray._id,
      secondaryMenuId: this.loopdata[i]._id,
    }
    console.log("apiReq====>>>>>", apiReq);
    this.service.postApi(`configuration_domain/deleteSecondaryMenu`, apiReq, 0).subscribe(response => {
      console.log("responseDeleteSecondary====>>>>>", response);
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg);
        this.getSecondaryMenuData();
      }
      else
      {
        this.service.toastrErr(response.responseMsg);
      }
    })

  }

  deleteFooterMenuData(i) {
    let apiReq = {
      footerId: this.footerArrayData._id,
      footerMenuId: this.footerArray[i]._id,
    }
    console.log("apiReq====>>>>>", apiReq);
    this.service.postApi(`configuration_domain/deleteFooterMenu`, apiReq, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMessage);
        
        this.getFooterMenuData();
      }
      else
      {
        this.service.toastrErr(response.responseMessage);
      }
    })

  }

  addFooterMenuData() {
    if (this.footerArrayLength == 0) {
      console.log("Form Value====>>>>>", this.footerForm.value);
      let myFormData = this.footerForm.value;
      console.log("myFormData===>>>", myFormData);
      let reqData = {
        userId: this.userId,
        footerMenu: myFormData.footerArray,
      }
      console.log("reqData=====>>>>>", reqData)
      this.service.postApi(`configuration_domain/addFooterMenu`, reqData, 0).subscribe(response => {
        console.log("response=====>>>>>>>>", response)
        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMsg)
          console.log("response====>>>>>", response)
        }
        else {
          console.log("else")
        }
      })

    }

    else if (this.footerArrayLength != 0) {
      let j = this.indexOfFooter;
      let myFormData = this.footerForm.value;
      let Apireq2 = [myFormData.footerArray[j]];
      let reqData = {
        userId: this.userId,
        footerMenu: Apireq2,
      }
      console.log("reqData=====>>>>>", reqData)
      this.service.postApi(`configuration_domain/addFooterMenu`, reqData, 0).subscribe(response => {
        console.log("response=====>>>>>>>>", response)
        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMsg)
          console.log("response====>>>>>", response)
        }
        else {
          console.log("else")
        }
      })
    }

  }


  getFooterMenuData() {
    this.service.getApi(`configuration_domain/getFooterMenu`, 0).subscribe(response => {
      console.log("responseFooterData===>>>>", response);
      if (response.responseCode == 200) {
        this.loopdata2 = response.result[0].footerMenu;
        this.footerArray = this.loopdata2;
        this.footerArrayLength = this.footerArray.length;
        this.footerArrayData = response.result[0];
        this.patchfooterdata();
        for (let i = 0; i <= this.footerArrayLength; i++) {
          this.imageSrcFooter[i] = this.footerArray[i].image;
        }
      }
    }, error => {
      this.service.toastrErr('Something went wrong');
    });

  }

  patchfooterdata() {
    this.footerForm = this.setUpFormm(this.footerArray);
    this.footerForm.patchValue(this.footerArray);
  }

  patchdata() {
    this.binsForm = this.setUpForm(this.bins);
    this.binsForm.patchValue(this.bins);
  }


  setUpFormm(footerArray: any[]) {
    return new FormGroup({
      footerArray: new FormArray(footerArray.map((foot) => this.createBinn(foot)))
    });
  }

  get binsFormArrayy() {
    return (this.footerForm.get('footerArray') as FormArray);
  }

  addBinn() {
    let newBinn = {};
    this.footerArray.push(newBinn);
    this.binsFormArrayy.push(this.createBinn(newBinn));
  }

  savee() {
    console.log(this.footerForm.value);
  }

  createBinn(foot: any) {
    return new FormGroup({
      order: new FormControl(foot.order || ''),
      footerMenuName: new FormControl(foot.footerMenuName || ''),
      link: new FormControl(foot.link || ''),
      image: new FormControl(foot.footerImage || '')
    })
  }




  addSlider() {
    this.service.spinnerShow();
    this.saveInfoo();
    let addsliderData = {
      userId: this.userId,
      slider: [
        {
          image: this.imageSrc,
          link: this.mainForm.value.Link1
        },
        {
          image: this.imageSrc1,
          link: this.mainForm.value.Link2
        },
        {
          image: this.imageSrc2,
          link: this.mainForm.value.Link3
        },
        {
          image: this.imageSrc3,
          link: this.mainForm.value.Link4
        },
        {
          image: this.imageSrc4,
          link: this.mainForm.value.Link5
        },
        {
          image: this.imageSrc5,
          link: this.mainForm.value.Link6
        }
      ]
    }

    console.log("addsliderData====>>>>>>>", addsliderData);
    this.service.postApi(`configuration_domain/addSlider`, addsliderData, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg);
        console.log("response====>>>>>>>", response)
      }
      else {
        this.service.spinnerShow();
        this.service.toastrSucc(response.responseMsg);
        console.log("else")
      }
    })
  }

  getSlider() {
    this.service.getApi(`configuration_domain/getSlider`, 0).subscribe(response => {
      if (response.responseCode == 200) {
        console.log("getSliderAPI===>>>>>", response)
        this.sliderArr = response.success;
        console.log("sliderArr===>>>>", this.sliderArr)
        this.sliderId = response.success[0].slider;
        this.imageSrc = response.success[this.sliderArr.length - 1].slider[0].image;
        this.imageSrc1 = response.success[this.sliderArr.length - 1].slider[1].image;
        this.imageSrc2 = response.success[this.sliderArr.length - 1].slider[2].image;
        this.imageSrc3 = response.success[this.sliderArr.length - 1].slider[3].image;
        this.imageSrc4 = response.success[this.sliderArr.length - 1].slider[4].image;
        this.imageSrc5 = response.success[this.sliderArr.length - 1].slider[5].image;
        this.firstLink = response.success[this.sliderArr.length - 1].slider[0].link;
        this.secondLink = response.success[this.sliderArr.length - 1].slider[1].link;
        this.thirdLink = response.success[this.sliderArr.length - 1].slider[2].link;
        this.forthLink = response.success[this.sliderArr.length - 1].slider[3].link;
        this.fifthLink = response.success[this.sliderArr.length - 1].slider[4].link;
        this.sixthLink = response.success[this.sliderArr.length - 1].slider[5].link;
        this.sliderId1 = response.success[this.sliderArr.length - 1].slider[0]._id;
        this.sliderId2 = response.success[this.sliderArr.length - 1].slider[1]._id;
        this.sliderId3 = response.success[this.sliderArr.length - 1].slider[2]._id;
        this.sliderId4 = response.success[this.sliderArr.length - 1].slider[3]._id;
        this.sliderId5 = response.success[this.sliderArr.length - 1].slider[4]._id;
        this.sliderId6 = response.success[this.sliderArr.length - 1].slider[5]._id;
      }
      this.mainForm.patchValue({
        Link1: this.firstLink,
        Link2: this.secondLink,
        Link3: this.thirdLink,
        Link4: this.forthLink,
        Link5: this.fifthLink,
        Link6: this.sixthLink
      })
    }, error => {
      this.service.toastrErr('Something went wrong');
    });

  }

  editSlider() {
    let editSliderData = {
      sliderId: this.sliderArr[this.sliderArr.length - 1]._id,

      slider: [
        {
          _id: this.sliderArr[this.sliderArr.length - 1].slider[0]._id,
          image: this.imageSrc,
          link: this.mainForm.value.Link1
        },
        {
          _id: this.sliderArr[this.sliderArr.length - 1].slider[1]._id,
          image: this.imageSrc1,
          link: this.mainForm.value.Link2
        },
        {
          _id: this.sliderArr[this.sliderArr.length - 1].slider[2]._id,
          image: this.imageSrc2,
          link: this.mainForm.value.Link3
        },
        {
          _id: this.sliderArr[this.sliderArr.length - 1].slider[3]._id,
          image: this.imageSrc3,
          link: this.mainForm.value.Link4
        },
        {
          _id: this.sliderArr[this.sliderArr.length - 1].slider[4]._id,
          image: this.imageSrc4,
          link: this.mainForm.value.Link5
        },
        {
          _id: this.sliderArr[this.sliderArr.length - 1].slider[5]._id,
          image: this.imageSrc5,
          link: this.mainForm.value.Link6
        }
      ]

    }
    console.log("editSliderData===>>>", editSliderData);

    this.service.postApi(`configuration_domain/editSlider`, editSliderData, 0).subscribe(response => {
      console.log("response=====>>>>>>>>", response)
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg)
        console.log("response====>>>>>", response)
      }
      else {
        console.log("else")
      }
    })
  }



  deleteSlider() {
    if (this.marked == true) {
      let deleteSliderData = {
        sliderId: this.delId,
        userId: this.userId,
      }
      console.log("deleteSliderData====>>>>>>", deleteSliderData);
      this.service.postApi(`configuration_domain/deleteSlider`, deleteSliderData, 0).subscribe(response => {

        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMsg)
          console.log("response===>>>>", response);
          this.getSlider();
        }
        else {
          console.log("else")
        }
      })

    }
  }


  saveInfoo() {
    alert(JSON.stringify(this.myForm.value))
    let dynamicData = {
      "order": this.myForm.value.order,
      "name": this.myForm.value.name,
      "link": this.myForm.value.email,
    }
    console.log("dynamicData====>>>>", this.myForm.value);
    this.service.postApi(`organizer/dWebConfiguration`, dynamicData, 1).subscribe(response => {
      console.log("postApi===>>>")
      if (this.responseCode == 200) {
        console.log("responseCode==200");
        this.dynamicData = (response.result).reverse();
      }
      else {
        this.service.toastrSucc(response.responseMsg);
      }
    })
  }

  toggleVisibility(e, delId) {
    console.log(e)
    console.log(delId)
    this.marked = e.target.checked;
    this.delId = delId;
    console.log("marked", this.marked)
    console.log("id", this.delId)

  }

  toggleVisibility1(e) {
    this.marked = e.target.checked;
    console.log("marked===>>>", this.marked);
  }

  changeImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.sliderImage = event.target[`result`];
      }
    }
  }



  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }



  handleInputChange1(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded1.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded1(e) {
    let reader = e.target;
    this.imageSrc1 = reader.result;
    console.log(this.imageSrc1)
  }




  handleInputChange2(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded2(e) {
    let reader = e.target;
    this.imageSrc2 = reader.result;
    console.log(this.imageSrc2)
  }




  handleInputChange3(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded3.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded3(e) {
    let reader = e.target;
    this.imageSrc3 = reader.result;
    console.log(this.imageSrc3)
  }




  handleInputChange4(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded4.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded4(e) {
    let reader = e.target;
    this.imageSrc4 = reader.result;
    console.log(this.imageSrc4)
  }




  handleInputChange5(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded5.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded5(e) {
    let reader = e.target;
    this.imageSrc5 = reader.result;
    console.log(this.imageSrc5)
  }



  removeImage(image) {
    this.image = image
    console.log("remove image", image, this.imageSrc5)
    if (this.image == this.imageSrc) {
      this.imageSrc = null;
    }
    else if (this.image == this.imageSrc1) {
      this.imageSrc1 = null;
    }
    else if (this.image == this.imageSrc2) {
      this.imageSrc2 = null;
    }
    else if (this.image == this.imageSrc3) {
      this.imageSrc3 = null;
    }
    else if (this.image == this.imageSrc4) {
      this.imageSrc4 = null;
    }
    else if (this.image == this.imageSrc5) {
      this.imageSrc5 = null;
    }
    else (this.imageSrc5)
    {
      this.service.toastrErr("Image removed successfully.");
    }

  }


  handleInputChangeImage(e, i) {
    this.indexOfImage = i;
    console.log("indexOfImage===>>>", this.indexOfImage)
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoadedImage.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoadedImage(e) {
    console.log("indexOfImage====>>>>", this.indexOfImage);
    let reader = e.target;
    this.imageSrcImage[this.indexOfImage] = reader.result;
    console.log('base64===>>>>>', this.imageSrcImage[this.indexOfImage])
  }


  handleInputChangeFooter(e, i) {
    this.indexOfFooter = i;
    console.log("indexOfFooterImage====>>>>", this.indexOfFooter)
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoadedFooter.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoadedFooter(e) {
    console.log("indexOfFooterImage====>>>>", this.indexOfFooter)
    let reader = e.target;
    this.imageSrcFooter[this.indexOfFooter] = reader.result;
    console.log('base64===>>>>>', this.imageSrcFooter[this.indexOfFooter])
  }



  createItemm() {
    return this.fb.group({
      order: [''],
      secondaryMenuName: [''],
      link: [''],
      image: [this.imageSrcImage],
    })
  }

  addItem() {
    this.secondaryMenuData = this.myForm.get('secondaryMenuData') as FormArray;
    this.secondaryMenuData.push(this.createItemm());
  }

  deleteCompany1(index) {
    let control = <FormArray>this.myForm.controls.secondaryMenuData;
    control.removeAt(index)
  }

  addSecondaryMenuData() {
    if (this.secondaryMenuLength == 0) {
      let myFormData = this.binsForm.value;

      console.log("binsFormValue===>>>>", myFormData.bins)
      let postData = {
        userId: this.userId,
        secondaryMenu: myFormData.bins,

      }
      console.log("myFormData===>>>", postData);

      this.service.postApi(`configuration_domain/addSecondaryMenu`, postData, 0).subscribe(response => {
        console.log("response=====>>>>>>>>", response)
        if (response.responseCode == 200) {
          this.service.toastrSucc(response.responseMsg)
        }
        else {
          this.service.toastrErr(response.responseMsg)
          console.log("else")
        }
      })
    }
    else if (this.secondaryMenuLength != 0) {
      let j = this.indexOfSecondary;
      let myFormValue = this.binsForm.value;
      let Apireq1 = [myFormValue.bins[j]];
      console.log("binsForm Value secondaryMenuLength==0===>>>>", myFormValue)
      let Apireq = {
        userId: this.userId,
        secondaryMenu: Apireq1,
      }
      console.log("myFormData===>>>", Apireq);

      this.service.postApi(`configuration_domain/addSecondaryMenu`, Apireq, 0).subscribe(success => {
        console.log("success=====>>>>>>>>", success)
        if (success.responseCode == 200) {
          this.service.toastrSucc(success.responseMsg)
        }
        else {
          this.service.toastrErr(success.responseMsg)
          console.log("else")
        }
      })
    }
  }


  createItem() {
    return this.fb.group({
      order: [''],
      name: [''],
      link: [''],
      image: ['']
    })
  }
  addItemm() {
    this.footerData = this.myFormm.get('footerData') as FormArray;
    this.footerData.push(this.createItem());
  }


  deleteCompanym(index) {
    let control = <FormArray>this.myFormm.controls.footerData;
    control.removeAt(index)
  }


  addFacebookLink() {
    let obj = {
      userId: this.userId,
      socialName: "FACEBOOK",
      link: this.mainForm.value.facebook
    }

    this.service.postApi(`configuration_domain/addSocialWork`, obj, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg);
        console.log("response====>>>>>>>", response)
      }
      else {
        this.service.spinnerShow();
        this.service.toastrSucc(response.responseMsg);
        console.log("else")
      }
    })

  }

  addInstagramLink() {
    let obj = {
      userId: this.userId,
      socialName: "INSTAGRAM",
      link: this.mainForm.value.instagram
    }

    this.service.postApi(`configuration_domain/addSocialWork`, obj, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg);
        console.log("response====>>>>>>>", response)
      }
      else {
        this.service.spinnerShow();
        this.service.toastrSucc(response.responseMsg);
        console.log("else")
      }
    })

  }

  addTwitterLink() {
    let obj = {
      userId: this.userId,
      socialName: "INSTAGRAM",
      link: this.mainForm.value.twitter
    }

    this.service.postApi(`configuration_domain/addSocialWork`, obj, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg);
        console.log("response====>>>>>>>", response)
      }
      else {
        this.service.spinnerShow();
        this.service.toastrSucc(response.responseMsg);
        console.log("else")
      }
    })

  }

  addGoogleAnalyticsLink() {
    let obj = {
      userId: this.userId,
      socialName: "INSTAGRAM",
      link: this.mainForm.value.googleanalytics
    }

    this.service.postApi(`configuration_domain/addSocialWork`, obj, 0).subscribe(response => {
      if (response.responseCode == 200) {
        this.service.toastrSucc(response.responseMsg);
        console.log("response====>>>>>>>", response)
      }
      else {
        this.service.spinnerShow();
        this.service.toastrSucc(response.responseMsg);
        console.log("else")
      }
    })

  }

  getSocialLink() {
    this.service.getApi(`configuration_domain/getSocialWork`, 0).subscribe(success => {
      if (success.responseCode == 200) {
        // console.log("Success===>>>>", success)
        this.facebookLink = success.getData[1].link;
        this.instagramLink = success.getData[2].link;
        this.twitterLink = success.getData[3].link;
        this.googleLink = success.getData[4].link;
      }
      else {
        console.log("Error")
      }

    })

  }

  preventSpace(event, i) {
    this.indexvalue = i;
    console.log("indexvalue====>>>>>", this.indexvalue)
    if ((event.charCode == 32 || event.charCode == 8 || event.charCode == 64) && !event.target.value) {
      event.preventDefault();
    } else {
    }
    console.log('event charCode check', event.charCode)
  }


}
