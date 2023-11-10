import { Component, ContentChild, Input } from '@angular/core';
import { TabBodyComponent } from '../tab-body/tab-body.component';
import { TabLabelComponent } from '../tab-label/tab-label.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() label: string;

  @Input() isActive: boolean;

  @ContentChild(TabBodyComponent) bodyComponent: TabBodyComponent;

  @ContentChild(TabLabelComponent) labelComponent: TabLabelComponent;
}
