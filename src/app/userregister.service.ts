import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyServiceService } from './alertify-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserregisterService {
  errorMessage = "";
  returnURL:any;
  loggedin:boolean = false;
  isLoggedIn:boolean = false;
  forgotEmail: string | null | undefined ='';
  currentUserProfileName:any ='';
  currentUserEmailID:any ='';
  currentUserJSONID:any = '';

  constructor(private _client:HttpClient, private routes:Router, private AL:AlertifyServiceService) {  }
  addUser(body:any){
    return this._client.post("http://localhost:3000/usersregister",body);
  }

  routingGuardPath(URL:any){
    console.log(URL);
    this.returnURL = console.log(URL[0]['path']);
  }

  loginCheckUser(userEmail:any,userPass:any,returl:any){
    this._client.get<any>("http://localhost:3000/usersregister").subscribe(values=>{
      const user = values.find((result:any)=>{
        return result.regemail == userEmail && result.regpassword == userPass
  });

  if(user){
    sessionStorage.setItem('loggedin','true');
    sessionStorage.setItem("currentUserName",user.regname);
    sessionStorage.setItem("currentUserJSONID",user.id);
    sessionStorage.setItem("currentUserEmail",user.regemail);

    this.currentUserProfileName =  sessionStorage.getItem("currentUserName");
    this.currentUserJSONID =  sessionStorage.getItem("currentUserJSONID");
    this.currentUserEmailID = sessionStorage.getItem("currentUserEmail");

    if(returl==null){
      this.routes.navigateByUrl('playlist').then(()=>{
        location.reload();
      });
    }
    else{
      this.routes.navigate([returl]);
    }
    this.AL.Success("Login Success");
  }
  else if(userEmail="dulcetonline2023@gmail.com" && userPass=="@dulcet123"){
    if(prompt("Enter your I'D: ") == "123"){
      this.AL.Success("Admin Login Success");
      this.routes.navigateByUrl('admin').then(()=>{
        location.reload();
      });
    }
    else{
      this.AL.Error("Unauthorized Login");
    }
  }
  else if(!user){
    this.AL.Error("User not Found");
    // console.log("User not found");
  }
  });
}

logoutUser(){
  return this.loggedin=false;
}

  checkUser(){
    this.isLoggedIn=false;
    return this.isLoggedIn;
  }
  updateUser(password:any,repassword:any,length:any){
    return this._client.patch("http://localhost:3000/usersregister/"+length,{regpassword:password,regconfirmpassword:repassword,summa:password});
  }

  sendPasswordRecoveryEmail(URL:any, userData:any){
    return this._client.post(URL,userData);
  }

  sendRegisterEmail(urL:any,userData:any){
    return this._client.post(urL,userData);
  }
}
