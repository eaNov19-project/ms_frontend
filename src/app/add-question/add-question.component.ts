import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { first } from 'rxjs/operators';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['../login/login.component.css']
})
export class AddQuestionComponent implements OnInit {
  @Input() action: String = 'Add';
  @Input() questionId: String;
  public questionForm: FormGroup;
  private questionObj: Question;
  constructor(public activeModal: NgbActiveModal, private questionService: QuestionService) { }

  get titleControl() {
    return this.questionForm.get('title') as FormControl;
  }
  get bodyControl() {
    return this.questionForm.get('body') as FormControl;
  }

  ngOnInit() {
    
    this.questionForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(200)
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ])
    });
    if(this.action === 'Edit') {
      this.questionService.getQuestionById(this.questionId)
      .pipe(first())
      .subscribe(
        (result) => {
          console.log(result);
          this.questionObj = result.data.question;
          const currentTitle = this.questionObj != null ? this.questionObj.title : '';
          const currentBody = this.questionObj != null ? this.questionObj.body : '';
          this.titleControl.setValue(currentTitle);
          this.bodyControl.setValue(currentBody);
          // this.questionForm = new FormGroup({
          //   title: new FormControl(currentTitle, [
          //     Validators.required,
          //     Validators.maxLength(200)
          //   ]),
          //   body: new FormControl(currentBody, [
          //     Validators.required,
          //     Validators.maxLength(500)
          //   ])
          // });
        },
        err => console.log(err)
      );
      }else {
        // this.questionForm = new FormGroup({
        //   title: new FormControl('', [
        //     Validators.required,
        //     Validators.maxLength(200)
        //   ]),
        //   body: new FormControl('', [
        //     Validators.required,
        //     Validators.maxLength(500)
        //   ])
        // });

      }
    // const currentTitle = this.questionObj != null ? this.questionObj.title : '';
    // const currentBody = this.questionObj != null ? this.questionObj.body : '';
  }

  OnSubmitForm() {
    for (const i in this.questionForm.controls) {
      this.questionForm.controls[i].markAsDirty();
      this.questionForm.controls[i].updateValueAndValidity();
    }
    if(this.action === 'Edit') {
      this.activeModal.close('Edit closed');
    }
    this.questionService.addQuestion(this.questionForm.value)
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
