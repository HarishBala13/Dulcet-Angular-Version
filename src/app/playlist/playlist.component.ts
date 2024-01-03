import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertifyServiceService } from '../alertify-service.service';
import { Router } from '@angular/router';
import { SongsService } from '../songs.service';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  openSongTracker: string | null | undefined = '';
  openAnotherPlaylist: boolean = false;
  openNewPlaylist: boolean = false;
  openUserPlaylistDiv: boolean = false;
  openLEODiv: boolean = false;
  openVikramIIDiv: boolean = false;
  userPlaylist: boolean = false;
  openPlaylistDiv: boolean = false;
  toggled = true;
  toggle = true;
  status = 'Enable';
  statuses = 'Enable';
  count: number = 0;

  profileName: string | null | undefined = '';
  moviesongs: any;
  JSONID: any = '';
  movieNamesArray: any = '';

  oldSongID: number = 0;
  i: number = 0;
  j: number = 0;
  index: number = 0;
  songIndex: number = 0;
  currentTrackIndex: number = 0;
  playListLength: number = 0;

  audiosrc: any = '';
  imagepath: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqivTclWTRsA-05BfrWrWb6Q0IJv3TW2RWgg&usqp=CAU';
  maintitle: string = 'OCEANIC SPACE';
  subtitle: string = 'A Breath of Fresh Air';
  currentTime: string = '0:00';
  duration: string = '0:00';

  allPlaylistSongs: any = [];
  allLibrariesSongs: any = [];
  createPlaylistSongs: any = [];
  movie: any = [];
  allSongsArray: any = [];
  leoSongsAssets = [];
  vikramSongsAssets = [];
  leoAudios = [];
  vikramAudios = [];
  allAudios = [];
  playlistTracks: any = [];
  usersPlaylist: any = [];
  toBeShuffledPlaylist: any = [];

  audioPlayer: HTMLAudioElement | undefined;
  volumeBar: HTMLElement | undefined | null;
  volumeLevel: HTMLElement | undefined | null;

  constructor(
    private AL: AlertifyServiceService,
    private router: Router,
    private songService: SongsService,
    private cdr: ChangeDetectorRef
  ) {
    this.profileName = sessionStorage.getItem('currentUserName');
    this.JSONID = sessionStorage.getItem('currentUserJSONID');

    /**********************************Audio play,pause and shuffling of src values Starts here******************************/

    songService.topSongsAssets().subscribe((values: any) => {
      for (this.i = 0; this.i < values.length; this.i++) {
        this.movie[this.i] = values[this.i].movieName;

        var movieString = this.movie[this.i].toString();
        var moviesSongs = values[this.i][movieString];
        for (this.j = 0; this.j < moviesSongs.length; this.j++) {
          this.allLibrariesSongs.push(moviesSongs[this.j]);
        }

        console.log(moviesSongs.length += moviesSongs.length)
      }

      for (
        this.index = 0;
        this.index < this.allLibrariesSongs.length;
        this.index++
      ) {
        this.allSongsArray[this.index] =
          this.allLibrariesSongs[this.index].audios;
      }

      this.allAudios = this.allSongsArray;
      this.leoAudios = this.allSongsArray.slice(0, 2);
      this.vikramAudios = this.allSongsArray.slice(2, 15);

      this.allPlaylistSongs = this.allLibrariesSongs.slice(0, 17);
      this.leoSongsAssets = this.allLibrariesSongs.slice(0, 2);
      this.vikramSongsAssets = this.allLibrariesSongs.slice(2, 15);

      if (sessionStorage.getItem('loggedin') == 'true') {
        sessionStorage.setItem('songTrackLocalStorage', 'true');
        this.openSongTracker = sessionStorage.getItem('songTrackLocalStorage');
      }
      this.playListLength = values.length;
      console.log(this.playListLength);

    });
  }

  loadAudio(audioObject: any) {
    if (sessionStorage.getItem('loggedin') == 'true') {
      this.audiosrc = audioObject.audios;
      this.imagepath = audioObject.images;
      this.maintitle = audioObject.movie_name;
      this.subtitle = audioObject.song_name;
    } else {
      this.AL.Error(
        "You can't hear this song right now. Please login to hear the song"
      );
    }
  }

  playSong(): void {
    if (this.audioPlayer?.src) {
      const currentSongClicked = this.audiosrc;
      this.audioPlayer.src = currentSongClicked;
      this.audioPlayer?.play();
      console.log(this.audioPlayer?.currentTime);
      let masterPlay = document.getElementById('masterplay');
      masterPlay?.classList.add('wave');
      this.updateCurrentTime();
    }
  }

  pauseSong(): void {
    if (this.audioPlayer?.src) {
      const currentSongClicked = this.audiosrc;
      this.audioPlayer.src = currentSongClicked;
      this.audioPlayer?.pause();
      let masterPlay = document.getElementById('masterplay');
      masterPlay?.classList.remove('wave');
      console.log(this.audioPlayer?.currentTime);
      this.updateCurrentTime();
    }
  }

  updateCurrentTime(): void {
    const currentTimeElement = document.getElementById('currentStart');
    const durationElement = document.getElementById('currentEnd');
    const seekBar = <HTMLInputElement | undefined | null>(
      document.getElementById('seek')
    );

    if (currentTimeElement && durationElement && seekBar && this.audioPlayer) {
      currentTimeElement.innerText = this.formatTime(
        this.audioPlayer.currentTime
      );
      durationElement.innerText = this.formatTime(this.audioPlayer.duration);
      seekBar.value = JSON.stringify(
        (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100
      );
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  onSeekBarChange(event: Event): void {
    const seekBar = event.target as HTMLInputElement;
    const newTime =
      (parseFloat(seekBar.value) / 100) * this.audioPlayer!.duration;
    this.audioPlayer!.currentTime = newTime;
    this.updateCurrentTime();
  }

  ngOnInit(): void {
    this.audioPlayer = new Audio();
    this.audioPlayer.src = this.allAudios[this.currentTrackIndex];

    this.audioPlayer.addEventListener('timeupdate', () => {
      this.updateCurrentTime();
    });
  }

  // nextSong() {
  //   if (this.openLEODiv == true) {
  //     if (this.audioPlayer?.src) {
  //       const nextSongLoad = this.allAudios[this.audiosrc + 1];
  //       this.audioPlayer.src = nextSongLoad;
  //       this.audioPlayer?.play();
  //       let masterPlay = document.getElementById('masterplay');
  //       masterPlay?.classList.add('wave');
  //     }
  //   } else if (this.openVikramIIDiv == true) {
  //     this.currentTrackIndex =
  //       (this.currentTrackIndex + 1) % this.vikramAudios.length;
  //     console.log(this.currentTrackIndex);
  //     console.log(
  //       (this.currentTrackIndex =
  //         (this.currentTrackIndex + 1) % this.leoAudios.length)
  //     );
  //   }
  // }

  // previousSong() {
  //   this.currentTrackIndex =
  //     (this.currentTrackIndex - 1 + this.allAudios.length) %
  //     this.allAudios.length;
  //   if (this.audioPlayer?.src) {
  //     this.audioPlayer.src = this.allAudios[this.currentTrackIndex];
  //     this.audioPlayer?.play();
  //   }
  // }

  nextSong() {
    if (this.currentTrackIndex < this.allAudios.length - 1) {
      this.currentTrackIndex++;
      this.playCurrentSong();
    } else {
      // You have reached the end of the playlist
      // You can decide what to do in this case, e.g., go back to the first song
      this.currentTrackIndex = 0;
      this.playCurrentSong();
    }
  }

  previousSong() {
    if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
      this.playCurrentSong();
    } else {
      // You are at the beginning of the playlist
      // You can decide what to do in this case, e.g., go to the last song
      this.currentTrackIndex = this.allAudios.length - 1;
      this.playCurrentSong();
    }
  }

  private playCurrentSong() {
    console.log(this.audioPlayer);
    console.log(this.audioPlayer!.src);
    this.audioPlayer!.src = this.allAudios[this.currentTrackIndex];
    this.audioPlayer!.load(); // This resets the audio element
    this.audioPlayer!.play();
    let masterPlay = document.getElementById('masterplay');
    masterPlay?.classList.add('wave');
  }

  shufflePlaylist() {
    if (this.openLEODiv == true) {
      this.toBeShuffledPlaylist = this.leoSongsAssets;
    } else if (this.openVikramIIDiv == true) {
      this.toBeShuffledPlaylist = this.vikramSongsAssets;
    } else if (this.userPlaylist == true) {
      this.toBeShuffledPlaylist = this.userPlaylist;
    }
    for (var i = this.toBeShuffledPlaylist.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.toBeShuffledPlaylist[i];
      this.toBeShuffledPlaylist[i] = this.toBeShuffledPlaylist[j];
      this.toBeShuffledPlaylist[j] = temp;
    }
  }

  unShufflePlaylist() {
    if (this.openLEODiv == true) {
      this.leoSongsAssets = this.leoSongsAssets;
    } else if (this.openVikramIIDiv == true) {
      this.vikramSongsAssets = this.vikramSongsAssets;
    } else if (this.userPlaylist == true) {
      this.userPlaylist = this.userPlaylist;
    }
  }

  /**********************************Audio play,pause and shuffling of src values Ends here***********************************/

  /******************************* Boolean DIVs Open and Close Methods Starts here*******************************/

  createPlaylist() {
    this.openNewPlaylist = true;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
  }

  createAnotherPlaylist() {
    this.openAnotherPlaylist = true;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
  }

  openPlaylist() {
    this.openPlaylistDiv = true;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
  }

  openUserPlaylist() {
    this.songService.getUserPlaylist().subscribe((values) => {
      this.playlistTracks = values;
      this.usersPlaylist = this.playlistTracks.myPlaylist_1;

      if (this.playlistTracks.myPlaylist_1 == undefined) {
        this.userPlaylist = false;
        this.AL.Error('No Playlist available Create a new one');
      } else {
        this.userPlaylist = true;
        this.openPlaylistDiv = false;
        this.openVikramIIDiv = false;
        this.openLEODiv = false;
        this.openNewPlaylist = false;
      }
    });
  }

  closePlaylist() {
    this.openNewPlaylist = false;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
    this.openPlaylistDiv = false;
  }

  closeAnotherPlaylist() {
    this.openAnotherPlaylist = false;
    this.openNewPlaylist = false;
    this.openVikramIIDiv = false;
    this.openLEODiv = false;
    this.openPlaylistDiv = false;
  }

  openLEOPlaylist() {
    this.openLEODiv = true;
    this.openVikramIIDiv = false;
    this.openNewPlaylist = false;
    this.openPlaylistDiv = false;
    this.userPlaylist = false;
  }

  openVikramPlaylist() {
    this.openVikramIIDiv = true;
    this.openLEODiv = false;
    this.openNewPlaylist = false;
    this.openPlaylistDiv = false;
    this.userPlaylist = false;
  }

  /**********************************Boolean DIVs Open and Close Methods Ends here**************************************/

  addToLike() {
    this.toggle = !this.toggle;
    this.statuses = this.toggle ? 'Enable' : 'Disable';
  }

  addToFavouritesSongs(songsObject: any) {
    this.toggled = !this.toggled;
    this.status = this.toggled ? 'Enable' : 'Disable';
    this.songService.addToFavouritesSongsFromPlaylist(songsObject, this.JSONID);
  }

  addSongsToPlaylist(playlistSongs: any) {
    this.songService.addSongsToUserPlaylist(playlistSongs, this.JSONID);
  }

  // increaseLevel(event:any){
  //   console.log(event);
  //   const volumeBar = document.querySelector(".volume-bar") as HTMLElement;
  //   const volumeLevel = document.querySelector(".volume-level") as HTMLElement;
  //   const clickX = event.clickX - volumeBar?.getBoundingClientRect().left;
  //   const barWidth = volumeBar?.offsetWidth;
  //   const newVolume = (clickX / barWidth) * 100;
  //   console.log(clickX);
  //   console.log(barWidth);
  //   console.log(newVolume);
  //   volumeLevel.style.width = `${newVolume}%`;
  // }

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
}
