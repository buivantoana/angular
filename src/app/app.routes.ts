import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './layout/admin/admin.component';

import { CreateComponent } from './pages/admin/products/create/create.component';
import { UpdateComponent } from './pages/admin/products/update/update.component';
import { ProductComponent } from './pages/admin/products/product/product.component';
import { ListcategoryComponent } from './pages/admin/category/listcategory/listcategory.component';
import { CreateCategoryComponent } from './pages/admin/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './pages/admin/category/update-category/update-category.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guard/auth.guard';
import { ListUserComponent } from './pages/admin/user/list-user/list-user.component';
import { CreateUserComponent } from './pages/admin/user/create-user/create-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductComponent },
      { path: 'product/create', component: CreateComponent },
      { path: 'product/:id', component: UpdateComponent },
      { path: 'categories', component: ListcategoryComponent },
      { path: 'category/create', component: CreateCategoryComponent },
      { path: 'category/:id', component: UpdateCategoryComponent },
      { path: 'user', component: ListUserComponent },
      { path: 'user/create', component: CreateUserComponent },
    ],
    canActivate: [authGuard],
  },
];
