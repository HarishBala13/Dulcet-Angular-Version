import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyServiceService {

private serachURL:string | undefined;
constructor(private http:HttpClient) { }
searchMusic(str:string, type='artist'){
  this.serachURL = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
  return this.http.get(this.serachURL).
  pipe(map((res:any) => res.json()))
}

}
