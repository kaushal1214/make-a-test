import { Component, Inject, OnInit } from '@angular/core';
import {QuestionBuilder, Timer} from '../../services/questionBuilder'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData{
  correct: number,
  wrong: number,
  notAttempted: number,
  positiveScore: number,
  negativeScore: number
}
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  aptQuestions: any;
  technicalQues: any
  hh: string;
  mm: string;
  ss: string;
  imagePath = "assets/images/"
  image: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option = [];
  showImage: boolean;
  questionNumber: number;
  selectedAnswer: string;
  answers: any;
  markButton : string;
  questionClass = [];
  timer: Timer
  reviewMode: boolean;

  counter: any;
  constructor(private questions: QuestionBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.reviewMode = false;

    this.questions.totalQuestion().subscribe((res:any)=>{
      this.generateArray(res.total);
      this.hh = "00",
      this.mm = "00",
      this.ss = "00"
      this.questionNumber = 1;
      this.markButton = 'Mark for Review';
      this.loadQuestion(this.questionNumber);
      this.setTimer();

    })  
    for(let i=0;i<4;i++){
      this.option.push('example-radio-button')
    }
  }

  previous(){
    let answer  = this.answers[this.questionNumber-1]

    if(!this.selectedAnswer && !answer.marked) {
      this.questionClass[this.questionNumber -1] = 'unanswered'
      this.answers[this.questionNumber-1] = {question:this.questionNumber, answer: '', marked: false}
    }

    if(this.questionNumber>=2) {
      this.questionNumber--;
      this.loadQuestion(this.questionNumber);
    }
  }

  next(){
    let answer  = this.answers[this.questionNumber-1]

    if(!this.selectedAnswer && !answer.marked) {
        this.questionClass[this.questionNumber -1] = 'unanswered'
        this.answers[this.questionNumber-1] = {question:this.questionNumber, answer: '', marked: false}
    }
    if(this.questionNumber < this.aptQuestions.length) {
      this.questionNumber++;
      this.loadQuestion(this.questionNumber);
    }
  }

  markForReview(){
    let answer  = this.answers[this.questionNumber-1]

    if(answer.marked){  
      this.questionClass[this.questionNumber-1] = 'question-attempted'
      this.answers[this.questionNumber-1].marked = false;
      this.markButton = 'Mark for Review'
    } else {
      this.questionClass[this.questionNumber-1] = 'mark-for-review'
      this.answers[this.questionNumber-1].marked = true;
      this.markButton = 'Unmark Now'
    }
  }

  loadQuestion(number){
    this.selectedAnswer = null;
    this.questions.getQuestion(number).subscribe((res :any)=>{
      if(res.image) {
        this.showImage = true;
        this.image  = this.imagePath + res.image
      } else {
        this.showImage = false;
      }
      this.question = "Que " + number+": "+res.question
      this.option1 = res.option1;
      this.option2 = res.option2;
      this.option3 = res.option3;
      this.option4 = res.option4;

      if(this.answers.length>0 && this.answers[number-1]){
        this.selectedAnswer = this.answers[number-1].answer
        this.answers[number-1].saved = res.answer
        this.answers[number-1].marked ? this.markButton='Unmark Now':this.markButton='Mark for Review'

        if(this.reviewMode) {
          this.option = [];
          for(let i=0;i<4;i++){
            this.option.push('example-radio-button')
          }

          let index;
          switch(this.selectedAnswer){
            case 'option1': index = 0;
                            break;
            case 'option2': index = 1;
                            break;
            case 'option3': index = 2;
                            break;
            case 'option4': index = 3;
          }
          this.option[index] = 'incorrect_answer'

          let correct_option = res.answer;
          switch(correct_option){
            case 'option1': index = 0;
                            break;
            case 'option2': index = 1;
                            break;
            case 'option3': index = 2;
                            break;
            case 'option4': index = 3;
          }

          this.option[index] = 'correct_answer'
        }

      } else {
        this.markButton = 'Mark for Review'
      }
    },err=>{
      console.log(err)
    })
  }

  gotoQuiz(number){
    this.questionNumber = number;
    this.loadQuestion(number);
  }

  generateArray(size){
    this.aptQuestions = []
    this.answers = []
    for(let i =0; i<size; i++){
      this.aptQuestions.push(i+1)
      this.answers.push({question: i+1, answer:'', marked: false})
    }
  }

  saveMyAnswer(){
    let answer  = this.answers[this.questionNumber-1]
    if( !answer.marked && this.selectedAnswer) {
      this.questionClass[this.questionNumber -1] = 'question-attempted'
      this.answers[this.questionNumber-1] = {question:this.questionNumber, answer: this.selectedAnswer, marked: false, saved:answer.saved}
    } else{
      this.answers[this.questionNumber-1] = {question:this.questionNumber, answer: this.selectedAnswer, marked: true, saved:answer.saved}
    }
  }

  setTimer() {
    this.questions.getTime().subscribe((res: Timer) => {
      this.timer = { ...res }
      this.counter = setInterval(() => {
        let hh = Number(this.timer.HH)
        let mm = Number(this.timer.MM)
        let ss = Number(this.timer.SS);

        if (ss > 0) {
          ss--;
        } else if (mm > 0) {
          mm--;
          ss = 60
        } else if (hh > 0) {
          hh--;
          mm = 60
        } else {
          this.reviewMode = true;
          clearInterval(this.counter)
          this.generateResult();
        }
        this.timer.HH = hh.toString();
        this.timer.MM = mm.toString();
        this.timer.SS = ss.toString();
        
        
        this.updateTimer(hh.toString(), mm.toString(), ss.toString());
      }, 1000)
      
    })
  }
  
  updateTimer(hh,mm,ss){
    this.hh = hh;
    this.mm = mm,
    this.ss = ss
  }
  
  showDialog(data){
    const dref = this.dialog.open(DialogElementsExampleDialog,  {
      width: '500px',
      data
    });

    dref.afterClosed().subscribe(result=>{
      this.loadQuestion(this.questionNumber);
    })
  }
  
  generateResult(){
    const total = this.aptQuestions.length
    let correct = 0, wrong = 0;
    this.answers.forEach((answer,index)=>{
      if(answer.answer===answer.saved) {
        this.questionClass[index] = 'question-attempted'
        correct++
      } else if( answer.answer !=='') {
        this.questionClass[index] = 'unanswered'
        wrong++
      } else {
        this.questionClass[index] = ''
      }
    })
    const notAttempted = total - (correct+wrong)
    const data = {
      correct,
      wrong,
      notAttempted,
      positiveScore: correct,
      negativeScore: wrong * 0.5
    }
    this.showDialog(data);
  }

  finishNow(){
    this.timer.HH = "00"
    this.timer.MM = "00"
    this.timer.SS = "00"
  }
}


@Component({
  selector: 'dialog-elements',
  templateUrl: 'dialog-elements.html',
})
export class DialogElementsExampleDialog{
  
  totalMarks: number
  constructor(private dialofRef: MatDialogRef<DialogElementsExampleDialog>, 
    @Inject(MAT_DIALOG_DATA)public data: DialogData){
      this.totalMarks = this.data.positiveScore - this.data.negativeScore
    }

  
  
  review(){
    this.dialofRef.close();
  }
}