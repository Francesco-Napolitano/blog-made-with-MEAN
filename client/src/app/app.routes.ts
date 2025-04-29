import { Routes } from '@angular/router';

export const routes: Routes = [{
   path: 'login',
   pathMatch: 'full',
   loadComponent: async ()=>{
      const m = await import('./features/auth/login/login.component');
      return m.LoginComponent;
   }
},
// Add other routes as needed

];
