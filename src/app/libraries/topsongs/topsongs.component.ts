import { Component, OnInit } from '@angular/core';
import { AlertifyServiceService } from 'src/app/alertify-service.service';
import { SongsService } from 'src/app/songs.service';

@Component({
  selector: 'app-topsongs',
  templateUrl: './topsongs.component.html',
  styleUrls: ['./topsongs.component.css']
})
export class TopsongsComponent implements OnInit{
  topSongs:any='';
  openSongTracker:boolean | string | null= false;
  currentTrackIndex:number=0;
  audiosrc:string='';
  imagepath:string='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqivTclWTRsA-05BfrWrWb6Q0IJv3TW2RWgg&usqp=CAU';
  maintitle:string='OCEANIC SPACE';
  subtitle:string='A Breath of Fresh Air';
  songID:number=0;
  toggle = true;
  status = 'Enable';
  movie : any = [];
  playlistSongsArray : any = [];
  allPlaylistSongs : any = [];

  private audioPlayer:HTMLAudioElement;
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

  constructor(private songService:SongsService, private AL:AlertifyServiceService){
    this.audioPlayer = new Audio();
    this.audioPlayer.src = this.playlist[this.currentTrackIndex];
    console.log(this.playlist);
    songService.topSongsAssets().subscribe((values:any)=>{
      for(var i=0;i<values.length;i++){
        this.movie[i]=values[i].movieName;
        var movieString = this.movie[i].toString();
        var moviesSongs = values[i][movieString];
        for(var j=0;j<moviesSongs.length;j++){
          this.playlistSongsArray.push(moviesSongs[j]);
        }
      }
      this.allPlaylistSongs = this.playlistSongsArray.slice(1, 17);
    })
  }

  ngOnInit() {
    if(sessionStorage.getItem("loggedin")=="true"){
      sessionStorage.setItem("songTracker","true");
      console.log(sessionStorage.getItem("songTracker"));
      this.openSongTracker=sessionStorage.getItem("songTracker");
    }
    else if(sessionStorage.getItem("loggedin")=="false"){
      sessionStorage.removeItem("songTracker")
    }
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
      sessionStorage.setItem("songTracker","true");
      console.log(localStorage.getItem("songTracker"));
      this.openSongTracker=localStorage.getItem("songTracker");
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
}
