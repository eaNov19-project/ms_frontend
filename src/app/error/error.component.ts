import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  one: number = Math.floor(Math.random() * 10);
  two: number = Math.floor(Math.random() * 10);
  three: number = Math.floor(Math.random() * 10);
  refresh: any;
  constructor() {
    this.refresh = setInterval(() => { this.refreshNumber(); }, 200);
  }

  ngOnInit() {

  }
  refreshNumber() {
    if (this.one !== 4) {
      this.one = Math.floor(Math.random() * 10);
    }
    if (this.two !== 0) {
      this.two = Math.floor(Math.random() * 10);
    }
    if (this.three !== 4) {
      this.three = Math.floor(Math.random() * 10);
    }
    if (this.one === 4 && this.two === 0 && this.three === 4) {
      clearInterval(this.refresh);
    }
  }

}
