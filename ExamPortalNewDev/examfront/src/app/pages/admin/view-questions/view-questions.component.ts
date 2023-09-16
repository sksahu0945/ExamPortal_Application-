import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions=[
    {
      quesId:'',
      content:'what is java',
      image:'default.png',
      option1:'java',
      option2:'HLL',
      option3:'LLL',
      option4:'oops',
      answer:'java',
    },
  ];

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionsService,

  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    //this.quesId=this._route.snapshot.params['quesid'];
    //console.log(this.qId);
   // console.log(this.qTitle);
    
    
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      console.log(data);
      this.questions=data;
      
    },
    (error)=>{
      console.log(error);
      
    })
    
    
  }

  //delete question
  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this question',
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{
            Swal.fire('Success','Question Deleted','success');
          },
          
        );
        this.questions=this.questions.filter((q)=>q.quesId!=qid); 
      }
      (error:any)=>{
        Swal.fire('Error','Error in deleting question','error');
      }

    },
    );
  }

}
