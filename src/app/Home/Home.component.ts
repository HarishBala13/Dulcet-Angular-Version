import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SongsService } from '../songs.service';
import { AlertifyServiceService } from '../alertify-service.service';

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
  openSongTracker:any = '';
  audiosrc:string='';
  imagepath:string='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqivTclWTRsA-05BfrWrWb6Q0IJv3TW2RWgg&usqp=CAU';
  maintitle:string='OCEANIC SPACE';
  subtitle:string='A Breath of Fresh Air';
  songID:number=0;
  count:number=0;
  currentTrackIndex:number=0;
  toggle = true;
  status = 'Enable';
  item:any="";

  ngOnInit() {
    if(sessionStorage.getItem("loggedin")=="true"){
      // sessionStorage.setItem("songTracker","true");
      // console.log(sessionStorage.getItem("songTracker"));
      // this.openSongTracker=sessionStorage.getItem("songTracker");
    }
    else if(sessionStorage.getItem("loggedin")=="false"){
      // sessionStorage.removeItem("songTracker")
    }

  }


  public audioPlayer:HTMLAudioElement;
  private playlist : string[] = [
    '/assets/images/audio/Naa-Ready-MassTamilan.dev.mp3',
    '/assets/images/audio/JD-The-Alcoholic-MassTamilan.io.mp3',
    '/assets/images/audio/Pablo-Sandhanam-(Background-Score)-MassTamilan.dev.mp3',
    "/assets/images/audio/Jailer-Announcement-Theme-MassTamilan.dev.mp3",
    "/assets/images/audio/Rolex-Theme-(Background-Score)-MassTamilan.dev.mp3",
    "/assets/images/audio/Sandhanam-Theme-(Background-Score)-MassTamilan.dev.mp3",
    '/assets/images/audio/videoplayback (2).mp3',
    '/assets/images/audio/videoplayback (3).mp3',
    '/assets/images/audio/1.mp3',
    '/assets/images/audio/2.mp3',
    '/assets/images/audio/3.mp3',
    '/assets/images/audio/4.mp3',
    '/assets/images/audio/5.mp3'
  ];
  constructor(private songService:SongsService, private AL:AlertifyServiceService) {
    this.audioPlayer = new Audio();
    this.audioPlayer.src = this.playlist[this.currentTrackIndex];
    console.log(this.audioPlayer.src);

    this.songService.dulcetassets().subscribe((values=>{  this.item=values;  }));
    this.songService.mixedSongsAssets().subscribe(vibesvalues=>{  this.vibes_value = vibesvalues; });
    this.songService.topSongsAssets().subscribe(newsongsvalue=>{  this.new_songs_values = newsongsvalue;   });
  }

  playAI(){
    this.audioPlayer.play();
    let masterPlay=document.getElementById("masterplay");
    masterPlay?.classList.add("wave");
  }
  pauseAI(){
    this.audioPlayer.pause();
    let masterPlay=document.getElementById("masterplay");
    masterPlay?.classList.remove("wave");
  }
  nextSongAI(){
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.audioPlayer.src = this.playlist[this.currentTrackIndex];
    this.audioPlayer.play();
  }
  previousSongAI(){
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.audioPlayer.src = this.playlist[this.currentTrackIndex];
    this.audioPlayer.play();
  }
  loadAudio(audioObject:any){
    if(sessionStorage.getItem("loggedin")=="true"){
      sessionStorage.setItem("songTrackLocalStorage","true");
      console.log(sessionStorage.getItem("songTrackLocalStorage"));
      this.openSongTracker = sessionStorage.getItem("songTrackLocalStorage");
      this.audiosrc=audioObject.audios;
      this.imagepath=audioObject.images;
      this.maintitle=audioObject.maintitle;
      this.subtitle=audioObject.subtitle;
      this.songID=audioObject.id;
    }
    else{
      this.AL.Error("You can't hear this song right now. Please login to hear the song");
    }
  }



  addToLike() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }

  currentSong(){
    let counting=this.count++;
    console.log(counting);
    let masterPlay=document.getElementById("masterplay");
    let icons=document.getElementById("masterPlay");
    let audio = new Audio();
    audio.src=this.audiosrc;
    console.log(audio.paused);

    if(audio.paused == true){
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
  }
  nextSong(){}
  previousSong(){}
}

