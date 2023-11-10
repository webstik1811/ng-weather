import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationFacade } from '../../+state/facades/location.facade';
import { ConditionsAndZip } from '../../interfaces/conditions-and-zip.type';
import { LocalstorageService } from '../../services/localstorage.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private allLocations: ConditionsAndZip[] = []

  private locationFacade = inject(LocationFacade);
  private weatherService = inject(WeatherService);
  private localstorageService = inject(LocalstorageService);
  private router = inject(Router);

  // This will return all added to the store locations
  // So you can subscribe to that observer from anywhere
  public readonly allLocations$ = this.locationFacade.allLocations$;

  // We're using localstorage to store the selected tabIndex,
  // so we will use the stored value if it is set and will preselect the tabIndex
  public tabIndex = +this.localstorageService.getData('tabIndex')

  ngOnInit() {
    this.locationFacade.allLocations$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(locations => this.allLocations = locations)
  }

  // Navigate to route /forecast/:zipcode
  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }

  // Get the link to the asset
  getIcon(id: number) {
    return this.weatherService.getWeatherIcon(id);
  }

  // remove the location from store
  removeLocation($event, zipcode: string) {
    $event.stopPropagation();
    this.locationFacade.removeLocation(zipcode)
  }

  // We store here the selected tabIndex in localStorage
  setCurrentIndex(tabIndex: number) {
    this.localstorageService.saveData('tabIndex', `${tabIndex}`);

    const zipcode = this.allLocations[tabIndex].zip;
    this.locationFacade.addLocation(zipcode);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
