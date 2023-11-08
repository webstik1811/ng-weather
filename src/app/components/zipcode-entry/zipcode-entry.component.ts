import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LocationFacade } from '../../+state/facades/location.facade';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  private locationFacade = inject(LocationFacade);

  @ViewChild('zipcode', { static: false }) invoice: ElementRef;

  // Just dispatch the action
  addLocation(zipcode: string) {
    this.locationFacade.addLocation(zipcode);
    this.invoice.nativeElement.value = '';
  }

}
