import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  JSONID:any='';

  constructor(private _http:HttpClient,private router:Router) {
    this.JSONID = sessionStorage.getItem("currentUserJSONID");
    console.log(this.JSONID);
  }

  updateUserProfile(path:any,userName:any){
    console.log(path);
    console.log(userName);
    this._http.patch("http://localhost:3000/usersregister/"+this.JSONID , {profilePicture:path, regname:userName}).subscribe( () => {
      this.router.navigate(['profile/editprofile']).then(() =>{
        location.reload();
      })
    });
  }

  getUserProfileDetails(){
    return this._http.get("http://localhost:3000/usersregister/"+this.JSONID);
  }
}
