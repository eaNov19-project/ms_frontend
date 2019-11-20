import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  query: any;

  constructor(private route: ActivatedRoute, private router: Router, private questionService: QuestionService) {
    this.route.params.subscribe(params => this.query = params.q);

  }

  ngOnInit() {
    this.questionService.searchQuestion(this.query).subscribe(result => {
      this.questions = result;
    });
  }

}
