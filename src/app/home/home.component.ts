import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question, QuestionsResult } from '../models/question.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public questionForm: FormGroup;
  questions: Array<Question> = [];

  constructor(private questionService: QuestionService) { }
  getAllQuestions(){
    this.questionService.getAllQuestions().subscribe(result => {
      this.questions = result.data.questions.slice(0, 7);
    });

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
    this.getAllQuestions();
  }

  OnSubmitQuestionForm() {
    for (const i in this.questionForm.controls) {
      this.questionForm.controls[i].markAsDirty();
      this.questionForm.controls[i].updateValueAndValidity();
    }
    this.questionService.addQuestion(this.questionForm.value)
    .pipe(first())
    .subscribe(
      (result) => {
        console.log(result);
        this.questionForm.reset();
        this.getAllQuestions();
      },
      err => console.log(err)
    );
  }
}
