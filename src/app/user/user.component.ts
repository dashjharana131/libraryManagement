import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookserviceService } from '../services/bookservice.service';
import { ISearch } from '../models/searchbook';
import { IAdd } from '../models/addbooks';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: string = '';
  clickMessage = "";
  IAdd: any = [];
  constructor(private router: Router, private bookService: BookserviceService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem("userId");
  }

  addbook(val) {
    console.log(this.IAdd);
    this.bookService.addBook(val).subscribe((res: any) => {
      if (res.statusCode == 201) {
        alert('Success');
        console.log(res);
      }
    })
    // this.heroService.getHeroes()
    // .subscribe(heroes => this.heroes = heroes);

    // this.clickMessage = "Success! Book Added";
  }
}
