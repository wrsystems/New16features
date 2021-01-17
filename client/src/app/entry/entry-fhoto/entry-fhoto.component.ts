// 12-29 copied from photo-editor
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';
import { Photo } from 'src/app/_models/photo';

// 12-29
import { Component, OnInit, Input, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Fhoto } from 'src/app/_models/fhoto';
import { Entry } from '../../_models/entry';
import { EntryService } from '../../_services/entry.service';
import { FhotoService } from '../../_services/fhoto.service';
import { environment } from 'src/environments/environment';
import { Place } from '../../_models/place';

@Component({
  selector: 'app-entry-fhoto',
  templateUrl: './entry-fhoto.component.html',
  styleUrls: ['./entry-fhoto.component.css']
})

export class EntryFhotoComponent implements OnInit {

  // @Input() fhotos: Fhoto[]     // 01-04-21 add
  @Input() entry: Entry
  @Input() fhotos: Fhoto[]     // 01-04-21 add
  @Input() place: Place;

  @Output() entryOut: Entry;
  @Output() fhotosOut: Fhoto[];
  @Output() placeOut: Place;

  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  fhoto: Fhoto;
  // fhotos: Fhoto[];    // added 01-09 as @Input taken out
  // entry: Entry;   // removed, in @Input
  // entry$: Entry;
  doneWithLoader = false;
  doneWithLoadEntry = false;
  // tryit: any;

  constructor(private accountService: AccountService, private fhotoService: FhotoService,
              private entryService: EntryService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);  // brings in all user properties
  }

  ngOnInit(): void {

  this.entryOut = this.entry;
  this.placeOut = this.place;
  // this.fhotosOut = this.fhotos;

    console.log('Starting ENTRY-PHOTO, as first line on ngonit');

    // this.tryit = setTimeout(this.myDelay, 3000);
    // fix  - need to load fhotos even though will be empty because entry is brand new
    // this.loadFhoto();
    // this.fhotos.length = 0;   // get error not set property length of undefined

    // console.log('ENTRY-PHOTO receipt of EntryOne : ', this.entry)

    // this.loadEntry();

    console.log('ENTRY-FHOTO ngonit at start, PHOTOS CRITICAL :', this.fhotos)

    this.initializeUploader();

  }

  // myDelay() {
  //   this.tryit = 5;
  // }

  loadFhoto() {
    // this.fhotoService.getFhotoEntryId(this.entry.id).subscribe(result => {
    //   this.fhotos = result;
    //   console.log('ENTRY-FHOTO loadPhoto() method FHOTOS !! OBJECT : ', this.fhotos )
    // })
  }


  loadEntry () {

  //  loads entry$ from db - - do not need if in @Input
  //  this.entryService.currentEntry$.pipe(take(1)).subscribe(entryOne => this.entry$ = entryOne);
  //  console.log('ENTRY-PHOTO value of Entry user$.id from pipe/take : ', this.entry$.id);

  }

  fileOverBase(e: any) {     // e is for event I think
    this.hasBaseDropzoneOver = e;
    // console.log('entry-photoloader fileOverBase')
  }

  setMainFhoto(photo: Photo) {  // main photo not used in entry & flaks
    // this.memberService.setMainPhoto(photo.id).subscribe(() => {
    //   this.user.photoUrl = photo.url;
    //   this.accountService.setCurrentUser(this.user);
    //   this.member.photoUrl = photo.url;
    //   this.member.photos.forEach(p => {
    //     if (p.isMain) p.isMain = false;
    //     if (p.id === photo.id) p.isMain = true;
    //   });
    // })
    // console.log('entry-photoloader setMainPhoto')
  };

  // this works, member select trash icon and it is deleted from the screen & db
  // images with delete do not show until updated. With auto advance after upload
  // the delete functionality will not be used, except for users and flakback
  deleteFhoto(photoId: number) {
    this.fhotoService.deleteFhoto(photoId).subscribe(() => {
      this.fhotos = this.fhotos.filter(x => x.id !== photoId);
    })
  }

  // VERY IMPORTANT method. Need to add entryId to fhoto records using update
  // loop thru fhotos and where entryid = 0, then update
  // copy new values from Entry which is in memory.
  updateFhoto() {
    for (this.fhoto of this.fhotos) {
          // console.log('for loop test :', this.fhoto.id, ' entryId : ', this.fhoto.entryId);

      if (this.fhoto.entryId == 0) {
        // console.log('In IF statement NEED THIS TO SHOW UP BABY !!!:', this.fhoto.entryId);
          this.fhoto.entryId = this.entry.id;
          this.fhoto.userId = this.entry.userId;
          this.fhoto.userName = this.entry.userName;
          this.fhoto.orgId = this.entry.orgId;
          this.fhoto.orgName = this.entry.orgName;

        this.fhotoService.updateFhoto(this.fhoto).subscribe( ()=> {
        })
      }
    }
    this.doneWithLoader = true;
    this.fhotosOut = this.fhotos;
  }

  initializeUploader() {                   // next 3 methods
    this.uploader = new FileUploader({
      url: this.baseUrl + 'fhoto/add-photo',     // adds photo using url
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    // console.log('Finished making uploaded object :', this.uploader);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    // console.log('uploader.onAfterAddingFile at COMPLETE !! GET HERE PLEASE');
    // console.log('end initializeloader END OF ALL : ', this.fhotos.length);

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log('ENTRY-FHOTO uploader.onsucces at start (with JSON) :', response);
      if (response) {
        const fhoto: Fhoto = JSON.parse(response);
        this.fhotos.push(fhoto);
         if (fhoto.isMain) {
           this.user.photoUrl = fhoto.url;
          //  this.fhoto.url = fhoto.url;    // fix this !!!!!!
           this.accountService.setCurrentUser(this.user);
         }
      }
      console.log('ENTRY-PHOTO uploader.onsuccess at end - SEE IF NEW FHOTO ID IS ADDED IN ARRAY :', this.fhotos);
      this.updateFhoto();   // write missing columns in Fhoto since we know id

    }
  }

}
