import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Question, QuestionsResult } from '../models/question.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
<<<<<<< HEAD
  questions:any[];
  constructor() { }
=======

  questions: Array<Question> = [];

  constructor(private questionService: QuestionService) { }
>>>>>>> af525412264cd6ac9df28dfbc5fa2df1ee6bab42

  ngOnInit() {
    this.questionService.getAllQuestions().subscribe(result => {
      this.questions = result.data.questions.slice(0,7);
    });
  }

}
