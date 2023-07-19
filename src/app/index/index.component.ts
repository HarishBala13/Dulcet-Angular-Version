import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SongsService } from '../songs.service';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  logout=false;
  login=true;
  vibes_value:any="";
  public item:any="";
  constructor(private songService:SongsService, private userService:UserregisterService,private client:HttpClient) {

    // this.songService.dulcetassets().subscribe((values=>{
    //   this.item=values;
    // }));

    songService.mixedSongsAssets().subscribe(vibesvalues=>{
      this.vibes_value=vibesvalues;
    })
  }

}
