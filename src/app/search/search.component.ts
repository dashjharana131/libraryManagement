import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearch } from '../models/searchbook';
import { BookserviceService } from '../services/bookservice.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpClient, private bookService: BookserviceService) { }
  searchText: string;
  books: ISearch[];

  ngOnInit() {
  }
  getBookList() {
    if (this.searchText.length > 3) { }
    this.bookService.searchBooks(this.searchText).subscribe((books: ISearch[]) => {
      this.books = books;
      console.log(books);
    })
  }
  bookID(bookId: any) {
    /*console.log(localStorage.getItem("userId"));*/
    sessionStorage.setItem('BookID', bookId);
    alert('Book ID is ' + bookId);
  }

}

