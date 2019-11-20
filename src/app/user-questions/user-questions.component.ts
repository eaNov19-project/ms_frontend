import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { AuthService } from '../services/auth.service';
import { QuestionService } from '../services/question.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  // styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent implements OnInit {
  questions: Array<Question> = [];
  
  private addModalRef: any;
  private editModalRef: any;
  constructor(private questionService: QuestionService, private auth: AuthService, private modalService: NgbModal) { }
  getQuestions(){
    // this.questionService.getQuestionByUser()
    this.questionService.getQuestionsByUser(this.auth.currentUser.userId).pipe(first())
    .subscribe(
      (result) => {
        console.log(result);
        this.questions = result.data.questions;
      },
      err => console.log(err)
    );
  }
  ngOnInit() {
    this.getQuestions();
  }
  openEditModal(questionId: String){
    this.editModalRef = this.modalService.open(AddQuestionComponent);
    if(this.editModalRef){
      this.editModalRef.componentInstance.action = 'Edit';
      this.editModalRef.componentInstance.questionId = questionId;
      this.editModalRef.onClose.subscribe(() => {
          console.log("edit question closed");
          // this.questionService.getQuestionByUser()
          // this.getQuestions();
      })
    }
    
  }
  // removeQuestion(questionId: String){
    // this.questionService.removeQuestion(); // not implemented API yet
  // }
  openAddModal(){
    this.addModalRef = this.modalService.open(AddQuestionComponent);
    if(this.addModalRef){
      this.addModalRef.onClose.subscribe(() => {
          console.log("add question closed");
          // this.questionService.getQuestionByUser()
          this.getQuestions();
      })
    }
  }
}
