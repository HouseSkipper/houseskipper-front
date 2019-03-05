import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {House} from '../../../interfaces/house';


@Component({
  selector: 'app-house-dialog-delete',
  templateUrl: './house.dialog.delete.html',
  styleUrls: [ './house.dialog.delete.css' ]
})
export class HouseDialogDelete implements OnInit {

  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<HouseDialogDelete>, @Inject(MAT_DIALOG_DATA) private _house: House) {
  }

  /**
   * Returns person passed in dialog open
   */
  get house(): House {
    return this._house;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave(id: string) {
    this._dialogRef.close(id);
  }
}
