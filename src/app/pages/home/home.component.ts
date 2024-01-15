import { Component } from '@angular/core';
import { ServiceService } from '../../service/service.service';

import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ItemComponent } from '../../shared/item/item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    ItemComponent,
    NgFor,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class HomeComponent {
  productList: any = [];
  isModalVisible: boolean = false;
  userForm: FormGroup;
  dataUpdate: any = null;
  constructor(
    private productService: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  getAll() {
    this.productService.getProduct().subscribe((product: any) => {
      return (this.productList = product.data);
    });
  }
  ngOnInit(): void {
    this.getAll();
  }
  onDelete(id: string): void {
    this.productService
      .deleteProduct(id)
      .subscribe(
        () =>
          (this.productList = this.productList.filter(
            (item: any) => item.id !== id
          ))
      );
  }
  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
  onSubmit() {
    if (this.dataUpdate) {
      if (this.userForm.valid) {
        const formData = this.userForm.value;
        this.productService
          .updateProduct({ ...formData, id: this.dataUpdate._id })
          .subscribe(() => {
            this.isModalVisible = !this.isModalVisible;
            this.userForm.reset();
            this.dataUpdate = null;
            return this.getAll();
          });
      } else {
        console.log('err');
      }
    } else {
      if (this.userForm.valid) {
        const formData = this.userForm.value;
        this.productService.addProduct(formData).subscribe(() => {
          this.isModalVisible = !this.isModalVisible;
          this.userForm.reset();
          return this.getAll();
        });
      } else {
      }
    }
  }
  handleUpdate(product: any) {
    this.dataUpdate = product;
    this.userForm.patchValue({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    this.isModalVisible = !this.isModalVisible;
  }
}
