import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() name;

  public signinForm: FormGroup;
  public error: string;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService,public activeModal: NgbActiveModal) {}
  OnSubmitForm() {

    for (const i in this.signinForm.controls) {
      this.signinForm.controls[i].markAsDirty();
      this.signinForm.controls[i].updateValueAndValidity();
    }

    this.auth.login(this.signinForm.value.username, this.signinForm.value.password)
      .pipe(first())
      .subscribe(
        (success) => {
          if (success) {
            this.router.navigate(['/']);
          } else {
            this.error = 'Could not sign in';
          }
        },
        err => this.error = 'Could not authenticate'
      );
  }
  ngOnInit() {
    
    this.signinForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
    // this.signinForm = this.fb.group({
    //   username: [null, [Validators.required, Validators.minLength(4)]],
    //   password: [null, [Validators.required, Validators.minLength(4)]]
    // });
  }
}
