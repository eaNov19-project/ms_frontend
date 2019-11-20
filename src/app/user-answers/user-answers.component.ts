import { Component, OnInit } from '@angular/core';
import { Answer } from '../models/answer.model';
import { AnswerService } from '../services/answer.service';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-answers',
  templateUrl: './user-answers.component.html',
  // styleUrls: ['./user-answers.component.css']
})
export class UserAnswersComponent implements OnInit {
  answers: Array<Answer> = [];
  constructor(private answerService: AnswerService, private auth: AuthService) { }

  ngOnInit() {
    this.answerService.getAnswersByUser(this.auth.currentUser.userId).pipe(first())
    .subscribe(
      (result) => {
        console.log(result);
        this.answers = result.data.answers;
      },
      err => console.log(err)
    );
  }

}
