import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserregisterService } from '../userregister.service';
import { HttpClient, } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css'],
  styles: [`input.ng-invalid{border: 2px solid red;} input.ng-valid{border:2px solid green;} input.ng-untouched{border:none;}`]
})
export class RegisterComponent {

  constructor(private client:HttpClient, private userService:UserregisterService, private route:Router, private formBuilder:FormBuilder){ }

  registerForm=this.formBuilder.group({
    regname:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$")]],
    regemail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    // regpassword:['',[Validators.required,Validators.pattern("(?=^.{8,}$)(?=.\d)(?=.[!@#$%^&]+)(?![.\n])(?=.[A-Z])(?=.[a-z]).$")]],
    regpassword:['',[Validators.required,Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]],
    regconfirmpassword:['',Validators.required]
  })


  submitRegisterForm(){
    if(this.registerForm.value.regpassword==this.registerForm.value.regconfirmpassword){
      this.userService.addUser(this.registerForm.value).subscribe(()=>{
        alert("User Registered Successfully..");
      })
      let users={
        useremail:this.registerForm.value.regemail,
        username:this.registerForm.value.regname
      }
      this.userService.sendEmail("http://localhost:1999/sendEmail",users).subscribe(()=>{ })
    }
    else if(this.registerForm.value.regpassword!=this.registerForm.value.regconfirmpassword){
      alert("Password doesn't match");
      this.registerForm.reset();
    }
  }

  closeRegisterForm(){
    this.route.navigate(['login'])
  }
  registerReset(){
    this.registerForm.reset();  
  }
}
