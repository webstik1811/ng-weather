import { Forecast } from './forecast.type';

export interface IForecastAndZip {
  zip: string;
  data: Forecast
}

export class ForecastAndZip {
  zip: string;
  data: Forecast

  constructor(props: Partial<IForecastAndZip>) {
    Object.assign(this, props);
  }
}
