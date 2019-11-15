import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})

export class QuestionDetailsComponent implements OnInit {
  public id = 0;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params));
  }
  public items: { id: number, type: string, value: string }[] = [];

  public append() {
    this.id++;
    this.items.push({ 'id': this.id, 'type': 'text', 'value': '' });
  }

  public remove(did) {
    this.items = this.items.filter(x => x.id !== did);
  }
  ngOnInit() {
  }

}
