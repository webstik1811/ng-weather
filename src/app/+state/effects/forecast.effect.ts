import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ForecastAndZip } from '../../interfaces/forecast-and-zip';
import { WeatherService } from '../../services/weather.service';
import { newDateInXMinutes } from '../../utils/cache';
import { ForecastActions } from '../actions/forecast.action';
import { LocationActions } from '../actions/location.action';
import { ForecastFacade } from '../facades/forecast.facade';
import { ForecastSelectors } from '../selectors/forecast.selector';
import { BaseEffect } from './base.effect';

@Injectable()
export class ForecastEffect extends BaseEffect {

  /**
   * Add forecast to the state
   */
  public readonly addForecast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ForecastActions.addForecast),
      mergeMap(({zipcode}) => {
        return this.forecastFacade.selectForecastItemByZip(zipcode).pipe(
          switchMap((item) => {
            if (!item || this.isExpired(item.iat)) {
              return this.weatherService.getForecast(zipcode).pipe(
                map((data) => {
                  return ForecastActions.addForecastSuccess({forecast: new ForecastAndZip({zip: zipcode, data})})
                }),
                catchError((error) => of(ForecastActions.addForecastFailure({error})))
              )
            } else {
              return of(ForecastActions.noOperationCache())
            }
          })
        )
      })
    )
  })

  // Remove forecast from the cache
  // then trigger another event to tell reducer to remove the forecast from state
  public readonly removeLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.removeLocationSuccess),
      map(({zipcode}) => {
        return ForecastActions.removeForecast({zipcode})
      })
    );
  })

  constructor(
    protected readonly actions$: Actions,
    protected readonly weatherService: WeatherService,
    protected readonly forecastFacade: ForecastFacade,
    @Inject('CACHE_DURATION') protected cacheDuration: number
  ) {
    super(cacheDuration)
  }
}
