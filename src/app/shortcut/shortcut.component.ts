import {Component, Input, OnInit} from '@angular/core';
import {Shortcut} from '../interfaces/shortcuts';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {
  private _shortcut: Shortcut;
  constructor() { }

  ngOnInit() {
  }

  get shortcut(): Shortcut {
    // console.log(this._shortcut);
    return this._shortcut;
  }

  @Input()
  set shortcut(shortcut: Shortcut) {
    this._shortcut = shortcut;
  }

}
