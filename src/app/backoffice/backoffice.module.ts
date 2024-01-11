import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { FormsModule } from '@angular/forms';
import { ListeusersComponent } from './listeusers/listeusers.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    BackofficeComponent,
    HomeComponentComponent,
    LoginAdminComponent,
    ListeusersComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,FormsModule, 
       MatPaginatorModule,
        MatTableModule


    
  ]
})
export class BackofficeModule { }
