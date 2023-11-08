import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { ForecastEffect } from './effects/forecast.effect';
import { LocationEffect } from './effects/location.effect';
import { forecastsStoreKey, reducers as forecastReducers } from './reducers/forecast.reducer';
import { locationStoreKey, reducers as locationReducers } from './reducers/location.reducer';
import { metaReducers, ROOT_REDUCERS, routerStateKey } from './reducers/root.reducer';
import { CustomRouterSerializer } from './router/route-serializer';

/**
 * This is the most important part of the application
 * It is the BRAIN :)
 */
@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false,
      },
    }),
    EffectsModule.forRoot([LocationEffect, ForecastEffect]),
    // We register the additional states here
    StoreModule.forFeature(locationStoreKey, locationReducers),
    StoreModule.forFeature(forecastsStoreKey, forecastReducers),
    // Register the developer tools and instrumentation for Store
    StoreDevtoolsModule.instrument({
      name: 'NgRx weather',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production,
    }),
    // Connects RouterModule with StoreModule and define custom serializer
    StoreRouterConnectingModule.forRoot({
      stateKey: routerStateKey,
      serializer: CustomRouterSerializer,
    }),
  ],
  exports: [],
  providers: [],
})
export class RootStoreModule {
}
