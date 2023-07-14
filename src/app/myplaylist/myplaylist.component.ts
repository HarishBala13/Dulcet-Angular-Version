import { Component } from '@angular/core';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.component.html',
  styleUrls: ['./myplaylist.component.css']
})
export class MyplaylistComponent {

  userPlaylist:any='';

  constructor(private songService:SongsService){
    songService.getUserPlaylist().subscribe(values => {
      this.userPlaylist = values;
      console.log(this.userPlaylist.userPlaylist)
    });
  }

}
