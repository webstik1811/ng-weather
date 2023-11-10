import { Forecast } from './forecast.type';

export interface IForecastAndZip {
  zip: string;
  data: Forecast;
  iat: Date;
}

export class ForecastAndZip {
  zip: string;
  data: Forecast;
  iat: Date;

  constructor(props: Partial<IForecastAndZip>) {
    Object.assign(this, {
      ...props,
      iat: Date.now(),
    });
  }
}
