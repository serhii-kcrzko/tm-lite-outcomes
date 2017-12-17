import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import _reduce from 'lodash/reduce';
import _forEach from 'lodash/forEach';
import { BackendService } from '../backend.service';

import * as moment from 'moment';
import 'moment/locale/uk';
moment.locale('uk');

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  id: string;
  product: any;
  options: Object;

  constructor(private route: ActivatedRoute, private db: BackendService, private location: Location) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.db
      .getSale(this.id)
      .subscribe((res: any) => {
        this.renderProduct(res);
      });
  }

  back(): void {
    this.location.back();
  }

  renderProduct(res: any): void {
    this.product = res;
    this.retrivePrices();
  }

  parseDate(date: string): string {
    const parsedDate = moment(date);
    return parsedDate.format('D MMMM YYYY, hh:mm:ss');
  }

  getPrice() {
    const totalPrice = _reduce(this.product.items, (sum, item) => {
      return sum + (+item.price * +item.quantity);
    }, 0);
    return totalPrice;
  }

  retrivePrices() {
    _forEach(this.product.items, item => {
      this.db.getProduct(item.raw).subscribe(data => {
        const dbVal = data.json();
        console.log(dbVal);
        item.price = dbVal.price;
      });
    });
  }
}
