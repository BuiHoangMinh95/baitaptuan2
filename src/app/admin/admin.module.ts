// books.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './admin-list/admin-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatPaginatorModule
  ],
  declarations: [
    AdminListComponent
  ],
  providers: [
    { provide: 'UUID', useValue: uuidv4 }, // Use the 'UUID' token for injection
  ],
})
export class AdminModule { }
