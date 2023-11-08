import { InjectionToken } from '@angular/core';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { SerializedRouterState } from '../router/route-serializer';

/**
 * This is our main reducer
 * This is the place where we set first our root state
 * Also using of RouterReducerState allow us to listen for changes in the router's state.
 */
export const routerStateKey = 'router';

export interface State {
  router: RouterReducerState;
}

// We are using this to store the current state's keys in the browser's local storage
// This is where we make our data persistence
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['locations', 'forecasts'], rehydrate: true})(reducer);
}


// We are using this method only to debug our states
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers = [localStorageSyncReducer, debug];

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State>>('Root reducers token', {
  factory: () => {
    return {
      router: routerReducer,
    }
  },
});

export const getRouterState = createFeatureSelector<RouterReducerState<SerializedRouterState>>(
  routerStateKey
);
