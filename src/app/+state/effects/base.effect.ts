import { Inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { WeatherService } from '../../services/weather.service';
import { isPast } from '../../utils/cache';

export class BaseEffect {

  protected cacheExpirationMap: Map<string, Date> = new Map()

  protected removeCacheKey = (zip) => this.cacheExpirationMap.delete(zip);

  protected isNotCached(zip) {
    return !this.cacheExpirationMap.has(zip) || (this.cacheExpirationMap.has(zip) && isPast(this.cacheExpirationMap.get(zip)));
  }
}
