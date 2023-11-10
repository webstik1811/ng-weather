import { CurrentConditions } from './current-conditions.type';

export class IConditionsAndZip {
  zip: string;
  data: CurrentConditions;
  iat: Date;
}

export class ConditionsAndZip {
  zip: string;
  data: CurrentConditions;
  iat: Date;

  constructor(props: Partial<IConditionsAndZip>) {
    Object.assign(this, {
      ...props,
      iat: Date.now(),
    });
  }
}

