import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { RootStoreModule } from './+state/root-store.module';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ConditionTabComponent } from './components/condition-tab/condition-tab.component';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { ForecastsListComponent } from './components/forecasts-list/forecasts-list.component';
import { ZipcodeEntryComponent } from './components/zipcode-entry/zipcode-entry.component';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { WeatherService } from './services/weather.service';
import { TabsModule } from './shared/tabs/tabs.module';
import { AppConfig } from './utils/app-config';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    ConditionTabComponent,
  ],
  imports: [
    BrowserModule,
    RootStoreModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register(
      '/ngsw-worker.js',
      {
        enabled: environment.production
      }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TabsModule,
  ],
  providers: [
    {
      provide: 'CACHE_DURATION',
      // The parameter is in MINUTES, so if you want to set 10 seconds
      // you will need to convert them 10/60 = 0.1667
      useFactory: (config: AppConfig) => config.cache_duration,
      deps: [AppConfig]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
