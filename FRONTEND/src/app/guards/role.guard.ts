import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token: any = localStorage.getItem('token');
    let decodetoken: any = {}


    decodetoken = decode(token);

    console.log(decodetoken.userName);

    if (this.authService.isAuth() || decodetoken.roleId != expectedRole) {
      console.log('usuario no autorizado para la visita');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
