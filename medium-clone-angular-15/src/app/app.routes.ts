import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((mod) => mod.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.routes').then((mod) => mod.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./globalFeed/globalFeed.routes').then((mod) => mod.routes),
  },
]
