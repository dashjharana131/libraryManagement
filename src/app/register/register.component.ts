import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {

  }

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  data: any;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;

  baseUrl: string = 'http://10.117.189.65:9292';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]]
    });
  }

  /* convenience getter for easy access to form fields */
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    /* reset alerts on submit
    this.alertService.clear();*/

    /* stop here if form is invalid */
    if (this.registerForm.invalid) {
      return;
    }

    const reqObj = {
      "firstName": this.registerForm.value.firstName,
      "lastName": this.registerForm.value.lastName,
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password,
      "mobileNumber": this.registerForm.value.mobileNumber,
    };
    this.http.post('http://10.117.189.65:9292/LibraryManagementSystem/lms/user', reqObj).subscribe((response: any) => {
      /*this.userService.userRegister(this.registerForm.value).subscribe(data => {
        console.log(data);
      })*/
      if (response) {
        console.log(response.statusCode);
        if (response.statusCode == 201) {
          alert(this.registerForm.value.firstName + ' Registered successfully');
        }
        this.data = response;
        this.firstName = this.data.firstName;
        this.lastName = this.data.lastName;
        this.email = this.data.email;
        this.password = this.data.password;
        this.mobileNumber = this.data.mobileNumber;
        this.router.navigate(['/login']);
      }
    });

  }
}

