import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { CommentService } from '../services/comment.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-comment-modal',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">{{ title }}</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
  
    <form [formGroup]="commentForm" (validSubmit)="OnSubmitCommentForm()">
      <div class="form-group">
        <textarea rows="6" formControlName="body" placeholder="Enter your comment here" class="form-control"></textarea>
        <bfv-messages></bfv-messages>
      </div>
      <button class="btn btn-info" type="submit">
        Submit
      </button>
    </form>
  </div> 
  `,
})
export class CommentModalComponent implements OnInit {
  @Input() title: string;
  @Input() subjectType: string;
  @Input() subjectId: string;
  public commentForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private commentService: CommentService) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      body: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ])
    });
  }
  OnSubmitCommentForm(){
    if(this.subjectType == 'question'){
      this.commentService.addQuestionComment(this.commentForm.value, this.subjectId)
      .pipe(first())
      .subscribe(
        (result) => {
          console.log(result);
          this.activeModal.close(result);
        },
        err => console.log(err)
      );
    } else {
      this.commentService.addAnswerComment(this.commentForm.value, this.subjectId)
      .pipe(first())
      .subscribe(
        (result) => {
          console.log(result);
          this.activeModal.close(result);
        },
        err => console.log(err)
      );
    }
  }

}
