import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDashboardModalComponent } from './edit-dashboard-modal.component';
import { QuestionService } from '../services/question.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  noOfQuestions: number = 0;
  // noOfAnswers: number = 0;
  constructor(public auth: AuthService, private modalService: NgbModal, private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestionsByUser(this.auth.currentUser.userId)
    .pipe(first())
    .subscribe(
      (result) => {
        // console.log(result);
        if(result.data.questions){
          this.noOfQuestions = result.data.questions.length;
        }
      },
      err => console.log(err.error)
    );
  }
  openEditModal(){
    const modalRef = this.modalService.open(EditDashboardModalComponent);
  }
}
