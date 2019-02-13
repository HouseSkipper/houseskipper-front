import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-before-login-dialog',
  templateUrl: './before-login-dialog.component.html',
  styleUrls: ['./before-login-dialog.component.css']
})
export class BeforeLoginDialogComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  partenaire() {
    this._router.navigate(['/prestataireSignup']);;
  }

    proprietaire() {
        this._router.navigate(['/login']);
    }
}
