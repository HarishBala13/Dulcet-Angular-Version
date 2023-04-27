import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './Home/Home.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { UserAuthorizationGuard } from './user-authorization.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'playlist',component:PlaylistComponent,
      canActivate:[UserAuthorizationGuard]},
  {path:'login',component:LoginComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin',component:AdminComponent},
  {path:'',children:[
    {path:'login/forgot',component:ForgotComponent},
    {path:'login/register',component:RegisterComponent},
    {path:'login/home',component:HomeComponent},
    {path:'login/admin',component:AdminComponent}
  ]},
  {path:'',children:[
    {path:'login/register/login',component:LoginComponent},
    {path:'register/login',component:LoginComponent},
    {path:'register/home',component:HomeComponent}
  ]},
  {path:'',children:[
    {path:'forgot/login',component:LoginComponent},
    {path:'forgot/admin',component:AdminComponent},
    {path:'login/forgot/',component:HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
