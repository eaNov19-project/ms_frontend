import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionResult } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})

export class QuestionDetailsComponent implements OnInit {

  private question: Question;
  private questionResult: QuestionResult;
  private questionId;
  closeResult: string;
  modalOptions:NgbModalOptions;
  comment: any;


  constructor(private route: ActivatedRoute, private questionService: QuestionService, 
    private modalService: NgbModal) {
    this.route.params.subscribe(params => this.questionId = params.id);
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      centered: true,
      size: "lg"
    };

    this.comment = new FormControl("Type in your thoughts here");
  }

  ngOnInit() {
    this.questionService.getQuestionById(this.questionId).subscribe(result => {
<<<<<<< HEAD
      this.questionResult = result;
      this.question = this.questionResult.data.question;
      console.log("question: " + JSON.stringify(this.question));
      console.log(this.question.body)
=======
      this.question = result.data.question;
>>>>>>> af525412264cd6ac9df28dfbc5fa2df1ee6bab42
    });
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  submitComment() {
    let comment = this.comment.value;
    console.log("Comment entered: " +comment);
  }
  

}
