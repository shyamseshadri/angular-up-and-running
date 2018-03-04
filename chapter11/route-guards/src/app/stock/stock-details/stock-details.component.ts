import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { ActivatedRoute } from '@angular/router';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  public stock: Stock;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {stock: Stock}) => {
      this.stock = data.stock;
    });
  }

}
