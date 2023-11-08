import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/root.reducer';
import { RouterStoreSelectors } from '../selectors/root.selectors';

// The facade has an explicit public API that exposes
@Injectable({providedIn: 'root'})
export class RouterStoreFacade {
  public readonly snapshot$ = this.store.select(RouterStoreSelectors.getRouterSnapshot);
  public readonly url$ = this.store.select(RouterStoreSelectors.selectUrl);

  constructor(private readonly store: Store<fromRoot.State>) {
  }
}
