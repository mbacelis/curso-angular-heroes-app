import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.auth.id) {
        console.log('Autorizado - CanActivated');
        
        return true;
      }
      
      console.log('Bloqueado por el AuthGuard - CanActivate');
      return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route);
    console.log(segments);
    
    if (this.authService.auth.id) {
      console.log('Autorizado - CanLoad');
      
      return true;
    }
    
    console.log('Bloqueado por el AuthGuard - CanLoad');
    return false;
  }
}
