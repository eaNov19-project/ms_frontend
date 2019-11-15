import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserQuestionsComponent } from './user-questions/user-questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { UserAnswersComponent } from './user-answers/user-answers.component';
import { EditAnswerComponent } from './edit-answer/edit-answer.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'questionDetails/:id', component: QuestionDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user/questions', component: UserQuestionsComponent },
  { path: 'user/addquestion', component: AddQuestionComponent },
  { path: 'user/editquestion/:id', component: EditQuestionComponent },
  { path: 'user/viewquestion/:id', component: ViewQuestionComponent },
  { path: 'user/answers', component: UserAnswersComponent },
  { path: 'user/editanswer/:id', component: EditAnswerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
