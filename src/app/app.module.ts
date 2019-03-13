import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './fournisseur-layout/components/clients/clients.component';
import { LoginComponent } from './login-layout/login/login.component';
import { ProductsComponent } from './fournisseur-layout/components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatListModule,
  MatSelectModule
} from '@angular/material';
import { HeaderComponent } from './fournisseur-layout/components/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { AddClientComponent } from './fournisseur-layout/components/add-client/add-client.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddProductComponent } from './fournisseur-layout/components/add-product/add-product.component';
import {HttpClientModule} from '@angular/common/http';
import {ClientService} from './services/client/client.service';
import { ImageLoaderDirective } from './directives/image-loader.directive';
import {AuthGuardService} from './services/authGuard/auth-guard.service';
import { FournisseurLayoutComponent } from './fournisseur-layout/fournisseur-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { ClientHomeComponent } from './client-layout/client-home/client-home.component';
import { FournisseurHomeComponent } from './fournisseur-layout/components/fournisseur-home/fournisseur-home.component';
import {ClientLayoutComponent} from './client-layout/client-layout.component';
import {RoleGuardService} from './services/roleGuard/role-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: FournisseurLayoutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'fournisseur',
    component: FournisseurLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'home',
        component: FournisseurHomeComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'fournisseur'
        }
      },
      {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'fournisseur'
        }
      },
      {
        path: 'produits',
        component: ProductsComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'fournisseur'
        }
      }
    ]
  },
  {
    path: 'client',
    component: ClientLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'home',
        component: ClientHomeComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'client'
        }      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    LoginComponent,
    ProductsComponent,
    HeaderComponent,
    AddClientComponent,
    AddProductComponent,
    ImageLoaderDirective,
    FournisseurLayoutComponent,
    LoginLayoutComponent,
    ClientHomeComponent,
    FournisseurHomeComponent,
    ClientLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [AddClientComponent, AddProductComponent],
  providers: [
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
