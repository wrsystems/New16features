import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

import { EntryService } from '../../_services/entry.service';
import { Entry } from '../../_models/entry';
import { Fhoto } from '../../_models/fhoto';
import { FhotoService } from '../../_services/fhoto.service';
import { take } from 'rxjs/operators';
import { Place } from '../../_models/place';
import { PlaceService } from '../../_services/place.service';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent implements OnInit {

  @Input() entry: Entry
  @Input() fhotos: Fhoto[] = [];
  @Input() place: Place;

  @ViewChild('entryTabs', {static: true}) entryTabs: TabsetComponent;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;

  // entry: Entry;
  // entry$: Entry;  // for testing
  // place$: Place;
  // fhotos: Fhoto[] = [];
  fhoto: Fhoto;
  placeOne: Place
  extraTry = 0;

// use membername to decide which user this is we want to have detail 12-21
// to get that: need activated route

  constructor(private placeService: PlaceService, private route: ActivatedRoute,
    private entryService: EntryService, private fhotoService: FhotoService) { }

  ngOnInit(): void {

    // this.entry$ = this.entry;
    // this.entryService.currentEntry$.pipe(take(1)).subscribe(entryOne => this.entry$ = entryOne);
    // console.log('ENTRY-DETAIL  entry$ ', this.entry$ )

    // this.placeService.currentPlace$.pipe(take(1)).subscribe(placeOne => this.place$ = placeOne);
    // console.log('ENTRY-DETAIL  place$ ', this.place$ )

    // this.route.data.subscribe(data => {
    //   this.member = data.member;
    // })

    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions = [ // add to the options array
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,  // number below the main image
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false   // so not be able to click on image
      }
    ]

    this.loadFhotos();

    console.log('ENTRY-DETAIL Length of fhotos [] ARRAY : ', this.fhotos.length);

    console.log('ENTRY-DETAIL Gplace -Print oninit value :', this.place);
    console.log('ENTRY-DETAIL Entry  -Print oninit value :', this.entry);

    // this.loadPlace();  method no longer used, replaced with place$

    // this.galleryImages = this.getImages();
    // console.log('AFTER GALLERYIMAGESLOAD',this.galleryImages);

    this.realUpdatePlace();  // 01-12 try

  }

// *****************************************
// *********  END OF NgOnInit  *************
// *****************************************

realUpdatePlace() {

  // updates place which is an @Input from ENTRY-GOOGLE
    this.placeOne = this.place;
    // this.place.entryId = this.entry.id;
    this.placeOne.entryId = this.entry.id;

    this.placeService.updatePlace(this.place).subscribe( ()=> {
    });
    console.log('ENTER-DETAIL gplace UPDATE by adding entry-id :', this.place)
}


  getImages(): NgxGalleryImage[] {  // going to return an array
    const imageUrls = [];    // initially empty array
    for (const photo of this.fhotos) {  // loop over imageUrls array created line above
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    }
    return imageUrls;  // after loop return imagesUrls
  }

  loadFhotos() {
    // this.fhotoService.getFhotoEntryId(this.entry$.id).subscribe(fhotos => {
    //   this.fhotos = fhotos;
    //   console.log('ENTRY-DETAIL  fhotos ', this.fhotos )
    // });

    this.galleryImages = this.getImages();
    console.log('ENTRY-DETAIL - AFTER GALLERY IMAGES LOAD',this.galleryImages);
  }

  loadPlace() {
    // this.placeService.getPlacePlaceId(this.entry$.placeId).subscribe(place => {
    //   this.place = place;
    //   console.log('ENTRY-DETAIL  place ', this.place )
    // })
  }

  selectTab(tabId: number) {
    this.entryTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Photos' && this.extraTry == 0) {
      this.extraTry = 1;
      // this.loadFhotos();
    }
  }


// Notes: to do
// SuBMIT - UPDATE -POST entry$ & set SentToFlak as true,  Can update NOT POST because must post to get entry$
//    retrieve the assigned entry.id -- have from first post, don't need to retrieve
// SUBMIT - UPDATE -POST place$ & write entry.id
//    set entry$ & place$ to null (see account.service for user example)
//    routerLink to replys (new entry should show up)
// CANCEL Ideal - If not submitted, then go to cloudinary & delete fhotos & then delete from Fhoto table
// so there is NOT an entry or place unless SUBMIT is taken


}

// if (this.activeTab.heading === 'Photos' && this.fhotos.length === 0) {
