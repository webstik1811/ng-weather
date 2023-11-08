import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LocationActions } from '../actions/location.action';
import * as fromLocation from '../reducers/location.reducer';
import { LocationSelectors } from '../selectors/location.selector';

// The facade has an explicit public API that exposes
@Injectable({providedIn: 'root'})
export class LocationFacade {

  public allLocations$ = this.store.pipe(select(LocationSelectors.selectLocationItems))

  constructor(private readonly store: Store<fromLocation.State>) {
  }

  addLocation(zipcode: string) {
    this.store.dispatch(LocationActions.addLocation({zipcode}))
  }

  removeLocation(zipcode: string) {
    this.store.dispatch(LocationActions.removeLocation({zipcode}))
  }
}
