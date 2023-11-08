import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ForecastFacade } from '../+state/facades/forecast.facade';

// We are using the resolver to dispatch the action
// which will use effect to load data from cache or using service from the server
export const ForecastsResolver: ResolveFn<null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  forecastFacade: ForecastFacade = inject(ForecastFacade)
): Observable<null> => {
  forecastFacade.addForecast(route.params['zipcode']);
  return of(null);
}
