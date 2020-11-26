import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './modules/questions/questions.component';
import { LoginComponent } from './modules/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatRadioModule} from '@angular/material/radio'; 


@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
