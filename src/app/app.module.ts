import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FakeApiService } from './fake-api.service';
import { BooksModule } from './books/books.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    BooksModule,
    RouterTestingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    FakeApiService  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
