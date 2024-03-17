import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MAT_DIALOG_DATA
} from "@angular/material/dialog";


export type DialogData = {
    title?: string;
    content?: string,
}

@Component({
    selector: 'dialog',
    templateUrl: 'dialog.html',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule
    ],
})
export class Dialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}