import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocationActions } from '../actions/location.action';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { ConditionsAndZip } from '../../interfaces/conditions-and-zip.type';
import { isPast, newDateInXMinutes } from '../../utils/cache';
import { CACHE_DURATION } from '../../utils/cache.token';

@Injectable()
export class LocationEffect {

  cacheExpirationMap: Map<string, Date> = new Map()

  public readonly addLocation$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LocationActions.addLocation),
        mergeMap(({zipcode: zip}) => {
          if ( this.isNotCached(zip) ) {
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

  private isNotCached(zip) {
    return !this.cacheExpirationMap.has(zip) || (this.cacheExpirationMap.has(zip) && isPast(this.cacheExpirationMap.get(zip)));
  }

  constructor(
    private readonly actions$: Actions,
    private readonly weatherService: WeatherService,
    @Inject(CACHE_DURATION) private cacheDuration: number
  ) {

  }
}
