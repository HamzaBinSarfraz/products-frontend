import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  productsArray;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get(environment.getProducts).subscribe(res => {
      this.productsArray = _.cloneDeep(res['data']);
      console.log(this.productsArray);
    });
  }
}
