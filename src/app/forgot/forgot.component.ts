import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertifyServiceService } from '../alertify-service.service';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ForgotComponent {

  constructor(private userService:UserregisterService,
  private client:HttpClient,
  private route:Router,
  private formBuilder:FormBuilder,
  private AL:AlertifyServiceService){}
  forgotpassForm=this.formBuilder.group({
    forgotname:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$")]],
    forgotpassemail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
  })


  submitForgotPassForm(){
    this.client.get<any>("http://localhost:3000/usersregister").subscribe(userdata=>{
      const forgotdet=userdata.find((results:any)=>{
        if(results.regemail == this.forgotpassForm.value.forgotpassemail && results.regname == this.forgotpassForm.value.forgotname){
          return results.id;
        }
      })
      let users={
        userEmail:this.forgotpassForm.value.forgotpassemail,
        userName:this.forgotpassForm.value.forgotname
      }
      console.log(forgotdet)
      if(forgotdet){
        this.AL.Success("Reset password has been sent to your Email ID");
        localStorage.setItem("ForgotEmail",JSON.stringify(users.userEmail));
        console.log(localStorage.getItem("ForgotEmail"));
        localStorage.removeItem("ForgotEmail");
        this.userService.sendPasswordRecoveryEmail("http://localhost:1999/sendForgotPassEmail",users).subscribe((data)=>{
          console.log(data)
        });
      }
      else{
        this.AL.Error("Name and Email ID not found");
      }
    });
  }

  forgotReset(){
  this.forgotpassForm.reset();
}

closeForgotPassForm(){
  this.route.navigate(['login']);
}
home(){
  this.route.navigate(['']);
}}
