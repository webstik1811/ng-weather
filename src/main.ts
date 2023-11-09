import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './app/utils/app-config';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

fetch('assets/settings.json')
  .then((res) => res.json())
  .then((config) => {
    if (config.production) {
      enableProdMode();

    }

    platformBrowserDynamic([{ provide: AppConfig, useValue: config }])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  }).catch(e => console.log(e));
