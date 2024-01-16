import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ServiceService } from '../../../../service/service.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../service/category.service';
import { typeProduct } from '../../../../type/typeProduct';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, ToastModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
  providers: [MessageService],
})
export class UpdateComponent {
  userForm: FormGroup;
  dataupdate: typeProduct = {
    _id: '',
    title: '',
    price: 0,
    description: '',
    categoryId: '',
    image: '',
  };
  categories: any = [];
  constructor(
    private productService: ServiceService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private naiv: Router
  ) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getCategory().subscribe((data: any) => {
        this.categories = data.data;
      });
      return this.productService.getOneProduct(id).subscribe((data) => {
        if (data.status === 0) {
          this.userForm.patchValue({
            title: data.data.title,
            description: data.data.description,
            price: data.data.price,
            image: data.data.image,
            categoryId: data.data.categoryId._id,
          });
          this.dataupdate = data.data;
        }
      });
    }
    return;
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.productService
        .updateProduct({ ...formData, id: this.dataupdate._id })
        .subscribe((data: any) => {
          if (data.status === 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Update',
            });
            this.naiv.navigate(['/admin/products']);
          }
        });
    }
  }
}
