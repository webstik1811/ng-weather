import { Inject } from '@angular/core';
import { isPast, newDateInXMinutes } from '../../utils/cache';

export class BaseEffect {

  constructor(@Inject('CACHE_DURATION') protected cacheDuration: number) {
  }

  protected isExpired(iat): boolean {
    return isPast(newDateInXMinutes(iat, this.cacheDuration))
  }
}
