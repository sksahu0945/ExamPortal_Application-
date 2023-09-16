import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { AddQuizComponent } from '../../admin/add-quiz/add-quiz.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  //totalMarks:any=this.quiz.maxMarks;
  isSubmit = false;

  timer: any;

  constructor(
    private _loactionSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionsService,
    private _snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();

  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 1 * 60;

        //console.log(this.questions);

        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });

        this.startTimer();

      },
      (error) => {
        console.log(error);

        this._snack.open('Error in loading questions', '', {
          duration: 3000,
        });
      }
    )
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this._loactionSt.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();

      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }

    }, 1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
    this.isSubmit = true;

        this.questions.forEach((q: any) => {
          if (q.givenAnswer == q.answer) {
            this.correctAnswers++;
            let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot +=parseFloat(Number(marksSingle).toFixed());
          }

          if (q.givenAnswer.trim() != '') {
            this.attempted++;
          }

        });

        // console.log("Correct ans " + this.correctAnswers);
        // console.log("Marks got " + this.marksGot);
        // console.log(this.attempted);

        // console.log(this.questions);

  }

  printPage(){
    window.print();
  }

}
