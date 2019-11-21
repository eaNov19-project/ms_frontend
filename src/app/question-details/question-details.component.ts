import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionResult } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { first } from 'rxjs/operators';
import { CommentService } from '../services/comment.service';
import { CommentModalComponent } from './comment-modal.component';

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

  answerForm: FormGroup;

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
  getQuestion(){
    this.questionService.getQuestionById(this.questionId).subscribe(result => {
      this.question = result.data.question;
    });
    this.questionService.checkfollowing(this.questionId).subscribe(
      result => {
        this.following = result.data.following;
      }
    )
  }
  ngOnInit() {
    this.getQuestion();
    this.following = false;
    this.questionService.checkfollowing(this.questionId).subscribe(result => {
      this.following = result.data.following;
    });
    this.commentPage = false;
    this.answerPage = false;

    // init form    
    this.answerForm = new FormGroup({
      body: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ])
    }); 
  }
  OnSubmitAnswerForm(questionId: string) {
    this.answerService.addAnswer(this.answerForm.value, questionId)
    .pipe(first())
    .subscribe((result:any) => {
      this.answerForm.reset();
      this.message = result['message'];
      this.type = result['success'] ? 'success' : 'danger';
      this.getQuestion();
    },
      error => {
        this.message = error.message;
        this.type = 'danger';
      });
  }
  openQuestionComment(questionId: string) {    
    const addModalRef = this.modalService.open(CommentModalComponent);    
    addModalRef.componentInstance.title = 'Enter comment for question';
    addModalRef.componentInstance.subjectType = 'question';
    addModalRef.componentInstance.subjectId = questionId;
    addModalRef.result.then((data) => {
      // on close
      this.getQuestion();
    }, (reason) => {
      // on dismiss
    });
  }

  openAnswerComment(answerId: string) { 
    const addModalRef = this.modalService.open(CommentModalComponent);     
    addModalRef.componentInstance.title = 'Enter comment for answer';
    addModalRef.componentInstance.subjectType = 'answer';
    addModalRef.componentInstance.subjectId = answerId;  
    addModalRef.result.then((data) => {
      // on close
      this.getQuestion();
    }, (reason) => {
      // on dismiss
    });
  }

  upVoteQuestion(questionId: any) {
    this.questionService.upVoteQuestion(questionId)
      .pipe(first())
      .subscribe((result:any) => {
        this.getQuestion();
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });

  }

  downVoteQuestion(questionId: any) {
    this.questionService.downVoteQuestion(questionId)
      .pipe(first())
      .subscribe((result:any) => {
        this.getQuestion();
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });

  }

  downVoteAnswer(answerId: string) {
    this.answerService.downVoteAnswer(answerId)
      .pipe(first())
      .subscribe((result:any) => {
        this.getQuestion();
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });

  }
  upVoteAnswer(answerId: string) {
    this.answerService.upVoteAnswer(answerId)
      .pipe(first())
      .subscribe((result:any) => {
        this.getQuestion();
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });
  }

  startFollowing() {
    this.questionService.startFollowing(this.questionId).pipe(first())
      .subscribe((result:any) => {
        this.message = result.message;
        if (result.success === true) { this.type = 'success'; }
        if (result.success !== true) { this.type = 'danger'; }
        this.getQuestion();
      },
        error => {
          this.message = error.message;
          this.type = 'danger';
        });
  }

  loadQuestionComments() {
    this.questionService.getQuestionComments(this.questionId).subscribe((result:any) => {
      this.question.topComments = result.data.comments;
      this.commentPage = true;
    });
  }

  loadAllAnswers() {
    this.answerService.getAnswersByQuestionId(this.questionId).subscribe((result:any) => {
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
