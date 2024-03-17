import { Routes } from '@angular/router';
import { games } from './utils/games';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "games",
        children: [...games.map(g => ({title: g.name, path: `${g.path}`, component: g.component}))]
    }
];
