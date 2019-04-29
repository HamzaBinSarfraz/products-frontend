import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  product: string = environment.addProduct;
  selectedFile: File = null;
  @Output() add = new EventEmitter();

  constructor(private fromBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.productForm = this.fromBuilder.group({
      productName: '',
      productDetail: ''
    });
  }

  addProduct() {
    const fd = new FormData();
    fd.append('productName', this.productForm.value.productName);
    fd.append('productDetail', this.productForm.value.productDetail);
    fd.append('product_image', this.selectedFile);
    console.log(fd);
    this.apiService.post(this.product, fd).subscribe(res => {
      console.log('saved ...');
      this.add.emit('');
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }
}
