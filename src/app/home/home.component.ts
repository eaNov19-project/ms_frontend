import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question, QuestionsResult } from '../models/question.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  questions: Array<Question> = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getAllQuestions().subscribe(result => {
      this.questions = result.data.questions.slice(0,7);
    });
  }

}
