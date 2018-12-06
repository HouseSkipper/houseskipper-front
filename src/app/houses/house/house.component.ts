import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../services/house.service';
import {House} from '../../interfaces/house';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  private _dataSource: House[];

  constructor(private _houseService: HouseService) { }

  ngOnInit() {
    this._houseService.fecthAllHouse().subscribe((_) => console.log(_));
  }

}
