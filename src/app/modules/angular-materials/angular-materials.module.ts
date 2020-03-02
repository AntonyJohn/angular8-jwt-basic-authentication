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
  MatSidenavModule} from '@angular/material';

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
      MatSidenavModule
   ]
@NgModule({
  declarations: [],
  imports: [moduleData],
  exports:[moduleData]
})
export class AngularMaterialsModule { }
