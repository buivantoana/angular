import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ServiceService } from '../../../../service/service.service';
import { typeProduct } from '../../../../type/typeProduct';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, ToastModule, ConfirmDialogModule, ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProductComponent {
  productList: typeProduct[] = [];
  constructor(
    private productService: ServiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  addProduct() {
    return this.router.navigate(['/admin/product/create']);
  }
  getAll() {
    this.productService.getProduct().subscribe((product: any) => {
      return (this.productList = product.data);
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
  deleteProduct(id: string) {
    this.confirmationService.confirm({
      accept: () => {
        return this.productService.deleteProduct(id).subscribe((data: any) => {
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
  updateProduct(id: string) {
    return this.router.navigate([`/admin/product/${id}`]);
  }
}
