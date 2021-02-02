import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full', },
    { path: 'landing', loadChildren: './pages/landing/landing.module#LandingModule' },
    { path: 'player', loadChildren: './pages/player/player.module#PlayerModule' },
    { path: 'organizer', loadChildren: './pages/organizer/organizer.module#OrganizerModule' }

]
