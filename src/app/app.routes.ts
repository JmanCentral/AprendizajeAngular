import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [

    { path: '', component: Login},
    { path: 'registro', component: Registro},
    { path: 'dashboard', component: Dashboard},

];
