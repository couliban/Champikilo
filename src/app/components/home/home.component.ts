import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Game, games } from '../../utils/games';
import { RouterModule } from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';
import { Dialog, DialogData } from './dialog/dialog';
import { environment } from '../../../environments/environment';

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
  
  imageURL(item: Game): string {
    return `${environment.assets}/images/${item.image}`;
  }

  constructor(readonly dialog: MatDialog) {}

  openDialog(params: OpenDialog): void {
    this.dialog.open(Dialog, {
      ...params,
      width: '700px',
    });
  }
}
