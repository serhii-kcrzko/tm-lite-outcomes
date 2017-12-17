import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import _forEach from 'lodash/forEach';
import _locate from 'lodash/find';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-item-edit-form',
  templateUrl: './item-edit-form.component.html',
  styleUrls: ['./item-edit-form.component.css']
})
export class ItemEditFormComponent implements OnInit {

  public myForm: FormGroup;
  public itemsOptions: any;
  public id: string;

  constructor(private _fb: FormBuilder, private db: BackendService, private http: Http, private route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      article: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', [Validators.required]],
      items: this._fb.array([
        this.initRaw(),
      ])
    });

    this.getRaws();
  }

  initRaw() {
    return this._fb.group({
      raw: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      name: ['']
    });
  }

  addRaw() {
    const control = <FormArray>this.myForm.controls['items'];
    control.push(this.initRaw());
  }

  removeRaw(i: number) {
    const control = <FormArray>this.myForm.controls['items'];
    control.removeAt(i);
  }

  save() {
    this.initializeNames();
    this.http.post('http://localhost:9000/outcomings', this.myForm.value)
      .subscribe((data) => this.myForm.reset());
    console.log(this.myForm.value);
  }

  getData() {
    return this.db.getProducts();
  }

  getRaws() {
    this.getData().subscribe(data => {
      this.itemsOptions = data;
    });
  }

  initializeNames(): void {
    _forEach(this.myForm.value.items, i => {
      const id = i.raw.split('-')[0];
      const name = i.raw.split('-')[1];
      i.raw = id;
      i.name = name;
    });
  }

  delete() {
    this.http.delete(`http://localhost:9000/outcomings/${this.id}`, this.myForm.value)
    .subscribe((data) => this.myForm.reset());
  }

}
