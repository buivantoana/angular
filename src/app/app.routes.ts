import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './layout/admin/admin.component';
import { ProductComponent } from './pages/admin/product/product.component';
import { CreateComponent } from './pages/admin/create/create.component';
import { UpdateComponent } from './pages/admin/update/update.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductComponent },
      { path: 'product/create', component: CreateComponent },
      { path: 'product/:id', component: UpdateComponent },
    ],
  },
];
