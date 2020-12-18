// tslint:disable-next-line: no-reference
/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { } from '@types/googlemaps';

// @Component({
//   selector: 'app-google-places',
//   templateUrl: './google-places.component.html',
//   styleUrls: ['./google-places.component.css']
// })

@Component({
  selector: 'AutocompleteComponent',
  template: `
    <input class="input"
      type="text"
      [(ngModel)]="autocompleteInput"
      #addresstext style="padding: 12px 20px; border: 1px solid #ccc; width: 400px"
      >
  `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {

  // export class GooglePlacesComponent implements OnInit, AfterViewInit {

    @Input() adressType: string;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor() {
    }

    // tslint:disable-next-line: typedef
    ngOnInit() {
    }

    // tslint:disable-next-line: typedef
    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    // tslint:disable-next-line: typedef
    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'US' },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.invokeEvent(place);
        });
    }

    // tslint:disable-next-line: typedef
    invokeEvent(place: Object) {
        this.setAddress.emit(place);
        // console.log(place);
    }

}
