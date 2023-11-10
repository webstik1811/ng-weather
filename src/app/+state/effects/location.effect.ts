import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ConditionsAndZip } from '../../interfaces/conditions-and-zip.type';
import { WeatherService } from '../../services/weather.service';
import { LocationActions } from '../actions/location.action';
import { LocationFacade } from '../facades/location.facade';
import { BaseEffect } from './base.effect';

@Injectable()
export class LocationEffect extends BaseEffect {

  /**
   * Add condition to known locations
   */
  public readonly addLocation$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(LocationActions.addLocation),
        mergeMap(({zipcode}) => {
          return this.locationFacade.selectLocation(zipcode).pipe(
            switchMap((item) => {

              if (!item || this.isExpired(item.iat)) {
                return this.weatherService.getCurrentCondition(zipcode).pipe(
                  map((data) => {
                    return LocationActions.addLocationSuccess({condition: new ConditionsAndZip({zip: zipcode, data})});
                  }),
                  catchError((error) => of(LocationActions.addLocationFailure({error})))
                )
              } else {
                return of(LocationActions.noOperationCache());
              }
            })
          )
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
        return LocationActions.removeLocationSuccess({zipcode})
      })
    );
  })

  constructor(
    protected readonly actions$: Actions,
    protected readonly weatherService: WeatherService,
    protected readonly locationFacade: LocationFacade,
    @Inject('CACHE_DURATION') protected cacheDuration: number
  ) {
    super(cacheDuration)
  }
}
