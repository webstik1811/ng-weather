import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, map, startWith, takeUntil } from 'rxjs/operators';
import { TabComponent } from '../tab/tab.component';


@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements AfterContentInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  // We can have initially selected index
  @Input() private selectedIndex: number;

  // We send out when the currently selected tab is changed
  @Output() public selectedIndexChange = new EventEmitter<number>();

  tabItems$: Observable<TabComponent[]>;
  activeTab: TabComponent;

  ngAfterContentInit(): void {
    this.tabItems$ = this.tabs.changes
      .pipe(
        startWith(''),
        delay(0),
        takeUntil(this.unsubscribe$),
        map(() => {
        const res = this.tabs.toArray();
        const activeTab = res.find(tab => tab.isActive);

        if (activeTab) {
          this.selectTab(activeTab);
        } else if (typeof this.selectedIndex === 'number') {
          this.selectTab(res[this.selectedIndex]);
        } else {
          this.selectTab(this.tabs.first);
        }
        return res;
      }));
  }

  selectTab(tabItem: TabComponent) {
    if (this.activeTab === tabItem) {
      return;
    }

    if (this.activeTab) {
      this.activeTab.isActive = false;
    }

    this.activeTab = tabItem;

    tabItem.isActive = true;

    const activeTabIndex = this.tabs.toArray().findIndex(tab => tab.isActive);
    this.selectedIndexChange.emit(activeTabIndex);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
