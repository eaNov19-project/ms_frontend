import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css', './register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public error: string;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService,public activeModal: NgbActiveModal) {}
  OnSubmitForm() {

    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    this.auth.signup(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (result) => {
          console.log(result);
          if (result['success']) {
            // this.router.navigate(['/']);
            // console.log('success signup');
            this.activeModal.close('success signup');
          } else {
            this.error = result['message'];
            // console.log(result['message']);
            // this.activeModal.dismiss(this.error);
          }
        },
        err => {
          console.log(err);
          this.error = err.error.message;
        }
      );
    
  }
  ngOnInit() {
    
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }
}
