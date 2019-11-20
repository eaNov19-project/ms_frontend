import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal, public auth: AuthService, private router: Router) { }
  title = 'q-and-a';
  closeResult: string;
  q = '';

  openLogin() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.componentInstance.name = 'Login';
  }
  openRegister() {
    const modalRef = this.modalService.open(RegisterComponent);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  searchQuestion() {
    if (this.q !== '') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['search/' + this.q]);
      });
    }
  }
}
