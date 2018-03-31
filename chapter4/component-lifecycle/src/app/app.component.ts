import { Component, SimpleChanges, OnInit, OnChanges, OnDestroy,
         DoCheck, AfterViewChecked, AfterViewInit, AfterContentChecked,
         AfterContentInit } from '@angular/core';
import { Stock } from 'app/model/stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy,
                                     DoCheck, AfterContentChecked,
                                     AfterContentInit, AfterViewChecked,
                                     AfterViewInit {
  title = 'Stock Market App';

  public stock: Stock;

  onToggleFavorite(stock: Stock) {
    console.log('Favorite for stock ', stock, ' was triggered');
    this.stock.favorite = !this.stock.favorite;
  }

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80);
    console.log('App Component - On Init');
  }

  ngAfterViewInit(): void {
    console.log('App Component - After View Init');
  }
  ngAfterViewChecked(): void {
    console.log('App Component - After View Checked');
  }
  ngAfterContentInit(): void {
    console.log('App Component - After Content Init');
  }
  ngAfterContentChecked(): void {
    console.log('App Component - After Content Checked');
  }
  ngDoCheck(): void {
    console.log('App Component - Do Check');
  }
  ngOnDestroy(): void {
    console.log('App Component - On Destroy');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('App Component - On Changes - ', changes);
  }
}
