import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  err = false;

  email: String;
  password: String;
  userId: number;

  baseUrlLogin: string = 'http://10.117.189.65:9292';

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]]
    });
  }

  /*convenience getter for easy access to form fields*/
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    /*reset alerts on submit
    this.alertService.clear();*/

    /*stop here if form is invalid*/
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    var reqObj1 = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    };
    this.http.post('http://10.117.189.65:9292/LibraryManagementSystem/lms/login', this.loginForm.value).subscribe((res: any) => {
      if (res.statusCode == 201) {
        alert('Success');

      }
      sessionStorage.setItem("userId", res['userId']);
      this.router.navigate(['/user/books']);
    }, (err) => {
      this.err = true;
      console.log("rerror", err)
      // alert(err.message);
    });
  }
}

