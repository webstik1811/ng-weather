import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ForecastAndZip } from '../../interfaces/forecast-and-zip';
import { ForecastActions } from '../actions/forecast.action';
import * as fromRoot from './root.reducer';

/**
 * The reducer used to handle the state of the forecasts
 */

export const forecastsStoreKey = 'forecasts';

/**
 * Generates a set of prebuilt reducers and selectors for performing CRUD operations with forecasts
 */
export const adapter = createEntityAdapter<ForecastAndZip>({
  selectId: (model) => model.zip,
});

/**
 * We extend LocationsState with EntityState.
 * By default it will make an entities and ids dictionary.
 * We can add to this any state properties we desire, but for our purpose we don't need it.
 */
export interface ForecastsState extends EntityState<ForecastAndZip> {
}

// Create the initial state of ForecastsState
export const initialState: ForecastsState = adapter.getInitialState();

// We extend the root state with the new ForecastsState
export interface State extends fromRoot.State {
  [forecastsStoreKey]: ForecastsState;
}

// Creates a reducer function to handle state transitions.
export const reducer = createReducer(
  initialState,
  on(ForecastActions.addForecastSuccess, (state, {forecast}) => adapter.addOne(forecast, state)),
  on(ForecastActions.removeForecast, (state, {zipcode}) => adapter.removeOne(zipcode, state)),
);

export function reducers(state: ForecastsState, action: Action): ForecastsState {
  return reducer(state, action);
}
