// books.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BooksRoutingModule } from './books-routing.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule
  ],
  declarations: [
    BookDetailComponent,
    BookListComponent,
  ]
})
export class BooksModule { }
