import { CurrentConditions } from './current-conditions.type';

export class IConditionsAndZip {
  zip: string;
  data: CurrentConditions;
}

export class ConditionsAndZip {
  zip: string;
  data: CurrentConditions;

  constructor(props: Partial<IConditionsAndZip>) {
    Object.assign(this, props);
  }
}

