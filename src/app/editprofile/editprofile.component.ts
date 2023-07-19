import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SongsService } from '../songs.service';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {

  profileName : any ='';
  JSONID : any='';
  editProfile : boolean = false;
  userProfileDiv : boolean = true;
  userProfileFile : any='';
  profileImagePath : any='';
  userProfileImage : any='/assets/images/person.png';
  profiles : any='';
  date : any = '';
  today : any = '';

  constructor(private formbuilder:FormBuilder, private profileService:ProfileService, private _http:HttpClient){
    this.JSONID = sessionStorage.getItem('currentUserJSONID');

    this.date = new Date();
    this.today = this.date.toDateString();

    profileService.getUserProfileDetails().subscribe( values => {
      this.profiles = values;
      this.profileName = this.profiles.regname;
      this.userProfileImage = this.profiles.profilePicture;
    })
  }

  userProfile(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files;
      this.userProfileFile = file;
    }
  }

  editUsersProfile(userName:any){
    const userProfileformData = new FormData();
    console.log(this.userProfileFile);
    for(let userProfile of this.userProfileFile){
      userProfileformData.append('userProfile',userProfile);
    }

    this._http.post("http://localhost:1999/userProfileUpload", userProfileformData).subscribe( values => {console.log(values)});

    this.profileImagePath = '/assets/images/'+this.userProfileFile[0].name;
    this.profileService.updateUserProfile(this.profileImagePath,userName)

  }

  openEditUserProfileDiv(){
    this.editProfile = true;
    this.userProfileDiv = false;
  }

  closeEditUserProfileDiv(){
    this.editProfile = false;
    this.userProfileDiv = true;
  }

}
