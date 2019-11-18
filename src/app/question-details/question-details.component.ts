import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionResult } from '../models/question.model';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})

export class QuestionDetailsComponent implements OnInit {

  private question: Question;
  private questionResult: QuestionResult;
  private questionId;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {
    this.route.params.subscribe(params => this.questionId = params.id);
  }

  ngOnInit() {
    this.questionService.getQuestionById(this.questionId).subscribe(result => {
      this.questionResult = result;
      this.question = this.questionResult.data.question;
    });
  }

}
