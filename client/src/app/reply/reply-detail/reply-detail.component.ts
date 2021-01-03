import { Component, OnInit, ViewChild } from '@angular/core';

// 12-23 copied from member-detail and modified
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { User } from '../../_models/user';  // brought in to get username, probably better solution

import { Entry } from '../../_models/Entry';
// import { EntryService } from '../../_services/entry.service';
// 12-28
import { Flak } from '../../_models/Flak';
import { FlakService } from '../../_services/flak.service';

@Component({
  selector: 'app-reply-detail',
  templateUrl: './reply-detail.component.html',
  styleUrls: ['./reply-detail.component.css']
})

export class ReplyDetailComponent implements OnInit {
  @ViewChild('entryTabs', {static: true}) entryTabs: TabsetComponent;

  flakOne: Flak = {'id': 0, 'subject': '', 'content': '', 'hasBeenRead': false, 'entryId': 0,
      'userCreated': false, 'userDeleted': false, 'orgCreated': false, 'orgDeleted': false,
      'fhotoAdded': false, 'dateCreated': '2001-02-02', 'dateFirstRead': '2001-01-01',
      'orgId': 1, 'orgName': 'No Org Name Yet, set to id one', 'userId': 1, 'userName': '' };

  entry: Entry;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  idOrig: any;
  activeTab: TabDirective;

  flaks: Flak[] = [];  // 12-28
  hardUsername = 'ruthie';
  loading = false;
  passedFlak: Flak;  // single object
  validationErrors: string[] = [];
  sendToFlakMessage = false;

  localValue = '';  // these three variable are to get username from local storage
  userObj: User;
  myUserName: any;

  constructor(private flakService: FlakService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sendToFlakMessage = false;
    this.passedFlak = this.flakOne;  // 12-28 for flaks-message

    this.route.data.subscribe(data => {  // uses resolver reply-list.resolver  12-24
      this.entry = data.entry;
      // console.log('In reply-list at init, after route : ', data)    // brings entry object
    });

    // JUST TOOK THESE LINES OUT BECAUSE GOTUNDEFINED ERROR MESSAGES  12-30-2020
    // this.route.queryParams.subscribe(params => {
    //   console.log( ' this.entryTabs.tabs :', this.entryTabs);

    //   // params.tab ? this.selectTab(params.tab) : this.selectTab(0);  // change to always select zero
    //   params.tab ? this.selectTab(0) : this.selectTab(0);
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

    // this.galleryImages = this.getImages();  // 12-23 added after add photo to database
    // this is the end of OnInit
  };

  sendToFlakIndicator() {
    this.sendToFlakMessage = true;
  }

  loadFlaks() {
    this.loading = true;
    this.flakService.getFlakUserName(this.hardUsername).subscribe(result => {
    // this.noMatch = '';
      this.flaks = result;
      console.log('List ruthie flaks :', this.flaks );
      this.loading = false;
    });
  }

  // getImages(): NgxGalleryImage[] {  // 12-23 added after add photo to database
  //   const imageUrls = [];
  //   for (const photo of this.member.photos) {
  //     imageUrls.push({
  //       small: photo?.url,
  //       medium: photo?.url,
  //       big: photo?.url
  //     });
  //   }
  //   return imageUrls;
  // }

  // loadMessages() {  // 12-23 added after add chat to database
  //   this.messageService.getMessageThread(this.member.username).subscribe(messages => {
  //     this.messages = messages;
  //   });
  // }

  selectTab(tabId: number) {
    this.entryTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    // if (this.activeTab.heading === 'Messages' && this.entry.length === 0) {
    //   this.loadMessages();
    // }
  }

}

  // save coding not used until things all work 12-23
  // loadMember() {  // this worked, not neet version below 12-13

    // this.idOrig = +this.route.snapshot.paramMap.get('id')
    // console.log('idOrig : ', this.idOrig);

  //   this.entryService.getEntryId(+this.route.snapshot.paramMap.get('id')).subscribe(member => {
  //     this.flak = member;
  //     // console.log('At loadMember : ',this.flak);
  //     // this.galleryImages = this.getImages();
  //   })
  // }

  // loadMember() {
  //   this.entryService.getEntryId(16).subscribe(member => {
  //     this.flak = member;
  //     console.log('At loadMember : ',this.flak);
  //     // this.galleryImages = this.getImages();
  //   })
  // }
