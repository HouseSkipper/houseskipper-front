import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-before-login-dialog',
  templateUrl: './before-login-dialog.component.html',
  styleUrls: ['./before-login-dialog.component.css']
})
export class BeforeLoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BeforeLoginDialogComponent>, private _router: Router) { }

  ngOnInit() {
  }

  partenaire() {
    this._router.navigate(['/prestataireSignup']);
      this.dialogRef.close();
  }

    proprietaire() {
        this._router.navigate(['/login']);
        this.dialogRef.close();
    }
}
