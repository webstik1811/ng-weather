import {Component, inject} from '@angular/core';
import {LocationFacade} from '../../+state/facades/location.facade';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  private locationFacade = inject(LocationFacade);

  addLocation(zipcode: string) {
    this.locationFacade.addLocation(zipcode);
  }

}