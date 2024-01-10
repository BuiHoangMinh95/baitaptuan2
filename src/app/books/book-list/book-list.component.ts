import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Observable } from 'rxjs';
import { Book } from '../share/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  searchKeyword: string = '';
  books: Book[] | undefined;
  sortedBooks: Book[] | undefined;
  categories: string[] = [];
  selectedCategory: string | undefined;
  selectedSortCriteria: string = 'title';
  
  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    price: 0,
    quantity: 0,
    description: '',
    category: [],
    year: 0,
    rating: [],
    image: '',
  };

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
  }

  getBooks(): void {
    this.booksService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        this.sortedBooks = [...books]; // Initialize sortedBooks with the original data
      },
      (error: any) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  getCategories(): void {
    // Fetch categories from the server
    this.booksService.getCategories().subscribe(
      (categories: string[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  viewDetails(book: Book): void {
    // Navigate to the book details page using the book's ID
    this.router.navigate(['/books', book.id]);
  }

  addToCart(book: Book): void {
    // Implement the logic to add the book to the shopping cart
    console.log('Add to cart:', book);
  }

  sortBooks(): void {
    this.booksService.sortBooksBy(this.selectedSortCriteria).subscribe(
      (sortedBooks: Book[]) => {
        this.sortedBooks = sortedBooks;
      },
      (error: any) => {
        console.error('Error sorting books:', error);
      }
    );
  }
  
  addBook(): void {
    this.booksService.addBook(this.newBook).subscribe(
      (addedBook: Book) => {
        // Optionally, you can do something with the added book
        console.log('Book added:', addedBook);

        // Clear the form after successful addition
        this.newBook = {
          id: 0,
          title: '',
          author: '',
          price: 0,
          quantity: 0,
          description: '',
          category: [],
          year: 0,
          rating: [],
          image: '',
        };
      },
      (error: any) => {
        console.error('Error adding book:', error);
      }
    );
  }
  

  filterBooksByCategory(): void {
    if (this.selectedCategory) {
      this.booksService.filterBooksByCategory(this.selectedCategory).subscribe(
        (filteredBooks: Book[]) => {
          this.sortedBooks = filteredBooks;
        },
        (error: any) => {
          console.error('Error filtering books by category:', error);
        }
      );
    } else {
      this.sortedBooks = [...this.books!]; // Reset to show all books when no category is selected
    }
  }

  searchBooks(): void {
    if (this.searchKeyword.trim() !== '') {
      this.booksService.searchBooks(this.searchKeyword).subscribe(
        (searchedBooks: Book[]) => {
          this.sortedBooks = searchedBooks;
        },
        (error: any) => {
          console.error('Error searching books:', error);
        }
      );
    } else {
      this.sortedBooks = [...this.books!]; // Reset to show all books when no keyword is entered
    }
  }
}
