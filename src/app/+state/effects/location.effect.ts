import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ConditionsAndZip } from '../../interfaces/conditions-and-zip.type';
import { WeatherService } from '../../services/weather.service';
import { newDateInXMinutes } from '../../utils/cache';
import { LocationActions } from '../actions/location.action';
import { BaseEffect } from './base.effect';

@Injectable()
export class LocationEffect extends BaseEffect {

  /**
   * Add condition to known locations
   */
  public readonly addLocation$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LocationActions.addLocation),
        mergeMap(({zipcode: zip}) => {
          if (this.isNotCached(zip)) {
            return this.weatherService.getCurrentCondition(zip).pipe(
              map((data) => {
                this.cacheExpirationMap.set(zip, newDateInXMinutes(this.cacheDuration));
                return LocationActions.addLocationSuccess({condition: new ConditionsAndZip({zip, data})});
              }),
              catchError((error) => of(LocationActions.addLocationFailure({error})))
            )
          } else {
            return of(LocationActions.noOperationCache());
          }
        })
      );
    }
  );

  // Remove location from the cache
  // then trigger another event to tell reducer to remove the location from state
  public readonly removeLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.removeLocation),
      map(({zipcode}) => {
        this.removeCacheKey(zipcode);
        return LocationActions.removeLocationSuccess({zipcode})
      })
    );
  })

  constructor(
    protected readonly actions$: Actions,
    protected readonly weatherService: WeatherService,
    @Inject('CACHE_DURATION') protected cacheDuration: number
  ) {
    super()
  }
}
