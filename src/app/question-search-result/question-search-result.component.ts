import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-search-result',
  templateUrl: './question-search-result.component.html',
  styleUrls: ['./question-search-result.component.css']
})
export class QuestionSearchResultComponent implements OnInit {

  questions: Array<Question> = [];
  p: any;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.questionService.getAllQuestions().subscribe(result => {
      this.questions = result.data.questions;
    });
  }

}
