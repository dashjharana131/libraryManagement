import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {

  }

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required, Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])')],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      mobilenumber: ['', Validators.required, Validators.minLength(10), Validators.pattern('[0-9]\\d{11}')],
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


  }
}
