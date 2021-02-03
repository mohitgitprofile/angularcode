import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../service/service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { apiurls } from '../apiUrls';
import { forms } from '../forms';
declare var $: any;
@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
 apiurl:any;
 whichModal: any;
blogImage: any;
blogTitle: any;
 description: any;
blogId: any;
 blogArr: any;
 paginationData: any ={};
searchData: any;
search: any;
SearchForm: FormGroup;
  editForm: any;
  

  constructor(private spinner: NgxSpinnerService,public service: ServiceService,public url: apiurls,public form: forms
    
    ) {
      this.SearchForm = this.form.searchForm;
      this.SearchForm.reset();
      window.scrollTo(0, 0);
      this.apiurl = this.url.apiUrls;
     }

  ngOnInit() {
    this.getBlog();
    this.editForm = new FormGroup({
      'type': new FormControl(''),
      'blog': new FormControl('')
    })
  }
       

  check(val) {
    console.log(val)
  }
  getstorageType(): any {
    throw new Error("Method not implemented.");
  }

  addBlog() {
    this.spinner.show();
    let apireq = {
      blogImage: this.blogImage,
      blogTitle:this.blogTitle,
      description:this.description
    };
    this.service.postApi(this.apiurl.addBlog,apireq).subscribe(success => {
      if (success.responseCode === 200) {
        // this.service.success(success.responseMessage);
        this.spinner.hide();
      } else {
        // this.service.error(success.responseMessage);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      // this.service.error('Something went wrong');
    });
    
  }
  
  getBlog() {
    console.log('Data--->>>',this.apiurl)
    this.spinner.show();
    this.service.getApi(this.apiurl.getBlog).subscribe(success => {
      if (success.body.responseCode === 200) {
        this.blogArr = success.body.input.Items;
        this.searchData = success.body.input.Items;
        console.log('Data ->', success.body);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
    
  }

  openDeleteModal (id) {
    this.blogId = id;
    this.whichModal ='delete';
    $('#enableDisableDeleteModal').modal({backdrop: 'static', keyboard: false});
  }


  searchListData() {
    console.log(this.searchData, this.SearchForm.value.search);
    this.blogArr = this.searchData
    if (!!this.SearchForm.value.search) {
      console.log('hello');
      this.blogArr = this.searchData.filter((item) => {
        for(let i=0; i<this.SearchForm.value.search.length; i++) {
          if(item.blogTitle.toLowerCase().charAt(i) == this.SearchForm.value.search.toLowerCase().charAt(i)) {
            if(i == this.SearchForm.value.search.length - 1)
              return item;
          }
          else
            return;
        }
        // return item.spaceType.toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1
        // return ((this.filterValue(item.Attributes, 'email').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:name').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1) || (this.filterValue(item.Attributes, 'custom:fullNumber').toLowerCase().indexOf(this.SearchForm.value.search.toLowerCase()) > -1));
      });
      this.paginationData['total'] = this.blogArr.length;
    }
    console.log(this.blogArr);



  }

  openEditModal(id) {
    this.blogId = id;
    var detail = this.blogArr.filter(x => (x.blogId == this.blogId));
    this.editForm.patchValue({
      'type': detail[0].bannerName,
      'blog': detail[0].blogTitle
    })
    this.blogImage = detail[0].blogImage
    $('#editModal').modal('show');
    console.log(detail);

  }



  updateBlog() {
    if (this.editForm.invalid) {
      return;
    }
    this.spinner.show();
    console.log('dataklsjcfkljd ==>>', this.editForm.value);
    let apireq = {
      blogId: this.blogId,
      blogImage: this.blogImage,
      description:this.description,
      blogTitle: this.editForm.value.blog
    };
    this.service.postApi(this.apiurl.editBanner, apireq).subscribe(success => {
      console.log(success);
      if (success.statusCode === 200) {
        $('#editModal').modal('hide');
        this.getBlog();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      this.service.error('Something went wrong');
    });
  }




  deleteBlog () {
    this.spinner.show();
    console.log('this.blogId',this.blogId);
    let apireq = {
    blogId:this.blogId
    };
    this.service.postApi(this.apiurl.deleteBlog,apireq).subscribe(success => {
      console.log('success ===>>>', success);
      if (success.responseCode === 200) {
        this.getBlog();
        $('#enableDisableDeleteModal').modal('hide');
        this.service.success(success.responseMessage);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, error => {
      this.service.error('Something went wrong');
      this.spinner.hide();
    });
  }

  
}
