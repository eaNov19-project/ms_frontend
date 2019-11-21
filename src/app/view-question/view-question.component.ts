import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
  question: Question;
  private questionId: String;
  // questionId: String;
  constructor(private questionService: QuestionService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.questionId = params.id);
    
  }

  ngOnInit() {
    this.questionService.getQuestionById(this.questionId)
      .pipe(first())
      .subscribe(
        (result) => {
          console.log(result);
          this.question = result.data.question;
          });
  }

}
