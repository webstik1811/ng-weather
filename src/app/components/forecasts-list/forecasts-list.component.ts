import {Component, inject, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent implements OnInit {
  forecast$: Observable<Forecast | null> = of(null);

  private readonly weatherService = inject(WeatherService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.forecast$ = this.route.data.pipe(map(({forecast}) => {console.log(forecast); return forecast}))
  }

  getIcon(id: number) {
    return this.weatherService.getWeatherIcon(id);
  }
}
