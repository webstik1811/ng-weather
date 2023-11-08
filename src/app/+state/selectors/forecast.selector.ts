import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ForecastsState, forecastsStoreKey } from '../reducers/forecast.reducer';

const selectFeature = createFeatureSelector<ForecastsState>(forecastsStoreKey);

const selectForecastEntities = createSelector(
  selectFeature,
  state => state.entities
);

const selectForecastItems = createSelector(
  selectForecastEntities,
  state => Object.values(state).map(item => item)
)

const selectForecast = (zipcode: string) => createSelector(
  selectForecastEntities,
  items => items[zipcode]?.data
)


export const ForecastSelectors = {
  selectForecast
}
