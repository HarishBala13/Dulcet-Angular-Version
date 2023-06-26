import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyServiceService } from './alertify-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserregisterService {
  errorMessage="";
  loggedin:boolean=false;
  isLoggedIn:boolean=false;
  forgotEmail:string | null | undefined ='';

  constructor(private client:HttpClient, private routes:Router, private AL:AlertifyServiceService) {  }
  addUser(body:any){
    return this.client.post("http://localhost:3000/usersregister",body);
  }

  loginCheckUser(userEmail:any,userPass:any,returl:any){
    this.client.get<any>("http://localhost:3000/usersregister").subscribe(values=>{
      const user = values.find((result:any)=>{
        return result.regemail == userEmail && result.regpassword == userPass
  });

  if(user){
    if(returl==null){
      setTimeout(  ()=>{this.routes.navigate(['']),8000});
      // console.log(user);
      // console.log("ReturnURL in IF : "+returl);
      // this.routes.navigate(['playlist']);
    }
    else{
      console.log(returl);
      this.routes.navigate([returl]);
    }
    localStorage.setItem('loggedin','true');
    console.log(localStorage.setItem("currentUserName",user.regname));
    this.AL.Success("Login Success");
    // console.log(localStorage.getItem("loggedin"));
    // console.log(localStorage.getItem("currentUserName"));
    // this.isLoggedIn=true;
    // console.log(this.isLoggedIn);
    // console.log("Login Success");
    // this.routes.navigate(['']);
  }
  else if(userEmail="dulcetonline2023@gmail.com" && userPass=="@dulcet123"){


    if(prompt("Enter AdminI'D: ")=="123"){
      // setTimeout(  ()=>this.routes.navigate(['/admin']),3000);
      this.AL.Success("Admin Login Success");
      setTimeout(()=>{
        this.routes.navigate(['admin']);
      })
    }
    else{
      this.AL.Error("Unauthorized Login");
    }

    // this.routes.navigate(['admin']);
  }
  else if(!user){
    this.AL.Error("User not Found");
    console.log("User NOt found");
  }
  })
}

logoutUser(){
  return this.loggedin=false;
}

  checkUser(){
    this.isLoggedIn=false;
    return this.isLoggedIn;
    // return this.client.get("http://localhost:3000/usersregister");
  }
  updateUser(password:any,repassword:any,length:any){
    return this.client.patch("http://localhost:3000/usersregister/"+length,{regpassword:password,regconfirmpassword:repassword});
  }

  sendPasswordRecoveryEmail(URL:any, userData:any){
    console.log(userData);
    return this.client.post(URL,userData);
  }
  sendRegisterEmail(urL:any,userData:any){
    return this.client.post(urL,userData);
  }
}
