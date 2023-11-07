import {inject, Injectable} from '@angular/core';
import * as fromLocation from '../reducers/location.reducer';
import {select, Store} from '@ngrx/store';
import {LocationActions} from '../actions/location.action';
import {LocationSelectors} from '../selectors/location.selector';

@Injectable({ providedIn: 'root' })
export class LocationFacade {

    public allLocations$ = this.store.pipe(select(LocationSelectors.selectLocationItems))
    constructor(private readonly store: Store<fromLocation.State>) {
    }

    addLocation(zipcode: string) {
        this.store.dispatch(LocationActions.addLocation({ zipcode }))
    }

    removeLocation(zipcode: string) {
        this.store.dispatch(LocationActions.removeLocation({ zipcode }))
    }
}
