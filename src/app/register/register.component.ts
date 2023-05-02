import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserregisterService } from '../userregister.service';
import { HttpClient, } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertifyServiceService } from '../alertify-service.service';
import dateFormat, { masks } from "dateformat";
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css'],
  styles: [`input.ng-invalid{border: 2px solid red;} input.ng-valid{border:2px solid green;} input.ng-untouched{border:none;}`]
})
export class RegisterComponent {

  constructor(private client:HttpClient,
  private userService:UserregisterService,
  private route:Router,
  private formBuilder:FormBuilder,
  private AL:AlertifyServiceService){ }

    userRegisterTime:string='';
  registerday = new Date();
  registerForm=this.formBuilder.group({
    regname:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$")]],
    regemail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    // regpassword:['',[Validators.required,Validators.pattern("(?=^.{8,}$)(?=.\d)(?=.[!@#$%^&]+)(?![.\n])(?=.[A-Z])(?=.[a-z]).$")]],
    regpassword:['',[Validators.required,Validators.pattern(`(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}`)]],
    regconfirmpassword:['',[Validators.required]]
  })


  submitRegisterForm(){
    if(this.registerForm.value.regpassword == this.registerForm.value.regconfirmpassword){

      this.userRegisterTime=formatDate(this.registerday, 'dd-MM-yyyy hh:mm:ss a', 'en-US');

      let newRegUser={
        regname:this.registerForm.value.regname,
        regemail:this.registerForm.value.regemail,
        regpassword:this.registerForm.value.regpassword,
        regconfirmpassword:this.registerForm.value.regconfirmpassword,
        UserRegisterTime:this.userRegisterTime
      }

      this.userService.addUser(newRegUser).subscribe(()=>{
        this.AL.NotifyUser(this.registerForm.value.regname,`Please check your mail ${this.registerForm.value.regemail} for verification..Thank You`);
        this.registerForm.reset();
      });

      let users={
        useremail:this.registerForm.value.regemail,
        username:this.registerForm.value.regname,
        registeredtime:this.userRegisterTime
      }

      this.userService.sendRegisterEmail("http://localhost:1999/sendEmail",users).subscribe((data)=>{});

    }
    else if(this.registerForm.value.regpassword != this.registerForm.value.regconfirmpassword){

      this.AL.Error("Password doesn't match");

    }
    else if(this.registerForm.value.regname == '' && this.registerForm.value.regemail == '' && this.registerForm.value.regpassword == '' && this.registerForm.value.regconfirmpassword == ''){

      this.AL.Error("Please fill all the Blanks");

    }
  }

  closeRegisterForm(){
    this.route.navigate(['login'])
  }
  registerReset(){
    this.registerForm.reset();
  }
}
