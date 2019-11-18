import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-dashboard-modal',
  templateUrl: './edit-dashboard-modal.component.html',
  styleUrls: ['./edit-dashboard-modal.component.css']
})
export class EditDashboardModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
