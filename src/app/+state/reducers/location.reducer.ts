import {ConditionsAndZip, StateConditionAndZip} from '../../interfaces/conditions-and-zip.type';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Action, ActionReducerMap, combineReducers, createFeatureSelector, createReducer, on} from '@ngrx/store';
import * as fromRoot from './root.reducer';
import {LocationActions} from '../actions/location.action';

export const locationStoreKey = 'locations';

export const adapter = createEntityAdapter<ConditionsAndZip>({
    selectId: (model) => model.zip,
});

export interface LocationsState extends EntityState<ConditionsAndZip> {
}

export const initialState: LocationsState = adapter.getInitialState();

export const reducer = createReducer(
    initialState,
    on(LocationActions.addLocationSuccess, (state, { condition }) => adapter.addOne(condition, state)),
    on(LocationActions.removeLocation, (state, { zipcode }) => adapter.removeOne(zipcode, state)),
);


export interface State extends fromRoot.State {
    [locationStoreKey]: LocationsState;
}


export function reducers(state, action: Action) {
    return reducer(state, action);
}

