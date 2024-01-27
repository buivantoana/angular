import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgFor, DockModule, TooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private router: Router) {}
  Logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  items: any[] | undefined;

  position: string = 'top';

  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom',
    },
    {
      label: 'Top',
      value: 'top',
    },
    {
      label: 'Left',
      value: 'left',
    },
    {
      label: 'Right',
      value: 'right',
    },
  ];

  ngOnInit() {
    this.items = [
      {
        label: 'Product',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
        href: '/admin/products',
      },
      {
        label: 'Category',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg',
        href: '/admin/categories',
      },
      {
        label: 'User',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/safari.svg',
        href: '/admin/user',
      },
      {
        label: 'Logout',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
        href: '/',
      },
    ];
  }
}
