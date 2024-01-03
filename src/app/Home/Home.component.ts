import { Component, ViewEncapsulation, reflectComponentType } from '@angular/core';
import { LoggerfileService } from '../loggerfile.service';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  encapsulation:ViewEncapsulation.None
})

export class HomeComponent  {
  selectorArray:any = [];
  date : any = '';
  songsAssets : any = "";
  loadAudio(songs:any){}
  constructor(private loggerService:LoggerfileService, private songService:SongsService) {
    const metadata = reflectComponentType(HomeComponent);
    const selectorRefname = metadata?.selector;
    this.selectorArray = selectorRefname;
    const selector = this.selectorArray.slice(4);
    this.date = new Date();
    console.log(this.date.toDateString());
    this.loggerService.informationMessage(selector,"info",this.date.toDateString());

    this.songService.mixedSongsAssets().subscribe((x:any) => {
      this.songsAssets = x;
    });
  }
}

