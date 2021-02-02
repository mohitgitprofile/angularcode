import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainService } from './mainService.service';

@Injectable()

export class CanActivePlayerRouteGuard implements CanActivate{
    constructor(private router: Router, private service: MainService) {}
    canActivate(): boolean {
        if(this.service.getStorage('userDetailYala') != null) {
            let userDetailYala = JSON.parse(this.service.getStorage('userDetailYala'))
            if(userDetailYala.role == 'PLAYER')
                return true;
            else 
                this.router.navigate(['/organizer/dataTeams'])
        } else {
            this.router.navigate(['/landing/login'])
            return false;
        }
    }

}