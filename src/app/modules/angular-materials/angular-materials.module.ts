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
  MatNativeDateModule,
  MatExpansionModule,
  MatTabsModule  } from '@angular/material';
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
      MatExpansionModule,
      MatTabsModule,
      UiSwitchModule      
   ]
@NgModule({
  declarations: [],
  imports: [moduleData],
  exports:[moduleData]
})
export class AngularMaterialsModule { }
