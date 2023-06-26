import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SongsService } from '../songs.service';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';
import { AlertifyServiceService } from '../alertify-service.service';
import { Router } from '@angular/router';
import { count } from 'rxjs';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  logout=false;
  login=true;
  vibes_value:any="";
  new_songs_values:any='';
  openBottomSongTrack:boolean | string | null= false;
  audiosrc:string='';
  imagepath:string='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqivTclWTRsA-05BfrWrWb6Q0IJv3TW2RWgg&usqp=CAU';
  maintitle:string='OCEANIC SPACE';
  subtitle:string='A Breath of Fresh Air';
  songID:number=0;
  count:number=0;

  // images = [
  //   { img: "/assets/images/singers/yuvancoat.jpeg" },
  //   { img: "/assets/images/singers/andrea.jpg" },
  //   { img: "/assets/images/singers/anirudh.jpg" },
  //   { img: "/assets/images/singers/ar-rahman.jpg" },
  //   { img: "/assets/images/singers/ilayaraja.jpg" },
  //   { img: "/assets/images/singers/jonita gandhi.jpg" },
  //   { img: "/assets/images/singers/k_s_chithra.jpg" },
  //   { img: "/assets/images/singers/shreya-ghoshal.jpg" },
  //   { img: "/assets/images/singers/Shweta_Mohan.jpg" },
  //   { img: "/assets/images/singers/spb.jpg" },
  //   { img: "/assets/images/singers/vaali.jpg" }
  // ];

  // slideConfig = {
  //   "slidesToShow": 3,
  //   "slidesToScroll": 1,
  //   "autoplay":true,
  //   "autoplaySpeed":1000,
  // };


  public item:any="";
  constructor(private songService:SongsService,
    private userService:UserregisterService,
    private client:HttpClient,
    private AL:AlertifyServiceService,
    private router:Router) {

    this.songService.dulcetassets().subscribe((values=>{  this.item=values;  }));

    this.songService.vibesassets().subscribe(vibesvalues=>{  this.vibes_value=vibesvalues;  console.log(this.vibes_value); });

    this.songService.newsongsassets().subscribe(newsongsvalue=>{  this.new_songs_values=newsongsvalue;   });



  }

  ngOnInit() {
    if(localStorage.getItem("loggedin")=="true"){
      localStorage.setItem("songTrackLocalStorage","true");
      console.log(localStorage.getItem("songTrackLocalStorage"));
      this.openBottomSongTrack=localStorage.getItem("songTrackLocalStorage");
    }
  }

  playAudio(audioObject:any){
    if(localStorage.getItem("loggedin")=="true"){
      localStorage.setItem("songTrackLocalStorage","true");
      console.log(localStorage.getItem("songTrackLocalStorage"));
      this.openBottomSongTrack=localStorage.getItem("songTrackLocalStorage");
      this.audiosrc=audioObject.audios;
      this.imagepath=audioObject.images;
      this.maintitle=audioObject.maintitle;
      this.subtitle=audioObject.subtitle;
      this.songID=audioObject.id;
      // let masterPlay=document.getElementById("masterplay");
      // console.log(masterPlay);
      // masterPlay?.classList.add("wave");
      // let audio = new Audio();
      // audio.src=this.audiosrc;
      // console.log(this.audiosrc);
      // audio.play();
    }
else{
  this.AL.Error("You are not logged in to hear this Song..Please login and play the song");
  setTimeout(  ()=>   this.router.navigate(['login']), 3000  );
}
  }

  currentSong(event:any){
    let counting=this.count++;
    console.log(counting);
    let masterPlay=document.getElementById("masterplay");
    let icons=document.getElementById("masterPlay");
    let audio = new Audio();
    audio.src=this.audiosrc;
    console.log(audio.paused);

    if(audio.paused==true){
      audio.play();
      masterPlay?.classList.add("wave");
      icons?.classList.add("bi-pause-fill");
      icons?.classList.remove("bi-play-fill");
    }
    else {
      audio.pause();
      masterPlay?.classList.remove("wave");
      masterPlay?.classList.add("notwave");
      icons?.classList.remove("bi-pause-fill");
      icons?.classList.add("bi-play-fill");
    }

    // if(counting > 0){
    //   audio.src=this.audiosrc;
    //   audio.pause();
    //   masterPlay?.classList.remove("wave");
    //   masterPlay?.classList.add("notwave");
    //   icons?.classList.remove("bi-pause-fill");
    //   icons?.classList.add("bi-play-fill");
    // }
    // else{
    //   audio.src=this.audiosrc;
    //   console.log(audio.paused);
    //   audio.play();
    //   masterPlay?.classList.add("wave");
    //   icons?.classList.add("bi-pause-fill");
    //   icons?.classList.remove("bi-play-fill");
    // }
    // console.log(count);
    // console.log(event);
    // console.log(event.className);



    // console.log(masterPlay);

  }
  nextSong(){}
  previousSong(){}



    // addPlaylist(){
  // this.client.get<any>("http://localhost:3000/usersregister").subscribe((datas)=>{
  //   const checkuser=datas.find((results:any)=>{
  //     return results.regemail;
  //   })
  //   if(checkuser){
  //     console.log("user found");
  //   }
  //   else{
  //     console.log("user not found")
  //   }
  // })
  // }

}
