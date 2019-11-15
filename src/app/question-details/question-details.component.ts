import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})

export class QuestionDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit() {
  }

}
