import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { metaReducers, ROOT_REDUCERS, routerStateKey } from './reducers/root.reducer';
import { CustomRouterSerializer } from './router/route-serializer';
import {locationStoreKey, reducers} from './reducers/location.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffect} from './effects/location.effect';

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
        EffectsModule.forRoot([LocationEffect]),
        StoreModule.forFeature(locationStoreKey, reducers),
        StoreDevtoolsModule.instrument({
            name: 'NgRx weather',
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production,
        }),
        StoreRouterConnectingModule.forRoot({
            stateKey: routerStateKey,
            serializer: CustomRouterSerializer,
        }),
    ],
    exports: [],
    providers: [],
})
export class RootStoreModule { }
