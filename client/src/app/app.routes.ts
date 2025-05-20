import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./features/auth/login/login.component');
      return m.LoginComponent;
    },
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./features/auth/register/register.component');
      return m.RegisterComponent;
    },
  },
  {
    path: 'logout',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./features/auth/logout/logout.component');
      return m.LogoutComponent;
    },
  },
  {
    path: 'post',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./features/post/allpost/allpost.component');
      return m.AllpostComponent;
    },
  },
  {
    path: `post/:id`,
    loadComponent: async () => {
      const m = await import(
        './features/post/postselected/postselected.component'
      );
      return m.PostselectedComponent;
    },
  },
  {
    path: 'add/post',
    loadComponent: async () => {
      const m = await import('./features/post/addpost/addpost.component');
      return m.AddpostComponent;
    },
  },

  {
    path: 'modify/post/:id',
    loadComponent: async () => {
      const m = await import('./features/post/modifypost/modifypost.component');
      return m.ModifypostComponent;
    },
  },
];
