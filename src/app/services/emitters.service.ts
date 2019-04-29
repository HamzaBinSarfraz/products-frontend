import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmittersService {

  constructor() { }

  @Output() emittProduct: EventEmitter<any> = new EventEmitter();

  addProduct(flag: Boolean) {
    this.emittProduct.emit(flag);
  }

}
