import { createFeatureSelector, createSelector } from '@ngrx/store';
import {LocationsState, locationStoreKey} from '../reducers/location.reducer';

const selectFeature = createFeatureSelector<LocationsState>(locationStoreKey);

const selectLocationEntities = createSelector(selectFeature, state => state.entities);

const selectLocationItems = createSelector(selectLocationEntities, state => Object.values(state).map(article => article))

export const LocationSelectors = {
    selectLocationItems
}
