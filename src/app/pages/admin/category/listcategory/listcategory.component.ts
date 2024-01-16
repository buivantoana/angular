import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../../../../service/category.service';
import { NgFor } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { typeCategory } from '../../../../type/typecategory';

@Component({
  selector: 'app-listcategory',
  standalone: true,
  imports: [NgFor, ToastModule, ConfirmDialogModule],
  templateUrl: './listcategory.component.html',
  styleUrl: './listcategory.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ListcategoryComponent {
  categoryList: typeCategory[] = [];
  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}
  addCategory() {
    return this.router.navigate(['/admin/category/create']);
  }
  getAll() {
    this.categoryService.getCategory().subscribe((category: any) => {
      return (this.categoryList = category.data);
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
  deleteCategory(id: string) {
    this.confirmationService.confirm({
      accept: () => {
        return this.categoryService
          .deleteCategory(id)
          .subscribe((data: any) => {
            if (data.status === 0) {
              this.messageService.add({
                severity: 'success',

                detail: 'Delete Success',
              });
              this.getAll();
            }
          });
      },
    });
  }
  updateCategory(id: string) {
    return this.router.navigate([`/admin/category/${id}`]);
  }
}
