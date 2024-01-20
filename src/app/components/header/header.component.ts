import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
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
}
