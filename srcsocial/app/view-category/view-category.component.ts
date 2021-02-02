import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  id: any;
  name: any;
  viewdata: any;

  constructor( 
    private service: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public active:ActivatedRoute) { 
      this.active.queryParams.subscribe((params)=>{
        this.id=params.id,
        this.name=params.Name
      })
    }

  ngOnInit() {
    this.viewlistOfCategory()
  }

  viewlistOfCategory(){
    let data={
      categoryId:this.id
    }
  this.service.postApii('admin/listOfCategory', data,  1).subscribe(success => {
    console.log("success",success);
    if(success.response_code == 200) {
      // this.service.success(success.response_message)
      this.viewdata = success.result[0]
     console.log("sdfgasd",this.viewdata)
    }
    else {
      this.service.error('something went wrong')
    }
  })
}

}
