import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule } from '@angular/material';
  import { UiSwitchModule } from 'ngx-toggle-switch';

  const moduleData = [
      CommonModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatProgressSpinnerModule,
      MatDividerModule,
      MatListModule,
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,	
      MatDatepickerModule,
      MatNativeDateModule,
      UiSwitchModule
   ]
@NgModule({
  declarations: [],
  imports: [moduleData],
  exports:[moduleData]
})
export class AngularMaterialsModule { }
