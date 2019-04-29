import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import { EmittersService } from '../services/emitters.service'

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  productsArray;
  constructor(private api: ApiService, private emitterService: EmittersService) { }

  ngOnInit() {
    this.api.get(environment.getProducts).subscribe(res => {
      const array: Array<object> = res.data;
      this.productsArray = array.reverse();
    });

    this.emitterService.emittProduct.subscribe(res => {
      if (res) {
        this.api.get(environment.getProducts).subscribe(res => {
          const array: Array<object> = res.data;
          this.productsArray = array.reverse();
          console.log(this.productsArray);
        });
      }
    });
  }
}
