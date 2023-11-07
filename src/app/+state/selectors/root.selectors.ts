import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';
import { getRouterState } from '../reducers/root.reducer';

const getRouterSnapshot = createSelector(getRouterState, (routerReducerState) => routerReducerState.state);

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getRouterSelectors(getRouterState);

export const RouterStoreSelectors = {
  getRouterSnapshot,
  getRouterState,
  selectCurrentRoute,
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl,
};
