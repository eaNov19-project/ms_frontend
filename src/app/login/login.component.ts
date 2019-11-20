import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import {first} from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { SignupResult } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() name;

  public signinForm: FormGroup;
  public error: string;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService,
    public activeModal: NgbActiveModal, private userService: UserService) {}
  OnSubmitForm() {

    for (const i in this.signinForm.controls) {
      this.signinForm.controls[i].markAsDirty();
      this.signinForm.controls[i].updateValueAndValidity();
    }

    this.auth.login(this.signinForm.value.email, this.signinForm.value.password)
      .pipe(first())
      .subscribe(
        (result) => {
          // console.log(result);
          if (result['success']) {
            this.userService.getUserByEmail(this.signinForm.value.email).subscribe(result => {
              console.log(result);
            });
            // this.auth.signup({email:'natruong@mum.vn', password: '12345'}).subscribe(result => {
            //     console.log(result);
            //   });
            // this.router.navigate(['/']);
            // console.log('login success');
            this.activeModal.close('login success');
          } else {
          this.error = result['message'];
          // this.error = 'Could not sign in';
          // this.activeModal.dismiss(this.error);
          }
        },
        err => this.error = 'Could not authenticate'
      );
  }
  
  get emailControl() {
    return this.signinForm.get('email') as FormControl;
  }

  ngOnInit() {
    
    this.signinForm = new FormGroup({
      // username: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(4)
      // ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }
}
