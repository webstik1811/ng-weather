import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocationFacade } from '../../+state/facades/location.facade';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent {

  private locationFacade = inject(LocationFacade);
  private weatherService = inject(WeatherService);
  private router = inject(Router);

  // This will return all added to the store locations
  // So you can subscribe to that observer from anywhere
  public readonly allLocations$ = this.locationFacade.allLocations$;

  // Navigate to route /forecast/:zipcode
  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }

  // Get the link to the asset
  getIcon(id: number) {
    return this.weatherService.getWeatherIcon(id);
  }

  // remove the location from store
  removeLocation(zipcode: string) {
    this.locationFacade.removeLocation(zipcode)
  }
}
