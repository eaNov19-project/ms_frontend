import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDashboardModalComponent } from './edit-dashboard-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
  }
  openEditModal(){
    const modalRef = this.modalService.open(EditDashboardModalComponent);
  }
}
