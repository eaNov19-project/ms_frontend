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
  p: any = 1;
  p1: any = 1;
  question: Question;
  questionResult: QuestionResult;
  questionId;
  closeResult: string;
  modalOptions: NgbModalOptions;
  comment: any;
  answer: any;
  questionIdCommented: any;
  answerIdCommented: any;
  commentPage = false;
  answerPage = false;
  message = null;
  type = null;
  following: boolean;

  constructor(
    private route: ActivatedRoute, private questionService: QuestionService, private answerService: AnswerService,
    private commentService: CommentService, private router: Router, private modalService: NgbModal) {
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
      this.question = result.data.question;
    });
    this.following = false;
    this.questionService.checkfollowing(this.questionId).subscribe(result => {
      this.following = result.data.following;
    });
    this.commentPage = false;
    this.answerPage = false;
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
    const subjectId = this.questionIdCommented;
    const comment = { body: this.comment.value };

    this.commentService.addQuestionComment(comment, subjectId)
      .pipe(first())
      .subscribe(result => {
        this.ngOnInit();
        this.modalService.dismissAll();
        // tslint:disable-next-line:no-string-literal
        this.message = result['message'];
        // tslint:disable-next-line:no-string-literal
        if (result['success'] === true) { this.type = 'success'; }
        // tslint:disable-next-line:no-string-literal
        if (result['success'] !== true) { this.type = 'danger'; }
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });
  }

  submitAnswerComment() {
    const subjectId = this.answerIdCommented;
    const comment = { body: this.comment.value };

    this.commentService.addAnswerComment(comment, subjectId)
      .pipe(first())
      .subscribe(result => {
        this.ngOnInit();
        this.modalService.dismissAll();
        // tslint:disable-next-line:no-string-literal
        this.message = result['message'];
        // tslint:disable-next-line:no-string-literal
        if (result['success'] === true) { this.type = 'success'; }
        // tslint:disable-next-line:no-string-literal
        if (result['success'] !== true) { this.type = 'danger'; }
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });
  }


  submitAnswer(questionId: any) {
    let questnId = questionId;
    let answer = { body: this.answer.value };

    this.answerService.addAnswer(answer, questnId)
      .pipe(first())
      .subscribe(result => {
        this.answer = new FormControl('');
        // tslint:disable-next-line:no-string-literal
        this.message = result['message'];
        // tslint:disable-next-line:no-string-literal
        if (result['success'] === true) { this.type = 'success'; }
        // tslint:disable-next-line:no-string-literal
        if (result['success'] !== true) { this.type = 'danger'; }
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });
  }

  upVoteQuestion(questionId: any) {
    this.questionService.upVoteQuestion(questionId)
      .pipe(first())
      .subscribe(result => {
        document.getElementById(questionId).innerHTML++;
        // tslint:disable-next-line:no-string-literal
        this.message = result['message'];
        // tslint:disable-next-line:no-string-literal
        if (result['success'] === true) { this.type = 'success'; }
        // tslint:disable-next-line:no-string-literal
        if (result['success'] !== true) { this.type = 'danger'; }
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });

  }

  downVoteQuestion(questionId: any) {
    this.questionService.downVoteQuestion(questionId)
      .pipe(first())
      .subscribe(result => {
        document.getElementById(questionId).innerHTML--;
        // tslint:disable-next-line:no-string-literal
        this.message = result['message'];
        // tslint:disable-next-line:no-string-literal
        if (result['success'] === true) { this.type = 'success'; }
        // tslint:disable-next-line:no-string-literal
        if (result['success'] !== true) { this.type = 'danger'; }
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });

  }


  upVoteAnswer(answerId: any) {
    this.answerService.upVoteAnswer(answerId)
      .pipe(first())
      .subscribe(result => {
        document.getElementById(answerId).innerHTML++;
        // tslint:disable-next-line:no-string-literal
        this.message = result['message'];
        // tslint:disable-next-line:no-string-literal
        if (result['success'] === true) { this.type = 'success'; }
        // tslint:disable-next-line:no-string-literal
        if (result['success'] !== true) { this.type = 'danger'; }
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });

  }

  downVoteAnswer(answerId: any) {
    this.answerService.downVoteAnswer(answerId)
      .pipe(first())
      .subscribe(result => {
        document.getElementById(answerId).innerHTML--;
        // tslint:disable-next-line:no-string-literal
        this.message = result['message'];
        // tslint:disable-next-line:no-string-literal
        if (result['success'] === true) { this.type = 'success'; }
        // tslint:disable-next-line:no-string-literal
        if (result['success'] !== true) { this.type = 'danger'; }
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });

  }

  startFollowing() {
    this.questionService.startFollowing(this.questionId).pipe(first())
      .subscribe(result => {
        // tslint:disable-next-line:no-string-literal
        this.message = result['message'];
        // tslint:disable-next-line:no-string-literal
        if (result['success'] === true) { this.type = 'success'; }
        // tslint:disable-next-line:no-string-literal
        if (result['success'] !== true) { this.type = 'danger'; }
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });
  }

  loadQuestionComments() {
    this.questionService.getQuestionComments(this.questionId).subscribe(result => {
      this.question.topComments = result.data.comments;
      this.commentPage = true;
    });
  }

  loadAllAnswers() {
    this.answerService.getAnswersByQuestionId(this.questionId).subscribe(result => {
      console.log(result.data.answers);
      this.question.topAnswers = result.data.answers;
      this.answerPage = true;
    });
  }

  // loadAnswerComments(answerId) {
  //   this.answerService.getAnswerComments(answerId).subscribe(result => {
  //     this.question.topComments = result.data.comments;
  //     this.commentPage2 = true;
  //   });
  // }
}
