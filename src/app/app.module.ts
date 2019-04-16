import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './layout/fournisseur-layout/components/clients/clients.component';
import { LoginComponent } from './layout/login-layout/login/login.component';
import { ProductsComponent } from './layout/fournisseur-layout/components/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatDialogModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { HeaderComponent } from './layout/fournisseur-layout/components/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { AddClientComponent } from './layout/fournisseur-layout/components/add-client/add-client.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddProductComponent } from './layout/fournisseur-layout/components/add-product/add-product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ClientService} from './services/client/client.service';
import { ImageLoaderDirective } from './directives/image-loader.directive';
import {AuthGuardService} from './services/authGuard/auth-guard.service';
import { FournisseurLayoutComponent } from './layout/fournisseur-layout/fournisseur-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { ClientHomeComponent } from './layout/client-layout/client-home/client-home.component';
import { FournisseurHomeComponent } from './layout/fournisseur-layout/components/fournisseur-home/fournisseur-home.component';
import {ClientLayoutComponent} from './layout/client-layout/client-layout.component';
import {RoleGuardService} from './services/roleGuard/role-guard.service';
import { ClientHeaderComponent } from './layout/client-layout/client-header/client-header.component';
import { AddCommandeComponent } from './layout/client-layout/add-commande/add-commande.component';
import { ClientUsersComponent } from './layout/client-layout/client-users/client-users.component';
import { ClientUtilisateursComponent } from './layout/client-layout/utilisateurs/client-utilisateurs.component';
import { ClientAddUserComponent } from './layout/client-layout/client-add-user/client-add-user.component';
import { ListeProduitsClientComponent } from './layout/client-layout/liste-produits-client/liste-produits-client.component';
import {TokenInterceptorService} from './services/tokenInterceptor/token-interceptor.service';

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
      },
      {
        path: 'users',
        component: ClientUtilisateursComponent,
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
        }      },
      {
        path: 'users',
        component: ClientUtilisateursComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'client'
        }
      },
      {
        path: 'products',
        component: ListeProduitsClientComponent,
        canActivate: [RoleGuardService],
        data: {
          expectedRole: 'client'
        }
      }
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
    ClientLayoutComponent,
    ClientHeaderComponent,
    AddCommandeComponent,
    ClientUsersComponent,
    ClientUtilisateursComponent,
    ClientAddUserComponent,
    ListeProduitsClientComponent
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
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [AddClientComponent, AddProductComponent, AddCommandeComponent, ClientAddUserComponent],
  providers: [
    ClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
