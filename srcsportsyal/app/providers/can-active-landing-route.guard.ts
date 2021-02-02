import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainService } from './mainService.service';

@Injectable()


export class CanActiveLandingRouteGuard implements CanActivate {
    constructor(private service: MainService, private router: Router) {}
    canActivate(): boolean {
        if(this.service.getStorage('userDetailYala') != null) {
            let userDetailYala = JSON.parse(this.service.getStorage('userDetailYala'))
            if(userDetailYala.role == 'ORGANIZER')
                this.router.navigate(['/organizer/dataTeams'])
            else 
                this.router.navigate(['/player/home'])
        } else {
            return true;
        }
        
    }
}