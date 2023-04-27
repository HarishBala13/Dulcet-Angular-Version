import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserregisterService } from '../userregister.service';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-newsongs',
  templateUrl: './newsongs.component.html',
  styleUrls: ['./newsongs.component.css'],
  // styles:[`input.ng-invalid{border: 2px solid red;} input.ng-valid{border:2px solid green;}`],
  encapsulation:ViewEncapsulation.None
})
export class NewsongsComponent implements OnInit {
  email:any="";
  password:any="";
  currentuserJSONID:string="";
  public forgotusername:any='';
  public forgotpassemail:any='';
  public regusername:any='';
  public vibes_value:any="";
  logout=false;
  login=true;
  openLogin=false;
  openHome=false;
  openRegister=false;
  openforgotpass=false;
  opennewforgotpass=false;
  closeMyCurrent=true;

  constructor(private client:HttpClient, private route:Router, private formBuilder:FormBuilder, private userService:UserregisterService, private songService:SongsService) {
    songService.vibesassets().subscribe(vibesvalues=>{
      this.vibes_value=vibesvalues;
    })
   }
   ngOnInit():void {  }


  loginForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password:['',[Validators.required,Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]]
  })

  forgotpassForm=this.formBuilder.group({
    forgotname:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$")]],
    forgotpassemail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    forgotpassword:['',[Validators.required,Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]],
    reforgotpassword:['',[Validators.required,Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]]
  })

  registerForm=this.formBuilder.group({
    regname:['',[Validators.required,Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,29}$")]],
    regemail:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    // regpassword:['',[Validators.required,Validators.pattern("(?=^.{8,}$)(?=.\d)(?=.[!@#$%^&]+)(?![.\n])(?=.[A-Z])(?=.[a-z]).$")]],
    regpassword:['',[Validators.required,Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]],
    regconfirmpassword:['',Validators.required]
  })

  submitLoginForm(){
    this.client.get<any>("http://localhost:3000/usersregister").subscribe(values=>{
        const user = values.find((result:any)=>{
          return result.regemail === this.loginForm.value.email && result.regpassword === this.loginForm.value.password
        });
        if(user){
         if(user.regemail="dulcetsass22@music.in" && user.regpassword=="@dulcet123"){
          this.openLogin=false;
          this.openforgotpass=false;
          this.opennewforgotpass=false;
          this.route.navigate(['admin']);
         }
          else if(confirm("Login Success..Are you Sure want to go to HomePage?") == true){
            // this.openLogin=false;
            // this.closeMyCurrent=true;
            // this.logout=true;
            // this.login=false;
          }
          else{
            alert("You have clicked cancel Button");
          }
        }
        else{
          alert("User not found");
          this.loginForm.reset();
        }
      })
}

  submitRegisterForm(){
    if(this.registerForm.value.regpassword==this.registerForm.value.regconfirmpassword){
      this.userService.addUser(this.registerForm.value).subscribe(()=>{
        alert("User Registered Successfully..");
        this.openLogin=true;
        this.openRegister=false;
        this.closeMyCurrent=false;
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

  submitForgotPassForm(){
      this.client.get<any>("http://localhost:3000/usersregister").subscribe(userdata=>{
        const forgotdet=userdata.find((results:any)=>{
          if(results.regemail==this.forgotpassForm.value.forgotpassemail && results.regname==this.forgotpassForm.value.forgotname){
            return this.currentuserJSONID=results.id;
          }
          return results.regemail==this.forgotpassForm.value.forgotpassemail && results.regname==this.forgotpassForm.value.forgotname
        })
        if(forgotdet){
          this.opennewforgotpass=true;
          if(this.forgotpassForm.value.forgotpassword!='' && this.forgotpassForm.value.reforgotpassword!=''){

            this.client.get<any>("http://localhost:3000/usersregister").subscribe(forgotdata=>{
                  const checkuserpass=forgotdata.find((values:any)=>{
                    // console.log("API Passwords: "+values.regpassword)
                    // console.log("forgotpassword"+this.forgotpassForm.value.forgotpassword);
                    // console.log("re-forgotpassword"+this.forgotpassForm.value.reforgotpassword);
                    return values.regpassword==this.forgotpassForm.value.forgotpassword && values.regconfirmpassword==this.forgotpassForm.value.reforgotpassword
                  })
                  if(checkuserpass){
                    alert("Old and New password is same");
                  }
                  else{
                    this.opennewforgotpass=false;
                    this.openforgotpass=false;
                    this.openLogin=true;
                  }
                })

            this.userService.updateUser(this.forgotpassForm.value.forgotpassword, this.currentuserJSONID ).subscribe(()=>{})

          // this.userService.updateUser(this.forgotpassForm.value.forgotname,this.forgotpassForm.value.forgotpassemail,this.forgotpassForm.value.forgotpassword,this.currentuserJSONID).subscribe(()=>{
          //   this.openLogin=true;
          // })
        }
      }
        else{
          alert("User and Email doesn't Exists");
        }
      })
  }

  loginReset(){
    this.loginForm.reset();
  }
  registerReset(){
    this.registerForm.reset();
  }
  forgotReset(){
    // trigger
    this.forgotpassForm.reset();
  }
  showLogin(){
    this.openLogin=false;
    this.closeMyCurrent=false;
    this.openRegister=false;
  }
  // showPassword(){
  //   const e=<HTMLElement> document.getElementsByClassName('fa fa-eye-slash')[0];
  //   e.className='fa fa-eye';
  //   e.style.color='violet';
  // }
  closeLoginForm(){
    this.openLogin=false;
    this.closeMyCurrent=true;
  }
  showHome(){
    this.openHome=true;
    this.closeMyCurrent=false;
  }
  showRegister(){
    this.openRegister=true;
    this.openLogin=false;
  }
  closeRegisterForm(){
    this.openRegister=false;
    this.openLogin=true;
    this.closeMyCurrent=true;
  }
  showForgotPassword(){
    this.openLogin=false;
    this.openforgotpass=true;
  }
  closeForgotPassForm(){
    this.openforgotpass=false;
    this.openLogin=true;
    this.openRegister=false;
    this.closeMyCurrent=false;
  }

logincheck(){
  alert("You are not logged in");
}
  images = [
    { img: "/assets/images/singers/yuvancoat.jpeg" },
    { img: "/assets/images/singers/andrea.jpg" },
    { img: "/assets/images/singers/anirudh.jpg" },
    { img: "/assets/images/singers/ar-rahman.jpg" },
    { img: "/assets/images/singers/ilayaraja.jpg" },
    { img: "/assets/images/singers/jonita gandhi.jpg" },
    { img: "/assets/images/singers/k_s_chithra.jpg" },
    { img: "/assets/images/singers/shreya-ghoshal.jpg" },
    { img: "/assets/images/singers/Shweta_Mohan.jpg" },
    { img: "/assets/images/singers/spb.jpg" },
    { img: "/assets/images/singers/vaali.jpg" }
  ];

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "autoplay":true,
    "autoplaySpeed":1000,
  };
}
