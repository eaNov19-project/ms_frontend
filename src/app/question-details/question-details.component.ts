import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionResult } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { first } from 'rxjs/operators';
import { CommentService } from '../services/comment.service';

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
  questionIdCommented: any;
  answerIdCommented: any;


  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private commentService: CommentService,
              private router: Router,
              private modalService: NgbModal) {
    this.route.params.subscribe(params => this.questionId = params.id);
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
      size: 'lg'
    };

    this.comment = new FormControl('');
    this.answer = new FormControl('');
  }

  ngOnInit() {
    this.questionService.getQuestionById(this.questionId).subscribe(result => {
      this.questionResult = result;
      this.question = this.questionResult.data.question;
      console.log('question: ' + JSON.stringify(this.question));
      console.log(this.question.body)
    });
  }

  openQuestionComment(content, questionId) {
    this.answerIdCommented = null;
    this.questionIdCommented = null;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.questionIdCommented = questionId;
    console.log('Question Id: ' + this.questionIdCommented);
  }

  openAnswerComment(content, answerId) {
    this.questionIdCommented = null;
    this.answerIdCommented = null;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.answerIdCommented = answerId;
    console.log('Comment Id: ' + this.answerIdCommented);
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
    if (this.answerIdCommented == null && this.questionIdCommented != null) {
      this.submitQuestionComment();
    }
    if (this.answerIdCommented != null && this.questionIdCommented == null) {
      this.submitAnswerComment();
    }
  }

  submitQuestionComment() {
    let subjectId = this.questionIdCommented.value;
    let comment = { body: this.comment.value };

    this.commentService.addQuestionComment(comment, subjectId)
      .pipe(first())
      .subscribe(result => {
        console.log("result: " + JSON.stringify(result));
        this.ngOnInit();
        this.modalService.dismissAll();
      },
        error => {
          console.log("result: " + JSON.stringify(error));
        })
  }

  submitAnswerComment() {
    let subjectId = this.answerIdCommented.value;
    let comment = { body: this.comment.value };

    this.commentService.addAnswerComment(comment, subjectId)
      .pipe(first())
      .subscribe(result => {
        console.log("result: " + JSON.stringify(result));
        this.ngOnInit();
        this.modalService.dismissAll();
      },
        error => {
          console.log("result: " + JSON.stringify(error));
        });
  }


  submitAnswer(questionId: any) {
    let questnId = questionId;
    let answer = { body: this.answer.value };
    console.log("Answered entered: " + answer);
    console.log("id: " + questnId);

    this.answerService.addAnswer(answer, questnId)
      .pipe(first())
      .subscribe(result => {
        console.log("result of adding answers: " + JSON.stringify(result))
      },
        error => {
          console.log("errors of adding answers: " + JSON.stringify(error))
        });
  }

  startFollowing(){
    this.questionService.startFollowing(this.questionId).pipe(first())
    .subscribe(result => {
      console.log('result: ' + JSON.stringify(result));
    },
      error => {
        console.log('result: ' + JSON.stringify(error));
      });
  }
}
