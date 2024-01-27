import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../../service/category.service';
import { MessageService } from 'primeng/api';
import { NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, ToastModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
  providers: [MessageService],
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (formData.password === formData.confirmpassword) {
        this.authService
          .SignUp({ email: formData.email, password: formData.password })
          .subscribe((data: any) => {
            if (data.status === 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Message Content',
              });
              this.userForm.reset();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: data.message,
              });
            }
          });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'mat khau khong trung khop',
        });
      }
    }
  }
}
