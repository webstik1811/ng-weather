import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabLabelComponent } from './tab-label/tab-label.component';
import { TabComponent } from './tab/tab.component';


@NgModule({
  declarations: [
    TabGroupComponent,
    TabLabelComponent,
    TabComponent,
    TabBodyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabGroupComponent,
    TabLabelComponent,
    TabComponent,
    TabBodyComponent
  ]
})
export class TabsModule { }
