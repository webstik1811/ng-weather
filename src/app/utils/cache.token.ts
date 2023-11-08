import { InjectionToken, ValueProvider } from '@angular/core';

/**
 * We are using this to provide our customizable CACHE_DURATION
 */
export const CACHE_DURATION = new InjectionToken<number>('minutes before cache expire');

export const getCacheExpirationProvider = (value: number): ValueProvider => ({
  provide: CACHE_DURATION,
  useValue: value,
});
