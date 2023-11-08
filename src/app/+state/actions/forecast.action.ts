import { createAction, props } from '@ngrx/store';
import { ForecastAndZip } from '../../interfaces/forecast-and-zip';

const addForecast = createAction('[Forecasts] Add new forecast', props<{ zipcode: string }>())
const addForecastSuccess = createAction('[Forecasts] Add new forecast success', props<{
  forecast: ForecastAndZip
}>())
const addForecastFailure = createAction('[Forecasts] Add new forecast failure', props<{ error: any }>())

const noOperationCache = createAction('[Forecasts] No operation: cache');

const removeForecast = createAction('[Forecasts] Remove forecast', props<{ zipcode: string }>());

export const ForecastActions = {
  addForecast,
  addForecastSuccess,
  addForecastFailure,
  noOperationCache,
  removeForecast,
}
