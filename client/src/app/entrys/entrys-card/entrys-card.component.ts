import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../../_models/entry';

@Component({
  selector: 'app-entrys-card',
  templateUrl: './entrys-card.component.html',
  styleUrls: ['./entrys-card.component.css']
})

export class EntrysCardComponent implements OnInit {
  @Input() entry: Entry;

  constructor() { }

  ngOnInit(): void {
  }

}
