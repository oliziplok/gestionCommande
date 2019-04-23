import { Injectable } from '@angular/core';
import {AddCommandeComponent} from '../../layout/client-layout/add-commande/add-commande.component';
import {MatDialog} from '@angular/material';
import {ErrorPrompComponent} from './error-promp/error-promp.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorPrompService {

  constructor(public dialog: MatDialog) { }

  openError(errorMsg) {
    const dialogRef = this.dialog.open(ErrorPrompComponent, {
      width: '50%',
      data: {
        msg: errorMsg
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   if (result) {
    //     console.log('trigger');
    //     this.snackBar.open('Commande bien passée', 'Ok', {duration: 2000});
    //   }
    // });
  }
}
