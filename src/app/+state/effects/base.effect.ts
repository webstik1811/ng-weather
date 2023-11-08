import { Inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { WeatherService } from '../../services/weather.service';
import { isPast } from '../../utils/cache';
import { CACHE_DURATION } from '../../utils/cache.token';

export class BaseEffect {

  protected cacheExpirationMap: Map<string, Date> = new Map()
  constructor(
    protected readonly actions$: Actions,
    protected readonly weatherService: WeatherService,
    @Inject(CACHE_DURATION) protected cacheDuration: number
  ) {

  }

  protected removeCacheKey = (zip) => this.cacheExpirationMap.delete(zip);

  protected isNotCached(zip) {
    return !this.cacheExpirationMap.has(zip) || (this.cacheExpirationMap.has(zip) && isPast(this.cacheExpirationMap.get(zip)));
  }
}
