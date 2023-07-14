import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './Home/Home.component';
import { SongsComponent } from './songs/songs.component';
import { ErrorComponent } from './error/error.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AdminComponent } from './admin/admin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ClickedOutsideDirective } from './clicked-outside.directive';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { PaymentComponent } from './payment/payment.component';
import { PremiumComponent } from './premium/premium.component';
import { IndexComponent } from './index/index.component';
import { AdminupdateComponent } from './adminupdate/adminupdate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { FooterComponent } from './footer/footer.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PodcastsComponent } from './libraries/podcasts/podcasts.component';
import { TopsongsComponent } from './libraries/topsongs/topsongs.component';
import { MixedsongsComponent } from './libraries/mixedsongs/mixedsongs.component';
import { SearchFilterPipe } from './search/searchFilter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { SubscribedplanComponent } from './subscribedplan/subscribedplan.component';
import { PaymentcardComponent } from './paymentcard/paymentcard.component';
import { MyplaylistComponent } from './myplaylist/myplaylist.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    SongsComponent,
    ErrorComponent,
    AdminComponent,
    ForgotComponent,
    PlaylistComponent,
    ClickedOutsideDirective,
    ForgotpassComponent,
    PaymentComponent,
    PremiumComponent,
    IndexComponent,
    AdminupdateComponent,
    SearchComponent,
    NavigationbarComponent,
    FooterComponent,
    AccountsComponent,
    PodcastsComponent,
    TopsongsComponent,
    MixedsongsComponent,
    SearchFilterPipe,
    ProfileComponent,
    PaymentSuccessComponent,
    EditprofileComponent,
    SubscribedplanComponent,
    PaymentcardComponent,
    MyplaylistComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
