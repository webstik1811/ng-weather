import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs/operators';
import { ForecastActions } from '../actions/forecast.action';
import * as fromForecast from '../reducers/forecast.reducer';
import { ForecastSelectors } from '../selectors/forecast.selector';
import { RouterStoreFacade } from './router.facade';

// The facade has an explicit public API that exposes
@Injectable({providedIn: 'root'})
export class ForecastFacade {

  public getCurrentForecast$ = this.routerStoreFacade.snapshot$.pipe(
    switchMap(({params: {zipcode}}) => {
      return this.selectForecastByZip(zipcode);
    })
  );

  constructor(
    private readonly store: Store<fromForecast.State>,
    private readonly routerStoreFacade: RouterStoreFacade,
  ) {
  }

  addForecast(zipcode: string) {
    this.store.dispatch(ForecastActions.addForecast({zipcode}))
  }

  removeForecast(zipcode: string) {
    this.store.dispatch(ForecastActions.removeForecast({zipcode}))
  }

  selectForecastByZip(zipcode: string) {
    return this.store.pipe(
      select(ForecastSelectors.selectForecast(zipcode))
    );
  }

  selectForecastItemByZip(zipcode: string) {
    return this.store.pipe(select(ForecastSelectors.selectForecast(zipcode)));
  }
}
