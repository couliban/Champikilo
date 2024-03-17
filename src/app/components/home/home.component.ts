import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { games } from '../../utils/games';
import { RouterModule } from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';
import { Dialog, DialogData } from './dialog/dialog';

type OpenDialog = {
  enterAnimationDuration: string, 
  exitAnimationDuration: string, 
  data: DialogData
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly menu = games;

  constructor(readonly dialog: MatDialog) {}

  openDialog(params: OpenDialog): void {
    this.dialog.open(Dialog, {
      ...params,
      width: '700px',
    });
  }
}
