import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserregisterService } from '../userregister.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [`input.ng-invalid{border: 2px solid red;} input.ng-valid{border:2px solid green;} input.ng-untouched{border:none;}`]
})
export class LoginComponent {

  errormessage='';
  returl:any;

  constructor( private userService:UserregisterService,
    private formBuilder:FormBuilder,
    private routes:Router,private activate:ActivatedRoute){
      this.activate.queryParamMap.subscribe(x=>{
        this.returl=x.get('returl');
        console.log(this.returl);
      })
      this.errormessage = this.userService.errorMessage;
     }

  loginForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$")]],
    password:['',[Validators.required,Validators.pattern(`(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}`)]]
  })

submitLoginForm(){
  this.userService.loginCheckUser(this.loginForm.value.email,this.loginForm.value.password,this.returl);
}

loginReset(){
  this.loginForm.reset();
}

closeLoginForm(){
  this.routes.navigate(['']);
}

}







// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styles: [`input.ng-invalid{border: 2px solid red;} input.ng-valid{border:2px solid green;} input.ng-untouched{border:none;}`]
// })
// export class LoginComponent implements OnInit {
//   public loginForm!:FormGroup
//   constructor(private client:HttpClient, private route:Router, private formBuilder:FormBuilder) {  }

//   ngOnInit(): void {
//     this.loginForm=this.formBuilder.group({
//       email:['',Validators.required],password:['',Validators.required]
//     })
//   }

//   submitLoginForm(){
//     this.client.get<any>("http://localhost:3000/usersregister").subscribe(values=>{
//       const user = values.find((result:any)=>{
//         return result.uemail === this.loginForm.value.email && result.upassword === this.loginForm.value.password
//       });
//       if(user){
//         alert("Login Success");
//         this.loginForm.reset();
//         this.route.navigate(['home']);
//       }
//       else{
//         alert("User not found");
//         this.loginForm.reset();
//       }
//   });
// }
// }




// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserregisterService } from '../userregister.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
// email:any="";
// password:any="";
// public loginusersvalues:any="";
//   constructor(private userService:UserregisterService, private client:HttpClient, private route:Router) {
//     this.client.get<any>("http://localhost:3000/usersregister").subscribe(values=>{
//       this.loginusersvalues=values;
//       // console.log("Loginusersvalues : "+this.loginusersvalues[0]['uemail']);
//       // console.log("Length of the DB values is : "+this.loginusersvalues.length);
//     });
//   }
//   submitLoginForm(){

//     var loginusers={
//       useremail:this.email, userpassword:this.password
//     }
//     // console.log("Loginusers values : "+loginusers.useremail+" "+loginusers.userpassword);
//     this.userService.checkUser(loginusers).subscribe(()=>{
//       for(var i=0;i<this.loginusersvalues.length;i++){
//         if(loginusers.useremail==this.loginusersvalues[i]['uemail'] && loginusers.userpassword==this.loginusersvalues[i]['upassword']){
//           alert("Login Successfull");
//           this.route.navigate(['home']);
//         }
//         else{
//           alert("User data not found");
//         }
//       }
//     })
//   }
// }
