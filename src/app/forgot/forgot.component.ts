import { Component } from '@angular/core';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {

  currentuserJSONID:string="";

  constructor(private userService:UserregisterService, private client:HttpClient, private route:Router, private formBuilder:FormBuilder){}
  forgotpassForm=this.formBuilder.group({
    forgotname:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$")]],
    forgotpassemail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    forgotpassword:['',[Validators.required,Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]],
    reforgotpassword:['',[Validators.required,Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]]
  })


  submitForgotPassForm(){
    this.client.get<any>("http://localhost:3000/usersregister").subscribe(userdata=>{
      const forgotdet=userdata.find((results:any)=>{
        return results.regemail==this.forgotpassForm.value.forgotpassemail && results.regname==this.forgotpassForm.value.forgotname
      })
      if(forgotdet){
        this.route.navigate(['admin']);
      }
      else{
        alert("name and email not matched")
      }
    });
  }

forgotReset(){
  // trigger
  this.forgotpassForm.reset();
}

closeForgotPassForm(){
  this.route.navigate(['login'])
}
}
