import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { datamodel } from '../admin/model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adminupdate',
  templateUrl: './adminupdate.component.html',
  styleUrls: ['./adminupdate.component.css']
})
export class AdminupdateComponent {
  public dataID!:number;
  public songsRetrieve!:datamodel;
  public datas:any='';
  constructor (private activatedroute:ActivatedRoute,
    private router:Router,
    private API:ApiService,
    private formBuild:FormBuilder) { }

  ngOnInit():void {
    this.activatedroute.paramMap.subscribe((params:Params)=>{
      console.log(params);
      this.dataID=params["get"]("id");
      // console.log(this.dataID);
    });

    this.API.fetchUpdateDataServ(this.dataID).subscribe((data:datamodel)=>{
      this.songsRetrieve=data;
    });

  }

  updateSongsForm=this.formBuild.group({
    songspath:['',Validators.required],
    albumpath:['',Validators.required],
    songsname:['',Validators.required],
    artistsname:['',Validators.required]
  });

  updateSongs(ID:number,songpath:string | null | undefined, albumpath:string | null | undefined ,songsname:string | null | undefined ,artistsname:string | null | undefined){
    this.API.updateSongsServ(ID,songpath,albumpath,songsname,artistsname).subscribe((values)=>{
      console.log(values)
    });
    this.router.navigate(['admin']);
  }

}
