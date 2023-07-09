import { Component } from '@angular/core';
import { UserregisterService } from '../userregister.service';
import { AlertifyServiceService } from '../alertify-service.service';
import { Router } from '@angular/router';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {

  isMenuOpened:boolean=false;
  openMyProfile:boolean=false;
  editProfile:boolean=false;
  openNewPlaylist:boolean=true;
  toggled = true;
  status = 'Enable';

  profileName:string | null | undefined ='';
  JSONID:any='';
  oldSongID:number=0;
  public assets:any="";

  constructor(private AL:AlertifyServiceService,private router:Router,private songService:SongsService){
    this.profileName = sessionStorage.getItem('currentUserName');
    this.JSONID = sessionStorage.getItem('currentUserJSONID');
    console.log(this.profileName);
    console.log(this.JSONID);
    songService.topSongsAssets().subscribe(values=>{
      this.assets=values;
    });
  }

  clickedOutside(){
    this.isMenuOpened=false;
    // console.log("clicked clickedOutside");
  }

  toggle(){
    this.isMenuOpened =! this.isMenuOpened;
    // console.log("clicked toggle");
  }

  openProfile(){
    this.openMyProfile=true;
  }

  openEditprofile(){
    this.editProfile=true;
  }

  createPlaylist(){
    this.openNewPlaylist=true;
  }

  addToFavouritesSongs(songsObject:any){
    this.toggled = ! this.toggled;
    this.status = this.toggled ? 'Enable' : 'Disable';
    this.songService.addToFavouritesSongsFromPlaylist(songsObject,this.JSONID);
  }

  logout(){
      this.AL.AlertUser(`Are You sure want to Logout ${sessionStorage.getItem("currentUserName")} ?`);
      sessionStorage.setItem("loggedin","false");
      sessionStorage.removeItem("currentUserName");
      this.router.navigateByUrl('login').then(()=>{
        location.reload();
      })
  }
}
