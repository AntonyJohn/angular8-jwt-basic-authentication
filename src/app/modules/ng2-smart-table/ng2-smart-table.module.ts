import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CellModule } from './components/cell/cell.module';
import { FilterModule } from './components/filter/filter.module';
import { PagerModule } from './components/pager/pager.module';
import { TBodyModule } from './components/tbody/tbody.module';
import { THeadModule } from './components/thead/thead.module';
//import { OwlDateTimeFormats, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
//import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

import { Ng2SmartTableComponent } from './ng2-smart-table.component';
/*
export const MY_DATE_TIME_FORMATS: OwlDateTimeFormats = {
  parseInput: 'MM-YYYY',
  fullPickerInput: 'DD/MMM/YYYY',
  datePickerInput: 'MM-YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'MM-YYYY',
  monthYearA11yLabel: 'MMMM YYYY',
};
*/
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CellModule,
    FilterModule,
    PagerModule,
    TBodyModule,
    THeadModule,
    //OwlDateTimeModule,
   // OwlNativeDateTimeModule,
  //  OwlMomentDateTimeModule
  ],
  //providers: [{provide:OWL_DATE_TIME_FORMATS, useValue: MY_DATE_TIME_FORMATS}],
  providers: [],
  declarations: [
    Ng2SmartTableComponent,
  ],
  exports: [
    Ng2SmartTableComponent,
  ],
})
export class Ng2SmartTableModule {
}
