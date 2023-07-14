import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  JSONID:any='';

  constructor(private http:HttpClient,private router:Router) {
    this.JSONID = sessionStorage.getItem("currentUserJSONID");
  }
  updateUserProfile(path:any,userName:any){
    console.log(path);
    console.log(userName);
    this.http.patch("http://localhost:3000/usersregister/"+this.JSONID , {profilePicture:path, regname:userName}).subscribe(values => {
      console.log(values);
      this.router.navigate(['profile/editprofile']).then(() =>{
        location.reload();
      })
    });
  }

  getUserProfileImage(){
    return this.http.get("http://localhost:3000/usersregister/"+this.JSONID);
  }
}
