import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ServiceService } from '../../../service/service.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, ToastModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
  providers: [MessageService],
})
export class UpdateComponent {
  userForm: FormGroup;
  dataupdate: any = {};
  constructor(
    private productService: ServiceService,
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
      category: ['', Validators.required],
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      return this.productService.getOneProduct(id).subscribe((data) => {
        if (data.status === 0) {
          this.userForm.patchValue({
            title: data.data.title,
            description: data.data.description,
            price: data.data.price,
            image: data.data.image,
            category: data.data.category,
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
