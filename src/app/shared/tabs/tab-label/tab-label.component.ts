import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab-label',
  templateUrl: './tab-label.component.html',
  styleUrls: ['./tab-label.component.scss']
})
export class TabLabelComponent {
  @ViewChild(TemplateRef) labelComponent: TemplateRef<any>;
}
