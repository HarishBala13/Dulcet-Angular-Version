import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private http:HttpClient) {  }
  dulcetassets(){
    return this.http.get("http://localhost:3000/songs_list");
  }
  vibesassets(){
    return this.http.get("http://localhost:3000/Vibes");
  }
}
