import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs.service';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  public values:any="";
  databaseLength:String='';
  constructor(private service:SongsService,private userService:UserregisterService,private client:HttpClient){
    service.dulcetassets().subscribe((data:any)=>{
      this.values=data;
    })
  }

  ngOnInit(): void {
    this.client.get<any>("http://localhost:3000/usersregister").subscribe((userdata:any)=>{
      this.databaseLength=userdata.length;
    })
  }
}
