// tslint:disable-next-line:import-spacing
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForecastsListComponent} from './components/forecasts-list/forecasts-list.component';
import {MainPageComponent} from './containers/main-page/main-page.component';
import {ForecastsResolver} from './resolvers/forecasts.resolver';

const appRoutes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'forecast/:zipcode',
    component: ForecastsListComponent,
    resolve: {
      forecast: ForecastsResolver
    }
  }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, {});
