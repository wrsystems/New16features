// this version is made to be copied to #16 in Neil
import { Component, NgZone } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../_models/place';
import { PlaceService } from '../../_services/place.service';
import { User } from '../../_models/user';  // brought in to get username, probably better solution
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-google',
  templateUrl: './entry-google.component.html',
  styleUrls: ['./entry-google.component.css']
})
export class EntryGoogleComponent {

  @Output() placeOut: Place;

  placeOne: Place = {'id': 0,'entryId': 0, 'placeId': '', 'gname': '', 'fullAddress': '', 'phone': '',
  'fullDescription': '', 'streetNumber': '', 'street': '', 'city': '',
  'postCode': '', 'state': '', 'country': '', 'countryShort': '', 'placeUrl': '',
  'formSubmitted': false, 'useOrg': false, 'orgId': 1, 'orgName': '', 'userId': 0, 'userName': '',
  'match': 'NEW'}

  // @Input() place: Place; // decorate the property with @Input()
  // @Output() newPlaceEvent = new EventEmitter<Place>();

  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  place: Place;
  user$: User;
  validationErrors: string[] = [];

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
  placeDetail = false;   // false means not to show details on the display screen, only true for testing
  myArrray = [];
  doneWithPlace = false;


  constructor(public zone: NgZone, private placeService: PlaceService,
      private accountService: AccountService, private router: Router) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user$ = user);
  }

  ngOnInit() {
    this.place = this.placeOne;
    // console.log('ENTER-GOOGLE or place:Place ngoninit :',this.place);
    // console.log('ENTRY-GOOGLE entry length :', this.myArrray.length);
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
    // Here Old Emit <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //     this.newPlaceEvent.emit(this.place);
    //     <app-entry-google
    //     [place]="passedPlace"                      passed in place  passedPlace name is copy of placeOne
    //     (newPlaceEvent)="updatePlace($event)"      called updatePlace  emited this.place
    //  > </app-entry-google>

    // 01-09-21 new code to Post gplace
    this.place.userId = 0;
    this.place.userName = this.user$.username;
    this.place.orgName = '';
    this.place.match ='NEW';
    this.place.entryId = 0;
    this.place.formSubmitted = true;

    this.updatePlace();
  }


  updatePlace() {

    Object.assign( this.placeOne, this.place);
    this.postPlace();

    // this.router.navigateByUrl('/content');
  }


  postPlace() {

    this.placeService.addPlace(this.placeOne).subscribe(data => {
        this.placeOne.id = data.id

      console.log('ENTER-GOOGLE Gplace POST TO BE ENTERED FIRST !!!!', this.placeOne)
      this.placeOut = this.placeOne;  // placeOut is in @Output
      this.doneWithPlace = true;
    });
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
