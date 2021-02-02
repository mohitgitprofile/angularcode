import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  loginSub = new BehaviorSubject(``);
  loginObs = this.loginSub.asObservable();
  code: string;
  httpOptions: { headers: HttpHeaders; };

  // public baseUrl = "http://172.16.0.217:3062/"
  public baseUrl = "https://cryptocurrencyjava.mobiloitte.com/"
  // public baseUrl = "http://182.72.203.244:3062/account/"
  public websiteURL = "https://cryptocurrencyadmin.mobiloitte.com/"
  // public websiteURL ="http://localhost:4200/"
  // support chat
  wsSupportChat: WebSocket;
  supportChatUrl: any = 'wss://chatcryptocurrencyjava.mobiloitte.com/chat'



  supportChatArr: any = []
  socketSupportChatStatus: boolean = false;

  private subject = new Subject<any>();

  constructor(public http: HttpClient, private toastr: ToastrManager, private spinner: NgxSpinnerService, public routes: Router) { }




  // Header Managment 
  changeLoginSub(msg) {
    this.loginSub.next(msg);
  }


  // Api Functionlity 
  // Api Structuring Functionality
  post(url, data) {
    if (localStorage.getItem('Auth')) {
      this.code = localStorage.getItem('Auth')
    }
    if (localStorage.getItem('data') || localStorage.getItem('Auth')) {
      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.code}` })
      };
    }
    return this.http.post(this.baseUrl + url, data, this.httpOptions);
  }

  get(url) {
    if (localStorage.getItem('Auth')) {
      this.code = localStorage.getItem('Auth')
    }
    if (localStorage.getItem('data') || localStorage.getItem('Auth')) {
      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.code}` })
      }
    }
    return this.http.get(this.baseUrl + url, this.httpOptions);
  }

  // Form Data Api Structure
  postApi(endPoint, data): Observable<any> {
    if (localStorage.getItem('Auth')) {
      this.code = localStorage.getItem('Auth')
    }
    if (localStorage.getItem('data') || localStorage.getItem('Auth')) {

      this.httpOptions = {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${this.code}` })
      }
    }
    return this.http.post(this.baseUrl + endPoint, data, this.httpOptions);
  }

  // Spinner 
  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  // Toaster Functionality
  toasterSucc(msg) {
    this.toastr.successToastr(msg)
  }
  toasterErr(msg) {
    this.toastr.errorToastr(msg)
  }

  //Export
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



  // Logout
  onLogout() {
    localStorage.clear();
    // window.location.reload();
    this.routes.navigate(['/login']);
    // $('#signout_modal').modal('hide');
  }

  /** to prevent first space */
  preventSpace(event) {
    if ((event.charCode == 32 || event.charCode == 64) && !event.target.value) {
      event.preventDefault();
    }
  }

  /** Function to restrict space */
  restrictSpace(event) {
    var k = event.charCode;
    if (k === 32) return false;
  }

  /** Function to restrict character */
  restrictChar(event) {
    var k = event.charCode;
    if (event.key === 'Backspace')
      k = 8;
    if (k >= 48 && k <= 57 || k == 8 || k == 46)
      return true;
    else
      return false;
  }

  // remove empty key from object
  removeEmptyKey(obj) {
    Object.entries(obj).forEach(([key, val]) => val === '' && delete obj[key]);
    return obj
  }

  // support chat socket connection functionality
  initSocketSupportChat() {
    this.wsSupportChat = new WebSocket(this.supportChatUrl);
    let self = this;
    this.wsSupportChat.addEventListener('open', function (event) {
      self.socketSupportChatStatus = true;
      self.connectSupportChatSocket();
    });
    this.wsSupportChat.addEventListener('close', function (event) {
      self.socketSupportChatStatus = false;
      self.reConnectSupportChatSocket();
    })
  }

  reConnectSupportChatSocket() {
    this.wsSupportChat = new WebSocket(this.supportChatUrl)
    var self = this;
    this.wsSupportChat.addEventListener('open', function (event) {
      self.socketSupportChatStatus = true;
    })
  }

  connectSupportChatSocket() {
    var self = this;
    /** Listener for web socket connection */
    setTimeout(() => {
      if (localStorage.getItem('Auth')) {
        let token = localStorage.getItem('Auth')
        // console.log(token)
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        let obj = JSON.parse(jsonPayload)
        // console.log(obj)
        localStorage.setItem('userId', obj.userId)
        let adminEmail = obj.username
        // console.log(adminEmail);
        let data = {
          "fromEmail": adminEmail,
          "topic": "SUPPORT",
          "notificationUserType": "ADMIN"
        }
        this.wsSupportChat.send(JSON.stringify(data))
        self.sendMessage('online')

        this.wsSupportChat.addEventListener('message', (event) => {
          // console.log(event)
          let evt_data = JSON.parse(event.data);
          evt_data = evt_data[0] ? evt_data[0] : evt_data
          // console.log(evt_data)
          if (evt_data.message) {
            self.supportChatArr.push(evt_data)
          }
          self.sendMessage(evt_data)
          // console.log(self.supportChatArr);
        })
      }
    }, 2000)
  }

  /** to get message */
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  /** to send message */
  sendMessage(msg: any) {
    return this.subject.next({ 'text': msg });
  }

}
