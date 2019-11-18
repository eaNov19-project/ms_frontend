import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question, QuestionsResult } from '../models/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  private questionsResult: QuestionsResult;
  private questions: Array<Question> = [];
  private p: any;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.questionService.getAllQuestions().subscribe(result => {
      this.questionsResult = result;
      this.questionsResult.data.questions.forEach(element => {
        this.questions.push(element);
      });
    });
  }

}
