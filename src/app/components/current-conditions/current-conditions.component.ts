import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../../interfaces/conditions-and-zip.type';
import {LocationFacade} from '../../+state/facades/location.facade';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  private locationFacade = inject(LocationFacade);
  private weatherService = inject(WeatherService);
  private router = inject(Router);

  public readonly allLocations$ = this.locationFacade.allLocations$;

  showForecast($event, zipcode: string) {
    $event.stopPropagation();
    $event.preventDefault()
    this.router.navigate(['/forecast', zipcode])
  }

  getIcon(id: number) {
    return this.weatherService.getWeatherIcon(id);
  }

  removeLocation(zipcode: string) {
    this.locationFacade.removeLocation(zipcode)
  }
}
