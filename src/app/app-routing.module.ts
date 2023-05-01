import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './Home/Home.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { UserAuthorizationGuard } from './user-authorization.guard';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { PaymentComponent } from './payment/payment.component';
import { PremiumComponent } from './premium/premium.component';
import { AdminupdateComponent } from './adminupdate/adminupdate.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'playlist',component:PlaylistComponent,
      canActivate:[UserAuthorizationGuard]},
  {path:'login',component:LoginComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'forgotpass',component:ForgotpassComponent},
  {path:'register',component:RegisterComponent},
  {path:'playlist/premium',component:PremiumComponent},
  {path:'payment',component:PaymentComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin/adminupdate/:id',component:AdminupdateComponent},
  {path:'',children:[
    {path:'playlist/home',component:HomeComponent}
  ]},
  {path:'',children:[
    {path:'login/forgot',component:ForgotComponent},
    {path:'login/forgot/',component:HomeComponent},
    {path:'login/register',component:RegisterComponent},
    {path:'login/',component:HomeComponent},
    {path:'login/admin',component:AdminComponent},
    {path:'login/playlist',component:PlaylistComponent}
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
