import { InjectionToken } from '@angular/core';

export class AppConfig {
  cache_duration: number
}

export let APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
