import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  settingList: any = [];
  settingListCopy: any = [];
  permission: any = [];
  pagination: any = {total: 0, limit: 10, currPage: 1};
  searchForm: FormGroup;
  selectedRoleData: any;
  totalGateways: any = 0;

  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService
  ) {
    this.permission = !!JSON.parse(localStorage.getItem('permission')) ? (JSON.parse(localStorage.getItem('permission')).length ? JSON.parse(localStorage.getItem('permission')) : [] ) : [];
  }

  ngOnInit() {
    this.form();
    this.getMasterRoleList();
  }

  form() {
    this.searchForm = new FormGroup({
      fromDate : new FormControl(''),
      toDate   : new FormControl(''),
      search   : new FormControl('')
    });
  }

  getMasterRoleList() {
    this.spinner.show();
    this.service.getApi('/master-role').subscribe((success: any) => {

      if (success.statusCode === 200) {
        this.settingList = success.data;
        this.settingListCopy = success.data;
        this.pagination.total = success.data.length;
        this.totalGateways =  success.data.length? success.data.length:0;
      } else {
        this.settingList = [];
        this.pagination = 0;
      }
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.settingList = [];
      this.pagination = 0;

    })
  }

  settingListPagination(event) {
    this.pagination.currPage = event;
   
  }

  search() {

    this.settingList = this.settingListCopy;
    if (!!this.searchForm.value.search) {
      this.settingList = this.settingList.filter((item) => {
        return (item.role_name.toLowerCase().indexOf(this.searchForm.value.search.toLowerCase()) > -1);
      });
      this.pagination.total = this.settingList.length;
    }
  }

  clear() {
    this.searchForm.reset();
    this.settingList = this.settingListCopy;
    this.pagination.total = this.settingList.length;
  }

  openModal(data) {
    this.selectedRoleData = data;
    $('#deleteModal').modal({backdrop: 'static', keyboard: false});
  }

  deleteRole() {
    this.spinner.show();
    if (!this.permission.includes('deleteGateway')) {
      console.log('hello delete');
      $('#deleteModal').modal('hide');
      this.service.error("You don't have permission to delete any role.");
      this.spinner.hide();
      return;
    }
    const apireq = {
      master_id  : this.selectedRoleData.uuid
    };
    this.service.postApi('/delete-master-role', apireq).subscribe((success: any) => {
      this.service.success('Role deleted successfully.');
      $('#deleteModal').modal('hide');
      this.spinner.hide();
      this.getMasterRoleList();
    }, error => {
      this.service.error('Oops ! Something went wrong please try again.');
      this.spinner.hide();

    });
  }
}
