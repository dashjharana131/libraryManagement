import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAdd } from '../models/addbooks';
import { IBorrow } from '../models/borrowbooks';
import { ISearch } from '../models/searchbook';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  constructor(private http: HttpClient) { }

  baseurl: string = 'http://10.117.189.65:9292';

  searchBooks(userId: string): Observable<ISearch[]> {
    return this.http.get<ISearch[]>('http://10.117.189.65:9292/LibraryManagementSystem/lms/books?bookTitle=String&author=String' + userId);
  }
  //addBook(book: IAdd): Observable<IAdd> {
  addBook(IAdd: any): Observable<IAdd> {
    return this.http.post<IAdd>('http://10.117.189.65:9292/LibraryManagementSystem/lms/books', IAdd, {
    });

  }
  borrowBook(book: ISearch): Observable<IAdd> {
    return this.http.post<IAdd>('http://13.233.140.75:7770/LibraryManagementSystem/lms/books/{bookId}/users/{userId}', book, {

    })
  }

}
