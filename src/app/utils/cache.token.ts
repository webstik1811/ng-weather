import { InjectionToken, ValueProvider } from '@angular/core';

export const CACHE_DURATION = new InjectionToken<number>('minutes before cache expire');

export const getCacheExpirationProvider = (value: number): ValueProvider => ({
    provide: CACHE_DURATION,
    useValue: value,
});
