import { Component } from '@angular/core';
import { CategoryService } from '../../../../service/category.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import {
  typeCategory,
  typeResponseCategory,
} from '../../../../type/typecategory';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, ToastModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
  providers: [MessageService],
})
export class UpdateCategoryComponent {
  userForm: FormGroup;

  categories: typeCategory = { _id: '', name: '' };
  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private naiv: Router
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService
        .getOneCategory(id)
        .subscribe((data: typeResponseCategory) => {
          if (data.status === 0) {
            this.userForm.patchValue({
              name: data.data.name,
            });

            this.categories = data.data;
          }
        });
    }
    return;
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.categoryService
        .updateCategory({ ...formData, id: this.categories._id })
        .subscribe((data: any) => {
          if (data.status === 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Update',
            });
            this.naiv.navigate(['/admin/categories']);
          }
        });
    }
  }
}
