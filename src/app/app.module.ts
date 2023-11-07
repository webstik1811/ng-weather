import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './components/zipcode-entry/zipcode-entry.component';
import {ForecastsListComponent} from './components/forecasts-list/forecasts-list.component';
import {WeatherService} from './services/weather.service';
import {CurrentConditionsComponent} from './components/current-conditions/current-conditions.component';
import {MainPageComponent} from './containers/main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {RootStoreModule} from './+state/root-store.module';
import {getCacheExpirationProvider} from './utils/cache.token';

@NgModule({
    declarations: [
        AppComponent,
        ZipcodeEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        MainPageComponent
    ],
    imports: [
        BrowserModule,
        RootStoreModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    ],
    providers: [
        getCacheExpirationProvider(1),
        WeatherService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
