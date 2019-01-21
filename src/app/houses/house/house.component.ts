import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../services/house.service';
import {House} from '../../interfaces/house';
import {Router} from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

    private _dataSource: House[];
    private _displayedColumns = ['House_Name', 'Type', 'Address', 'numberPieces', 'Delete'];

    constructor(private _houseService: HouseService, private _router: Router) {
    }

    ngOnInit() {
        this._houseService.fecthAllHouse().subscribe((_) => this._dataSource = _);
    }

    get dataSource(): House[] {
        return this._dataSource;
    }

    get displayedColumns(): any {
        return this._displayedColumns;
    }

    delete(id: string) {
        this._houseService.remove(id).subscribe(null, null, () => this.ngOnInit());
    }
}



