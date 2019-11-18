import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenGetter } from './util/token.helper';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserQuestionsComponent } from './user-questions/user-questions.component';
import { DataTablesModule } from 'angular-datatables';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { TokenInterceptor } from './services/token.interceptor';
import { UserAnswersComponent } from './user-answers/user-answers.component';
import { EditAnswerComponent } from './edit-answer/edit-answer.component';
import { EditDashboardModalComponent } from './dashboard/edit-dashboard-modal.component';
import { QuestionService } from './services/question.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnswerService } from './services/answer.service';
import { CommentService } from './services/comment.service';
import { QuestionSearchResultComponent } from './question-search-result/question-search-result.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    QuestionsComponent,
    QuestionDetailsComponent,
    DashboardComponent,
    SidebarComponent,
    UserQuestionsComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    ViewQuestionComponent,
    UserAnswersComponent,
    EditAnswerComponent,
    EditDashboardModalComponent,
    QuestionSearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        // whitelistedDomains: [conf.DOMAIN_URL]
      }
    }),
    ReactiveFormsModule,
    FormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    DataTablesModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    QuestionService,
    AnswerService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
