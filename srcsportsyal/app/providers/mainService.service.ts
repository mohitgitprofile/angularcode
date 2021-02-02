// import { Injectable } from '@angular/core';
import { HttpClient, Observable, Injectable, NgxSpinnerService, ToastrService, HttpHeaders } from '../index';
import 'rxjs/add/observable/forkJoin';
import { resolve } from '../../../node_modules/@types/q';
declare var TCO: any;
import { GlobalConstant } from '../global/global.constant'
import { Subject } from 'rxjs';
@Injectable()

export class MainService {
    currencyLogo: any= 'AED';
    //  baseUrl: String = `http://162.222.32.20:1414/api/v1/`;
    //  baseUrl:String = 'http://172.16.6.177:1414/api/v1/' // Anurag
    //  baseUrl: String = 'http://172.16.2.3:1527/api/v1/'      // Najmu

      //  baseUrl: String = 'http://172.16.16.232:1527/api/v1/'//Rajat Pathak

       baseUrl: String = 'http://182.72.203.245:1808/api/v1/'
       
  // baseUrl: String ='http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1527/api/v1/' //Rajat pathak stagging

    //  baseUrl: String ='http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1527/api/v1/' 
    //  baseUrl : String = 'http://172.16.2.7:1414/api/v1/'  // dheeraj
    //  baseUrl:String = 'http://172.16.6.254:1414/api/v1/' // Mansi Mam
    loginRes: any =  {};
    headerSub = new Subject();
    headerObs = this.headerSub.asObservable();
    mediaList: any = {};
    userDetails: any;
    userId: any;
    constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) {
        // alert('providers')
    }


    //    Get Api Call
    getApi(url, isHeader): Observable<any> {
        let httpOptions = {};
        if (isHeader == 0) {
          return this.http.get((this.baseUrl + url));
        } else if (isHeader == 1) {
            httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json' ,
                    'userId': JSON.parse(this.getStorage('userDetailYala'))._id,
                    'token': JSON.parse(this.getStorage('userDetailYala')).token
                  })
            };
            return this.http.get((this.baseUrl + url), httpOptions);
        }


    }
    //  End Get Api Call

    //  Post Api Call
    postApi(url, data, isHeader): Observable<any> {
        let httpOptions = {};
        if (isHeader == 0) {
          return this.http.post((this.baseUrl + url), data);
        } else if (isHeader == 1) {
            httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json' ,
                  'userId': JSON.parse(this.getStorage('userDetailYala'))._id,
                  'token': JSON.parse(this.getStorage('userDetailYala')).token
                })
            };
            return this.http.post((this.baseUrl + url), data, httpOptions);
        } else if (isHeader == 2) {
            httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json' ,
                  'userId': this.loginRes.result._id,
                  'token': this.loginRes.token
                })
            };
            return this.http.post((this.baseUrl + url), data, httpOptions);
        }
        console.log("Login Details====>>>>>",this.loginRes)
    }
    // End  Post Api Call
    // FormData Post Api Call
        postApi1(url, data, isHeader): Observable<any> {
            let httpOptions = {}
            if(isHeader == 0)
                return this.http.post((this.baseUrl + url), data)
            else if(isHeader == 1) {
                httpOptions = {
                    headers: new HttpHeaders({ "userId": JSON.parse(this.getStorage('userDetailYala'))._id, "token": JSON.parse(this.getStorage('userDetailYala')).token  })
                }
                return this.http.post((this.baseUrl + url), data, httpOptions)
            } else if(isHeader == 2) {
                httpOptions = {
                    headers: new HttpHeaders({ "userId": this.loginRes.result._id, "token": this.loginRes.token  })
                }
                return this.http.post((this.baseUrl + url), data, httpOptions)
            }

        }
        // End FormData Post Api Call

    multipleGetApi(...urls) {
        let httpOptions = {
            headers: new HttpHeaders({ "Content-Type": "application/json" , "userId": JSON.parse(this.getStorage('userDetailYala'))._id, "token": JSON.parse(this.getStorage('userDetailYala')).token  })
        }
        let newArr = urls.map(i => this.http.get( (this.baseUrl + i), httpOptions ) )
        console.log(newArr)
        return Observable.forkJoin(newArr)
    }
    multiplePostApi(...arr) {
        console.log(arr)
        let httpOptions = {
            headers: new HttpHeaders({ "Content-Type": "application/json" , "userId": JSON.parse(this.getStorage('userDetailYala'))._id, "token": JSON.parse(this.getStorage('userDetailYala')).token  })
        }
        let newArr = arr.map(i => this.http.post((this.baseUrl + i.url), i.data, httpOptions ))
        console.log(newArr)
        return Observable.forkJoin(newArr)
    }

    spinnerShow() {
        this.spinner.show();
    }

    spinnerHide() {
        this.spinner.hide()
    }
    toastrSucc(msg) {
        console.log('succ')
        this.toastr.success(msg)
    }

    toastrErr(msg) {
        console.log('error')
        this.toastr.error(msg)
    }
    //  Set LocalStorage Value
    setStorage(key, val) {
        localStorage.setItem(key, val)
    }
    //  End Set LocalStorage Value

    //  Get LocalStorage Value
    getStorage(key) {
        return localStorage.getItem(key)
    }
    //  End Get LocalStorage Value  //

    // Remove LocalStorage
    removeStorage(key) {
        if(localStorage.getItem(key) !== null) {
            localStorage.removeItem(key)
        }
    }

    fileChangeEvent(fileInput: any) {
        return new Promise((resolve, reject) => {
            if(fileInput.target.files && fileInput.target.files[0]) {
                let reader = new FileReader();
                // let self = this;
                reader.onload = (e: any) =>  {
                  resolve(e)
                //   self.addFileData.file = e.target.result
                }
                reader.readAsDataURL(fileInput.target.files[0])
              }
        })

      }
      printFun(id): void {
        console.log('id =====>>>', id);
        let printContents, popupWin;
        printContents = document.getElementById(id).innerHTML;
        console.log('printContents ===>>>', printContents);
        popupWin = window.open('', '_blank', 'top=70px,left=0,height=100%,width=auto');
        console.log('popupWin ===>>>', popupWin);
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>Print tab</title>
              <style>
              //........Customized style.......
              .table-block .table-bordered thead th{
                font-weight:normal;
                vertical-align: middle;
            }
            .table-head-bg {
              color: #fff;
              background-color: #1e8ea8;
          }
          .table-block .table-bordered thead th, .table-block .table-bordered tbody td {
            border: 1px solid #ddd;
        }
        .extra-large-table th, tr {
          text-align: center;
      }
              </style>
            </head>
        <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
      }


      headerSubChange(msg) {
        this.headerSub.next(msg)
      }
      

    //   pay(fo) {
    //     var self = this;
    //     TCO.loadPubKey('sandbox', function() {
    //       self.spinner.show()
    //       // Execute when Public Key is available
    //       console.log('initiate ')
    //       var tokenData = {
    //         sellerId: GlobalConstant.paymentCredential.sellerId,//901386003
    //         publishableKey: GlobalConstant.paymentCredential.publishableKey,//4769A4CA-5488-4585-B1DF-B8AB85753020
    //         ccNo: self.cardForm.value.card,//"4111111111111111"
    //         cvv: self.cardForm.value.cvv,
    //         expMonth: self.cardForm.value.expiryDate.split('-')[1],
    //         expYear: self.cardForm.value.expiryDate.split('-')[0]
    //       }
    //       console.log(tokenData)
    //       TCO.requestToken(succToken, errToken, tokenData)
    //       });​
    //       var succToken = function(data) {
    //         let newArr = self.addonArr.filter(x => x.checked).map(x => x.name)
    //         console.log('succ token=> '+ JSON.stringify(data))
    //         self.spinner.hide()
    //         let tokenData = Object.assign({}, { optionalSubsPrices: newArr, subscription: self.newPlan, autoRenewPlan: self.autoRenewPlan }, data)
    //         self.service.postApi(`users/paymentOrder`, tokenData, 1).subscribe(response => {
    //           if(response.responseCode == 200) {
    //             $('#paymentPlanChange').modal('hide')
    //             self.service.toastrSucc(response.responseMessage)
    //             // self.service.setStorage( 'userDetailYala', JSON.stringify({token: self.loginRes.token, role: self.loginRes.result.role[0], userType: self.loginRes.result.organizerType, _id: self.loginRes.result._id}) )
    //             // self.router.navigate(['/organizer/dataTeams'])
    //           }
    //         })
    //       }
    //       var errToken = function(err) {
    //         console.log('err token => '+ JSON.stringify(err))
    //         self.spinner.hide()
    //       }
    //   }

    preventSpace(event){
        if((event.charCode == 32 || event.charCode == 64) && !event.target.value){
          event.preventDefault();
        }else{
          // console.log(event)
        }
        // console.log('event charCode check', event.charCode)
      }

  /** to check characters start */
  toCheckSpaceChar(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if((charCode == 32) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
    evt.preventDefault()
    }else {
    return true;
    }
    }
    /** to check characters end  */
  

    

}
