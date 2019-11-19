import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionResult } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { first } from 'rxjs/operators';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})

export class QuestionDetailsComponent implements OnInit {

  question: Question;
  questionResult: QuestionResult;
  questionId;
  closeResult: string;
  modalOptions: NgbModalOptions;
  comment: any;
  answer: any;


  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private modalService: NgbModal) {
    this.route.params.subscribe(params => this.questionId = params.id);
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
      size: "lg"
    };

    this.comment = new FormControl("");
    this.answer = new FormControl("");
  }

  ngOnInit() {
    this.questionService.getQuestionById(this.questionId).subscribe(result => {
      this.questionResult = result;
      this.question = this.questionResult.data.question;
      console.log("question: " + JSON.stringify(this.question));
      console.log(this.question.body)
    });
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submitComment() {
    let comment = this.comment.value;
    console.log("Comment entered: " + comment);
  }

  submitAnswer(questionId: any) {
    let questnId = questionId;
    let answer = {body: this.answer.value};
    console.log("Answered entered: " + answer);
    console.log("id: " + questnId);

    this.answerService.addAnswer(answer, questnId)
      .pipe(first())
      .subscribe(result => {
        console.log("result of adding answers: " +result)
      },
        error => {
          console.log("errors of adding answers: "+ JSON.stringify(error))
        });
  }

}
