import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  title:any="Dulcet";
  public values:any="";
  databaseLength:String='';
  data:any='';
  constructor(private formBuild:FormBuilder,private API:ApiService ,private service:SongsService,private userService:UserregisterService,private client:HttpClient) {
    this.API.fetchALL().subscribe((values)=>{
      this.data=values;
    });

    service.dulcetassets().subscribe((data:any)=>{
      this.values=data;
  });


  }

  ngOnInit(): void {
    this.client.get<any>("http://localhost:3000/usersregister").subscribe((userdata:any)=>{
      this.databaseLength=userdata.length;
    })
  }
  songsEntry=this.formBuild.group({
    songspath:['',Validators.required],
    albumpath:['',Validators.required],
    songsname:['',Validators.required],
    artistsname:['',Validators.required]
   })

   addSongs(add:any){
    this.API.addSongsServ(add).subscribe((values)=>{
      console.log(values);
    })
   }
   deleteSongs(ID:number){
    this.API.deleteSongsServ(ID).subscribe(()=>{});
   }
}
