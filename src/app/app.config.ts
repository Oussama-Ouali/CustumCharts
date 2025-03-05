
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEchartsCore } from 'ngx-echarts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent) 
      }
    ]),
    provideEchartsCore({
      echarts: () => import('echarts')
    })
  ]
};