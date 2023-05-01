import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from './admin/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  addSongsServ(data:datamodel){
    return this.http.post<datamodel>("http://localhost:3000/posts",data)
  }
  fetchALL(){
    return this.http.get<datamodel[]>("http://localhost:3000/posts");
  }
  deleteSongsServ(dataID:number){
    return this.http.delete<datamodel>("http://localhost:3000/posts/"+dataID);
  }
  fetchUpdateDataServ(ID:number){
    return this.http.get<datamodel>("http://localhost:3000/posts/"+ID);
  }
  updateSongsServ(ID:number,songpath:string | null | undefined, albumpath:string | null | undefined ,songsname:string | null | undefined ,artistsname:string | null | undefined){
    return this.http.patch("http://localhost:3000/posts/"+ID,{songpath:songpath,albumpath:albumpath,songsname:songsname,artistsname:artistsname});
}
}
