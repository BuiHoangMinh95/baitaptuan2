// books-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'books', component: BookListComponent, canActivate: [AuthGuard]},
  { path: 'books/:id', component: BookDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
