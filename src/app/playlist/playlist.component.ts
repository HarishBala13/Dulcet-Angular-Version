import { Component, OnInit} from '@angular/core';
import { AlertifyServiceService } from '../alertify-service.service';
import { Router } from '@angular/router';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {

  openSongTracker : string | null | undefined= "";
  openAnotherPlaylist : boolean = false;
  openNewPlaylist : boolean = false;
  openUserPlaylistDiv : boolean = false;
  openLEODiv : boolean = false;
  openVikramIIDiv : boolean = false;
  userPlaylist : boolean = false;
  openPlaylistDiv : boolean = false;
  toggled = true;
  toggle = true;
  status = 'Enable';
  statuses = 'Enable';
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
  playlistTracks:any = [];
  usersPlaylist:any = [];
  toBeShuffledPlaylist:any=[];

  audioPlayer:HTMLAudioElement | undefined;

  public leoSongs = ['/assets/images/audio/Naa-Ready-MassTamilan.dev.mp3','/assets/images/audio/Bloody-Sweet-MassTamilan.dev.mp3'];
  public vikramSongs = [];


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
      this.audioPlayer.src = this.allAudios[this.currentTrackIndex];
      // this.audioPlayer.src = "/assests/images/audio/2.mp3";

    });

  }
      // console.log(this.vikramSongsAssets);
      // console.log(this.allPlaylistSongs);
      // console.log(values[0][movieString]);
      // console.log(this.movie);
      loadAudio(audioObject:any,object:any){

        // if(object.length == this.leoAudios.length){
        //   this.playlistTracks = this.leoAudios;
        // }
        // else{
        //   this.playlistTracks = this.vikramAudios;
        // }

        if(sessionStorage.getItem("loggedin")=="true"){
          sessionStorage.setItem("songTrackLocalStorage","true");
          console.log(sessionStorage.getItem("songTrackLocalStorage"));

          this.openSongTracker = sessionStorage.getItem("songTrackLocalStorage");
          console.log(this.openSongTracker);

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


  playSong(){
    // console.log(this.allAudios);
    // console.log(this.audioPlayer?.src)

    if(this.audioPlayer?.src){
      const currentSongClicked = this.audiosrc;
      this.audioPlayer.src = currentSongClicked;
      this.audioPlayer?.play();
      let masterPlay=document.getElementById("masterplay");
      masterPlay?.classList.add("wave");
    }
  }
  pauseSong(){
    if(this.audioPlayer?.src){
      const currentSongClicked = this.audiosrc;
      this.audioPlayer.src = currentSongClicked;
      this.audioPlayer?.pause();
      let masterPlay=document.getElementById("masterplay");
      masterPlay?.classList.remove("wave");
    }
    // this.audioPlayer?.pause();
    // let masterPlay=document.getElementById("masterplay");
    // masterPlay?.classList.remove("wave");
  }
  nextSong(){

    if(this.openLEODiv == true){
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.leoAudios.length;
      console.log( this.currentTrackIndex = (this.currentTrackIndex + 1) % this.leoAudios.length)
      this.playSong();
    }
    else if(this.openVikramIIDiv == true){
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.vikramAudios.length;
      this.playSong();
     }
}

    // this.currentTrackIndex = (this.currentTrackIndex + 1) % this.allAudios.length;


  previousSong(){
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.allAudios.length) % this.allAudios.length;
    if(this.audioPlayer?.src){
      this.audioPlayer.src = this.allAudios[this.currentTrackIndex];
    this.audioPlayer?.play();
    }
  }

  shufflePlaylist(){

    if(this.openLEODiv == true){
      this.toBeShuffledPlaylist = this.leoSongsAssets;
    }
    else if(this.openVikramIIDiv == true){
      this.toBeShuffledPlaylist = this.vikramSongsAssets;
      console.log(this.toBeShuffledPlaylist);
    }
    else if(this.userPlaylist == true){
      this.toBeShuffledPlaylist = this.userPlaylist;
    }
    for(var i=this.toBeShuffledPlaylist.length-1; i>0; i--){
      let j = Math.floor(Math.random() * (i+1));
      let temp = this.toBeShuffledPlaylist[i];
      this.toBeShuffledPlaylist[i] = this.toBeShuffledPlaylist[j];
      this.toBeShuffledPlaylist[j] = temp;
    }
    console.log(this.toBeShuffledPlaylist);
  }

  unShufflePlaylist(){

  }

  // currentSong(){
  //   let counting=this.count++;
  //   console.log(counting);
  //   let masterPlay=document.getElementById("masterplay");
  //   let icons=document.getElementById("masterPlay");
  //   let audio = new Audio();
  //   audio.src=this.audiosrc;
  //   console.log(audio.paused);

  //   if(audio.paused == true){
  //     audio.play();
  //     masterPlay?.classList.add("wave");
  //     icons?.classList.add("bi-pause-fill");
  //     icons?.classList.remove("bi-play-fill");
  //   }
  //   else {
  //     audio.pause();
  //     masterPlay?.classList.remove("wave");
  //     masterPlay?.classList.add("notwave");
  //     icons?.classList.remove("bi-pause-fill");
  //     icons?.classList.add("bi-play-fill");
  //   }
  // }

  // ngOnInit() {
  //   if(sessionStorage.getItem("loggedin")=="true"){
  //     sessionStorage.setItem("songTracker","true");
  //     console.log(sessionStorage.getItem("songTracker"));
  //     this.openSongTracker=sessionStorage.getItem("songTracker");
  //   }
  //   else if(sessionStorage.getItem("loggedin")=="false"){
  //     sessionStorage.removeItem("songTracker")
  //   }

  // }

  createPlaylist(){
    this.openNewPlaylist = true;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
  }

  createAnotherPlaylist(){
    this.openAnotherPlaylist = true;
  }

  openPlaylist(){
    this.openPlaylistDiv = true;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
  }

  openUserPlaylist(){
    this.songService.getUserPlaylist().subscribe(values => {
      this.playlistTracks = values;
      this.usersPlaylist = this.playlistTracks.myPlaylist_1;

      if(this.playlistTracks.myPlaylist_1 == undefined){
        this.userPlaylist = false;
        this.AL.Error("No Playlist available Create a new one")
      }
      else{
        this.userPlaylist = true;
        this.openPlaylistDiv = false;
        this.openVikramIIDiv = false;
        this.openLEODiv = false;
        this.openNewPlaylist = false;
      }
    })
  }

  closePlaylist(){
    this.openNewPlaylist = false;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
    this.openPlaylistDiv = false;
  }

  closeAnotherPlaylist(){
    this.openAnotherPlaylist = false;
    this.openNewPlaylist = false;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
    this.openPlaylistDiv = false;
  }

  openLEOPlaylist(){
    this.openLEODiv = true;
    this.openVikramIIDiv = false;
    this.openNewPlaylist = false;
    this.openPlaylistDiv = false;
  }

  openVikramPlaylist(){
    this.openVikramIIDiv = true;
    this.openLEODiv = false;
    this.openNewPlaylist = false;
    this.openPlaylistDiv = false;
  }

  addToLike() {
    this.toggle = !this.toggle;
    this.statuses = this.toggle ? 'Enable' : 'Disable';
  }

  addToFavouritesSongs(songsObject:any){
    this.toggled = ! this.toggled;
    this.status = this.toggled ? 'Enable' : 'Disable';
    this.songService.addToFavouritesSongsFromPlaylist(songsObject,this.JSONID);
  }

  addSongsToPlaylist(playlistSongs:any){
    this.songService.addSongsToUserPlaylist(playlistSongs,this.JSONID);
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
