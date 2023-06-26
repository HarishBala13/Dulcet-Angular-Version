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
  registeredUsers:number=0;
  vibes_data:any='';
  newsongs_data:any='';
  vibesboolean:boolean=false;
  newsongsboolean:boolean=false;
  usersboolean:boolean=false;
  currentUser:number=0;


  constructor(private formBuild:FormBuilder,private API:ApiService ,private service:SongsService,private userService:UserregisterService,private client:HttpClient) {
    this.client.get<any>("http://localhost:3000/usersregister").subscribe((userdata:any)=>{   this.registeredUsers=userdata.length;    });
  }
    // this.service.dulcetassets().subscribe((data:any)=>{ this.values=data;   });
  ngOnInit(): void {
    let userLoggedIn = localStorage.getItem("loggedin");
    if(userLoggedIn == "true"){
      this.currentUser = 1;
    }else{
      this.currentUser = 0;
    }
  }

  songsEntry=this.formBuild.group({
    songspath:['',Validators.required],
    albumpath:['',Validators.required],
    songsname:['',Validators.required],
    artistsname:['',Validators.required]
   })

   vibesOpen(){
    this.vibesboolean=true;
    this.API.fetchVibes().subscribe(values=>{   this.vibes_data=values;   });
   }
   newSongsOpen(){
    this.newsongsboolean=true;
    this.API.fetchNewSongs().subscribe(values=>{  this.newsongs_data=values;  });
   }
  //  usersOpen(){
  //   this.client.get<any>("http://localhost:3000/usersregister").subscribe((userdata:any)=>{   this.currentUsers=userdata.length;    });
  //  }
   addSongs(add:any){
    this.API.addSongsServ(add).subscribe((values)=>{
      console.log(values);
    })
   }
   deleteSongs(ID:number){
    this.API.deleteSongsServ(ID).subscribe(()=>{});
   }
}
