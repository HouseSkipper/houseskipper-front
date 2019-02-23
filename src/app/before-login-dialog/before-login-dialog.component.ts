import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-before-login-dialog',
  templateUrl: './before-login-dialog.component.html',
  styleUrls: ['./before-login-dialog.component.css']
})
export class BeforeLoginDialogComponent implements OnInit {

  constructor(private _router: Router, public dialogRef: MatDialogRef<BeforeLoginDialogComponent>) { }

  ngOnInit() {
  }

  partenaire() {
    this._router.navigate(['/prestataireLogin']);
      this.dialogRef.close();
  }

    proprietaire() {
        this._router.navigate(['/login']);
        this.dialogRef.close();
    }
}
