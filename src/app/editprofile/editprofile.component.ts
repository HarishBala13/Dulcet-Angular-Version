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

  profileName:any ='';
  JSONID:any='';
  editProfile:boolean = false;
  userProfileFile:any='';
  profileImagePath:any='';
  userProfileImage:any='/assets/images/person.png';
  profiles:any='';

  constructor(private formbuilder:FormBuilder, private profileService:ProfileService, private http:HttpClient){
    // this.profileName = sessionStorage.getItem('currentUserName');
    this.JSONID = sessionStorage.getItem('currentUserJSONID');

    profileService.getUserProfileImage().subscribe( values => {
      this.profiles = values;
      console.log(this.profiles);
      this.profileName = this.profiles.regname;
      this.userProfileImage = this.profiles.profilePicture;
      console.log(this.userProfileImage);
    })
  }

  userProfile(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files;
      this.userProfileFile = file;
    }
    // console.log(this.userProfileFile);
  }

  editUsersProfile(userName:any){
    const userProfileformData = new FormData();
    console.log(this.userProfileFile);
    for(let userProfile of this.userProfileFile){
      userProfileformData.append('userProfile',userProfile);
    }
    console.log(userName);

    this.http.post("http://localhost:1999/userProfileUpload", userProfileformData).subscribe( values => {console.log(values)});

    this.profileImagePath = '/assets/images/'+this.userProfileFile[0].name;
    // console.log(this.profileImagePath);
      this.profileService.updateUserProfile(this.profileImagePath,userName)

  }

  openEditUserProfileDiv(){
    this.editProfile = true;
  }

  closeEditUserProfileDiv(){
    this.editProfile = false;
  }

}
