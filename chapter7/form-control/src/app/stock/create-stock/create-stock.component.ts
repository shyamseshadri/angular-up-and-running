import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  public name = new FormControl();
  constructor() {}

  onSubmit() {
    console.log('Name Control Value', this.name.value);
  }
}
