import { ActionCreator, createAction, props } from '@ngrx/store';
import { ConditionsAndZip } from '../../interfaces/conditions-and-zip.type';

const addLocation = createAction('[Locations] Add new location', props<{ zipcode: string }>());
const addLocationSuccess = createAction('[Locations] Add new location success', props<{
  condition: ConditionsAndZip
}>());
const addLocationFailure = createAction('[Locations] Add new location failure', props<{ error: any }>());

export const noOperationCache = createAction('[Locations] No operation: cache');

const removeLocation = createAction('[Locations] Remove location', props<{ zipcode: string }>());

export const LocationActions = {
  addLocation,
  addLocationSuccess,
  addLocationFailure,
  noOperationCache,
  removeLocation,
}
