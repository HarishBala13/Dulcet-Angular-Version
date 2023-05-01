import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertifyServiceService } from '../alertify-service.service';
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ForgotpassComponent {

  @Input() currentuserJSONID:number=0;

  public ID:any='';
  constructor(private userService:UserregisterService,
    private client:HttpClient,
    private route:Router,
    private formBuilder:FormBuilder,
    private AL:AlertifyServiceService){

    }
  forgotnewpassForm=this.formBuilder.group({
    forgotpassword:['',[Validators.required,Validators.pattern(`(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}`)]],
    reforgotpassword:['',[Validators.required,Validators.pattern(`(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}`)]]
  })

  submitForgotnewPassForm(){
    let forgotEmail = localStorage.getItem("ForgotEmail");
    console.log(forgotEmail);
    this.client.get<any>("http://localhost:3000/usersregister").subscribe(x=>{
      const OldPass = x.find((y:any)=>{
        console.log(y.regemail);
        return  forgotEmail == y.regemail && this.forgotnewpassForm.value.forgotpassword == y.regpassword && this.forgotnewpassForm.value.reforgotpassword && y.regconfirmpassword
      });
      if(OldPass){
        this.AL.Error("Entered Password matches with old password...Please Kindly recheck");
      }
      else if(this.forgotnewpassForm.value.forgotpassword == this.forgotnewpassForm.value.reforgotpassword){
        console.log(OldPass)
        this.AL.Success("Password updated Successfully..You will be redirected to Login page in a few seconds");
        this.userService.updateUser(this.forgotnewpassForm.value.forgotpassword,this.forgotnewpassForm.value.reforgotpassword,this.currentuserJSONID);
        setTimeout(()=>this.route.navigate(['login']),5000);
      }
      else{
        this.AL.Error("Password not matched..Please Kindly recheck");
      }

    })
  }

forgotReset(){
  this.forgotnewpassForm.reset();
}

closeForgotnewPassForm(){
  this.route.navigate(['login'])
}

}
