// books.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './share/models/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = 'assets/book.json';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(bookId: number): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map((books) => books.find((book) => book.id === bookId))
    );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook);
  }

  updateBook(updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${updatedBook.id}`, updatedBook);
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookId}`);
  }

  searchBooks(keyword: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  filterBooksByCategory(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/filter?category=${category}`);
  }

  sortBooksBy(criteria: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/sort?criteria=${criteria}`);
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('assets/categories.json');
  }
}


