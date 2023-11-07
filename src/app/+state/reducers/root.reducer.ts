import { Action, ActionReducer, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { InjectionToken } from '@angular/core';
import { localStorageSync } from 'ngrx-store-localstorage';
import { SerializedRouterState } from '../router/route-serializer';
import { merge } from 'rxjs';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';

export const routerStateKey = 'router';

export interface State {
    router: RouterReducerState;
}

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

const mergeReducer = (state: any, rehydratedState: any, action: any) => {
    if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION) && rehydratedState) {
        state = merge(state, rehydratedState); // <-- this line was changed to not clone
    }
    return state;
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['locations'], rehydrate: true })(reducer);
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers = [localStorageSyncReducer, debug];

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token', {
    factory: () => {
        return {
            router: routerReducer,
        }
    },
});

export const getRouterState = createFeatureSelector<RouterReducerState<SerializedRouterState>>(
    routerStateKey
);
