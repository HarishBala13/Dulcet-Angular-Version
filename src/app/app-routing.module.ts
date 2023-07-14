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
import { SearchComponent } from './search/search.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TopsongsComponent } from './libraries/topsongs/topsongs.component';
import { MixedsongsComponent } from './libraries/mixedsongs/mixedsongs.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { SubscribedplanComponent } from './subscribedplan/subscribedplan.component';
import { PaymentcardComponent } from './paymentcard/paymentcard.component';
import { MyplaylistComponent } from './myplaylist/myplaylist.component';

const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'topsongs',
  //   pathMatch:'full'
  // },
  {path:'',component:HomeComponent},
  {path:'topsongs',component:TopsongsComponent},
  {path:'mixedsongs',component:MixedsongsComponent},
  {path:'playlist',component:PlaylistComponent,
      canActivate:[UserAuthorizationGuard]},
  {path:'profile',component:ProfileComponent,
    children:[
    {path:'editprofile',component:EditprofileComponent},
    {path:'subscribedplan',component:SubscribedplanComponent},
    {path:'paymentcard',component:PaymentcardComponent},
    {path:'myplaylist',component:MyplaylistComponent},
    {path:'accounts',component:AccountsComponent}
  ]},
  {path:'search',component:SearchComponent},
  {path:'login',component:LoginComponent},
  {path:'',children:[
    {path:'login/register',component:RegisterComponent},
    {path:'login/playlist',component:PlaylistComponent}
  ]},
  {path:'forgot',component:ForgotComponent},
  {path:'forgotpass',component:ForgotpassComponent},
  {path:'register',component:RegisterComponent},
  {path:'premium',component:PremiumComponent},
  {path:'payment',component:PaymentComponent,
  canActivate:[UserAuthorizationGuard]},
  {path:'paymentsuccess',component:PaymentSuccessComponent},
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
