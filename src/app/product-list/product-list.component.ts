import { Component } from '@angular/core';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
products;
productDetails;
isShowSuccessMessage = false;
constructor(private productService: ProductService){

}
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    const endPoint = 'https://ds-ecom.azurewebsites.net/products';
    this.productService.getProducts(endPoint).subscribe((data: any) => {
      this.products = data;
    });
  }
  getProductDetails(endPoint) {
    this.productDetails = [];
    this.productService.getProductDetails(endPoint).subscribe((data: any) => {
      this.productDetails = data;
    });
  }
  showSuccessMessage(value) {
    this.isShowSuccessMessage = value;
  }
  backToProductList() {
    this.productDetails = [];
    this.isShowSuccessMessage = false;
  }
}

