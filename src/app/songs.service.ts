import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  likedSongsProperty:any='';
  userAddSongsProperty:any='';
  subscribedPlansProperty:any='';

  myLikedSongsArray:any = [];
  userExistingPlaylist:any = [];
  myPremiumPlansArray:any =[];

  y:any='';
  jsonID:any='';

  constructor(private http:HttpClient) {
    this.jsonID = sessionStorage.getItem("currentUserJSONID");
   }
  dulcetassets(){
    return this.http.get("http://localhost:3000/songs_list");
  }

  mixedSongsAssets(){
    return this.http.get("http://localhost:3000/mixedSongs");
  }

  podcastsAssets(){
    return this.http.get("http://localhost:3000/podcasts");
  }

  topSongsAssets(){
    return this.http.get("http://localhost:3000/topSongs");
  }

  searchBoxes(){
    return this.http.get("http://localhost:3000/searchBoxes");
  }

  addToFavouritesSongsFromPlaylist(songsObject:any,JSONID:any){
    this.myLikedSongsArray = {
      movie_name:songsObject.movie_name,
      song_name:songsObject.song_name,
      images:songsObject.images,
      audios:songsObject.audios,
      id:songsObject.id
    };

    this.http.get("http://localhost:3000/usersregister").subscribe((values:any) =>{
      const addSongs = values.find((values_1:any) => {
        if(values_1.id == JSONID){
          this.likedSongsProperty = values_1;
          return this.likedSongsProperty;
        }
      })
      if(addSongs){
        if(this.likedSongsProperty.likedSongs != null){
          this.likedSongsProperty.likedSongs.push(this.myLikedSongsArray);
          this.http.patch("http://localhost:3000/usersregister/"+JSONID,{likedSongs:this.likedSongsProperty.likedSongs}).subscribe(values=>{});
        }
        else{
          this.http.patch("http://localhost:3000/usersregister/"+JSONID,{likedSongs:[this.myLikedSongsArray]}).subscribe(values=>{});
        }
      }
    })
  }

  addSongsToUserPlaylist(playlistObject:any, JSONID:any){

    this.userAddSongsProperty = {
      movie_name : playlistObject.movie_name,
      song_name : playlistObject.song_name,
      images : playlistObject.images,
      audios : playlistObject.audios,
      id : playlistObject.id
    }

    this.http.get("http://localhost:3000/usersregister/"+this.jsonID).subscribe(y => {
      this.userExistingPlaylist = y;

      if(this.userExistingPlaylist.myPlaylist_1 != null){
        this.userExistingPlaylist.myPlaylist_1.push(this.userAddSongsProperty)
        this.http.patch("http://localhost:3000/usersregister/"+this.jsonID,{ myPlaylist_1: this.userExistingPlaylist.myPlaylist_1 }).subscribe(values => {});
      }
      else{
        this.http.patch("http://localhost:3000/usersregister/"+this.jsonID,{ myPlaylist_1: [this.userAddSongsProperty]}).subscribe(values => {});
      }
    });
  }

  addSongsToAnotherPlaylist(playlistSongsObject:any, JSONID:any){

    this.userAddSongsProperty = {
      movie_name : playlistSongsObject.movie_name,
      song_name : playlistSongsObject.song_name,
      images : playlistSongsObject.images,
      audios : playlistSongsObject.audios,
      id : playlistSongsObject.id
    };

    this.http.get("http://localhost:3000/usersregister/"+JSONID).subscribe(y => {
      this.userExistingPlaylist = y;
      if(this.userExistingPlaylist.myPlaylist_2 != null){
        this.userExistingPlaylist.myPlaylist_2.push(this.userAddSongsProperty)
        this.http.patch("http://localhost:3000/usersregister/"+JSONID,{ myPlaylist_2: this.userExistingPlaylist.myPlaylist_2 }).subscribe(values => {});
      }
      else{
        this.http.patch("http://localhost:3000/usersregister/"+JSONID,{ myPlaylist_2: [this.userAddSongsProperty]}).subscribe(values => {});
      }
    });
  }

  getUserPlaylist(){
    return this.http.get("http://localhost:3000/usersregister/"+this.jsonID);
  }

  userPlayedSongsHistory(songDetails:any,time:any){

  }
}
