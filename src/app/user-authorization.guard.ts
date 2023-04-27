import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserregisterService } from './userregister.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {
  constructor(private userService:UserregisterService){}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.userService.checkUser()){
      alert("Guard works here");
    }
    return true;
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
