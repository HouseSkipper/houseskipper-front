import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class MenuListService {

    /**
     * Fields with subfields (array of array of string)
     */
  abstract getFields();

}
