import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-dashboard-modal',
  templateUrl: './edit-dashboard-modal.component.html',
  styleUrls: ['../login/login.component.css']
})
export class EditDashboardModalComponent implements OnInit {

  public userForm: FormGroup;
  public error: string;
  constructor(public auth: AuthService, public activeModal: NgbActiveModal, private userService: UserService) { }

  OnSubmitForm() {

    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }

    this.userService.updateUserInfo(this.userForm.value)
      .pipe(first())
      .subscribe(
        (result) => {
          console.log(result);
          if (result['success']) {
            this.userService.getUserByEmail(this.auth.currentUser.email).subscribe(result => {
              console.log(result);
            });
            this.activeModal.close('success');
          } else {
            this.error = result['message'];
            // this.activeModal.dismiss('error');
          }
        },
        err => this.error = err.error.message
      );
    
  }
  ngOnInit() {
    
    this.userForm = new FormGroup({
      name: new FormControl(this.auth.currentUser.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(this.auth.currentUser.email),
      // email: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      // ]),
      phone: new FormControl(this.auth.currentUser.phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      
      ])
    });
  }
}
