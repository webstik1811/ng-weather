import { Component, inject } from '@angular/core';
import { ForecastFacade } from '../../+state/facades/forecast.facade';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.scss']
})
export class ForecastsListComponent {

  private readonly weatherService: WeatherService = inject(WeatherService);
  private readonly forecastFacade: ForecastFacade = inject(ForecastFacade)

  // Use facade to get currently opened forecasts
  forecast$ = this.forecastFacade.getCurrentForecast$;

  getIcon(id: number) {
    return this.weatherService.getWeatherIcon(id);
  }
}
