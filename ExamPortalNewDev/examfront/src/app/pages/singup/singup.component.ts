import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  constructor(private userService:UserService, private snack:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username==''|| this.user.username==null){
      this.snack.open("User is required !!",'',{duration:3000, verticalPosition:'top',horizontalPosition:'right',});
      return;
    }

    //addUser : userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
       // alert('success');
       Swal.fire('Successfully done!!','User i is : '+data.id,'success');
      },
      (error)=>{
        //error
        console.log(error);
        this.snack.open("User with this username is already there in DB !! try with another username !!",'',{duration:300});
      }
    )
  }

}
