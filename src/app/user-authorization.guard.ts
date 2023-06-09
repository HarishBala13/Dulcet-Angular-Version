import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserregisterService } from './userregister.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {
  constructor(private userService:UserregisterService, private router:Router){}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(sessionStorage.getItem('loggedin')=="false"){
      this.router.navigate(['login'],{queryParams:{returl:route.url}});
      // this.userService.routingGuardPath(route.url);
      console.log("Guard Console "+route.url)
      console.log("1")
      return false;
    }
    else if(sessionStorage.getItem('loggedin')=='true'){
      console.log("2");
      return true;
    }
    else if(!sessionStorage.getItem("currentUserName")){
      // console.log("Another tab SessionStorage works");
      this.router.navigate(['login'], {queryParams: {returl: route.url}});
      console.log("Guard Console"+route.url)
      return false;
    }
    else{
      if(this.userService.logoutUser()){
        return false;
      }
      else{
        return true;
      }
    }
    // if(this.userService.isLoggedIn == false){
    // return true;
    // }
    // this.router.navigate(['/'],{queryParams: { }})
    // return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
