// 12-28 copied from reply-list before 12-28 changes
import { Component, OnInit, ViewChild } from '@angular/core';

// 12-23 copied from member-detail and modified
// import { Member } from 'src/app/_models/member';
// import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

// import { Message } from 'src/app/_models/message';
// import { MessageService } from 'src/app/_services/message.service';

import { Entry } from '../../_models/Entry';
import { EntryService } from '../../_services/entry.service';
// 12-28
import { Flak } from '../../_models/Flak';
import { FlakService } from '../../_services/flak.service';

@Component({
  selector: 'app-flaks-detail',
  templateUrl: './flaks-detail.component.html',
  styleUrls: ['./flaks-detail.component.css']
})
export class FlaksDetailComponent implements OnInit {
  @ViewChild('flakTabs', {static: true}) flakTabs: TabsetComponent;

  flak: Flak;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  idOrig: any;
  activeTab: TabDirective;

  constructor(private flakService: FlakService, private route: ActivatedRoute) { }  // later add chat

  ngOnInit(): void {

    this.route.data.subscribe(data => {  // uses resolver reply-list.resolver  12-24
      this.flak = data.entry;
      // console.log('FLAKS-DETAIL - to print chosen flak (make sure values ok) : ', this.flak )
    });

    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    });

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

    // this.galleryImages = this.getImages();  // 12-23 added after add photo to database

   // ================================= End Of ngOnInit =========================================
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
    this.flakTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {  // after add chat
    this.activeTab = data;
    // if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
    //   this.loadMessages();
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
