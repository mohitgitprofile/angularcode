import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MainService } from './mainService.service';

@Injectable()

export class CanActiveOrganizerRouteGuard implements CanActivate {
    constructor(private router: Router, private service: MainService) {}

    canActivate(): boolean {
        if(this.service.getStorage('userDetailYala') != null) {
            let userDetailYala = JSON.parse(this.service.getStorage('userDetailYala'))
            if(userDetailYala.role == 'ORGANIZER')
                return true;
            else
                this.router.navigate(['/player/home'])
        } else {
            this.router.navigate(['/landing/login'])
            return false;
        }
    }
}
