import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { BackendService } from '../backend.service';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  data: any = {};

  constructor(private http: Http, private db: BackendService) { }

  getData() {
    return this.db.getSales();
  }

  getProducts() {
    this.getData().subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.getProducts();
    this.getData();
  }

}
