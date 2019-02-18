import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule, MatListModule,
  MatSelectModule
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'produits', component: ProductsComponent}
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
