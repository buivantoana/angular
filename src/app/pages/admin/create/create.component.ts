import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceService } from '../../../service/service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class CreateComponent {
  userForm: FormGroup;
  constructor(
    private productService: ServiceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.productService.addProduct(formData).subscribe((data: any) => {
        if (data.status === 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Message Content',
          });
          this.userForm.reset();
        }
      });
    }
  }
}
