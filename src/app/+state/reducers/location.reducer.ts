import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ConditionsAndZip } from '../../interfaces/conditions-and-zip.type';
import { LocationActions } from '../actions/location.action';
import * as fromRoot from './root.reducer';

/**
 * The reducer used to handle the state of the locations
 */
export const locationStoreKey = 'locations';

/**
 * Generates a set of prebuilt reducers and selectors for performing CRUD operations with forecasts
 */
export const adapter = createEntityAdapter<ConditionsAndZip>({
  selectId: (model) => model.zip,
});

/**
 * We extend LocationsState with EntityState.
 * By default it will make an entities and ids dictionary.
 * We can add to this any state properties we desire, but for our purpose we don't need it.
 */
export interface LocationsState extends EntityState<ConditionsAndZip> {
}

// Create the initial state of LocationState
export const initialState: LocationsState = adapter.getInitialState();

// We extend the root state with the new LocationState
export interface State extends fromRoot.State {
  [locationStoreKey]: LocationsState;
}

// Creates a reducer function to handle state transitions.
export const reducer = createReducer(
  initialState,
  on(LocationActions.addLocationSuccess, (state: LocationsState, {condition}) => adapter.addOne(condition, state)),
  on(LocationActions.removeLocation, (state: LocationsState, {zipcode}) => adapter.removeOne(zipcode, state)),
);

export function reducers(state: LocationsState, action: Action): LocationsState {
  return reducer(state, action);
}

