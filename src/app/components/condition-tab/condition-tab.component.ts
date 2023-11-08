import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConditionsAndZip } from '../../interfaces/conditions-and-zip.type';

@Component({
  selector: 'app-condition-tab',
  templateUrl: './condition-tab.component.html',
  styleUrls: ['./condition-tab.component.scss']
})
export class ConditionTabComponent {

  @Input() location: ConditionsAndZip;
  @Input() icon: string;
  @Output() public showForecast = new EventEmitter<string>();

  // Trigger outgoing event when click to show 5-day forecast
  public show = (zipcode) => {
    this.showForecast.emit(zipcode);
  }
}
