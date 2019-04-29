import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import { EmittersService } from '../services/emitters.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  product: string = environment.addProduct;
  selectedFile: File = null;
  errorChecker: boolean;

  constructor(private fromBuilder: FormBuilder, private apiService: ApiService, private emitterService: EmittersService) { }

  ngOnInit() {
    this.productForm = this.fromBuilder.group({
      productName: ['', Validators.required],
      productDetail: ['', Validators.required]
    });
  }

  addProduct() {
    if (this.productForm.invalid|| this.selectedFile === null) {
      this.productForm.reset();
      this.errorChecker = true;
      setInterval(() => {
        this.errorChecker = false;
      }, 5000);
      return;
    }
    const fd = new FormData();
    fd.append('productName', this.productForm.value.productName);
    fd.append('productDetail', this.productForm.value.productDetail);
    fd.append('product_image', this.selectedFile);
    console.log(fd);
    this.apiService.post(this.product, fd).subscribe(res => {
      console.log('saved ...');
      if (res && res.success) {
        this.emitterService.addProduct(true);
        this.productForm.reset();
      }
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }
}
