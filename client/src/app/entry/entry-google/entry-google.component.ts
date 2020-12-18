// this version is made to be copied to #16 in Neil
import { Component, NgZone } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../_models/place';

@Component({
  selector: 'app-entry-google',
  templateUrl: './entry-google.component.html',
  styleUrls: ['./entry-google.component.css']
})
export class EntryGoogleComponent {

  placeOne: Place;  // from import

  @Input() place: Place; // decorate the property with @Input()
  @Output() newPlaceEvent = new EventEmitter<Place>();

  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;
  streetNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  countryShort: string;
  postCode: string;
  gname: string;
  placeId: string;
  placeUrl: string;
  submitted = false;
  placeDetail = false;

  constructor(public zone: NgZone) { }

  ngOnInit() {
  }

  // send data back to parent -- entry-list
  addNewPlace() {
    this.submitted = true;

    this.place.placeId = this.placeId;
    this.place.gname = this.gname;
    this.place.fullAddress = this.formattedEstablishmentAddress;

    this.place.phone = this.phone;
    this.place.fullDescription = 'Problem it is object';
    this.place.streetNumber = this.streetNumber;

    this.place.street = this.street;
    this.place.city = this.city;
    this.place.postCode = this.postCode;

    this.place.state = this.state;
    this.place.country = this.country;
    this.place.countryShort = this.countryShort;

    this.place.placeUrl = this.placeUrl;
    this.place.useOrg = false;
    this.place.orgId = 1;

      // console.log('From google ', this.place);
    this.newPlaceEvent.emit(this.place);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //     return;
    // }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this.addNewPlace();  // go to the Output method
}

  onReset() {
    this.submitted = false;
    // this.registerForm.reset();
}

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }

  // ******************************************
  // Below is the method to use in Flak  11/20/20
  // ******************************************

  getEstablishmentAddress(place: object) {
    this.establishmentAddress = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.postCode = this.getPostCode(place);
    this.streetNumber = this.getStreetNumber(place);
    this.street = this.getStreet(place);
    this.city = this.getCity(place);
    this.state = this.getState(place);
    this.country = this.getCountry(place);
    this.countryShort = this.getCountryShort(place);
    this.formattedEstablishmentAddress = place['formatted_address'];

    // here is the run method
    this.zone.run(() => {

      // not sure if need NEXT TWO, seems like duplicate -- but others foloowing are NOT duplicates
      this.formattedEstablishmentAddress = place['formatted_address'];
      this.phone = place['formatted_phone_number'];

      this.gname = place['name'];
      // console.log(this.gname);  // works

      this.placeId = place['place_id'];
      // console.log(this.placeId);   // works

      this.placeUrl = place['url'];
      // console.log(this.placeUrl);   // works


    });
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }

}
