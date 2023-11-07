import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {WeatherService} from '../services/weather.service';
import {inject} from '@angular/core';
import {Forecast} from '../components/forecasts-list/forecast.type';
import {take} from 'rxjs/operators';

export const ForecastsResolver: ResolveFn<Forecast> =  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    weatherService: WeatherService = inject(WeatherService)
): Observable<Forecast> => weatherService.getForecast(route.params['zipcode']).pipe(take(1));
