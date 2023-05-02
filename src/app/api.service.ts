import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from './admin/model';
import { vibes_datamodel } from "./admin/homemodelservice";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  addSongsServ(data:datamodel){
    return this.http.post<datamodel>("http://localhost:3000/Vibes",data)
  }
  fetchVibes(){
    return this.http.get<vibes_datamodel[]>("http://localhost:3000/Vibes");
  }
  fetchNewSongs(){
    return this.http.get<vibes_datamodel[]>("http://localhost:3000/NewSongs");
  }
  deleteSongsServ(dataID:number){
    return this.http.delete<datamodel>("http://localhost:3000/Vibes/"+dataID);
  }
  fetchUpdateDataServ(ID:number){
    return this.http.get<datamodel>("http://localhost:3000/Vibes/"+ID);
  }
  updateSongsServ(ID:number,songpath:string | null | undefined, albumpath:string | null | undefined ,songsname:string | null | undefined ,artistsname:string | null | undefined){
    return this.http.patch("http://localhost:3000/Vibes/"+ID,{songpath:songpath,albumpath:albumpath,songsname:songsname,artistsname:artistsname});
}
}
