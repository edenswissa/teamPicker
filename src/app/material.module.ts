import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
  imports: [MatButtonModule,MatIconModule,MatCheckboxModule,
    MatInputModule,MatSelectModule,MatDialogModule,MatCardModule,MatProgressSpinnerModule],
  exports: [MatButtonModule,MatIconModule,MatCheckboxModule,
    MatInputModule,MatSelectModule,MatDialogModule,MatCardModule,MatProgressSpinnerModule],
})

export class MaterialModule {

}
