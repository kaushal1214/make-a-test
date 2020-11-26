import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../app/modules/login/login.component'
import {QuestionsComponent} from '../app/modules/questions/questions.component'
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'question', component: QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
