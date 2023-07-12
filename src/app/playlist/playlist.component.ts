import { Component, OnInit} from '@angular/core';
import { AlertifyServiceService } from '../alertify-service.service';
import { Router } from '@angular/router';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit{

  openSongTracker : boolean | string | null= false;
  openNewPlaylist : boolean = false;
  openLEODiv : boolean = false;
  openVikramIIDiv : boolean = false;
  userPlaylist : boolean = true;
  toggled = true;
  status = 'Enable';
  count: number = 0;

  profileName : string | null | undefined ='';
  moviesongs : any;
  JSONID : any = ""
  movieNamesArray : any = "";

  oldSongID: number = 0;
  i : number = 0;
  j : number = 0;
  index : number = 0;
  currentTrackIndex = 0;

  audiosrc:string='';
  imagepath:string='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqivTclWTRsA-05BfrWrWb6Q0IJv3TW2RWgg&usqp=CAU';
  maintitle:string='OCEANIC SPACE';
  subtitle:string='A Breath of Fresh Air';
  songID:number=0;

  allPlaylistSongs : any = [];
  allLibrariesSongs : any = [];
  createPlaylistSongs : any = [];
  movie : any = [];
  allSongsArray : any = [];
  leoSongsAssets = [];
  vikramSongsAssets = [];
  leoAudios = [];
  vikramAudios = [];
  allAudios = [];
  playlistTracks = [];

  audioPlayer:HTMLAudioElement | undefined;


  constructor(private AL:AlertifyServiceService,private router:Router,private songService:SongsService){
    this.profileName = sessionStorage.getItem('currentUserName');
    this.JSONID = sessionStorage.getItem('currentUserJSONID');

    songService.topSongsAssets().subscribe((values:any)=>{
      for(this.i=0; this.i < values.length; this.i++){
        this.movie[this.i] = values[this.i].movieName;
        // this.moviesongs=values[i].this.movie;
        // console.log(this.movie[i]);

        var movieString = this.movie[this.i].toString();
        var moviesSongs = values[this.i][movieString];
        // console.log(moviesSongs);
        for(this.j = 0; this.j < moviesSongs.length; this.j++){
          this.allLibrariesSongs.push(moviesSongs[this.j]);
          // console.log(moviesSongs[this.j].images);
        }
      }
      for(this.index=0; this.index<this.allLibrariesSongs.length; this.index++){
        this.allSongsArray[this.index] = this.allLibrariesSongs[this.index].audios;
      }

      // console.log(this.allSongsArray);

      this.allAudios = this.allSongsArray;
      this.leoAudios = this.allSongsArray.slice(0, 2);
      this.vikramAudios = this.allSongsArray.slice(2, 15);

      // console.log(this.allAudios);
      // console.log(this.leoAudios);
      // console.log(this.vikramAudios);

      this.allPlaylistSongs = this.allLibrariesSongs.slice(0, 17);
      // console.log(this.allPlaylistSongs);
      this.leoSongsAssets = this.allLibrariesSongs.slice(0, 2);
      this.vikramSongsAssets = this.allLibrariesSongs.slice(2, 15);

      this.audioPlayer = new Audio();
      this.audioPlayer.src = "/assests/images/audio/2.mp3";

    });

  }
      // console.log(this.vikramSongsAssets);
      // console.log(this.allPlaylistSongs);
      // console.log(values[0][movieString]);
      // console.log(this.movie);
      loadAudio(audioObject:any,object:any){

        if(object.length == this.leoAudios.length){
          this.playlistTracks = this.leoAudios;
        }
        else{
          this.playlistTracks = this.vikramAudios;
        }

        if(sessionStorage.getItem("loggedin")=="true"){
          // sessionStorage.setItem("songTrackLocalStorage","true");
          console.log(sessionStorage.getItem("songTrackLocalStorage"));

          // this.openSongTracker = sessionStorage.getItem("songTrackLocalStorage");

          // this.audioPlayer?.src = audioObject.audios;
          this.audiosrc = audioObject.audios;
          this.imagepath = audioObject.images;
          this.maintitle = audioObject.movie_name;
          this.subtitle = audioObject.song_name;
          this.songID = audioObject.id;
        }
        else{
          this.AL.Error("You can't hear this song right now. Please login to hear the song");
        }
      }


  playAI(){
    this.audioPlayer?.play();
    let masterPlay=document.getElementById("masterplay");
    masterPlay?.classList.add("wave");
  }
  pauseAI(){
    this.audioPlayer?.pause();
    let masterPlay=document.getElementById("masterplay");
    masterPlay?.classList.remove("wave");
  }
  nextSongAI(){
    // this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    // this.audioPlayer.src = this.playlist[this.currentTrackIndex];
    this.audioPlayer?.play();
  }
  previousSongAI(){
    // this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    // this.audioPlayer.src = this.playlist[this.currentTrackIndex];
    this.audioPlayer?.play();
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

  createPlaylist(){
    this.openNewPlaylist = true;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
  }

  closePlaylist(){
    this.openNewPlaylist = false;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
  }
  openLEOPlaylist(){
    this.openLEODiv = true;
    this.openVikramIIDiv = false;
    this.openNewPlaylist = false;
  }
  openVikramPlaylist(){
    this.openVikramIIDiv = true;
    this.openLEODiv = false;
    this.openNewPlaylist = false;
  }

  addToFavouritesSongs(songsObject:any,i:any){
    console.log(i);
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
