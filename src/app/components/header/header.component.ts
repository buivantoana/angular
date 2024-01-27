import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userForm: FormGroup;
  token = false;

  menuList = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'About Us',
      link: '/about-us',
    },
    {
      label: 'Shop',
      link: '/shop',
    },
    {
      label: 'Contact',
      link: '/',
    },
  ];
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.userForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    let check = localStorage.getItem('token');

    if (check) {
      this.token = true;
    }
  }
  Logout() {
    localStorage.removeItem('token');
    this.token = false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      return this.router.navigate([`/search/${formData.search}`]);
    }
    return;
  }
}
