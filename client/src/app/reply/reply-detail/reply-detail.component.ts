import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { User } from '../../_models/user';  // brought in to get username, probably better solution

import { Entry } from '../../_models/Entry';
// import { EntryService } from '../../_services/entry.service';
// 12-28
import { Flak } from '../../_models/Flak';
import { FlakService } from '../../_services/flak.service';
// 01-14-21
import { Fhoto } from '../../_models/fhoto';
import { FhotoService } from '../../_services/fhoto.service';
import { Place } from '../../_models/place';
import { PlaceService } from '../../_services/place.service';

@Component({
  selector: 'app-reply-detail',
  templateUrl: './reply-detail.component.html',
  styleUrls: ['./reply-detail.component.css']
})

export class ReplyDetailComponent implements OnInit {

  @ViewChild('entryTabs', {static: true}) entryTabs: TabsetComponent;
  // @ViewChild('memberTabs', { static: false }) memberTabs: TabsetComponent;  from SO

  @Input() entry: Entry
  @Input() fhotos: Fhoto[] = [];

  flakOne: Flak = {'id': 0, 'subject': '', 'content': '', 'hasBeenRead': false, 'entryId': 0,
      'userCreated': false, 'userDeleted': false, 'orgCreated': false, 'orgDeleted': false,
      'fhotoAdded': false, 'dateCreated': '2001-02-02', 'dateFirstRead': '2001-01-01',
      'orgId': 1, 'orgName': 'No Org Name Yet, set to id one', 'userId': 1, 'userName': '' };

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  idOrig: any;
  activeTab: TabDirective;

  flaks: Flak[] = [];  // 12-28
  // hardUsername = 'ruthie';
  loading = false;
  passedFlak: Flak;  // single object
  validationErrors: string[] = [];
  sendToFlakMessage = false;

  localValue = '';  // these three variable are to get username from local storage
  userObj: User;
  myUserName: any;
  extraTry = 0;
  place: Place;

  constructor(private flakService: FlakService, private route: ActivatedRoute,
                      private placeService: PlaceService, private fhotoService: FhotoService) { }

  ngOnInit(): void {

    // this.route.queryParams.subscribe(params => {
    //   params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    // });

    // Interesting idea - - route to specific tab -- copied from SO
    // [routerLink]="['/members']"[queryParams]="{ tab: 3 }"


    this.sendToFlakMessage = false;
    this.passedFlak = this.flakOne;  // 12-28 for flaks-message

    // this.route.data.subscribe(data => {  // uses resolver reply-list.resolver  12-24
    //   this.entry = data.entry;
    //   console.log('REPLY-DETAIL at init, after route : ', this.entry)    // brings entry object
    // });

    this.galleryOptions = [
        {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
        }
      ];

      this.loadFlaks();
      this.loadPlace();
      this.loadFhotos();

    // this.galleryImages = this.getImages();  // 12-23 added after add photo to database
    // this is the end of OnInit
  };

// ================================= End Of ngOnInit =========================================

  ngAfterViewInit() {
  this.route.queryParams.subscribe(params => {
    const selectTab = 0;
    // const selectTab = +params['tab'];
    // tslint:disable-next-line: no-string-literal
    console.log('REPLY-DETAIL - queryparams:' + selectTab);
    params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    // this.memberTabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
  });
  }



  sendToFlakIndicator() {
    this.sendToFlakMessage = true;
  }

  loadFlaks() {
    this.loading = true;
    this.flakService.getFlaksForEntry(this.entry.id).subscribe(result => {
    // this.noMatch = '';
      this.flaks = result;
      // console.log('REPLY-DETAIL - List ruthie flaks :', this.flaks );
      // console.log('REPLY-DETAIL flaks.length : ', this.flaks.length);  // 01-14-21
      this.loading = false;
    });
    };

  loadPlace() {
    this.placeService.getPlaceById(this.entry.id).subscribe(result => {
    // this.noMatch = '';
      this.place = result;
      // console.log('REPLY-DETAIL - List the place :', this.place );
    });
    };

  selectTab(tabId: number) {
    // this.entryTabs.tabs[tabId].active = true;   // can not get fixed, says "tabs" undefined but works in entry-detail
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Photos' && this.extraTry == 0) {
      this.extraTry = 1;
      this.loadFhotos();
    }
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
    this.galleryImages = this.getImages();
    console.log('REPLY-DETAIL - AFTER GALLERY IMAGES LOAD',this.galleryImages);
  }

  loadFhoto() {
    this.fhotoService.getFhotoEntryId(this.entry.id).subscribe(result => {
      this.fhotos = result;
      console.log('REPLY-DETAIL - I AM NOT FHOTO-EDIT load entry FHOTOS !! OBJECT : ', this.fhotos);
    });
  }


}

