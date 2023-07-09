import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  likedSongsProperty:any='';
  myLikedSongsArray:any='';
  myPremiumPlansArray:any='';
  subscribedPlansProperty:any='';

  constructor(private http:HttpClient) {  }
  dulcetassets(){
    return this.http.get("http://localhost:3000/songs_list");
  }

  mixedSongsAssets(){
    return this.http.get("http://localhost:3000/Vibes");
  }

  topSongsAssets(){
    return this.http.get("http://localhost:3000/NewSongs");
  }

  searchBoxes(){
    return this.http.get("http://localhost:3000/searchBoxes");
  }

  premiumPlansService(){
    return this.http.get("http://localhost:3000/premium");
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

  subscribePremiumPlans(premiumPlan:any,id:any){
    this.myPremiumPlansArray = {
      plans: {
        title: premiumPlan.plans.title,
        offer: premiumPlan.plans.offer,
        info: premiumPlan.plans.info
      },
      benefits: {
        one: premiumPlan.benefits.one,
        two: premiumPlan.benefits.two
      },
      id: premiumPlan.id
    }
    this.http.get("http://localhost:3000/premium").subscribe((values:any) => {
      const findPremiumPlan = values.find( (newvalues:any) => {
        if(newvalues.id == premiumPlan.id){
          this.subscribedPlansProperty = newvalues;
          return this.subscribedPlansProperty;
        }
      })
      if(findPremiumPlan){
        if(this.subscribedPlansProperty.subscribedPlans != null){
          this.subscribedPlansProperty.subscribedPlans.push(this.myPremiumPlansArray);
          console.log(this.subscribedPlansProperty.subscribedPlans.push(this.myPremiumPlansArray));
          this.http.patch("http://localhost:3000/usersregister/"+id,{subscribedPlans:this.subscribedPlansProperty.subscribedPlans}).subscribe(values => {});
        }
        else{
          this.http.patch("http://localhost:3000/usersregister/"+id,{subscribedPlans:[this.myPremiumPlansArray]}).subscribe(values => {});
        }
      }
    })
  }
}
