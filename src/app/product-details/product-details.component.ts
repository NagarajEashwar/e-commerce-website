import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from  '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
@Input() productDetails: any;
@Output() showSuccessMessage = new EventEmitter();
@Output() backToProductList = new EventEmitter();
 productDetailsForm: FormGroup;
 isFormSubmitted = false;
constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productDetailsForm  =  this.formValidator(this.productDetails);
  }

  formValidator(productDetails: any) {
    let group: any = {};
    this.productDetails.forEach(details => {
      group[details.caption] = details.mandatory ? new FormControl(details.defaultValue, Validators.required) : new FormControl(details.defaultValue);
    });
    return new FormGroup(group);
  }

  isValid(index) { 
    return this.productDetailsForm.controls[this.productDetails[index].caption].valid;
    }
onSubmit() {
  this.isFormSubmitted = true;
  if(this.productDetailsForm.status === 'VALID') {
    this.showSuccessMessage.emit(true);
  } else {
    this.showSuccessMessage.emit(false);
  }
  
}
backToList() {
  this.backToProductList.emit();
}
}